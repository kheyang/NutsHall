import React, { Component } from 'react';
import { Text, Alert, View, Button, StyleSheet, TouchableOpacity, PanResponder, AsyncStorage, Image, Dimensions, TextInput, ScrollView,Platform, Picker} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import RNPicker from 'react-native-picker-select';
import { Toast } from 'native-base';
import NavigationManager from "../managers/navigationManager";
import Facility from "./facility";
import firebase from 'firebase';

import { db } from '../config';

let itemsRef = db.ref("facilities");
let userRef = db.ref("user");
console.disableYellowBox = true;

export default class FacilityBooking extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = {
      textInput: null,
      startTime: null,
      endTime: null,
    };

    this.state = {
      date: '',
      startTime: '00:00',
      endTime: '00:00',
      currentDate: new Date(),
      markedDate: moment(new Date()).format("YYYY-MM-DD"),
      text: "",
      pet: [],
    };
  }

componentDidMount() {
  const { params } = this.props.navigation.state;
  const pet = this.possibleEndTimes(params.time, params);
  setTimeout(() =>  { 
    this.setState({
     pet: pet,
    }) 
   }, 1000)

}
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    image: navigation.state.params.image,
    detail: navigation.state.params.detail,
    time: navigation.state.params.time,
    date: navigation.state.params.date,
  })



  momentStartTime(startTime) {
    splitTime = startTime.split(":");
    hour = splitTime[0];
    minute = splitTime[1];
    return moment({ hours: hour, minutes: minute });
  }

  possibleEndTimes(startTime, params) {
      const endTimings = [];
      const start =  parseInt((startTime.split(":"))[0]) + 1;
      itemsRef.child(params.title).child(params.date).once("value").then(snapshot => {
          let abort = false;
        console.log(snapshot.val());
            for (let j = start; j <= 24 && abort === false; j++) {
              if (snapshot.child(j + ":00").exists() === false) {
                  let now = j + ":00";
                    endTimings.push(now);
                } else {
                    let now = j + ":00";
                    endTimings.push(now);
                    abort = true;  
                }                   
            }
        })  
      console.log(endTimings);
      return endTimings;
  }


  // render() {
  //   const { params } = this.props.navigation.state;

  //   const text = this.state.text;
  //   // const { pet } = this.state;
  //   const { endTime } = this.state;


  //   const startTimePlaceholder = {
  //     label: params.time,
  //     value: params.time,
  //     color: '#9EA0A4',
  //   };


  //   const endTimePlaceholder = {
  //     label: this.momentStartTime(params.time).add(1, 'h').format("HH:mm").toString(),
  //     value: this.momentStartTime(params.time).add(1, 'h').format("HH:mm").toString(),
  //     color: '#9EA0A4',
  //   };

  //   const today = this.state.currentDate;
  //   console.log(params.date + params.time);

  //   const pet = this.possibleEndTimes(params.time, params);
  //   // console.log(pet);
  //   // console.log(data);

  //   // const toDB = () => itemsRef.child(params.title).child(params.date).child(params.time).set(data);

  //   console.log(pet);


  //   return (
  //   <ScrollView>
  //     <View style={styles.container}>

  //       <Image
  //         resizeMode="cover"
  //         source={params.image}
  //         style={styles.image} 
  //       />

  //       <View style={styles.textContainer}> 
  //         <Text style={styles.headerText}>
  //           Booking 
  //           {/* {params.title} */}
  //         </Text>
  //       </View>

  //       <View style={styles.smallContainer}>

  //       <Text style={styles.text}>Facility: {params.title}</Text>


  //       <View paddingVertical={5} />   

  //       <View style={styles.rowContainer}>
  //       <Text style={styles.text}>Date selected: </Text>
  //       <DatePicker
  //           style={{width: 130}}
  //           // date={this.state.date}
  //           date={params.date}
  //           // date = "01-07-2019"

  //           mode="date"
  //           placeholder="Booking Date"
  //           format="DD-MM-YYYY"
  //           minDate={moment(today)}
  //           maxDate={moment(today).add(3, 'months')}
  //           confirmBtnText="Confirm"
  //           cancelBtnText="Cancel"
  //           showIcon={false}
  //           onDateChange={(date) => {this.setState({date: date});}}
  //         />      
  //     </View>
  //       <View paddingVertical={5} />   


  //       <Text style={styles.text}>Start Time</Text>
  //       <Picker
  //         placeholder={startTimePlaceholder}
  //         items={[{label: params.time, value: params.time}]}
  //         onValueChange={value => {
  //           this.setState({
  //             startTime: value,
  //           });
  //         }}
  //         // onUpArrow={() => {
  //         //   this.inputRefs.firstTextInput.focus();
  //         // }}
  //         onDownArrow={() => {
  //           this.inputRefs.endTime.togglePicker();
  //         }}
  //         style={pickerSelectStyles}
  //         value={this.state.startTime}
  //         ref={el => {
  //           this.inputRefs.startTime = el;
  //         }}
  //       />

  //       <View paddingVertical={5} />

  //       <Text style={styles.text}>End Time</Text>
  //       <Picker
  //         placeholder={endTimePlaceholder}
  //         items={pet}
  //         onValueChange={value => {
  //           this.setState({
  //             endTime: value,
  //           });
  //         }}
  //         onUpArrow={() => {
  //           this.inputRefs.startTime.togglePicker();
  //         }}
  //         onDownArrow={() => {
  //           this.inputRefs.textInput.focus();
  //         }}
  //         style={pickerSelectStyles}
  //         value={this.state.endTime}
  //         ref={el => {
  //           this.inputRefs.endTime= el;
  //         }}
  //       />

  //       <View paddingVertical={5} />   


  //       <Text style={styles.text}>CCA and/or purpose of booking</Text>
  //       <TextInput
  //         ref={el => {
  //           this.inputRefs.textInput = el;
  //         }}
  //         returnKeyType="next"
  //         enablesReturnKeyAutomatically
  //         onSubmitEditing={() => {
  //           this.inputRefs.startTime.togglePicker();
  //         }}
  //         style={
  //           Platform.OS === 'ios'
  //             ? pickerSelectStyles.inputIOS
  //             : pickerSelectStyles.inputAndroid
  //         }
  //         blurOnSubmit={false}
  //         onChangeText={(text) => this.setState({text})}
  //         value={this.state.text}
  //       />

  //       <View paddingVertical={5} />

  //       </View>
  //       <Button
  //           title="Book Now"
  //           color='#000000'
  //           onPress={() => {
  //               Alert.alert("Booking successful!");
  //               itemsRef.child(params.title).child(params.date).child(params.time).set({endTime: endTime , name: "OMG!!", purpose: text });
  //               NavigationManager.goBack();
                
  //               // const { numbers } = this.state;
  //               // const value = numbers.length + 1;
  //               // numbers.push({
  //               //   label: `${value}`,
  //               //   value,
  //               //   color: 'dodgerblue',
  //               // });
  //               // this.setState({
  //               //   numbers,
  //               // });
  //           }}
  //           />
  //     </View>
  //     </ScrollView>
  //   );
  // }

  CheckTextInput = () => {
    //Handler for the Submit onPress
    
  };

