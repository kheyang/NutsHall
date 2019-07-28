import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native'
import NavigationManager from "../managers/navigationManager";

export default class AnnouncementDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    eventPoster: navigation.state.params.url,
    eventDetails: navigation.state.params.details,
  })

  render () {
    const { params } = this.props.navigation.state
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.posterContainer}>
            <Image source={{uri: params.eventPoster}} style={styles.poster} resizeMode='contain'/>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>
              {params.eventDetails}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              color='grey'
              onPress={() => NavigationManager.goBack()}
              title = 'Go back'
              />
          </View>
        </View>
      </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"column", 
    alignItems:'center', 
    justifyContent:'space-between',
  },
  posterContainer: {
    height: 500,
    width: 450
  },
  poster: {
    flex:1, 
    maxWidth:400,
  },
  detailsContainer: {
    marginLeft: 40, 
    marginRight: 40,
  },
  details: {
    textAlign:'left', 
    fontSize: 16,
  },
  buttonContainer: {
    margin: 40,
  },
})