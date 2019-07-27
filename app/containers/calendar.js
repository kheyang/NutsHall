import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { CalendarStack } from '../app.js';
import NavigationManager from "../managers/navigationManager";
import {db} from "../config";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationDrawerStructure } from "../app";

let itemsRef = db.ref('/event')
let reminderRef = db.ref('/reminders')

var selectedDate = new Date().toISOString().slice(0,10)

export default class Calendar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      events: [],
      reminder: [],
    };
    this.loadItems = this.loadItems.bind(this)
  }

  static navigationOptions = (navigation) => ({
    drawerLabel: 'Calendar',
    title: 'Calendar',
    // headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
    headerRight: 
    <Icon.Button
      name='plus'
      color = 'black'
      backgroundColor='transparent'
      onPress = {() => NavigationManager.navigate('Adding Event', {date: selectedDate})}
    >
    </Icon.Button>,
    headerTitleStyle: {
      fontFamily: "Raleway-Medium",
      fontWeight: 'normal'
    },
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#000000',
  })

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data)
      // let updatedEvents = this.state.events
      // updatedEvents.push(items)
      this.setState({ events: items })
      // console.log('Events loaded')
    })
    reminderRef.on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data)
      // let updatedEvents = this.state.events
      // updatedEvents.push(items)
      this.setState({ reminder: items })
      console.log(this.state.reminder)
    })
  }

  render() {
    return (
      <Agenda 
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        // renderReminder={this.renderReminder.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        pastScrollRange={12}
        futureScrollRange={12}
        onDayPress = {(day)=>{
          console.log(day.dateString)
          selectedDate = day.dateString
          setTimeout(() => {
            console.log(selectedDate)
          },1)
        }}
      />
    );
  }
  

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 850; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
        for (let i = 0; i < this.state.events.length ; i++) {
          this.state.items[this.state.events[i].date] = []
          this.state.items[this.state.events[i].date].push({
            name: this.state.events[i].name,
            height: 50
          })
        }
        for (let i = 0; i < this.state.reminder.length ; i++) {
          this.state.items[this.state.reminder[i].date] = []
          this.state.items[this.state.reminder[i].date].push({
            name: this.state.reminder[i].title,
            date: this.state.reminder[i].date,
            time: this.state.reminder[i].time,
            serialNumber: this.state.reminder[i].serial,
            height: 50
          })
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 10);
  }

  renderItem(item) {
    if (item.serialNumber === undefined) {
      return (
        console.log(item.name),
        <View style={[styles.item, {height: item.height}]}>
          <Text>
            { item.name }
          </Text>
        </View>
        );
    } else {
      return (
        console.log(item.serialNumber),
        <View style={[styles.item, {height: item.height}]}>
          <TouchableOpacity 
            style={{
              flex: 1,
            }}
            onPress = {() => 
              NavigationManager.navigate(
                'Editing Event', 
                {
                  serial: item.serialNumber, 
                  date: item.date,
                  title: item.name,
                  time: item.time
                }
              )
            }
            onLongPress = {() => {
              Alert.alert(
                'Delete Reminder',
                'Do you sure you want to delete the reminder?',
                [
                  {text: 'Yes, delete it.', onPress: () => {
                      db.ref('reminders/' + item.serialNumber).remove()
                      this.state.items[item.date] = []
                    },
                  },
                  {text:'No, keep it.', onPress: () => console.log('Remains')}
                ],
                )
            }}
          >

          <Text style={{color: 'black'}}>
            { item.time }
          </Text>
          <Text>
            { item.name }
          </Text>

          </TouchableOpacity>
        </View>
        );
    }

    // return (
    //   <View style={[styles.item, {height: item.height}]}>
    //     {/* <TouchableOpacity 
    //       onLongPress = {()=> {
    //         Alert.alert(
    //           'Delete Reminder',
    //           'Do you sure you want to delete the reminder?',
    //           [
    //             {text: 'Yes', onPress: ()=>{reminderRef + }}
    //           ]


    //         )
    //       }}
    //     > */}

    //       <Text>{item.name}</Text>
    //     {/* </TouchableOpacity> */}
      
    //   </View>
    // );
  }

  // renderReminder(item) {
  //   return (
  //   <View style={[styles.item, {height: item.height}]}>
  //     <Text>
  //       { item.time }
  //     </Text>
  //   </View>
  //   );
  // }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    console.log(`row Changed`);
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

// module.export = Calendar; //module export statement
// module.export.Calendar.addEvent = addEvent;