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
import firebase from 'firebase';
import { db } from '../config';
import {YellowBox} from 'react-native';

console.disableYellowBox = true;
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
    console.disableYellowBox = true;

  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    image: navigation.state.params.image,
    detail: navigation.state.params.detail,
  })

  renderItem(item, idx) {
    const { params } = this.props.navigation.state;
    const currentMoment = idx == 0 ? moment(this.state.currentMoment).startOf('week').subtract(1,'w') 
                        : idx == 1 ? moment(this.state.currentMoment).startOf('week') 
                        : moment(this.state.currentMoment).startOf('week').add(1,'w'); 
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
            <View style={{backgroundColor: '#000000'}}>
            <GridView
              spacing={0.5}
              itemDimension={((SCREEN_WIDTH - 60) / 7) - 1}
              items={dateTimes}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                <TouchableHighlight 
                onPress={() =>
                  (item.date).isBefore(moment(new Date()), 'day') ||
                    ((item.date).isSame(moment(new Date()), 'day') && parseInt(((item.time).split(":"))[0]) <= moment(new Date()).format('H')) ?
                    Alert.alert("Date has already passed/time has passed! Move on~") :
                    (item.endTime != undefined && item.uid == firebase.auth().currentUser.uid) ? 
                    Alert.alert(
                      'Delete Booking',
                      'Do you sure you want to delete this booking?',
                      [
                        {text: 'Yes, delete it.', onPress: () => {
                            db.ref('facilities/' + params.title + "/"+ ((item.date).format("MMM D").toString()) + "/" + item.time).remove()
                            setTimeout(()=> {
                              this.props.navigation.popToTop();
                              NavigationManager.navigate("Announcements")}, 1000);
                          },
                        },
                        {text:'No, keep it.', onPress: () => console.log('Remains')}
                      ],
                      )
                      : (item.endTime != undefined) ?
                    Alert.alert("Booked by " + item.name) :
                      NavigationManager.navigate('FacilityBooking', { date: (item.date).format("MMM D").toString(), time: item.time, title: params.title, image: params.image, detail: params.detail })}>

                  

                  <View style={[styles.itemContainer, (item.date).isBefore(moment(new Date()), 'day') ||
                    ((item.date).isSame(moment(new Date()), 'day') && parseInt(((item.time).split(":"))[0]) <= moment(new Date()).format('H')) ||
                    (item.endTime != undefined && item.uid != firebase.auth().currentUser.uid) ? { backgroundColor: "#888888" } 
                    :(item.endTime != undefined) ? { backgroundColor: "#006400" } :
                     { backgroundColor: "#FFF" }]}>
                    <Text style={styles.itemName}>{(item.date).format("MMM D").toString()}</Text>
                    <Text style={styles.itemCode}>{item.time}</Text>
                  </View>

                  
                </TouchableHighlight>
              )}
            // }
            // }
            />
            </View>
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
            let userUid = snapshot.child(currDate).child(currTime).child("uid").val();
            dateTimes[count] = { time: currTime, date: curr, endTime: endTime, purpose: purpose, name: name, uid: userUid };
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
            dateTimes[nextCount]["uid"] = dateTimes[k]["uid"];

            
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
        loop={false}
        showsPagination={false}
        onIndexChanged={(index) => this.onPageChanged(index)}>
        {/* {this.state.pages.map((item, idx) => this.renderItem(item, idx))} */}
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
    color: '#000000',
  },
  itemCode: {
    fontSize: 8,
    color: '#000000',
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
  text: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

module.export = Facility; //module export statement