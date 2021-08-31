import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import { sendRSVPThunk } from "../../store/SingleEvent";

// import { io } from "socket.io-client";
// import IP from "../env";

import { useNavigation } from "@react-navigation/native";
import { getSingleEventThunk } from "../../store/SingleEvent";

const SingleEvent = (props) => {
  const eventId = props.route.params.eventId;
  const eventTitle = props.route.params.eventTitle;
  const singleEvent = useSelector((state) => state.singleEvent);
  const user = useSelector((state) => state.user);
  // const [disableButton, setDisableButton] = useState("false")

  const dispatch = useDispatch();
  const { attendanceDate, maxAttendees, description, location, name } =
    singleEvent;
  const navigation = useNavigation();
  const attendanceNumber = singleEvent.users ? singleEvent.users.length : 0;
  const userList = singleEvent.users ? singleEvent.users : [];


  useEffect(() => {
    dispatch(getSingleEventThunk(eventId));
    navigation.setOptions({headerTitle:eventTitle})
  }, []);

  let disableButton = false
  userList.forEach((attendee)=>{
    if(attendee.id===user.id){
      console.log('this is working!')
      disableButton=true;
    }
  })
  if(maxAttendees<=attendanceNumber){
    disableButton=true;
  }



  return (
    <View style={styles.container}>
      <Text>Title: {name}</Text>
      <Text>Location: {location}</Text>
      <Text>Description: {description}</Text>
      <Text>Date: {attendanceDate}</Text>
      <Text>
        Attendees: {attendanceNumber}/{maxAttendees}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Chatroom", { eventId, name })}
        underlayColor="white"
        style={{ flexDirection: "row", paddingVertical: 20 }}
      >
        <Text>Join Chatroom</Text>
      </TouchableOpacity>
      <Button title="RSVP" disabled={disableButton} onPress={()=>dispatch(sendRSVPThunk(eventId,user.id))}>
      </Button>
      <Text>Attendees:</Text>
      <FlatList
        data={userList}
        style={{ flex: 1 }}
        keyExtractor={item=>item.id.toString()}
        ItemSeparatorComponent={() => {
          return <View style={{height: 1, backgroundColor: '#DDDDDF'}} />;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
            // onPress={() => {}}
            style={{ margin: 15 }}
            // onPress={()=>navigation.navigate("SingleEvent", { eventId:item.id })}
          >
            <Text>{item.username}</Text>

          </TouchableOpacity>
          )
        }}
        />
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
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 20,
    fontSize: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default SingleEvent;