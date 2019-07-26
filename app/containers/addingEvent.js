import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Button, TextInput, Alert } from 'react-native'
import NavigationManager from "../managers/navigationManager";
import {db} from '../config'

let addReminder = (eventTitle, eventTime, eventDate) => {
	// db.ref('/reminders').push({
	// 	title: eventTitle,
	// 	time: eventTime,
	// 	date: eventDate
	// })
	db.ref('/reminders').child(new Date().valueOf()).set({title: eventTitle, time: eventTime, date: eventDate, serial: new Date().valueOf()})
}

// let addReminder = (eventTitle) => {
// 	db.ref('/reminders').push({
// 		title: eventTitle,
// 		time: eventTime,
// 		date: eventDate
// 	})
// }

export default class AddingEvent extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: "Set Reminder: " + navigation.state.params.date, 
		selectedDate: navigation.state.params.date
	})
  constructor(props) {
    super(props);
    this.state = {
			eventTitle: '',
			eventTime: '',
			eventDate: ''
    };
  }

  // static navigationOptions = ({ navigation }) => ({
	// 	title: "Set Reminder: " + navigation.state.params.date, 
	// 	selectedDate: navigation.state.params.date
	// })
	
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
		addReminder(this.state.eventTitle, this.state.eventTime, this.state.eventDate)
		// addReminder(this.state.eventTitle)
		// AlertIOS.alert('Reminder added successfully!')
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
							Alert.alert('Reminder has been added successfully!')
							NavigationManager.goBack()
						}
					}
						
						// onPress={
						// 	this.handleSubmit}
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