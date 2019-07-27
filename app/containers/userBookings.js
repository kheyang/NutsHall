import React, {Component} from 'react';
import { Text, Alert, View, Button, StyleSheet, TouchableOpacity, PanResponder, AsyncStorage, Image, Dimensions, TextInput, ScrollView,Platform, Picker} from 'react-native';
import firebase from 'firebase';
import { db } from '../config';



export default class UserBookings extends Component {
    constructor(props) {
      super(props);
    
        this.state = {
            bookings: [],
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title:'My Bookings'
    })
    
    componentDidMount() {
        let bookingRef = db.ref("user/" + firebase.auth().currentUser.uid + "/bookings");
        bookingRef.on('value', snapshot => {
            let data = snapshot.val()
            let items = Object.values(data)
            this.setState({bookings: items})
            console.log(this.state.bookings)
        })
    }

renderItems = (item, index) => {

}
 



render() {
    return(
        <View>




        </View>



    );
}
}

module.export = UserBookings; //module export statement