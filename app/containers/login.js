import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Image, Keyboard, SafeAreaView, AsyncStorage, ActivityIndicator, Item, Label, BackHandler } from 'react-native'
import NavigationManager from "../managers/navigationManager";
import firebase from 'firebase';
import { NavigationActions, StackActions} from "react-navigation";

console.disableYellowBox = true;

export default class Login extends React.Component {
  constructor(props) {
  super(props);
  this.state = { 
      email: '', 
      password: '', 
      error: '',
  }
  this.handleBackButton= this.handleBackButton.bind(this);

}

componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton() {
  Alert.alert(
    ' Exit',
    ' Do you want to exit?',
    [
      { text: 'Yes', onPress: () => BackHandler.exitApp() },
      { text: 'No', onPress: () => console.log('No Pressed') }
    ],
    { cancelable: false },
  );
  return true;
}


    onButtonPress() {
      this.setState({ error: '', loading: true })
      const { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
            .catch((error) => {
              let errorMessage = error.message;  
                this.onLoginFailure.bind(this)(errorMessage)
              }
            );}
  

    onLoginSuccess() {
      this.setState({
        email: '', password: '', error: '', loading: false
      });
      this.props.navigation.dispatch(
        StackActions.reset({
         index: 0,
         key:null,
         actions: [NavigationActions.navigate({ routeName: "drawerStack" })]
        })
       );
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
        )
      }
      return (
        <View>
          <TouchableOpacity style={styles.buttonContainer}
        onPress={
          this.onButtonPress.bind(this)}
        >
            <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>

         <View padding={2}/>

        <TouchableOpacity style={styles.smallButtonContainer}
        onPress={() => NavigationManager.navigate('signUpScreen')}
        >
            <Text style={styles.buttonText}> Don't have an account? Sign Up </Text>
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
      </View>


    <View style={styles.inputContainer}>
    
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