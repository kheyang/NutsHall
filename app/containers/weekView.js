import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import { Button } from "native-base";
import moment from 'moment';
import Events from './events';
import Header from './header';
import NavigationManager from "../managers/navigationManager";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TIME_LABELS_COUNT = 16;
const ROW_HEIGHT = 40;


export default class WeekView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMoment: props.selectedDate,
    };
    this.calendar = null;
    // setLocale(props.locale);
    this.times = this.generateTimes();
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.calendar.scrollTo({ y: 0, x: 2 * (SCREEN_WIDTH - 60), animated: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate) {
      this.setState({ currentMoment: nextProps.selectedDate });
    }
    // if (nextProps.locale !== this.props.locale) {
    //   setLocale(nextProps.locale);
    // }
  }

  componentDidUpdate() {
    this.calendar.scrollTo({ y: 0, x: 2 * (SCREEN_WIDTH - 60), animated: false });
  }

  generateTimes = () => {
    const times = [];
    for (let i = 0; i < TIME_LABELS_COUNT; i++) {
    //   const minutes = i % 2 === 0 ? '00' : '30';
    //   const hour = Math.floor(i / 2);
      const minutes = '00';
      const hour = i+8;
      const time = `${hour}:${minutes}`;
      times.push(time);
    }
    return times;
  };

  scrollEnded = (event) => {
    const { nativeEvent: { contentOffset, contentSize } } = event;
    const { x: position } = contentOffset;
    const { width: innerWidth } = contentSize;
    const newPage = (position / innerWidth) * 5;
    const { onSwipePrev, onSwipeNext, numberOfDays } = this.props;
    const { currentMoment } = this.state;
    requestAnimationFrame(() => {
      const newMoment = moment(currentMoment)
        .add((newPage - 2) * numberOfDays, 'd')
        // .add((newPage) * numberOfDays, 'd')
        .toDate();

      this.setState({ currentMoment: newMoment });

      if (newPage < 2) {
        onSwipePrev && onSwipePrev(newMoment);
        console.log(onSwipePrev);
      } else if (newPage > 2) {
        onSwipeNext && onSwipeNext(newMoment);
      }
    });
  };

  scrollViewRef = (ref) => {
    this.calendar = ref;
  }

  prepareDates = (currentMoment, numberOfDays) => {
    const dates = [];
    for (let i = -2; i < 5; i++) {
      const date = moment(currentMoment).add(numberOfDays * i, 'd');
      dates.push(date);
    }
    return dates;
  };

  


//   prepareDates = (currentMoment, numberOfDays) => {
//     const dates = [];
//     const thisMoment = moment(currentMoment);
//     const startWeek = thisMoment.startOf('week');
//     console.log(currentMoment);
//     // const startWeek = getMonday(currentMoment);
//     for (let i = 0; i < numberOfDays; i++) {
//       const date = startWeek.add(i, 'd');
//       dates.push(date);
//     }
//     return dates;
//   };


  generateDateTimes = (dates, times) => {
    const dateTimes =[];
    for(let i = 0; i < dates.length; i++) {
        for(let j = 0; j < times.length; j++) {
            dateTimes.push(Array(dates[i], times[j]));
       }
    }
    console.log(dateTimes);
    return dateTimes;
  }


//   convertDateThenNavigate = () => {
//     const converted = moment(date).format("L");
//     console.log(converted);
//     return NavigationManager.navigate('FacilityBooking', { time: time, date: converted} );
//   }

  render() {
    const {
      numberOfDays,
      headerStyle,
      formatDateHeader,
      onEventPress,
      events,
    } = this.props;
    const { currentMoment } = this.state;
    const dates = this.prepareDates(currentMoment, numberOfDays);
    const dateTimes = this.generateDateTimes(dates, this.times);
    return (
      <View style={styles.container}>
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


            <ScrollView
              horizontal
              pagingEnabled
              automaticallyAdjustContentInsets={false}
              onMomentumScrollEnd={this.scrollEnded}
              ref={this.scrollViewRef}
            >
              {dates.map(date => (
                <View
                  key={date}
                  style={{ flex: 1, height: ROW_HEIGHT * TIME_LABELS_COUNT, width: SCREEN_WIDTH - 60, flexDirection:"column", flexWrap:"wrap" }}
                >
            
              {dateTimes.map((date, time) => (
                <View key={time}>
                    <Button bordered dark
                        key = {time}
                        value = {date}
                        onPress={() => NavigationManager.navigate('FacilityBooking', { time: time, date: date})}
                        style={styles.timeRow}
                        >
                        <Text></Text>
                    </Button>
                    {/* <View style={styles.timeLabelLine} /> */}
                </View>
              ))}


        


                  {/* <Events
                    key={dates}
                    times={this.times}
                    selectedDate={date.toDate()}
                    numberOfDays={numberOfDays}
                    onEventPress={onEventPress}
                    events={events}
                  /> */}
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

WeekView.propTypes = {
  events: Events.propTypes.events,
  numberOfDays: PropTypes.oneOf([1, 3, 7]).isRequired,
  onSwipeNext: PropTypes.func,
  onSwipePrev: PropTypes.func,
  formatDateHeader: PropTypes.string,
  onEventPress: PropTypes.func,
  headerStyle: PropTypes.object,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
};

WeekView.defaultProps = {
  events: [],
  locale: 'en',
};

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
        // flexDirection: 'column',
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
  });

  module.export = WeekView; //module export statement
