import React, {Component} from "react";
import {Platform, StyleSheet, ScrollView, Text, View, Button, Image, TouchableOpacity } from "react-native";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator, createDrawerNavigator, SafeAreaView, DrawerItems} from "react-navigation";
import Announcements from "./containers/announcementPage";
import AnnouncementDetails from './containers/announcementDetails';
import Facilities from "./containers/facilitiesPage";
import Facility from './containers/facility';
import NavigationManager from "./managers/navigationManager";




class NavigationDrawerStructure extends Component {
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
        backgroundColor: '#006400',
      },
      headerTintColor: '#fff',
    }),
  }, 
  'AnnouncementDetails': { 
    screen: AnnouncementDetails, 
    navigationOptions: ({ navigation }) => ({
        title: 'Announcement Details',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerTitleStyle: {
          fontFamily: "Raleway-Medium",
          fontWeight: 'normal'
        },
        headerStyle: {
          backgroundColor: '#989898',
        },
        headerTintColor: '#fff',
      }),
    },
}, {
  initialRouteName: 'Announcements',
})



//Facilities StackNavigation
export const FacilitiesStack = createStackNavigator({
  Facilities: { 
    screen: Facilities,
    navigationOptions: ({ navigation }) => ({
      title: 'Facilities',
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
              // },
  'Facility': { 
    screen: Facility, 
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
  initialRouteName: 'Facilities',
})



//DrawerNavigation
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

const MyDrawerNavigator = createDrawerNavigator(
  {
    AnnouncementStack: {
      screen: AnnouncementStack,
      navigationOptions: {
        drawerLabel: "Announcement"
      }
    },
    'FacilitiesStack': {
      screen: FacilitiesStack,
      navigationOptions: {
        drawerLabel: "Facilities"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    
  },
});
