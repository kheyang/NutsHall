import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Button, TextInput, Alert } from 'react-native'
import NavigationManager from "../managers/navigationManager";
import {db} from '../config';
import firebase from 'firebase';

let editReminder = (updatedTitle, updatedTime, serialNumber) => {
	db.ref('user/'+ firebase.auth().currentUser.uid + '/reminders/').child(serialNumber).update({
		'time': updatedTime,
		'title': updatedTitle
	})
}


export default class EditingEvent extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: "Edit Reminder: " + navigation.state.params.date, 
		selectedDate: navigation.state.params.date,
		serialNumber: navigation.state.params.serial,
		time: navigation.state.params.time,
		event: navigation.state.params.title
	})
  constructor(props) {
    super(props);
    this.state = {
			eventTitle: this.props.navigation.state.params.title,
			eventTime: this.props.navigation.state.params.time,
			eventDate: ''
    };
  }
	
	handleTitleChange = e => {
		this.setState({
			eventTitle: e.nativeEvent.text
		})
	}

	handleTimeChange = e => {
		this.setState({
			eventTime: e.nativeEvent.text
		})
	}
	
	handleSubmit = () => {
		editReminder(this.state.eventTitle, this.state.eventTime, this.props.navigation.state.params.serial)
	}

  render () {
    const { params } = this.props.navigation.state
    return (
      <ScrollView>
        <View style={styles.container}>
					<View style={{height:30}}/>
					<Text>
						Title:
					</Text>
					<View style={{borderBottomWidth: 1, width: 330}}>
						<TextInput
							placeholder = 'Type here!'
							defaultValue = {params.title}
							onChange = {this.handleTitleChange}
						>
						</TextInput>
					</View>
					<View style={{height:30}}/>
					<Text>
						Time:
					</Text>
					<View style={{borderBottomWidth: 1, width: 330}}>
						<TextInput
							placeholder = 'Insert time here!'
							defaultValue = {params.time}
							onChange = {this.handleTimeChange}
						>
						</TextInput>
					</View>
        </View>
        <TextInput/>
        <View style={styles.buttonContainer}>
					<Button
						color='green'
						title = 'Done'
						onPress = {() => { 
							this.setState({eventDate: params.date})
							setTimeout(() => {
								this.handleSubmit()
							},1)
							Alert.alert('Reminder has been updated successfully!')
							NavigationManager.goBack()
						}
					}
					/>
					<Button
            color='grey'
            onPress={() => NavigationManager.goBack()}
            title = 'Go back'
          />
        </View>
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
		marginLeft: 20,
		marginRight: 20,
    flexDirection:"column", 
    alignItems:'flex-start', 
    justifyContent:'space-between',
  },
  buttonContainer: {
		marginLeft:40,
		marginRight:40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
  },
})