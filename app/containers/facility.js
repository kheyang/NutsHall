// import React, { Component } from 'react';
// import { Alert, View, Button, StyleSheet, TouchableOpacity, PanResponder, AsyncStorage, Image, Dimensions, TextInput, ScrollView,Platform } from 'react-native';
// import moment from 'moment';
// import DatePicker from 'react-native-datepicker';
// import Picker from 'react-native-picker-select';
// import NavigationManager from "../managers/navigationManager";

// import WeekView, { addLocale } from 'react-native-week-view';


// export default class Facility extends Component {
//   constructor(props) {
//     super(props);
//     selectedDate = new Date();



//     this.state = {


//     };
//   }

//   generateDates = (hours, minutes) => {
//     const date = new Date();
//     date.setHours(date.getHours() + hours);
//     if (minutes != null) {
//       date.setMinutes(0);
//     }
//     return date;
//   };

//   render() {
//     const events = [
//       {
//         id: 1,
//         description: 'Event 1',
//         startDate: this.generateDates(0),
//         endDate: this.generateDates(2),
//         color: 'blue',
//       },
//       {
//         id: 2,
//         description: 'Event 2',
//         startDate: this.generateDates(1),
//         endDate: this.generateDates(4),
//         color: 'red',
//       },
//       {
//         id: 3,
//         description: 'Event 3',
//         startDate: this.generateDates(-5),
//         endDate: this.generateDates(-3),
//         color: 'green',
//       },
//     ];

//     return (
//       <View style={styles.container}>
//         <WeekView
//           events={events}
//           selectedDate={this.selectedDate}
//           numberOfDays={5}
//           onEventPress={(event) => Alert.alert('eventId:' + event.id)}
//           headerStyle={styles.headerStyle}
//           formatDateHeader="MMM D"
//           locale="fr"
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     paddingTop: 22,
//   },
//   headerStyle: {
//     backgroundColor: '#000000',
//   },
// });

// //     const { params } = this.props.navigation.state;
// //     const today = this.state.currentDate;

// //     return (
// //       <View style={styles.container}>


// //         <Button
// //           title="TO BOOKING PAGE"
// //           color='#000000'
// //           onPress={() => NavigationManager.navigate('FacilityBooking', { title: params.title, image: params.image, detail: params.detail} )}

// //           // onPress={() => {
// //             // const { numbers } = this.state;
// //             // const value = numbers.length + 1;
// //             // numbers.push({
// //             //   label: `${value}`,
// //             //   value,
// //             //   color: 'dodgerblue',
// //             // });
// //             // this.setState({
// //             //   numbers,
// //             // });
// //           // }}
// //         />
// //         </View>
// //     );
// //   }
// // }



// module.export = Facility; //module export statement



//New

import React, { Component } from 'react';
import moment from 'moment';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  RefreshControl,
} from 'react-native';
import { Button, Toast, } from "native-base";
import Header from './header';
import NavigationManager from "../managers/navigationManager";
import GridView from 'react-native-super-grid';
import Swiper from 'react-native-swiper';
import { db } from '../config';

let itemsRef = db.ref();
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TIME_LABELS_COUNT = 16;
const ROW_HEIGHT = 40;

