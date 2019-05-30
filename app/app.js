import React, {Component} from "react";
import {Platform, StyleSheet, ScrollView, Text, View, Button, Image} from "react-native";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from "react-navigation";
import AnnouncementPage from "./containers/announcementPage";
import FacilitiesPage from "./containers/facilitiesPage";

import NavigationManager from "./managers/navigationManager";


// const MyStackNavigator = createStackNavigator(
//   {
//     AnnouncementPage: {
//       screen: AnnouncementPage
//     },
//     FacilitiesPage: {
//       screen: FacilitiesPage
//     },
//   },
//   {
//     headerMode: "none"
//   }

// );

// const AppContainer = createAppContainer(MyStackNavigator);

// // export default AppContainer;

// export default () => (
//   <Root>
//     <AppContainer
//       ref={navigatorRef => {
//         // console.log(navigatorRef);
//         NavigationManager.setTopLevelNavigator(navigatorRef);
//       }}
//     />
//   </Root>
// );





const MyDrawerNavigator = createDrawerNavigator(
  {
    'Announcement Page': {
      screen: AnnouncementPage
    },
    'Facilities Page': {
      screen: FacilitiesPage
    },
  }, 
  { 
    contentComponent: props => (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <Image 
          source={require("./assets/images/rh_logo.png")}
          style={{
                width: 120,
                // flex: 1,
                //justifyContent: "center",
                //marginLeft: 40, 
                height: 120,
                // padding:50,
                // borderWidth: 50,
                // marginLeft: "auto",
                // marginRight: "auto",
                alignSelf: "center",
                marginTop:  40,
                marginBottom: 20
                
                }}
                resizeMode="contain"
          />
          <DrawerItems {...props} />
        </SafeAreaView>
      </ScrollView>
    ),
    
    contentOptions: {
      activeTintColor: '#006400',
      itemsContainerStyle: {
        marginVertical: 10,
      },
      iconContainerStyle: {
        opacity: 1
      }
    },
    headerMode: "none",
  }
);

const AppContainer = createAppContainer(MyDrawerNavigator);

export default () => (
  <Root>
    <AppContainer
      ref={navigatorRef => {
        NavigationManager.setTopLevelNavigator(navigatorRef);
      }}
    />
  </Root>
);



// drawerContentComponent = props => (
//   <ScrollView>
  
//     <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
//       <DrawerItems {...props} />
//     </SafeAreaView>
//   </ScrollView>
// );



// const customComponent = (props) => (
//   <ScrollView
//     style={styles.container}>
//     <DrawerItems {...props} />
//   </ScrollView>
// );






/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  render() {
    return (
      
        <View>
          <AppHeader />
          <Text> Hello World!!! </Text>
        </View>

      // <View style={styles.container}>
      //   <Text style={styles.welcome}>Welcome to React Native!</Text>
      //   <Text style={styles.instructions}>HELLO!!</Text>
      //   <Text style={styles.instructions}>{instructions}</Text>
      // </View>
    );
  }
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  stretch: {
    height: 120,
    width: 120
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
