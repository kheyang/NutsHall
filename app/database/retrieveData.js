import React, { Component } from 'react';
import {db} from '../config';

let itemsRef = db.ref('/event');

export default class EventList extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        itemsRef.on('value', snapshot => {
            let data = snapshot.val()
            let items = Object.values(data)
            this.setState({items})
        })
    }

    render() {
        
    }
}