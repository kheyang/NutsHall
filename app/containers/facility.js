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
// import {
//   StyleSheet,
//   View,
//   Alert,
// } from 'react-native';
// import WeekView, { addLocale } from './weekView';
import moment from 'moment';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Button, } from "native-base";
import Header from './header';
import NavigationManager from "../managers/navigationManager";
import GridView from 'react-native-super-grid';
import Swiper from 'react-native-swiper';

import { db } from '../config';


let itemsRef = db.ref();


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TIME_LABELS_COUNT = 16;
const ROW_HEIGHT = 40;


// const bookings = [
//         { facility: 'HardCourt', 
//            date: [
//              { 
//              startDate: moment(10-07-2019) ,  
//                data: [
//                  { 
//                   startTime: "09:00",
//                   details: [
//                      {
//                       name: 'Chong KY',
//                       endTime: "12:00",
//                       purpose: "for fun",
//                       // color: 'blue',
//                      },]
//                  },
//                  { startTime: "13:00",
//                    details: [
//                      {
//                       name: 'CHONGCHONG',
//                       endTime: "14:00",
//                       purpose: "LOL",
//                       // color: 'blue',
//                      },
//                     ]
//                   }]}]
//         },

//         { facility: 'Meeting Room', 
//            date: [
//              { 
//              startDate: moment(10-07-2019) ,  
//                data: [
//                  { 
//                   startTime: "09:00",
//                   details: [
//                      {
//                       name: 'Chong KY',
//                       endTime: "12:00",
//                       purpose: "for fun",
//                       // color: 'blue',
//                      },]
//                  },
//                  { startTime: "13:00",
//                    details: [
//                      {
//                       name: 'CHONGCHONG',
//                       endTime: "16:00",
//                       purpose: "hurhur",
//                       // color: 'blue',
//                      },
//                     ]
//                   }]}]
//           },

//       ];
    
  


export default class Facility extends Component {
  selectedDate = new Date()
  constructor(props) {
    super(props);
    this.state = {
     currentMoment: props.selectedDate,
     pages: ["2", "3", "4"],
     key: 1,
     facItems: []
    }
    this.times = this.generateTimes();
  }


  componentDidMount() {
    itemsRef.on('value', snapshot => {
      // let data = snapshot.child("HardCourt").child("10-07-2019").child("startTime").child("09:00").child("name").val();
      // let items = Object.values(data)
      // let data = snapshot.child("event").child("e0").child("date").val();
      let name = snapshot.child("facilities").child("HardCourt").child("10-07-2019").child("startTime").child("09:00").child("name").val();


      console.log("FIREBASEDATA" + name);

      // this.setState({ items })
    })
  }

  generateDates = (hours, minutes) => {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    if (minutes != null) {
      date.setMinutes(0);
    }
    console.log(date);
    return date;
  };

  static navigationOptions = {
    title: 'Facility'
   }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    image: navigation.state.params.image, 
    detail: navigation.state.params.detail,

  })

   


//   render() {
//     const events = [
//       {
//         id: 1,
//         description: 'Chong KY',
//         // startDate: new Date('28-06-2019').setHours('12', '00'),
//         startDate: this.generateDates(0),
//         endDate: this.generateDates(2),
//         color: 'blue',
//       },
//       {
//         id: 2,
//         description: 'Event 2',
//         startDate: this.generateDates(2),
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
//           selectedDate={this.state.selectedDate}
//           numberOfDays={7}
//           onEventPress={(event) => Alert.alert(event.id + '\n' + event.description + '\n' + event.startDate)}
//           headerStyle={styles.headerStyle}
//           formatDateHeader={"ddd[\n]" +"D"}
//           locale="en"
//         />
//       </View>
//     );
//   }
// }





// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     paddingTop: 0,
//   },
//   headerStyle: {
//     backgroundColor: '#000000',
//   },
// });






renderItem(item, idx) {
  const { params } = this.props.navigation.state;
  const itemInt = parseInt(item)
  const style = itemInt % 2 == 0 ? styles.slide1 : styles.slide2
  const  currentMoment = moment(this.state.currentMoment).add(1,'w');
  const dates = this.prepareDates(currentMoment, numberOfDays);
  const dateTimes = this.generateDateTimes(dates, this.times);
  const {
      numberOfDays,
      headerStyle,
      formatDateHeader,
    } = this.props;
  
  return (
    <View style={style} key={idx}>

      <View style={styles.header}>
        <Header
          style={headerStyle}
          formatDate={formatDateHeader}
          selectedDate={currentMoment}
          numberOfDays={numberOfDays}
        />
      </View>

   <ScrollView>
        <View style={styles.scrollViewContent}>
          <View style={styles.timeColumn}>
            {this.times.map((time) => (
              <View key={time} style={styles.timeLabel}>
                <Text style={styles.timeText}>{time}</Text>
              </View>
            ))}
          </View>


      <GridView
              spacing={0.5}
              itemDimension={((SCREEN_WIDTH - 60)/7)-1}
              items={dateTimes}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                  <TouchableHighlight onPress={() => NavigationManager.navigate('FacilityBooking', {date: item.date, time: item.time, title: params.title, image: params.image, detail: params.detail})}>

              <View style={[styles.itemContainer, { backgroundColor: "#000000"}]}>
                  <Text style={styles.itemName}>{item.date}</Text>
                  <Text style={styles.itemCode}>{item.time}</Text>
              </View>
              </TouchableHighlight>

              
              )}
          />
      {/* <Text style={styles.text}>{cache[item]}</Text> */}
    </View>

    </ScrollView>
    </View>

  )
}



onPageChanged(idx) {
    console.log("CHANGING PAGE" +idx);
  const { currentMoment } = this.state;
  if (idx == 2) {
    const newPages = this.state.pages.map(i => (parseInt(i)+1).toString())
    const newWeek = moment(currentMoment).add(1, 'w');
    this.setState({pages: newPages, key: ((this.state.key+1)%2), currentMoment: newWeek })
  } else if (idx == 0) {
      
    const newPages = this.state.pages.map(i => (parseInt(i)-1).toString())
    const newWeek = moment(currentMoment).subtract(1, 'w');
    this.setState({pages: newPages, key: ((this.state.key+1)%2), currentMoment: newWeek  })
  }
}

generateTimes = () => {
  const times = [];
  for (let i = 0; i < TIME_LABELS_COUNT; i++) {
    const minutes = '00';
    const hour = i+8;
    const time = `${hour}:${minutes}`;
    times.push(time);
  }
  return times;
};

prepareDates = (currentMoment, numberOfDays) => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
      const date = moment(currentMoment).startOf('week').isoWeekday(1).add(i, 'd');
  dates.push(date);
  }
  return dates;
};


generateDateTimes = (dates, times) => {
  const dateTimes =[];
  for(let i = 0; i < times.length; i++) {
      for(let j = 0; j < dates.length; j++) {
          dateTimes.push({time: times[i], date: dates[j].format("MMM D").toString()});
     }
  }
  console.log(dateTimes);
  return dateTimes;
}


bookedSlot(facility, startTime, bookings) {
  for(let i =0; i < bookings.facility.startTime.length ; i++) {

    
  }
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
      {this.state.pages.map((item, idx) => this.renderItem(item, idx))}
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
  //   position:'absolute',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    
  //   position:'absolute',
  //   top:0,
  //   left:0,
  //   bottom:0,
  //   right:0
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
      width: ((SCREEN_WIDTH - 60)/7)-1,
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

