import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Facility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      // title: this.props.navigation.state.params.title,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  render () {
      const { params } = this.props.navigation.state
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`I'm facility: ${params.title}`}</Text>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  text: {
    fontFamily: "Raleway-Regular",
    color: 'black',
    fontSize: 40,
    fontWeight: 'normal',
  }
})

