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
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import WeekView, { addLocale } from './weekView';
import moment from 'moment';

// addLocale('fr', {
//   months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
//   monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
//   weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
//   weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
// });


export default class Facility extends Component {
  selectedDate = new Date();

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


   
  render() {
    const events = [
      {
        id: 1,
        description: 'Chong KY',
        // startDate: new Date('28-06-2019').setHours('12', '00'),
        startDate: this.generateDates(0),
        endDate: this.generateDates(2),
        color: 'blue',
      },
      {
        id: 2,
        description: 'Event 2',
        startDate: this.generateDates(2),
        endDate: this.generateDates(4),
        color: 'red',
      },
      {
        id: 3,
        description: 'Event 3',
        startDate: this.generateDates(-5),
        endDate: this.generateDates(-3),
        color: 'green',
      },
    ];


    
    return (
      <View style={styles.container}>
        <WeekView
          events={events}
          selectedDate={this.selectedDate}
          numberOfDays={7}
          onEventPress={(event) => Alert.alert(event.id + '\n' + event.description + '\n' + event.startDate)}
          headerStyle={styles.headerStyle}
          formatDateHeader={"ddd[\n] D"}
          locale="en"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 22,
  },
  headerStyle: {
    backgroundColor: '#000000',
  },
});

module.export = Facility; //module export statement

