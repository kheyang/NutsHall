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
      <Swiper style={{}} autoplay={true} key={this.props.items.length}
        dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}}/>}
        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4,marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
      >
        {this.props.items.map((item, index) => {
					return (
						<View style={styles.pageStyle} key={index}>
							<View style={styles.posterContainer}>
								<Image
									source={{uri : item.url}}
									style={styles.poster}
									resizeMode='contain'
                  key={index}
								/>
							</View>
              <View paddingVertical={5} />   
							<View style={styles.eventTitleContainer}>
								<Text style={styles.eventTitle}>
										{item.name}
								</Text>
							</View>
							<View style={styles.descriptionContainer}>
								<Text style={styles.description}>{item.description}</Text>
							</View>
							<View style={styles.buttonContainer}>
              <View paddingVertical={5} />   
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
    fontSize: 20,
    fontFamily: "Raleway-Regular",
  },
  pageStyle: {
    flexDirection:'column', 
    alignItems: 'center',
  },
  posterContainer: {
		justifyContent: 'center',
		width: 400,
		height: 400
  },
  poster: {
    width: 400,
		height: 400
  },
  eventTitleContainer: {

  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: "Raleway-Regular",
  },
  descriptionContainer: {
    maxWidth: 400,
    justifyContent: 'center' 
  },
  description: {
    textAlign: 'center',
  },
  buttonContainer: {
    maxWidth: 150,
  }
});