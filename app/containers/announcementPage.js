import React, { Component } from "react";
import {View, Image, TouchableOpacity, Button, StyleSheet } from "react-native";
import { Container, Text } from "native-base";
import AppHeader from "../components/header.js";
import NavigationManager from "../managers/navigationManager";
import ViewPager from "@react-native-community/viewpager";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/
export default class AnnouncementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
    };
  }

  static navigationOptions = ({ navigation }) => {
    //return header with Custom View which will replace the original header 
    return {
      header: (
        <View
          style={{
            height: 45,
            marginTop: 20,
            backgroundColor: 'red',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            This is Custom Header
          </Text>
        </View>
      ),
    };
  };



  /*
    React LifeCycle Methods: 
    e.g. componentWillMount(),
         componentDidMount
         
    additional JS functions 
    -> to change the state of component,
    -> call API to pass and receive data from backend
    -> any other functions etc.
  */

  render() {
    return (
      <ViewPager
        style={styles.viewPager}
        initialPage={0}>
        <View style={styles.pageStyle} key='1'>
          <View style={styles.posterContainer}>
            <Image
              source={require('../assets/images/dancestudio.png')}
              style={styles.poster}
              resizeMode='contain'
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              color='darkgreen'
              // onPress={}
              title="See Details"
            />
          </View>
        </View>
        <View style={styles.pageStyle} key='2'>
          <View style={styles.posterContainer}>
            <Image
              source={require('../assets/images/dancestudio.png')}
              style={styles.poster}
              resizeMode='contain'
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              color='darkgreen'
              // onPress={}
              title="See Details"
            />
          </View>
        </View>
        <View style={styles.pageStyle} key='3'>
          <View style={styles.posterContainer}>
            <Image
              source={require('../assets/images/dancestudio.png')}
              style={styles.poster}
              resizeMode='contain'
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! INSERT EVENT DETAILS HERE! </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              color='darkgreen'
              // onPress={}
              title="See Details"
            />
          </View>
        </View>
      </ViewPager>
    );
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

    // Notice JSX - a html-JS like syntax is within ()
    // return (
      
    //   <Container>
    //      <View>
    //       {/* <AppHeader /> */}
    //       <Text
    //       style={ styles.text }
    //       > Hello World!!! Announcement Page!!! </Text>
    //       <Button
    //         title="Go to facilities page!!"
    //         onPress={() => NavigationManager.navigate("Facilities")}
    //       />
        
    //     </View>
    //   </Container>
    // );
  }


  
  static navigationOptions = {
    drawerLabel: 'Announcement Page',
  }
  




}

/*
//Internal StyleSheet here
*/

const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: "Raleway-Regular",
  },
  viewPager: {
    flex: 1
  },
  pageStyle: {
    flexDirection:'column', 
    alignItems: 'center',
  },
  posterContainer: {
    flex:5,
    justifyContent: 'center'
  },
  poster: {
    flex: 1,
    marginTop: 20,
  },
  descriptionContainer: {
    flex:4, 
    maxWidth: 300,
    justifyContent: 'center' 
  },
  description: {
    marginBottom: 20, 
    marginTop: 20,
  },
  buttonContainer: {
    flex:1, 
    maxWidth: 150,
  }
});

module.export = AnnouncementPage; //module export statement
