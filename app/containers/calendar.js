// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet
// } from 'react-native';
// import {Agenda} from 'react-native-calendars';
// import NavigationManager from "../managers/navigationManager";
// import { eventAnnouncement } from "./announcementPage";

// export default class Calendar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: {}
//     };
//   }
//   static navigationOptions = {
//     title: 'Calendar'
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
//         for (let i = 0; i < eventAnnouncement.length ; i++) {
//           this.state.items[eventAnnouncement[i].date] = []
//           this.state.items[eventAnnouncement[i].date].push({
//             name: eventAnnouncement[i].name,
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
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import NavigationManager from "../managers/navigationManager";
import { eventAnnouncement } from "./announcementPage";
import {db} from "../config"

let itemsRef = db.ref('/event')

export default class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      events: []
    };
    this.loadItems = this.loadItems.bind(this)
  }

  static navigationOptions = {
    title: 'Calendar'
  }

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data) // []
      // let updatedEvents = this.state.events
      // updatedEvents.push(items)
      this.setState({ events: items })
      // console.log(data)
      // console.log(items)
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
        addEvent={this.addEvent.bind(this)}
        pastScrollRange={12}
        futureScrollRange={12}
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
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 10);
    // console.log(`Load Items for ${day.year}-${day.month}-${day.day}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
    
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

  addEvent(day) {
    console.log('hellooo')
    this.state.items[`${day.year}-${day.month}-${day.day}`].push({
      name: 'Added',
      height: 50
    })
  }

  static navigationOptions = {
    drawerLabel: 'Calendar',
  }
}

// export function addEvent(day) {
//   this.state.items[day].push({
//     name: 'Added',
//     height: 50
//   })
// }

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

module.export = Calendar; //module export statement