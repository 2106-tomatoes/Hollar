import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import Chatroom from "../Screens/Chatroom";

const HomeNavigator = (props) => {
  const Stack = createNativeStackNavigator();
  // console.log("home navigator props", props)
  // const parent = props.navigation.getParent()
  // console.log("parent", parent)
  // parent.reset()
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, headerBackVisible: true}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chatroom" component={Chatroom} options={{headerShown: true, headerTitle: '', headerShadowVisible: false}} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});
