import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import NearbyEvents from "../Screens/NearbyEvents";
import CreateEvent from "../Screens/CreateEvent";

const DrawerNavigator = ({ navigation }) => {
  const Drawer = createDrawerNavigator();

  function Logout(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate('StartPage')}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator initialRouteName="Events" screenOptions={{drawerType: 'front', swipeEnabled: false, headerTitle: 'Hollar'}} drawerContent={(props) => <Logout {...props} />}>
      <Drawer.Screen name="Events" component={HomeNavigator} options={{}} />
      <Drawer.Screen name="Nearby Events" component={NearbyEvents} />
      <Drawer.Screen name="Create Event" component={CreateEvent} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
