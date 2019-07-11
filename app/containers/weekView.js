import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Button, } from "native-base";
import moment from 'moment';
// import Events from './events';
import Header from './header';
import NavigationManager from "../managers/navigationManager";
import GridView from 'react-native-super-grid';
import Swiper from 'react-native-swiper';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TIME_LABELS_COUNT = 16;
const ROW_HEIGHT = 40;

const cache = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "10": "ten"
  }




export default class WeekView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMoment: props.selectedDate,
      pages: ["2", "3", "4"],
      key: 1,
    };
    this.calendar = null;
    // setLocale(props.locale);
    this.times = this.generateTimes();
  }

//   componentDidMount() {
//     requestAnimationFrame(() => {
//       this.calendar.scrollTo({ y: 0, x: 2 * (SCREEN_WIDTH - 60), animated: false });
//     });
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.selectedDate) {
//       this.setState({ currentMoment: nextProps.selectedDate });
//     }
//     // if (nextProps.locale !== this.props.locale) {
//     //   setLocale(nextProps.locale);
//     // }
//   }

//   componentDidUpdate() {
//     this.calendar.scrollTo({ y: 0, x: 2 * (SCREEN_WIDTH - 60), animated: false });
//   }


////////
// state = {
//     pages: ["2", "3", "4"],
//     key: 1,
//     currentMoment: this.state

//   }




  renderItem(item, idx) {

    const itemInt = parseInt(item)
    const style = itemInt % 2 == 0 ? styles.slide1 : styles.slide2
    


    const  currentMoment = moment(this.state.currentMoment).add(1,'w');
    
    const dates = this.prepareDates(currentMoment, numberOfDays);
    const dateTimes = this.generateDateTimes(dates, this.times);
    const {
        numberOfDays,
        headerStyle,
        formatDateHeader,
        onEventPress,
        events,
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

{/* 
        <GridView
                spacing={0.5}
                itemDimension={((SCREEN_WIDTH - 60)/7)-1}
                items={dateTimes}
                style={styles.gridView}
                renderItem={({ item, index }) => (
                    <TouchableHighlight onPress={() => NavigationManager.navigate('FacilityBooking', {date: item.code, time: item.time})}>

                <View style={[styles.itemContainer, { backgroundColor: "#000000"}]}>
                    <Text style={styles.itemName}>{item.date}</Text>
                    <Text style={styles.itemCode}>{item.time}</Text>
                </View>
                </TouchableHighlight>

                
                )}
            /> */}
        {/* <Text style={styles.text}>{cache[item]}</Text> */}
      </View>

      </ScrollView>
      </View>

    )
  }


  
//   prevWeek =() => {
//     const { currentMoment } = this.state;
//         requestAnimationFrame(() => {
//         const newMoment = moment(currentMoment).startOf('week').isoWeekday(1);
//         console.log("PREV " + newMoment.toString());
//         })
//     }

//     nextWeek =() => {
//         const { currentMoment } = this.state;
//             requestAnimationFrame(() => {
//                 const newMoment = moment(currentMoment).add(1, 'w').startOf('week').isoWeekday(1);
//                 console.log("NEXT " + newMoment.toString());
        
//             })
//     }


 
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
    //   const minutes = i % 2 === 0 ? '00' : '30';
    //   const hour = Math.floor(i / 2);
      const minutes = '00';
      const hour = i+8;
      const time = `${hour}:${minutes}`;
      times.push(time);
    }
    return times;
  };

//   scrollEnded = (event) => {
//     const { nativeEvent: { contentOffset, contentSize } } = event;
//     const { x: position } = contentOffset;
//     console.log(contentOffset);
//     const { width: innerWidth } = contentSize;
//     const newPage = (position / innerWidth) * 5;
//     // const newPage = (position/Math.abs(position));
//     const { onSwipePrev, onSwipeNext, numberOfDays } = this.props;
//     const { currentMoment } = this.state;
//     requestAnimationFrame(() => {
//       const newMoment = moment(currentMoment).startOf('week').isoWeekday(1);
//       console.log(newMoment);
//         // .add((newPage - 2) * numberOfDays, 'd')
//         // // .add((newPage) * numberOfDays, 'd')
//         // .toDate();

//       this.setState({ currentMoment: newMoment });

