import React, { Component } from "react";
import { db } from '../config';
import firebase from 'firebase';
// import console = require("console");

let itemsRef = db.ref('/admin')



export default class Admin extends Component {

  state = {
    adminKey: [],
    // currentUser: null
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val()
      let adminKey = Object.values(data)
      this.setState({ adminKey })
    })
  }

  render() {
    console.log(adminKey)
  }

  static navigationOptions = {
    drawerLabel: 'Admin Panel',
  }
}

module.export = Admin; 