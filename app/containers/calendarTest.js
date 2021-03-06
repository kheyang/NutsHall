// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet
// } from 'react-native';
// import {Agenda} from 'react-native-calendars';
// import NavigationManager from "../managers/navigationManager";
// import { eventAnnouncement } from "./announcementPage";
// import {db} from "../config"

// let itemsRef = db.ref('/event')

// export default class Calendar extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       items: {},
//       events: []
//     };
//     this.loadItems = this.loadItems.bind(this)
//   }

//   static navigationOptions = {
//     title: 'Calendar'
//   }

//   componentDidMount() {
//     itemsRef.on('value', snapshot => {
//       let data = snapshot.val()
//       let items = Object.values(data)
//       let updatedEvents = this.state.events
//       updatedEvents.push(items)
//       this.setState({ events: updatedEvents })
//     })
//   }

//   render() {
//     return (
//       <Agenda 
//         items={this.state.items}
//         loadItemsForMonth={this.loadItems.bind(this)}
//         renderItem={this.renderItem.bind(this)}
//         renderEmptyDate={this.renderEmptyDate.bind(this)}
//         rowHasChanged={this.rowHasChanged.bind(this)}
//         addEvent={this.addEvent.bind(this)}
//         pastScrollRange={12}
//         futureScrollRange={12}
//       />
//     );
//   }

//   loadItems(day) {
//     setTimeout(() => {
//       for (let i = -15; i < 850; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);
//         if (!this.state.items[strTime]) {
//           this.state.items[strTime] = [];
//         }
//         for (let i = 0; i < this.state.events.length ; i++) {
//           this.state.items[this.state.events.date] = []
//           this.state.items[this.state.events.date].push({
//             name: this.state.events.name,
//             height: 50
//           })
//         }
//       }
//       const newItems = {};
//       Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
//       this.setState({
//         items: newItems
//       });
//     }, 1000);
//     console.log(`Load Items for ${day.year}-${day.month}-${day.day}`);
//   }

//   renderItem(item) {
//     return (
//       <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
//     );
    
//   }

//   renderEmptyDate() {
//     return (
//       <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
//     );
//   }

//   rowHasChanged(r1, r2) {
//     console.log(`row Changed`);
//     return r1.name !== r2.name;
//   }

//   timeToString(time) {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   }

//   addEvent(day) {
//     console.log('hellooo')
//     this.state.items[`${day.year}-${day.month}-${day.day}`].push({
//       name: 'Added',
//       height: 50
//     })
//   }

//   static navigationOptions = {
//     drawerLabel: 'Calendar',
//   }
// }

// // export function addEvent(day) {
// //   this.state.items[day].push({
// //     name: 'Added',
// //     height: 50
// //   })
// // }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17,
//   },
//   emptyDate: {
//     height: 15,
//     flex:1,
//     paddingTop: 30
//   }
// });

// module.export = Calendar; //module export statement


import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {Agenda} from 'react-native-calendars';
import NavigationManager from "../managers/navigationManager";
import {db} from "../config";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from 'firebase';

