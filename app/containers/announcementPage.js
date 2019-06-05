import React, { Component } from "react";
import { View, Image, TouchableOpacity, Button, StyleSheet } from "react-native";
import { Container, Text } from "native-base";
import AppHeader from "../components/header.js";
import NavigationManager from "../managers/navigationManager";

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
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

    // Notice JSX - a html-JS like syntax is within ()
    return (
      
      <Container>
         <View>
          {/* <AppHeader /> */}
          <Text
          style={ styles.text }
          > Hello World!!! Announcement Page!!! </Text>
          <Button
            title="Go to facilities page!!"
            onPress={() => NavigationManager.navigate("Facilities")}
          />
        
        </View>
      </Container>
    );
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
});

module.export = AnnouncementPage; //module export statement
