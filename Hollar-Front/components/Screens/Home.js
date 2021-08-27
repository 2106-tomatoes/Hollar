import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { getChatListThunk } from "../../store/home";
import socketio from '../../socket';
import { setOrigin } from "../../store/origin";

const Home = (props) => {
  const { history, chatList } = props;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(() => {
    props.getChatList(user.id);
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




  function joinEventRoom(eventId) {
    console.log('Home, joinEventRoom, eventId:', eventId);
    history.push(`/chatroom/${eventId}`);
    //Emit to join/create the room
    socketio.emit('joinRoom', eventId);
  }



  if (chatList.length === 0) {
    return (
      <View>
        <Text>No messages</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Find Nearby Events!"
        onPress={() => history.push("/nearbyevents")}
      />
      <Button
        title="Create An Event!"
        onPress={() => history.push("/createevent")}
      />
      {chatList.map((event) => {
        return (
          <TouchableHighlight
            key={event.id}
            onPress={() => joinEventRoom(event.id)}
            underlayColor="white"
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{event.name}</Text>
              <Text style={styles.buttonText}>{event.maxAttendees}</Text>
              <Text style={styles.buttonText}>{event.location}</Text>
              <Text style={styles.buttonText}>{event.description}</Text>
            </View>
          </TouchableHighlight>
        );
      })}

      <Button title="Logout" onPress={() => history.push("/")} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    chatList: state.home.chatList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getChatList: (userId) => dispatch(getChatListThunk(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
