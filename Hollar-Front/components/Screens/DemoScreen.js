import { useNavigation } from "@react-navigation/native";
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setDemo} from "../../store/demo"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable
} from "react-native";
import { setOrigin } from "../../store/origin";
import * as Location from 'expo-location';


const DemoScreen = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const demo = useSelector(state => state.demo)
  // useEffect(() => {
  //   navigation.addListener("focus", () => {
  //     dispatch(setDemo(demo))
  //     navigation.navigate("Events")
  //   });
  // }, [])

  // const getCurrentLocation = async () => {

  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     console.log('Permission to access location was denied');
  //     return;
  //   }
  //   await Location.getBackgroundPermissionsAsync()
  //   let {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});
  //   let location = {latitude,longitude}
  //   console.log('demo screen location',location)
  //   dispatch(setOrigin(location));
  // };


  return (
    <View>
      <Text>For Demo Purposes, Pressing the Button Will Set You at Farragut Square Washington,DC to View All Pre-created Events</Text>
      <Button title="Set to demo location" onPress={() => {
        if (!demo) {
          dispatch(setOrigin({ latitude: 38.8977, longitude: -77.0365 }))
        }
        dispatch(setDemo(demo))
        // else {
        //   console.log("demo screen set origin to current location")
        //   getCurrentLocation()
        //   dispatch(setDemo(demo))
        // }
        }}/>
    </View>
  )
}


export default DemoScreen
