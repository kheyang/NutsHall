import React, { Component } from "react";
import { View, Image, ScrollView, CardItem, Card, TouchableOpacity, Button, StyleSheet } from "react-native";
import { Container, Thumbnail, Text } from "native-base";
import AppHeader from "../components/header.js";
import NavigationManager from "../managers/navigationManager";


/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

const facilities = [
  { 
    name: 'Hard Court',
    image: require("../assets/images/hardcourt.jpg")
  },
  { 
    name: 'Tv Room',
    image: require("../assets/images/tv_room.jpg")
  },
  { 
    name: 'Meeting Room',
    image: require("../assets/images/rh_entrance.jpg")
  },
  { 
    name: 'Dance Studio',
    image: require("../assets/images/dancestudio.png")
  },
]

export default class FacilitiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
    };
  }
  /*
    React LifeCycle Methods: 
    e.g. componentWillMount(),
         componentDidMount
         
    additional JS functions 
    -> to change the state of component,
    -> call API to pass and receive data from backend
    -> any other functions etc.
  */
//  render() {
//   let rows = [];

//   for (let idx in facilities) {
//     rows.push(
//       <CardItem key={idx}>
//         <TouchableOpacity
//           style={{ flexDirection: "row", justifyContent: "space-evenly" }}
//           onPress={() =>
//             NavigationManager.navigate("Facility", {
//               title: facilities[idx]
//             })
//           }
//         >
//           {/* <View style={{ flexDirection: "column" }}>
//             <Thumbnail square large source={groceryData[idx]["image"]} />
//           </View> */}
//           <View style={[{ paddingLeft: "20%" }]}>
//             <Text>{facilities[idx]['name']}</Text>

//             {/* <Text style={{ paddingTop: 15 }}>
//               S$ {facilities[idx]["name"].toFixed(2)}
//             </Text> */}
//           </View>
//         </TouchableOpacity>
//       </CardItem>
//     );
//   }

//   return (
//     <Container>
//       <ScrollView>
//         <Card>
//           <CardItem>
//             <Text>{rows.length} Results</Text>
//           </CardItem>
//           {rows}
//         </Card>
//       </ScrollView>
//     </Container>
//   );
// }
// }


 static navigationOptions = {
  title: 'Facilities'
 }


 renderFacility = (facility, i) => {
  return (
    <TouchableOpacity
      key={i}
      style={styles.facility}
      onPress={() => NavigationManager.navigate('Facility', { title: facility.name })}
      title={facility.name}
    >
    <View>
      <Image 
        resizeMode="cover"
        source={facility.image}
        style={{
          width: "100%",
          height: 150,
          opacity: 0.6,
          borderWidth: 1,
          borderColor: '#000000',
        }} 
      />
    </View>

    <View
      style={{
        position: "absolute",
        top: 0,
        left: "5%",
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "flex-start"
      }}
    >

            
      <Text style={styles.facilityText}>{facility.name}</Text>
      </View>
    
    </TouchableOpacity>)
 }


  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

    // Notice JSX - a html-JS like syntax is within ()
    return (
    <Container>
      <ScrollView>
        {facilities.map(this.renderFacility)}
        </ScrollView>
      </Container>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    // flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    padding: 20
  },
  text: {
    fontFamily: "Raleway-Regular",
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    
  },
  facility: {
    padding: 1,
    backgroundColor: 'transparent',
  },
  facilityText: {
    fontFamily: "Raleway-Medium",
    color: 'black',
    fontSize: 20,

  }
})

/*
//Internal StyleSheet here
*/


module.export = FacilitiesPage; //module export statement
