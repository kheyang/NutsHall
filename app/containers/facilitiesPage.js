import React, { Component } from "react";
import { View, Image, TouchableOpacity, Button } from "react-native";
import { Container, Text } from "native-base";
import AppHeader from "../components/header.js";
import NavigationManager from "../managers/navigationManager";


/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/
export default class FacilitiesPage extends Component {
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
          <Text> Hello World!!! Facilities!! </Text>
          <Button
            title="Go to announcement page!!"
            onPress={() => NavigationManager.navigate("Announcement Page")}
          />
        </View>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = FacilitiesPage; //module export statement
