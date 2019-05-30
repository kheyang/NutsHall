import React, { Component } from "react";
import { View, Image, TouchableOpacity, Button } from "react-native";
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
          <AppHeader />
          <Text> Hello World!!! Announcement Page!!! </Text>
          <Button
            title="Go to facilities page!!"
            onPress={() => NavigationManager.navigate("Facilities Page")}
          />
        
        </View>
      </Container>
    );
  }

  static navigationOptions = {
    drawerLabel: 'Announcement Page',
    // drawerIcon: () => (
    //   <Image
    //     source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
    //     style={{width: 30, height: 30, borderRadius: 15}}
    //   />
    // )
  }
  




}

/*
//Internal StyleSheet here
*/

module.export = AnnouncementPage; //module export statement
