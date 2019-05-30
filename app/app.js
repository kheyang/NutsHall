import React, {Component} from "react";
import {Platform, StyleSheet, Text, View, Button} from "react-native";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator, createDrawerNavigator } from "react-navigation";
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
    contentOptions: {
      activeTintColor: '#006400',
      itemsContainerStyle: {
        marginVertical: 150,
      },
      iconContainerStyle: {
        opacity: 1
      }
    },
    // contentComponent: customComponent,
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
    alignItems: 'center',
    backgroundColor: '#006400',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
