import React, { Component } from "react";
import { db } from '../config';
import EventComponent from '../components/event.js'

let itemsRef = db.ref('/event')

export default class AnnouncementPage extends Component {

  state = {
    items: []
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data)
      this.setState({ items })
    })
  }

  render() {
    return (
      <EventComponent items = {this.state.items} />
    );
  }

  static navigationOptions = {
    drawerLabel: 'Announcement Page',
  }
}

module.export = AnnouncementPage; //module export statement


// import React, { Component } from "react";
// import {View, Image, Button, StyleSheet, ScrollView} from "react-native";
// import { Container, Text } from "native-base";
// import AppHeader from "../components/header.js";
// import NavigationManager from "../managers/navigationManager";
// import ViewPager from "@react-native-community/viewpager";
// import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
// import { db } from '../config';
// /*
//     other import statements or 
//     JS variables like const here - can be dummy datas to use for development
// */
// let itemsRef = db.ref('/event')

// const eventAnnouncement = [
//   {
//     name: 'Phoenix Fest\' 19',
//     date: '2019-04-11',
//     poster: require('../assets/images/events/phoenixFest.jpeg'),
//     description: 'Date: 11 April 2019' + '\n' +
//     'Registration: 7:30pm' + '\n' +
//     'Event starts: 8:00pm' + '\n' +
//     'Venue: Communal Hall',
//     details: '\n' + 'RH CULTURE COMM would like to present to you the biggest cultural event in RH:' + '\n' +
//     'PHOENIX FEST 2019' + '\n' + '\n' +
//     'Clear out your schedule for the following timing' + '\n' +
//     'Date: Thursday, 11 April 2019' + '\n' +
//     'Venue: Comm Hall' + '\n' +
//     'Time: Registration for lucky draw starts at 730! Performance starts at 8pm :)' + '\n' + '\n' +
//     'Let\'s hype RH up at the end of the academic year with a blast!' + '\n' + '\n' +
//     'We have everything you need:' + '\n' +
//     '- Come support your friends in PERFORMANCES 🎸💃 and have fun together by playing GAMES 🎯' + '\n' +
//     '- Capture memorable moments with your friends at our PHOTO BOOTH 📷' + '\n' +
//     '- We have FOOD 🍔' + '\n' + '\n' +
//     'PS: ATTRACTIVE PRIZES 🌚 awaits you from the LUCKY DRAW' + '\n' + '\n' +
//     'See you there! 👋',
//   },
//   {
//     name: 'Kent Ridge Tour',
//     date: '2019-04-13',
//     poster: require('../assets/images/events/kentRidgeTour.jpeg'),
//     description: 'Date: 13 April 2019' + '\n' +
//     'Time: 9:00am - 12:00pm' + '\n' +
//     'Attire: Casual & Ezlink Card' + '\n' +
//     'Meeting Venue: Blk 2 BBQ pit',
//     details: '\n' + 'Hi! 👋 Raffles Hall Green Comm is presenting to you the Kent Ridge Tour!!😆😆' + '\n' + '\n' +
//     'Date: 13th April 2019' + '\n' +
//     'Time: 9am-12pm' + '\n' +   
//     'Attire: Casual & Bring along an ezlink card!' + '\n' + '\n' +
//     'We will bring you tour along Kent Ridge Road 🌳 and KR Park🏞.  We are pleased to have you join us on this appreciation of mother-nature tour! Your Green Guide for this trip would be none other than Prof Yap from Blk 4!' + '\n' + '\n' +
//     'THERE IS A FREE PIZZA SESSION AFTER THE TOUR!' + '\n' + '\n' +    
//     'Hurry sign up now!!! First come first serve!! I\'m sure his fatherly smile and passion for the environment would give you a memorable experience of a RHtime!',
//   },
//   {
//     name: 'Raffles Hall Flag Fundraising',
//     date: '2019-04-06',
//     poster: require('../assets/images/events/flagFundRaising.jpeg'),
//     description: 'White, Grey, Navy $12'  + '\n' +
//     'Water Colour $15' + '\n' +
//     'Buy any 4 shirts for $8 off' + '\n' +
//     'Deadline: 6 April 2019' + '\n' +
//     'Contact: Chun Long @ 9816 5222',
//     details: '\n' + 'Hello everyone!🎊' + '\n' + '\n' + 
//     'Raffles Hall Flag will be raising fund for Hospice Care Singapore through shirts selling this year. Show your support by buying the T-shirts as shown in the posters.😊' + '\n' + '\n' + 
//     'Classic design (Design 1-3): $12/pc' + '\n' +
//     'Limited design with watercolor prints (Design 4): $15/pc' + '\n' +
//     'Buy 4 shirts (Any 4 designs to mix and match) : $8 off total price' + '\n' + '\n' + 
//     'Do spread to your friends outside Raffles hall to buy the T-shirts! ❤' + '\n' + '\n' + 
//     'Flag comm will also be stationed at comm hall during dinner time on Thursday and Friday, can made your payment and order at the same time!' + '\n' + '\n' +    
//     'Pre-order at https://bit.ly/2HSjtkL' + '\n' + '\n' +    
//     'Pre-order closes at 6th April 2359.' + '\n' + 
//     'Feel free to contact Chun Long at 98165222 for any enquiries.',
//   },
//   {
//     name: 'Safety Night 2019',
//     date: '2019-03-28',
//     poster: require('../assets/images/events/safetyNight.jpeg'),
//     description: 'Date: 28 March 2019' + '\n' +
//     'Time: 8:00pm - 10:00pm'+ '\n' +
//     'Venue: Conference Room',
//     details: '\n' + 'Don\'t know what to do when there are casualties🧟‍♂? Wanna help your friend when he/she gets injured👩🏻‍⚕? Fret not! cuz Safety Night is here! This year, Dr Patrick Tan from UHC will be coming down to share about Basic First Aid tips!' + '\n' + '\n' +
//     'Date: 28th March (Thursday)' + '\n' +
//     'Time: 8pm' + '\n' +
//     'Venue: Conference Room (Upper Lounge)' + '\n' + '\n' +
//     'Free door gift (I think is a 16GB thumbdrive) and free food🍕🍕🍕🥤 are waiting for you!' + '\n' +
//     'Sign up now at https://tinyurl.com/safetynight19!'+ '\n' + 
//     'See you this Thursday, be there or be square!'   
//   },
// ]

