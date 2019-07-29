import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Image, Keyboard, SafeAreaView, AsyncStorage, ActivityIndicator, Item, Label } from 'react-native'
import NavigationManager from "../managers/navigationManager";
import {NavigationActions, StackActions} from "react-navigation";
import firebase from 'firebase';
import Login from './login';
import {db} from '../config'


let addUser = ( key ) => {
	db.ref('/user').child(key).set({key: key})
}

export default class SignUp extends React.Component {
  state = { email: '', password: '', name: '', error: '' }




onButtonPress() {
  this.setState({ error: '', loading: true })
  const { email, password, name } = this.state;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => { 
                  user = firebase.auth().currentUser;
                  addUser(user.uid)
                  user.updateProfile({
                    displayName: name
                    
                 })})
                .then(this.onLoginSuccess.bind(this))
        
        .catch((error) => {
          let errorCode = error.code
          let errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            this.onLoginFailure.bind(this)('Weak password!')
          } else {
            this.onLoginFailure.bind(this)(errorMessage)
          }
        });
      });
  }


onLoginSuccess() {
  this.setState({
    email: '', password: '', name: '', error: '', loading: false
  });
  Alert.alert("Account created!");
  // this.props.navigation.dispatch(
  //   NavigationActions.reset({
  //    index: 0,
  //    actions: [NavigationActions.navigate({ routeName: "drawerStack" })]
  //   })
  //  );
  // NavigationManager.navigate('drawerStack')

}

onLoginFailure(errorMessage) {
  this.setState({ error: errorMessage, loading: false });
}



  renderButton() {
    if (this.state.loading) {
      return(
          <View style={styles.spinnerStyle}>
             <ActivityIndicator size={"small"} color={'black'}/>
          </View>
      );
    }
    return (
      <View>
      <TouchableOpacity style={styles.buttonContainer}
              onPress={this.onButtonPress.bind(this)}
      >
          <Text style={styles.buttonText}> Sign Up </Text>
      </TouchableOpacity>

      <View padding={2}/>

      <TouchableOpacity style={styles.smallButtonContainer}
      onPress={() => NavigationManager.navigate('loginScreen')}
      >
          <Text style={styles.buttonText}> Already have an account? Login here! </Text>
      </TouchableOpacity>
</View>
    );
  }



render() {
    return (
<SafeAreaView style={styles.container}>
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
     <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
     
     <View flexGrow={1}>
      <View style={styles.logoContainer}>
      <Image
          source = {require("../assets/images/signIn/signInPage.png")}
          style = {{width:300, height:100, padding: 20, resizeMode:'contain'}}
        />
        {/* <Text style={styles.mainTitle}>NutsHall</Text>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
            </Text>}
        
        <Text style={styles.title}>Hall in a Nutshell</Text> */}
      </View>


    <View style={styles.inputContainer}>

          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Name"
            placeholderTextColor="black"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            returnKeyType="next"
            onSubmitEditing={()=>this.refs.email.focus()}
          />
    
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          placeholderTextColor="black"
          keyboardType='email-address'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          returnKeyType="next"
          onSubmitEditing={()=>this.refs.pw.focus()}
          ref={"email"}

        />
       
        <TextInput
          secureTextEntry
          autoCorrect={false}
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor="black"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          returnKeyType="go"
          ref={"pw"}
        />
        


       
        {this.renderButton()}

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>


        </View>
      
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </SafeAreaView>
    )




    //   <View style={styles.container}>
    //     <Text>Sign Up</Text>
    //     {this.state.errorMessage &&
    //       <Text style={{ color: 'red' }}>
    //         {this.state.errorMessage}
    //       </Text>}
    //     <TextInput
    //       placeholder="Email"
    //       autoCapitalize="none"
    //       style={styles.textInput}
    //       onChangeText={email => this.setState({ email })}
    //       value={this.state.email}
    //     />
    //     <TextInput
    //       secureTextEntry
    //       placeholder="Password"
    //       autoCapitalize="none"
    //       style={styles.textInput}
    //       onChangeText={password => this.setState({ password })}
    //       value={this.state.password}
    //     />
    //     <Button title="Sign Up" onPress={this.handleSignUp} />
    //     <Button
    //       title="Already have an account? Login"
    //       onPress={() => this.props.navigation.navigate('Login')}
    //     />
    //   </View>
    // )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      paddingVertical: 20,
    },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow:1,
    },
    logo: {
      width:128,
      height:56
    },
    mainTitle: {
      color:"#000000",
      fontFamily: "Raleway-Regular",
      fontSize:30,
      textAlign: 'center',
    },
    title: {
      color:"#000000",
      fontFamily: "Raleway-Regular",
      fontSize:18,
      textAlign: 'center',
      marginTop:5,
      opacity: 0.9,
    },
    inputContainer: {
      padding:20,
    },
    textInput: {
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.2)',
      color: '#000000',
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 10
    },
    buttonContainer: {
        backgroundColor: "#888888",
        paddingVertical: 10,
    },
    smallButtonContainer: {
      backgroundColor: "transparent",
      paddingVertical: 10,
  },
    buttonText :{
      textAlign: "center",
      color: "#000000",
      fontFamily: "Raleway-Regular",
      fontSize: 15
    },
    errorTextStyle: {
      fontSize: 14,
      alignSelf: 'center',
      color: 'red',
      fontFamily: "Raleway-Regular"
    },
    spinnerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  })