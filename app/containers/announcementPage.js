import React, { Component } from "react";
import { db } from '../config';
import EventComponent from '../components/event.js'
import firebase from 'firebase';


let itemsRef = db.ref('/event')

export default class AnnouncementPage extends Component {

  state = {
    items: [],
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