// export default class AnnouncementPage extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       //state property here
//     };
//   }

//   // static navigationOptions = ({ navigation }) => {
//   //   //return header with Custom View which will replace the original header 
//   //   return {
//   //     header: (
//   //       <View
//   //         style={{
//   //           height: 45,
//   //           marginTop: 20,
//   //           backgroundColor: 'red',
//   //           justifyContent: 'center',
//   //         }}>
//   //         <Text
//   //           style={{
//   //             color: 'white',
//   //             textAlign: 'center',
//   //             fontWeight: 'bold',
//   //             fontSize: 18,
//   //           }}>
//   //           This is Custom Header
//   //         </Text>
//   //       </View>
//   //     ),
//   //   };
//   // };

//   /*
//     React LifeCycle Methods: 
//     e.g. componentWillMount(),
//          componentDidMount
         
//     additional JS functions 
//     -> to change the state of component,
//     -> call API to pass and receive data from backend
//     -> any other functions etc.
//   */
//   renderAnnouncement = (event, i) => {
//     return(
//       <View style={styles.pageStyle} key={i}>
//         <View style={styles.posterContainer}>
//           <Image
//             source={event.poster}
//             style={styles.poster}
//             resizeMode='contain'
//           />
//         </View>
//         <View style={styles.eventTitleContainer}>
//           <Text style={styles.eventTitle}>
//             {event.name}
//           </Text>
//         </View>
//         <View style={styles.descriptionContainer}>
//           <Text style={styles.description}>{event.description}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <Button
//             color='green'
//             onPress={() => NavigationManager.navigate('Announcement Details', { title: event.name, eventPoster: event.poster, eventDetails: event.details })}
//             title="See Details"
//           />
//         </View>
//       </View>
//     )
//   }
  
//   render() {
//     return (
//       <ViewPager style={styles.viewPager} initialPage={0}>
//         {eventAnnouncement.map(this.renderAnnouncement)}
//       </ViewPager>
//     );
//     /*
//     JS Expressions here
//     -> to pass state data here
//     -> to access data of array etc
//     */
//   }
  
//   static navigationOptions = {
//     drawerLabel: 'Announcement Page',
//   }
// }

// /*
// //Internal StyleSheet here
// */

// const styles = StyleSheet.create({
//   text: {
//     color: 'black',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 18,
//     fontFamily: "Raleway-Regular",
//   },
//   viewPager: {
//     flex: 1
//   },
//   pageStyle: {
//     flexDirection:'column', 
//     alignItems: 'center',
//   },
//   posterContainer: {
//     flex:5,
//     justifyContent: 'center'
//   },
//   poster: {
//     flex: 1,
//     marginTop: 20,
//   },
//   eventTitleContainer: {
//     flex: 0.5,
//     marginTop: 20,
//   },
//   eventTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   descriptionContainer: {
//     flex:3, 
//     maxWidth: 300,
//     justifyContent: 'center' 
//   },
//   description: {
//     marginBottom: 20, 
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flex:1, 
//     maxWidth: 150,
//     marginBottom: 40,
//   }
// });

// export {eventAnnouncement};
// module.export = AnnouncementPage; //module export statement