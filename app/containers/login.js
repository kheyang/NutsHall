import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Image, Keyboard, SafeAreaView, AsyncStorage, ActivityIndicator, Item, Label } from 'react-native'
import NavigationManager from "../managers/navigationManager";
import firebase from 'firebase';
// import Loading from './loading';


export default class Login extends React.Component {
  constructor(props) {
  super(props);
  this.state = { 
      email: '', 
      password: '', 
      error: '',
  }
}


// Login = (email, password) => {
//     try {
//         firebase
//             .auth()
//             .signInWithEmailAndPassword(email, password)
//             .then((user) => {
//                 this.setState({
//                     loading: false
//                 });            
//             console.log(JSON.stringify(user))
//             // AsyncStorage.setItem('userData', JSON.stringify(user));
//             NavigationManager.navigate('drawerStack')
//             //  res => {
//             //  console.log(res.user.email);
//     //   }
//             user = firebase.auth().currentUser;
//             user.updateProfile({
//                 displayName: (user.email).split('@')[0]
//             })
//     });
//     } catch (error) {
//         // this.setState({ errorMessage: error.message })
//         // console.log(error.toString(error));
//         this.setState({
//             loading: false,
//             errorMessage: error.message
//           });
//         alert(error.toString(error.message));
//       }
//     };



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
        NavigationActions.reset({
         index: 0,
         actions: [NavigationActions.navigate({ routeName: "drawerStack" })]
        })
       );
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
        )
      }
      return (
        // <Button
        //   title="Sign in"
        //   onPress={this.onButtonPress.bind(this)} 
        //   />
          <TouchableOpacity style={styles.buttonContainer}
        onPress={
          this.onButtonPress.bind(this)}
        // this.setState({ error: '', loading: true })
        // this.Login(this.state.email, this.state.password)}}
        >
            <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
      );
    }
  
  


  render() {
    return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
     <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
     
     <View flexGrow={1}>
      <View style={styles.logoContainer}>
      
        <Text style={styles.mainTitle}>NutsHall</Text>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
            </Text>}
        
        <Text style={styles.title}>Hall in a Nutshell</Text>
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

        {/* <Button title="LOGIN" onPress={() => this.Login(this.state.email, this.state.password)} />
        <Button title="SignUp" onPress={() => this.SignUp(this.state.email, this.state.password)} />
        <Button title="Login" onPress={this.handleLogin} />

        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        /> */}

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