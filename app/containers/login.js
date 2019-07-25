import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Image, Keyboard, SafeAreaView, AsyncStorage, ActivityIndicator, Item, Label } from 'react-native'
import NavigationManager from "../managers/navigationManager";
import firebase from 'firebase';
import Loading from './loading';


export default class Login extends React.Component {
  constructor(props) {
  super(props);
  this.state = { 
      email: '', 
      password: '', 
      errorMessage: null,
      isLoading: true };
  }


//   SignUp = (email, password) => {
//     try {
//       firebase
//           .auth()
//           .createUserWithEmailAndPassword(email, password)
//           .then(
//               user => { 
//                  console.log(user);
//            }
//            );
//     } catch (error) {
//             this.setState({ errorMessage: error.message })
//             // console.log(error.toString(error));
//             Alert.alert(error.toString(error));
//           }
//         };

performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }


Login = (email, password) => {
    try {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.setState({
                    loading: false
                });            
            console.log(JSON.stringify(user))
            AsyncStorage.setItem('userData', JSON.stringify(user));
            NavigationManager.navigate('loadingScreen')
            //  res => {
            //  console.log(res.user.email);
    //   }
            user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: (user.email).split('@')[0]
            })
    });
    } catch (error) {
        // this.setState({ errorMessage: error.message })
        // console.log(error.toString(error));
        this.setState({
            loading: false,
            errorMessage: error.message
          });
        alert(error.toString(error.message));
      }
    };




  render() {
    if (this.state.isLoading) {
        return <Loading />;
      }
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
        
        <TouchableOpacity style={styles.buttonContainer}
        onPress={() => this.Login(this.state.email, this.state.password)}
        >
            <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>


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
  }
})