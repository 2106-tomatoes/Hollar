import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../Screens/LoginScreen";
import Home from "../Screens/Home";
import Chatroom from "../Screens/Chatroom";
import SignUp from "../Screens/SignUp";
import StartUp from "../Screens/StartUp";
import CreateEvent from "../Screens/CreateEvent";
import NearbyEvent from "../Screens/NearbyEvents";
import DrawerNavigator from "./DrawerNavigator";
import SingleEvent from "../Screens/SingleEvent"
import EditEvent from "../Screens/EditEvent"

const SinglePageNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator initialRouteName="StartPage" screenOptions={{headerShown: false, gestureEnabled: true}}>
        <Stack.Screen name="StartPage" component={StartUp} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Chatroom" component={Chatroom} options={{gestureEnabled: true, headerShown: true, headerBackVisible: true, headerBackTitleVisible: false}} />
        <Stack.Screen name="Drawer" component={DrawerNavigator}  options={{gestureEnabled: false}} />
        <Stack.Screen name="SingleEvent" component={SingleEvent} options={{gestureEnabled: true, headerShown: true, headerBackVisible: true, headerBackTitleVisible: false}} />
        <Stack.Screen name="EditEvent" component={EditEvent} options={{gestureEnabled: true, headerShown: true, headerBackVisible: true, headerBackTitleVisible: false}} />
      </Stack.Navigator>
  );
};

export default SinglePageNavigator;

const styles = StyleSheet.create({});

// export default class Routes extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     const socket = this.props.socket;

//     return (

// <NativeRouter>
//   <View style={styles.container}>
//     <Switch>
//       <Route exact path="/" component={StartUp}  />
//       <Route exact path="/login" component={LoginScreen}  />
//       <Route exact path="/signup" component={SignUp}  />
//       <Route exact path="/home" component={Home} />
//       <Route exact path="/createevent" component={CreateEvent} />
//       <Route exact path="/nearbyevents" component={NearbyEvent} />
//       <Route path="/chatroom/:id" render={({match})=><Chatroom socket={socket} match={match}/>} />
//     </Switch>
//   </View>
// </NativeRouter>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
