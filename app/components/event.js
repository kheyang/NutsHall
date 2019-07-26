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
    fontSize: 18,
    fontFamily: "Raleway-Regular",
  },
  // viewPager: {
  //   flex: 1
  // },
  pageStyle: {
    flexDirection:'column', 
    alignItems: 'center',
  },
  posterContainer: {
    // flex:5,
		justifyContent: 'center',
		width: 300, //line 36 resize mode 'contain' will prevent the image from overflowing
		height: 300
  },
  poster: {
    // flex: 1,
    // marginTop: 20,
    width: 300,
		height: 300
  },
  eventTitleContainer: {
    // flex: 0.5,
    // marginTop: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    // flex:3, 
    maxWidth: 300,
    justifyContent: 'center' 
  },
  description: {
    // marginBottom: 20, 
    // marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    // flex:1, 
    maxWidth: 150,
    // marginBottom: 40,
  }
});