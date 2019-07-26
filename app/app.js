import React, {Component} from "react";
import {Platform, StyleSheet, ScrollView, Text, View, Button, Image, TouchableOpacity } from "react-native";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator, SafeAreaView, DrawerItems} from "react-navigation";
import Announcements from "./containers/announcementPage";
import AnnouncementDetails from './containers/announcementDetails';
import Facilities from "./containers/facilitiesPage";
import Facility from './containers/facility';
import Login from './containers/login';
// import Loading from './containers/loading';
import FacilityBooking from './containers/facilityBooking';
import NavigationManager from "./managers/navigationManager";
import Calendar, {addEvent} from "./containers/calendar";
import AddingEvent from './containers/addingEvent';
import Icon from "react-native-vector-icons/FontAwesome";

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
);

//Drawer Navigator's content options
const drawerContentOptions = {
  activeTintColor: '#006400',
  labelStyle: {
    fontFamily: 'Raleway-Bold',
    fontWeight: 'normal',
  },
  itemsContainerStyle: {
    marginVertical: 10,
  },
  iconContainerStyle: {
    opacity: 1
  }
}

//Announcement StackNavigation
export const AnnouncementStack = createStackNavigator({
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
export const FacilitiesStack = createStackNavigator({
  Facilities: { 
    screen: Facilities,
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
export const CalendarStack = createStackNavigator({
  Calendar: { 
    screen: Calendar,
  //   navigationOptions: ({ navigation }) => ({
  //     title: 'Calendar',
  //     headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
  //     headerRight:  <Icon.Button
  //     name='plus'
  //     color = 'black'
  //     backgroundColor='transparent'
  //     onPress = {() => Calendar.addEvent(Calendar.state.date)}
  //   >
  //   </Icon.Button>,
  //     headerTitleStyle: {
  //       fontFamily: "Raleway-Medium",
  //       fontWeight: 'normal'
  //     },
  //     headerStyle: {
  //       backgroundColor: '#fff',
  //     },
  //     headerTintColor: '#000000',
  //   }),
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
}, {
  initialRouteName: 'Calendar',
  headerMode: 'screen'
})

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
  },

  { 
    contentComponent: drawerContentComponent,
    contentOptions:  drawerContentOptions,
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


const DrawerStack = createStackNavigator({
  drawerStack: { screen: MyDrawerNavigator }
}, 
)

// login stack
const LoginStack = createStackNavigator({
  loginScreen: { screen: Login },
  // loadingScreen: { screen: Loading },
  // forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
}, {
  headerMode: 'none',
  initialRouteName: 'loginScreen'
 }
)



// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: MyDrawerNavigator }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'drawerStack'
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
});