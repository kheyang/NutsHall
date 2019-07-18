import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import PropTypes from 'prop-types';
import NavigationManager from "../managers/navigationManager";
import Swiper from "react-native-swiper";

export default class EventComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
	}

  render() {
    return (
      <Swiper style={styles.viewPager} initialPage={0}>
        {this.props.items.map((item, index) => {
					return (
						<View style={styles.pageStyle} key={index}>
							<View style={styles.posterContainer}>
								<Image
									source={{uri : item.url}}
									style={styles.poster}
									resizeMode='contain'
								/>
							</View>
							<View style={styles.eventTitleContainer}>
								<Text style={styles.eventTitle}>
										{item.name}
								</Text>
							</View>
							<View style={styles.descriptionContainer}>
								<Text style={styles.description}>{item.description}</Text>
							</View>
							<View style={styles.buttonContainer}>
								<Button
									color='green'
									onPress={() => NavigationManager.navigate('Announcement Details', { title: item.name, eventPoster: item.url, eventDetails: item.details })}
									title="See Details"
								/>
							</View>
						</View>
					)
				})}
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: "Raleway-Regular",
  },
  viewPager: {
    flex: 1
  },
  pageStyle: {
    flexDirection:'column', 
    alignItems: 'center',
  },
  posterContainer: {
    flex:5,
		justifyContent: 'center',
		width: 300, //line 36 resize mode 'contain' will prevent the image from overflowing
		height: 150
  },
  poster: {
    flex: 1,
    marginTop: 20,
  },
  eventTitleContainer: {
    flex: 0.5,
    marginTop: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flex:3, 
    maxWidth: 300,
    justifyContent: 'center' 
  },
  description: {
    marginBottom: 20, 
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flex:1, 
    maxWidth: 150,
    marginBottom: 40,
  }
});