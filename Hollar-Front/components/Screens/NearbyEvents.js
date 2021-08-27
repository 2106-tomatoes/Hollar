import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions} from 'react-native'
import * as Location from 'expo-location';
import {setOrigin} from '../../store/origin'
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from "react-native-maps";

const NearbyEvents = () => {
    const origin = useSelector(state => state.origin)

    const dispatch = useDispatch()

    
    useEffect(() => {
        //Uncomment getCurrentLocation() when not testing
        // getCurrentLocation()
        //comment out below after testing
        dispatch(setOrigin({latitude:38.8977, longitude:-77.0365}))
      }, []);

  
    const getCurrentLocation = async () => {
        // if(!Location.hasServicesEnabledAsync()){
            await Location.requestForegroundPermissionsAsync()
        // }    
        console.log('address',await Location.geocodeAsync('1600 Pennsylvania Ave NW, Washington, DC 20006'))
        const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync()
        const getCurrentLocation = {latitude,longitude}
        console.log('get',getCurrentLocation)
        dispatch(setOrigin(getCurrentLocation))
    } 


    if (origin === null) {
      return (
        <View/>
      )
    } else {
    
      return (
        <View style={styles.container}>
          <MapView
            style={{ flex: 1}}
            mapType="mutedStandard"
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
          ></MapView>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Search Hobbies"
                    // onChangeText={passwordHandler}
                    // value={password}
                />
        </View>
    )
    }
}

export default NearbyEvents

const width = Dimensions.get('window').width;
console.log("in map", width)
const styles = StyleSheet.create({
  container: {
    flex:1,
 
    width:width
  },
  textInput: {
    flex: 1
  }
})
