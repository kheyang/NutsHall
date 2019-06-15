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
import { View, Text, StyleSheet } from 'react-native'
import AnnouncementPage from './announcementPage'
import eventAnnouncement from './announcementPage'

export default class AnnouncementDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      // title: this.props.navigation.state.params.title,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  })

  render () {
      const { params } = this.props.navigation.state
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`I'm event: ${params.title}`}</Text>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  text: {
    fontFamily: "Raleway-Regular",
    color: 'black',
    fontSize: 40,
    fontWeight: 'normal',
  }
})