let itemsRef = db.ref('/event')
let reminderRef = db.ref('/user')

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
      this.setState({ events: items })
    })
    reminderRef.child(firebase.auth().currentUser.uid).child('reminders').on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data)
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
        for (let j = 0; j < this.state.events.length ; j++) {
          this.state.items[this.state.events[j].date] = []
          this.state.items[this.state.events[j].date].push({
            name: this.state.events[j].name,
            height: 50
          })
        }
        for (let k = 0; k < this.state.reminder.length ; k++) {
            this.state.items[this.state.reminder[k].date] = []
        }

        for (let k = 0; k < this.state.reminder.length ; k++) {
          this.state.items[this.state.reminder[k].date].push({
            name: this.state.reminder[k].title,
            date: this.state.reminder[k].date,
            time: this.state.reminder[k].time,
            serialNumber: this.state.reminder[k].serial,
            height: 50
          })
          // console.log(this.state.items[this.state.reminder[k].date])
        }
        
        // for (let i = 0; i < this.state.reminder.length ; i++) {
        //   this.state.items[this.state.reminder[i].date[0]] = []
        //   for ( let j = 0; j < this.state.reminder[i].date[j]; j++ ) {
        //     this.state.items[this.state.reminder[i].date[0]].push({
        //       name: this.state.reminder[i].title,
        //       date: this.state.reminder[i].date,
        //       time: this.state.reminder[i].time,
        //       serialNumber: this.state.reminder[i].serial,
        //       height: 50
        //     })
        //   }
        //   this.state.items[this.state.reminder[i].date].push({
        //     name: this.state.reminder[i].title,
        //     date: this.state.reminder[i].date,
        //     time: this.state.reminder[i].time,
        //     serialNumber: this.state.reminder[i].serial,
        //     height: 50
        //   })
        // }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    if (item.serialNumber === undefined) {
      return (
        console.log(item.name),
        <View style={[styles.item]}>
          <Text>
            { item.name }
          </Text>
        </View>
        );
    } else {
      if (item.length > 1) {
        for (let i = 0; i < item.length; i++) {
          return (
            console.log(item[i].serialNumber),
            <View style={[styles.item]}>
              <TouchableOpacity 
                style={{
                  flex: 1,
                }}
                onPress = {() => 
                  NavigationManager.navigate(
                    'Editing Event', 
                    {
                      serial: item[i].serialNumber, 
                      date: item[i].date,
                      title: item[i].name,
                      time: item[i].time
                    }
                  )
                }
                onLongPress = {() => {
                  Alert.alert(
                    'Delete Reminder',
                    'Do you sure you want to delete the reminder?',
                    [
                      {text: 'Yes, delete it.', onPress: () => {
                          db.ref('user/'+ firebase.auth().currentUser.uid + '/reminders/' + item[i].serialNumber).remove()
                          this.state.items[item[i].date] = []
                          // let arr = this.state.items
                          // arr[item[i].date].splice[arr[item[i].date].indexOf(item[i].serialNumber)]
                          
                        },
                      },
                      {text:'No, keep it.', onPress: () => console.log('Remains')}
                    ],
                    )
                }}
              >
    
              <Text style={{color: 'black'}}>
                { item[i].time }
              </Text>
              <Text>
                { item[i].name }
              </Text>
    
              </TouchableOpacity>
            </View>
            );
        }
      } else {
        return (
          console.log(item.serialNumber),
          <View style={styles.item}>
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
                        db.ref('user/'+ firebase.auth().currentUser.uid + '/reminders/' + item.serialNumber).remove()
                        // this.state.items[item.date] = []
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
      // for (let i = 0; i < item.length; i++) {
      //   return (
      //     console.log(item[i].serialNumber),
      //     <View style={[styles.item, {height: item[i].height}]}>
      //       <TouchableOpacity 
      //         style={{
      //           flex: 1,
      //         }}
      //         onPress = {() => 
      //           NavigationManager.navigate(
      //             'Editing Event', 
      //             {
      //               serial: item[i].serialNumber, 
      //               date: item[i].date,
      //               title: item[i].name,
      //               time: item[i].time
      //             }
      //           )
      //         }
      //         onLongPress = {() => {
      //           Alert.alert(
      //             'Delete Reminder',
      //             'Do you sure you want to delete the reminder?',
      //             [
      //               {text: 'Yes, delete it.', onPress: () => {
      //                   db.ref('user/'+ firebase.auth().currentUser.uid + '/reminders/' + item[i].serialNumber).remove()
      //                   // this.state.items[item.date] = []
      //                 },
      //               },
      //               {text:'No, keep it.', onPress: () => console.log('Remains')}
      //             ],
      //             )
      //         }}
      //       >
  
      //       <Text style={{color: 'black'}}>
      //         { item[i].time }
      //       </Text>
      //       <Text>
      //         { item[i].name }
      //       </Text>
  
      //       </TouchableOpacity>
      //     </View>
      //     );
      // }
      // return (

      //   console.log(item[0].serialNumber),
      //   <View style={[styles.item, {height: item[0].height}]}>
      //     <TouchableOpacity 
      //       style={{
      //         flex: 1,
      //       }}
      //       onPress = {() => 
      //         NavigationManager.navigate(
      //           'Editing Event', 
      //           {
      //             serial: item.serialNumber, 
      //             date: item.date,
      //             title: item.name,
      //             time: item.time
      //           }
      //         )
      //       }
      //       onLongPress = {() => {
      //         Alert.alert(
      //           'Delete Reminder',
      //           'Do you sure you want to delete the reminder?',
      //           [
      //             {text: 'Yes, delete it.', onPress: () => {
      //                 db.ref('user/'+ firebase.auth().currentUser.uid + '/reminders/' + item.serialNumber).remove()
      //                 this.state.items[item.date] = []
      //               },
      //             },
      //             {text:'No, keep it.', onPress: () => console.log('Remains')}
      //           ],
      //           )
      //       }}
      //     >

      //     <Text style={{color: 'black'}}>
      //       { item.time }
      //     </Text>
      //     <Text>
      //       { item.name }
      //     </Text>

      //     </TouchableOpacity>
      //   </View>
      //   );
    }
  }

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
    height: 50,
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});