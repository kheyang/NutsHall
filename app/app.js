import React, {Component} from "react";
import {Platform, StyleSheet, ScrollView, Text, View, Button, Image, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems, NavigationActions, StackActions} from "react-navigation";
import Announcements from "./containers/announcementPage";
import AnnouncementDetails from './containers/announcementDetails';
import Facilities from "./containers/facilitiesPage";
import Facility from './containers/facility';
import UserBookings from './containers/userBookings';
import Login from './containers/login';
import SignUp from './containers/signup';
// import Loading from './containers/loading';
import FacilityBooking from './containers/facilityBooking';
import NavigationManager from "./managers/navigationManager";
import Calendar, {addEvent} from "./containers/calendar";
import AddingEvent from './containers/addingEvent';
import EditingEvent from './containers/editingEvent';
import Admin from "./containers/adminPanel";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from 'firebase';
// import drawerComponent from './containers/drawerComponent';
// import { createStore } from 'redux';
// import { Provider, Connect } from "react-redux";



// function reducer(state, action) {
//   console.log('reducer', state, action);
//   switch(action.type) {
//     case 'INCREMENT':
//       return {
//         count: state.count + 1
//       };
//     case 'DECREMENT':
//       return {
//         count: state.count - 1
//       };
//     case 'RESET':
//       return {
//         count: 0
//       };
//     default:
//       return state;
//   }
// }

// const store = createStore(reducer);
// store.dispatch({ type: "INCREMENT" });

// function mapStateToProps(state) {
//   return {
//     count: state.count
//   };
// }

// increment = () => {
//   this.props.dispatch({ type: "INCREMENT" });
// };

// decrement = () => {
//   this.props.dispatch({ type: "DECREMENT" });
// };

//Drawer navigator's toggle button
export class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('./assets/images/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//Stack Navigator's navigation options
const stackNavOptions =  ({ navigation }) => ({
  headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
  headerTitleStyle: {
    fontFamily: "Raleway-Medium",
    fontWeight: 'normal'
  },
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: '#000000',
})

//Drawer Navigator's content component
const drawerContentComponent = props => (
  <View paddingTop={20} flex={1}>
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Image 
        source={require("./assets/images/rh_logo.png")}
        style={{
          width: 120,
          height: 120,
          alignSelf: "center",
          marginTop:  40,
          marginBottom: 20         
        }}
        resizeMode="contain"
      />

      <DrawerItems {...props} />
      
    </SafeAreaView>
  </ScrollView>

<View padding={20}>
  <TouchableOpacity
      onPress={() => { 
        firebase.auth().signOut().then(()=> {
          // user = firebase.auth().currentUser;

        // props.navigation.dispatch(
        // StackActions.reset({
        //   index: 0,
        //   key: null,
        //   actions: [NavigationActions.navigate({ routeName: "primaryNav" })]

        // })
        // )

        // )

        props.navigation.replace('loginStack');
        Alert.alert("Logged out");

        }, (error) => {
          console.error('Sign out error', error)
          }
        )
    }
    }>
    <Text fontColor="black" fontFamily='Raleway-Bold' fontSize={18}>Logout </Text>

    </TouchableOpacity>
    </View>
    </View>
)



//Drawer Navigator's content options
const drawerContentOptions = {
  activeTintColor: '#006400',
  activeBackgroundColor:"transparent",
  labelStyle: {
    fontFamily: 'Raleway-Bold',
    fontWeight: 'normal',
  },
  itemsContainerStyle: {
    marginVertical: 10,
  },
}



//Announcement StackNavigation
const AnnouncementStack = createStackNavigator({
  Announcements: { 
    screen: Announcements,
    navigationOptions: ({ navigation }) => ({
      title: 'Announcements',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitleStyle: {
        fontFamily: "Raleway-Medium",
        fontWeight: 'normal'
      },
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000000',
    }),
  }, 
  'Announcement Details': { 
    screen: AnnouncementDetails, 
    navigationOptions: ({ navigation }) => ({
        // title: 'Announcement Details',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerTitleStyle: {
          fontFamily: "Raleway-Medium",
          fontWeight: 'normal'
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000000',
      }),
    },
}, {
  initialRouteName: 'Announcements',
})

//Facilities StackNavigation
const FacilitiesStack = createStackNavigator({
  Facilities: { 
    screen: Facilities,
    navigationOptions: stackNavOptions,
  }, 
  'UserBookings': { 
    screen: UserBookings, 
    navigationOptions: stackNavOptions,
    },
  'Facility': { 
    screen: Facility, 
    navigationOptions: stackNavOptions,
    },
    
    'FacilityBooking': { 
      screen: FacilityBooking, 
      navigationOptions: stackNavOptions,
      },
}, {
  initialRouteName: 'Facilities',
})

//Calendar StackNavigation
const CalendarStack = createStackNavigator({
  Calendar: { 
    screen: Calendar,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
    }),
  }, 
  'Adding Event': { 
    screen: AddingEvent, 
    navigationOptions: ({ navigation }) => ({
        // title: 'Announcement Details',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerTitleStyle: {
          fontFamily: "Raleway-Medium",
          fontWeight: 'normal'
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000000',
      }),
    },
    'Editing Event': { 
      screen: EditingEvent, 
      navigationOptions: ({ navigation }) => ({
          headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
          headerTitleStyle: {
            fontFamily: "Raleway-Medium",
            fontWeight: 'normal'
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000000',
        }),
      },
}, {
  initialRouteName: 'Calendar',
  headerMode: 'screen'
})

