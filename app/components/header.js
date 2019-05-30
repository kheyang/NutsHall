import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Container, Text, Header, Left, Right, Button, Icon } from "native-base";
import navigationManager from "../managers/navigationManager";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/
export default class AppHeader extends Component {
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
      <Header transparent>
        <Left style={{ flex: 1, flexDirection: "row" }}>
          <Button transparent>
            <Icon ios="ios-menu" android="md-menu" style={{ color: "black"}}/>
          </Button>
        </Left>
      </Header>
    );
  }
}



/*
//Internal StyleSheet here
*/

module.export = AppHeader; //module export statement
