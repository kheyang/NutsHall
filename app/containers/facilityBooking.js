import React, { Component } from 'react';
import { Text, Alert, View, Button, StyleSheet, TouchableOpacity, PanResponder, AsyncStorage, Image, Dimensions, TextInput, ScrollView,Platform } from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker-select';
import { Toast } from 'native-base';


const data = [
  {
    label: '00:00',
    value: '00:00',
  },
  {
    label: '01:00',
    value: '01:00',
  },
  {
    label: '02:00',
    value: '02:00',
  },
  {
    label: '08:00',
    value: '08:00',
  },
];

export default class FacilityBooking extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = {
      firstTextInput: null,
      startTime: null,
      endTime: null,
    };

    this.state = {
      date: '',
      // startTime: '00:00',
      // endTime: '00:00',

      // numbers: [
      //   {
      //     label: '1',
      //     value: 1,
      //     color: 'orange',
      //   },
      //   {
      //     label: '2',
      //     value: 2,
      //     color: 'green',
      //   },
      // ],
      startTime: undefined,
      endTime: undefined,
      currentDate: new Date(),
      markedDate: moment(new Date()).format("YYYY-MM-DD"),
    };

    // this.navigationOptions = this.navigationOptions.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => {console.log('onStartShouldSetPanResponder'); return true;},
      onMoveShouldSetPanResponder: (e) => {console.log('onMoveShouldSetPanResponder'); return true;},
      onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
      onPanResponderMove: (e) => console.log('onPanResponderMove'),
      onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
      onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
    });
  }

  
  static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        image: navigation.state.params.image, 
        detail: navigation.state.params.detail,
        time: navigation.state.params.time,
        date: navigation.state.params.date,
      })


  render() {
    const startTimePlaceholder = {
      label: 'Start Time',
      value: null,
      color: '#9EA0A4',
    };

    const endTimePlaceholder = {
      label: 'End Time',
      value: null,
      color: '#9EA0A4',
    };

    const { params } = this.props.navigation.state;
    const today = this.state.currentDate;
    console.log(params.date);

    return (
        
      <View style={styles.container}>

        <Image
          resizeMode="cover"
          source={params.image}
          style={styles.image} 
        />

        <View style={styles.textContainer}> 
          <Text style={styles.headerText}>
            Booking 
            {/* {params.title} */}
          </Text>
        </View>

        <View style={styles.smallContainer}>

        {/* <Text style={styles.text}>Facility: {params.title}</Text> */}

        <Text style={styles.text}>Facility: Hard Court</Text>

        <View paddingVertical={5} />   

        <View style={styles.rowContainer}>
        <Text style={styles.text}>Date selected: </Text>
        <DatePicker
            style={{width: 130}}
            // date={this.state.date}
            // date={params.date}
            date = "01-07-2019"

            mode="date"
            placeholder="Booking Date"
            format="DD-MM-YYYY"
            minDate={moment(today).fromNow()}
            maxDate={moment(today).add(3, 'months').fromNow()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            // iconSource={require('../assets/images/calendar.png')}
            // iconSource={{}}
            onDateChange={(date) => {this.setState({date: date});}}
          />
          {/* <Text style={styles.instructions}>date: {this.state.date}</Text> */}
      
      </View>
        <View paddingVertical={5} />   


        <Text style={styles.text}>Start Time</Text>
        <Picker
          placeholder={startTimePlaceholder}
          items={data}
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
        />

        <View paddingVertical={5} />

        <Text style={styles.text}>End Time</Text>
        <Picker
          placeholder={endTimePlaceholder}
          items={data}
          onValueChange={value => {
            this.setState({
              endTime: value,
            });
          }}
          onUpArrow={() => {
            this.inputRefs.startTime.togglePicker();
          }}
          onDownArrow={() => {
            this.inputRefs.firstTextInput.focus();
          }}
          style={pickerSelectStyles}
          value={this.state.endTime}
          ref={el => {
            this.inputRefs.endTime= el;
          }}
        />

        <View paddingVertical={5} />   


        <Text style={styles.text}>CCA and/or purpose of booking</Text>
        <TextInput
          ref={el => {
            this.inputRefs.firstTextInput = el;
          }}
          returnKeyType="next"
          enablesReturnKeyAutomatically
          onSubmitEditing={() => {
            this.inputRefs.startTime.togglePicker();
          }}
          style={
            Platform.OS === 'ios'
              ? pickerSelectStyles.inputIOS
              : pickerSelectStyles.inputAndroid
          }
          blurOnSubmit={false}
        />

        <View paddingVertical={5} />

        </View>
        <Button
            title="Book Now"
            color='#000000'
            onPress={() => {Toast.show({text: "Booking successful!"})
                // const { numbers } = this.state;
                // const value = numbers.length + 1;
                // numbers.push({
                //   label: `${value}`,
                //   value,
                //   color: 'dodgerblue',
                // });
                // this.setState({
                //   numbers,
                // });
            }}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
    position: 'absolute', 
    height: 100,
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
    // paddingVertical: 40,
    // paddingHorizontal: 10,
    // flex: 1,
  },
  rowContainer: {
    flexDirection: 'row'
  },

});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height:40,
    margin:15,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    // borderRadius: 4,
    color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height:40,
    margin:15,
    fontSize: 16,
    paddingHorizontal: 50,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    // borderRadius: 8,
    color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
});

module.export = FacilityBooking; //module export statement