export default class Facility extends Component {
  selectedDate = new Date();
  constructor(props) {
    super(props);
    this.state = {
      currentMoment: moment(new Date()),
      pages: ["2",'3','4'],
      key: 1,
      facItems: [],
    }
    this.times = this.generateTimes();
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    image: navigation.state.params.image,
    detail: navigation.state.params.detail,
  })

  // renderItem(item, idx) {
  renderItem(idx) {
    const { params } = this.props.navigation.state;
    // const itemInt = parseInt(item)
    // const style = itemInt % 2 == 0 ? styles.slide1 : styles.slide2
    const currentMoment = idx == 0 ? moment(this.state.currentMoment).startOf('week').subtract(1,'w') 
                        : idx == 1 ? moment(this.state.currentMoment).startOf('week') 
                        : moment(this.state.currentMoment).startOf('week').add(1,'w'); 
    // const currentMoment = moment(this.state.currentMoment).startOf('week')
    const dates = this.prepareDates(currentMoment);
    const dateTimes = this.generateDateTimes(dates, this.times, params);
    const {
      headerStyle,
      formatDateHeader,
    } = this.props;

    return (
      <View key={idx}>
        <View style={styles.header}>
          <Header
            style={headerStyle}
            formatDate={formatDateHeader}
            selectedDate={currentMoment}
          />
        </View>
        <ScrollView>
          <View style={styles.scrollViewContent}>
            <View style={styles.timeColumn}>
              {this.times.map((time, idx) => (
                <View key={time} style={styles.timeLabel}>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
              ))}
            </View>
            <GridView
              spacing={0.5}
              itemDimension={((SCREEN_WIDTH - 60) / 7) - 1}
              items={dateTimes}
              style={styles.gridView}
              renderItem={({ item, index }) => (
<<<<<<< HEAD
                <TouchableHighlight onPress={() =>
                  (item.date).isBefore(moment(new Date()), 'day') ||
                    ((item.date).isSame(moment(new Date()), 'day') && parseInt(((item.time).split(":"))[0]) <= moment(new Date()).format('H')) ?
=======
               
                  <TouchableHighlight onPress={() => 
                    (item.date).isBefore(moment(new Date()),'day') || 
                    ((item.date).isSame(moment(new Date()),'day') && parseInt(((item.time).split(":"))[0]) <= moment(new Date()).format('H')) ?
>>>>>>> 30a960b2d20c70fc285eb347bd0f88c518630e6b
                    Alert.alert("Date has already passed/time has passed! Move on~") :
                    (item.endTime != undefined) ? Alert.alert("Booked by " + item.name) :
                      NavigationManager.navigate('FacilityBooking', { date: (item.date).format("MMM D").toString(), time: item.time, title: params.title, image: params.image, detail: params.detail })}>

<<<<<<< HEAD
                  {/* NavigationManager.navigate('FacilityBooking', {date: (item.date).format("MMM D").toString(), time: item.time, title: params.title, image: params.image, detail: params.detail, onNavigateBack: this.handleOnNavigateBack})}> */}

                  <View style={[styles.itemContainer, (item.date).isBefore(moment(new Date()), 'day') ||
                    ((item.date).isSame(moment(new Date()), 'day') && parseInt(((item.time).split(":"))[0]) <= moment(new Date()).format('H')) ||
                    (item.endTime != undefined) ? { backgroundColor: "#888888" } : { backgroundColor: "#000000" }]}>
                    <Text style={styles.itemName}>{(item.date).format("MMM D").toString()}</Text>
                    <Text style={styles.itemCode}>{item.time}</Text>
                  </View>
=======
              <View style={[styles.itemContainer, (item.date).isBefore(moment(new Date()),'day') || 
                                                  ((item.date).isSame(moment(new Date()),'day') && parseInt(((item.time).split(":"))[0]) <= moment(new Date()).format('H')) ||
                                                  (item.endTime != undefined) ?  {backgroundColor: "#888888"} :  {backgroundColor:  "#000000"}]}>
>>>>>>> 30a960b2d20c70fc285eb347bd0f88c518630e6b

                  
                </TouchableHighlight>
              )}
            // }
            // }
            />
            {/* <Text style={styles.text}>{cache[item]}</Text> */}
          </View>
        </ScrollView>
      </View>
    )
  }

  onPageChanged(idx) {
    console.log("CHANGING PAGE" + idx);
    const { currentMoment } = this.state;
    if (idx == 2) {
      const newPages = this.state.pages.map(i => (parseInt(i) + 1).toString())
      const newWeek = moment(currentMoment).add(1, 'w');
      this.setState({ pages: newPages, key: ((this.state.key + 1) % 2), currentMoment: newWeek })
    } else if (idx == 0) {
      const newPages = this.state.pages.map(i => (parseInt(i) - 1).toString())
      const newWeek = moment(currentMoment).subtract(1, 'w');
      this.setState({ pages: newPages, key: ((this.state.key + 1) % 2), currentMoment: newWeek })
    }
  }

  generateTimes = () => {
    const times = [];
    for (let i = 0; i < TIME_LABELS_COUNT; i++) {
      const minutes = '00';
      const hour = i + 8;
      const time = `${hour}:${minutes}`;
      times.push(time);
    }
    return times;
  };

  prepareDates = (currentMoment) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = moment(currentMoment).add(i, 'd');
      dates.push(date);
    }
    return dates;
  };

  // formatDate = (date) => {
  //   day = moment(date).date();
  //   month = moment(date).month();
  //   year = moment(date).year()
  //   return day + "-" + month + "-" + year;
  // }

  generateDateTimes = (dates, times, params) => {
    const dateTimes = [];
    itemsRef.child("facilities").child(params.title).once("value").then(snapshot => {
      let count = -1;
      for (let i = 0; i < times.length; i++) {
        let currTime = times[i];
        for (let j = 0; j < dates.length; j++) {
          count += 1;
          let curr = dates[j];
          let currDate = dates[j].format("MMM D").toString();
          console.log(snapshot.child(currDate).child(currTime).exists());
          console.log(currTime + " " + currDate);
          if (snapshot.child(currDate).child(currTime).exists()) {
            let name = snapshot.child(currDate).child(currTime).child("name").val();
            let endTime = snapshot.child(currDate).child(currTime).child("endTime").val();
            let purpose = snapshot.child(currDate).child(currTime).child("purpose").val();
            dateTimes[count] = { time: currTime, date: curr, endTime: endTime, purpose: purpose, name: name };
            console.log(count);
          } else {
            dateTimes[count] = { time: currTime, date: curr };
            console.log(count);
          }
        }
      }
      for (let k = 0; k < 112; k++) {
        if (dateTimes[k].endTime != undefined) {
          // console.log(dateTimes[k].endTime);
          let nextCount = k + 7;
          let endingTime = parseInt(((dateTimes[k].endTime).split(":")[0]));
          let startOfNextHour = parseInt(((dateTimes[nextCount].time.split(":"))[0]));
          if (endingTime > startOfNextHour) {
            dateTimes[nextCount]["endTime"] = dateTimes[k].endTime;
            dateTimes[nextCount]["purpose"] = dateTimes[k]["purpose"];
            dateTimes[nextCount]["name"] = dateTimes[k]["name"];
          }
        }
      }
    })
    console.log(dateTimes);
    return dateTimes;
  }

  render() {
    return (
      <Swiper
        index={1}
        key={this.state.key}
        style={styles.wrapper}
        loop={false}
        showsPagination={false}
        onIndexChanged={(index) => this.onPageChanged(index)}>
        {/* {this.state.pages.map((item, idx) => this.renderItem(item, idx))} */}
        {this.state.pages.map((idx) => this.renderItem(idx))}
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  timeLabel: {
    flex: -1,
    height: 40,
  },
  timeText: {
    fontSize: 12,
    textAlign: 'center',
  },
  timeColumn: {
    paddingTop: 10,
    width: 60,
  },
  rowContainer: {
<<<<<<< HEAD
    paddingTop: 16,
  },
  timeRow: {
    height: 40,
    width: (SCREEN_WIDTH - 60) / 7,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  timeLabelLine: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
  gridView: {
    paddingTop: 0,
    flex: 0,
    height: ROW_HEIGHT * TIME_LABELS_COUNT,
    width: SCREEN_WIDTH - 60,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 2,
    padding: 0,
    height: 40,
    width: ((SCREEN_WIDTH - 60) / 7) - 1,
  },
  itemName: {
    fontSize: 8,
    color: '#fff',
  },
  itemCode: {
    fontSize: 8,
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  nextButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 0,
  },

  wrapper: {
=======
      paddingTop: 16,
    },
    timeRow: {
      // flex: 1,
      height: 40,
      width: (SCREEN_WIDTH - 60)/7,
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    timeLabelLine: {
      // height: 1,
      // backgroundColor: GREY_COLOR,
      position: 'absolute',
      right: 0,
      left: 0,
    },


    gridView: {
      paddingTop: 0,
      flex: 0,
      height: ROW_HEIGHT * TIME_LABELS_COUNT, 
      width: SCREEN_WIDTH - 60, 
      // flexDirection:"column", 
      // flexWrap:"wrap" 

    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 2,
      padding: 0,
      height: 40,
      width: ((SCREEN_WIDTH - 60)/7),
    },
    itemName: {
      fontSize: 8,
      color: '#fff',
      // fontWeight: '600',
    },
    itemCode: {
      // fontWeight: '600',
      fontSize: 8,
      color: '#fff',
    },
    backButton: {
      position: 'absolute',
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
    },
    nextButton: {
      position:'absolute',
      alignSelf: 'flex-end',
      top: 0, 
      // left: 0, 
      // right: 0, 
      // bottom: 0, 
      // margin: 40,

    },

    wrapper: {
>>>>>>> 30a960b2d20c70fc285eb347bd0f88c518630e6b
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

module.export = Facility; //module export statement