renderSchedule = () => {
    const { params } = this.props.navigation.state;
    const text = this.state.text;
    const { endTime } = this.state;

    const user = firebase.auth().currentUser;
    const name = user.displayName;
    // const startTimePlaceholder = {
    //   label: params.time,
    //   value: params.time,
    //   color: '#9EA0A4',
    // };
    // const endTimePlaceholder = {
    //   label: this.momentStartTime(params.time).add(1, 'h').format("HH:mm").toString(),
    //   value: this.momentStartTime(params.time).add(1, 'h').format("HH:mm").toString(),
    //   color: '#9EA0A4',
    // };
    // const today = this.state.currentDate;
    // console.log(params.date + params.time);

    let pet = this.state.pet.map( (time, i) => {
      return <Picker.Item key={i} value={time.toString()} label={time.toString()} />
  });
  console.log("this is" + pet);

    return (
    <ScrollView>
      <View style={styles.container}>  
        <TouchableOpacity>
          <Image
            resizeMode="cover"
            source={params.image}
            style={styles.image} 
          />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>
              Booking 
            </Text>
          </View>

        </TouchableOpacity>

        <View style={styles.smallContainer}>

        <Text style={styles.text}>Facility: {params.title}</Text>

        <View paddingVertical={5} />   

        <View style={styles.rowContainer}>
        <Text style={styles.text}>Date: {params.date} </Text>
        {/* <DatePicker
            style={{width: 130}}
            // date={this.state.date}
            date={params.date}
            // date = "01-07-2019"

            mode="date"
            placeholder="Booking Date"
            format="DD-MM-YYYY"
            minDate={moment(today)}
            maxDate={moment(today).add(3, 'months')}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={(date) => {this.setState({date: date});}}
          />       */}
      </View>
        <View paddingVertical={5} />   


        <Text style={styles.text}>Start Time: {params.time}</Text>
        {/* <RNPicker
          placeholder={startTimePlaceholder}
          items={[{label: params.time, value: params.time}]}
          onValueChange={value => {
            this.setState({
              startTime: value,
            });
          }}
          // onUpArrow={() => {
          //   this.inputRefs.firstTextInput.focus();
          // }}
          onDownArrow={() => {
            this.inputRefs.endTime.togglePicker();
          }}
          style={pickerSelectStyles}
          value={this.state.startTime}
          ref={el => {
            this.inputRefs.startTime = el;
          }}
        /> */}

        <View paddingVertical={5} />

        <Text style={styles.text}>End Time</Text>
        {/* <RNPicker
          placeholder={endTimePlaceholder}
          items={pet}
          onValueChange={value => {
            this.setState({
              endTime: value,
            });
          }}
          onUpArrow={() => {
            this.inputRefs.startTime.togglePicker();
          }}
          onDownArrow={() => {
            this.inputRefs.textInput.focus();
          }}
          style={pickerSelectStyles}
          value={this.state.endTime}
          ref={el => {
            this.inputRefs.endTime= el;
          }}
        /> */}

        <View style={styles.rowContainer}>

            <Picker
              selectedValue={this.state.endTime}
              onValueChange={ (endTime) => ( this.setState({endTime:endTime}) ) } 
              mode="dropdown"
              style={styles.picker}
              >
              {pet}

            </Picker>
</View>
        <View paddingVertical={5}/>   


        <Text style={styles.text}>CCA and/or purpose of booking</Text>
        <TextInput
          ref={el => {
            this.inputRefs.textInput = el;
          }}
          returnKeyType="go"
          enablesReturnKeyAutomatically
          // onSubmitEditing={() => {
          //   this.inputRefs.startTime.togglePicker();
          // }}
          style={
            Platform.OS === 'ios'
              ? pickerSelectStyles.inputIOS
              : pickerSelectStyles.inputAndroid
          }
          blurOnSubmit={false}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />

        <View paddingVertical={5} />

        
        <TouchableOpacity
        style={styles.button}
            onPress={() => {
              const bookingAvail = itemsRef.child(params.title).once("value").then(snapshot => {
                if(snapshot.child(params.date).child(params.time).exists() == false) {
                  return true;
                } else {
                  return false;
                }
              })

              if (this.state.text != '' && bookingAvail) {
                Alert.alert("Booking successful!");
                itemsRef.child(params.title).child(params.date).child(params.time).set({endTime: endTime , name: name, purpose: text, uid: firebase.auth().currentUser.uid });   
                // userRef.child(firebase.auth().currentUser.uid).child("booking").child(params.title).child(params.date).child(params.time).set({ end: endTime, purpose: text });
                setTimeout(()=> {
                  this.props.navigation.popToTop();
                  NavigationManager.navigate("Announcements")}, 1000);
              
            } else if (this.state.text == '') {
              Alert.alert('Please enter CCA/purpose of booking');
            } else {
              Alert.alert('Already booked!');
            }
                
            }}
            >
              <Text style={styles.buttonText}>Book Now</Text> 
            </TouchableOpacity>
            </View>
      </View>
      </ScrollView>
    );
  }