//       if (newPage < 1) {
//         onSwipePrev && onSwipePrev(newMoment);
//         console.log(onSwipePrev);
//       } else if (newPage > 1) {
//         onSwipeNext && onSwipeNext(newMoment);
//       }
//     });
//   };

//   scrollViewRef = (ref) => {
//     this.calendar = ref;
//   }





  prepareDates = (currentMoment, numberOfDays) => {
    const dates = [];
    // for (let i = -2; i < 5; i++) {
    //   const date = moment(currentMoment).add(numberOfDays * i, 'd');
    for (let i = 0; i < 7; i++) {
        const date = moment(currentMoment).startOf('week').isoWeekday(1).add(i, 'd');

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
    for(let i = 0; i < times.length; i++) {
        for(let j = 0; j < dates.length; j++) {
            dateTimes.push({time: times[i], date: dates[j].format("MMM D").toString()});
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
        



        /////////////////////////////////////
    //   <View>


  

    //     <View style={styles.header}>
    //       <Header
    //         style={headerStyle}
    //         formatDate={formatDateHeader}
    //         selectedDate={currentMoment}
    //         numberOfDays={numberOfDays}
    //       />
    //     </View>

        

    //     <ScrollView>
    //       <View style={styles.scrollViewContent}>
    //         <View style={styles.timeColumn}>
    //           {this.times.map((time) => (
    //             <View key={time} style={styles.timeLabel}>
    //               <Text style={styles.timeText}>{time}</Text>
    //             </View>
    //           ))}
    //         </View>



    //         <ScrollView
    //           horizontal
    //         //   pagingEnabled={true}

    //         //   decelerationRate={0}
    //         //   snapToInterval={(SCREEN_WIDTH - 60)/7} //your element width
    //         //   snapToAlignment={"center"}
              
    //           automaticallyAdjustContentInsets={false}
    //           onMomentumScrollEnd={this.scrollEnded}
    //           ref={this.scrollViewRef}
              
    //         >

    //          {/*  {dates.map(date => (
    //             <View
    //               key={date}
    //               style={{ flex: 1, height: ROW_HEIGHT * TIME_LABELS_COUNT, width: SCREEN_WIDTH - 60, flexDirection:"column", flexWrap:"wrap" }}
    //             >
    //                 {dateTimes.map((date, time) => (
    //                     <View key={time}>
    //                         <Button bordered dark
    //                             key = {time}
    //                             value = {date}
    //                             onPress={() => NavigationManager.navigate('FacilityBooking', { time: time, date: date})}
    //                             style={styles.timeRow}
    //                             >
    //                             <Text></Text>
    //                         </>
    //                          <View style={styles.timeLabelLine} /> 
    //                     </View>
    //                     ))}

    //                 </View>
    //           ))} */}

    //           <GridView
    //             spacing={0.5}
    //             itemDimension={((SCREEN_WIDTH - 60)/7)-1}
    //             items={dateTimes}
    //             style={styles.gridView}
    //             renderItem={({ item, index }) => (
    //                 <TouchableHighlight onPress={() => NavigationManager.navigate('FacilityBooking', {date: item.code, time: item.time})}>

    //             <View style={[styles.itemContainer, { backgroundColor: "#000000"}]}>
    //                 <Text style={styles.itemName}>{item.date}</Text>
    //                 <Text style={styles.itemCode}>{item.time}</Text>
    //             </View>
    //             </TouchableHighlight>

                
    //             )}
    //         />

    //         </ScrollView>
    //       </View>
    //     </ScrollView>


    //     <View style={styles.nextButton}>
    //      <Button 
    //           color='#8888'
    //           onPress={() => NavigationManager.goBack()}
    //           title = 'Go back'
    //           /> 
            
    //     </View>
    //   </View>
    );
  }
}

WeekView.propTypes = {
//   events: Events.propTypes.events,
  numberOfDays: PropTypes.oneOf([1, 3, 7]).isRequired,
  onSwipeNext: PropTypes.func,
  onSwipePrev: PropTypes.func,
  formatDateHeader: PropTypes.string,
  onEventPress: PropTypes.func,
  headerStyle: PropTypes.object,
  selectedDate: PropTypes.instanceOf(moment).isRequired,
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
    //   position:'absolute',
    },
    header: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
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
      backgroundColor: '#97CAE5',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }, 

     
  });

  module.export = WeekView; //module export statement
