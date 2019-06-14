import React, { Component } from "react";
import {View, Image, TouchableOpacity, Button, StyleSheet } from "react-native";
import { Container, Text } from "native-base";
import AppHeader from "../components/header.js";
import NavigationManager from "../managers/navigationManager";
import ViewPager from "@react-native-community/viewpager";
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
        <View style={styles.pageStyle} key="1">
          <Image
            source={require('../assets/images/dancestudio.png')}
            style={{
              width: 300,
              height: 120,
              alignSelf: "center",
              marginTop:  40,
              marginBottom: 20         
            }}
            resizeMode="contain"
          />
          <Text>INSERT EVENT DETAILS HERE</Text>
          <Button
            // onPress={}
            title="See Details"
          />
        </View>

        {/* <View style={{
          flex:1,
          flexDirection:"column",
          justifyContent: "flex-start",
          // alignItems: "baseline",
          // padding: 20
          }} key="1">
          <View style={{height: 0, width: 100, alignSelf:'center'}}>
            <Image
              source={require('../assets/images/dancestudio.png')}
              style={{
                width: 300,
                alignSelf: 'center'
              }}
              resizeMode="contain"
            />
          </View> */}

          {/* <View>
            <Text>INSERT EVENT DETAILS HERE</Text>
            <Button 
              // onPress={}
              title="See Details"
            />
          </View> */}
        {/* </View> */}

        <View style={styles.pageStyle} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.pageStyle} key="3">
          <Text>Third page</Text>
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
    alignItems: 'center',
    padding: 20,
  },
  posterContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  poster: {
    flex: 2,
    width: 300,
    alignItems: 'center',
    marginTop: 20,
  },
});

module.export = AnnouncementPage; //module export statement
