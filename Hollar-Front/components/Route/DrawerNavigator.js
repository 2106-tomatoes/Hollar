import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { StackActions } from '@react-navigation/native';
import NearbyEvents from "../Screens/NearbyEvents";
import CreateEvent from "../Screens/CreateEvent";
import Home from "../Screens/Home";
import DirectMsgs from "../Screens/DirectMsgs";
import DemoScreen from "../Screens/DemoScreen"

const DrawerNavigator = ({ navigation }) => {
  const Drawer = createDrawerNavigator();

  function Logout(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.dispatch(StackActions.popToTop())}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator initialRouteName="Events" screenOptions={{drawerType: 'front', swipeEnabled: false, headerTitle: 'Hollar'}} drawerContent={(props) => <Logout {...props} />}>
      <Drawer.Screen name="Events" component={Home} options={{}} />
      <Drawer.Screen name="Nearby Events" component={NearbyEvents} />
      <Drawer.Screen name="Create Event" component={CreateEvent} />
      <Drawer.Screen name="Direct Messages" component={DirectMsgs} />
      <Drawer.Screen name="Demo" component={DemoScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