render() {
    return(
      <View>
        {this.renderSchedule()}
      </View>
    )
}

}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'transparent',
    flex: 1,
  },
  headerText: {
    fontFamily: "Raleway-Regular",
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontFamily: "Raleway-Regular",
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  image: {
    width: "100%",
    height: 100,
    opacity: 0.4,
    borderWidth: 0,
    borderColor: '#000000',
    bottom: 10,
    // padding: 0,
    // backgroundColor: 'transparent',
  },
  textContainer: {
    // position: 'absolute', 
    height: 50,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 50,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  picker: {
    height: 40,
    width: "100%",
    borderColor:'grey',
    borderWidth: 1,
    borderStyle: "solid",
    fontFamily:"Raleway-Regular", 
    fontSize:16    
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical:10,
    width:"100%"
    
  },
  buttonText: {
    fontFamily: "Raleway-Regular",
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },

});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height:80,
    margin:15,
    fontSize: 16,
    paddingVertical: 12,
    // paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'gray',
    // borderRadius: 4,
    color: 'black',
    // width:250,
    // paddingRight: 30, // to ensure the text is never behind the icon
    fontFamily: 'Raleway-Regular'

  },
  inputAndroid: {
    height:80,
    // margin:15,
    fontSize: 16,
    width: "100%",
    // paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    // borderRadius: 8,
    color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
    // width:250,
    fontFamily: 'Raleway-Regular'
  }
});

module.export = FacilityBooking; //module export statement