// import React, { Component } from "react";
// import { View, Image, TouchableOpacity, Button, StyleSheet } from "react-native";
// import { Container, Text } from "native-base";
// import AppHeader from "../components/header.js";
// import NavigationManager from "../managers/navigationManager";

// /*
//     other import statements or 
//     JS variables like const here - can be dummy datas to use for development
// */
// export default class AnnouncementDetails extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       //state property here
//     };
//   }
//   /*
//     React LifeCycle Methods: 
//     e.g. componentWillMount(),
//          componentDidMount
         
//     additional JS functions 
//     -> to change the state of component,
//     -> call API to pass and receive data from backend
//     -> any other functions etc.
//   */

//   render() {
//     /*
//     JS Expressions here
//     -> to pass state data here
//     -> to access data of array etc
//     */

//     // Notice JSX - a html-JS like syntax is within ()
//     return (
      
//       <Container>
//          <View>
//           {/* <AppHeader /> */}
//           <Text style={styles.text }> Announcement Details!! </Text>
//           <Button
//             title="Go to facilities page!!"
//             onPress={() => NavigationManager.navigate("Facilities")}
//           />
        
//         </View>
//       </Container>
//     );
//   }
  
//   static navigationOptions = {
//     drawerLabel: 'Announcement Page',
//     // drawerIcon: () => (
//     //   <Image
//     //     style={{width: 30, height: 30, borderRadius: 15}}
//     //   />
//     // )
//   }

// }

// /*
// //Internal StyleSheet here
// */

// const styles = StyleSheet.create({
//     text: {
//         color: 'black',
//         textAlign: 'center',
//         fontWeight: 'bold',
//         fontSize: 18,
//         fontFamily: "Raleway-Regular",
//     },
//   });

// module.export = AnnouncementDetails; //module export statement
import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native'
import NavigationManager from "../managers/navigationManager";

export default class AnnouncementDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      // title: this.props.navigation.state.params.title,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    eventPoster: navigation.state.params.poster,
    eventDetails: navigation.state.params.details,
  })

  render () {
      const { params } = this.props.navigation.state
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.posterContainer}>
            <Image source={params.eventPoster} style={styles.poster} resizeMode='contain'/>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>
            Sed euismod nisi porta lorem. In iaculis nunc sed augue lacus viverra vitae congue eu. Ullamcorper eget nulla facilisi etiam.Event Details: Lorem ipsum incididunt ut labore et dolore magna aliqua. Sed euismod nisi porta lorem. In iaculis nunc sed augue lacus viverra vitae congue eu. Ullamcorper eget nulla facilisi etiam.Event Details: Lorem ipsum incididunt ut labore et dolore magna aliqua. Sed euismod nisi porta lorem. In iaculis nunc sed augue lacus viverra vitae congue eu. Ullamcorper eget nulla facilisi etiam.Event Details: Lorem ipsum incididunt ut labore et dolore magna aliqua. Sed euismod nisi porta lorem. In iaculis nunc sed augue lacus viverra vitae congue eu. Ullamcorper eget nulla facilisi etiam.Event Details: Lorem ipsum incididunt ut labore et dolore magna aliqua. Sed euismod nisi porta lorem. In iaculis nunc sed augue lacus viverra vitae congue eu. Ullamcorper eget nulla facilisi etiam.Event Details: Lorem ipsum incididunt ut labore et dolore magna aliqua. Sed euismod nisi porta lorem. In iaculis nunc sed augue lacus viverra vitae congue eu. Ullamcorper eget nulla facilisi etiam.'
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              color='grey'
              onPress={() => NavigationManager.goBack()}
              title = 'Go back'
              />
          </View>
        </View>
      </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"column", 
    alignItems:'center', 
    justifyContent:'space-between',
  },
  posterContainer: {
    height: 300,
  },
  poster: {
    flex:1, 
    maxWidth:300,
  },
  detailsContainer: {
    marginLeft: 40, 
    marginRight: 40,
  },
  details: {
    textAlign:'center', 
    fontSize: 16,
  },
  buttonContainer: {
    margin: 40,
  },
})