// const AdminStack = createStackNavigator({
//   Admin: { 
//     screen: Admin,
//     navigationOptions: ({ navigation }) => ({
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//     }),
//   }, 
// }, {
//   initialRouteName: 'Admin',
//   headerMode: 'screen'
// })

//Slide in DrawerNavigation
const MyDrawerNavigator = createDrawerNavigator(
  {
    AnnouncementStack: {
      screen: AnnouncementStack,
      navigationOptions: {
        drawerLabel: "Announcement"
      }
    },
    FacilitiesStack: {
      screen: FacilitiesStack,
      navigationOptions: {
        drawerLabel: "Facilities"
      }
    },
    CalendarStack: {
      screen: CalendarStack,
      navigationOptions: {
        drawerLabel: "Calendar"
      }
    },
    // AdminStack: {
    //   screen: AdminStack,
    //   navigationOptions: {
    //     drawerLabel: "Admin Panel"
    //   }
    // }
  },

  { 
    contentComponent: drawerContentComponent,
    contentOptions: drawerContentOptions,
    initialRouteName: 'AnnouncementStack', 
    drawerWidth:250,
    navigationOptions: ({ navigation }) => ({
      title: 'Facilities',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      // headerStyle: {
      //   backgroundColor: '#FF9800',
      // },
      // headerTintColor: '#fff',
    }),
  },
);


const drawerStack = createStackNavigator({
  drawerStack: { screen: MyDrawerNavigator }
}, 
)

// login stack
const LoginStack = createStackNavigator({
  loginScreen: { screen: Login },
  signUpScreen : {screen: SignUp }
  // loadingScreen: { screen: Loading },
  // forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
}, {
  headerMode: 'none',
  initialRouteName: 'signUpScreen'
 }
)



// let user = firebase.auth().currentUser;

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: MyDrawerNavigator }
}, {
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack'
})


// const InitialNavigator = createSwitchNavigator({
//   Loading: Loading,
//   App: PrimaryNav
// });


const AppContainer = createAppContainer(PrimaryNav);
// const AppContainer = createAppContainer(MyDrawerNavigator);


export default () => (
  <Root>
    <AppContainer
      ref={navigatorRef => {
        NavigationManager.setTopLevelNavigator(navigatorRef);
      }}
    />
  </Root>
);

// export default () => connect(mapStateToProps)(
//   <Root>
//     <Provider store={store}>

//     <AppContainer
//       ref={navigatorRef => {
//         NavigationManager.setTopLevelNavigator(navigatorRef);
//       }}
//     />
//       </Provider>
//   </Root>
// );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
});