import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { StackActions } from '@react-navigation/native';
import NearbyEvents from "../Screens/NearbyEvents";
import CreateEvent from "../Screens/CreateEvent";
import Home from "../Screens/Home";
import { connect, useDispatch, useSelector } from "react-redux";
import DirectMsgs from "../Screens/DirectMsgs";
import DemoScreen from "../Screens/DemoScreen"
import App from "./tabnavigation"
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
const DrawerNavigator = ({ navigation }) => {
  const Drawer = createDrawerNavigator();
  const user = useSelector((state) => state.user);

  function Logout(props) {
    return (
    
   
      <DrawerContentScrollView {...props}>
        <View style={{flex:1, flexDirection:"row",marginBottom:20, borderBottomColor:"#D3D3D3", borderBottomWidth:1}}>
        <Icon name="user" size={30} style={{marginLeft:10, marginBottom:20}}></Icon>
        <Text style={{marginLeft:10, fontSize: 30}}>{user.username}</Text>
        </View>
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
      
      
      <Drawer.Screen name="Events" component={App} independent={true} />
     {/* <Drawer.Screen name="Events" component={Home} options={{}} /> */}
      <Drawer.Screen name="Nearby Events" component={NearbyEvents} />
      <Drawer.Screen name="Create Event" component={CreateEvent} />
      <Drawer.Screen name="Direct Messages" component={DirectMsgs} />
      <Drawer.Screen name="Demo" component={DemoScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
