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
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { sendRSVPThunk, removeRSVPThunk } from "../../store/SingleEvent";
import { deleteEventThunk } from "../../store/event";
import socketio from "../../socket";

// import { io } from "socket.io-client";
// import IP from "../env";

import { useNavigation } from "@react-navigation/native";
import { getSingleEventThunk } from "../../store/SingleEvent";
import { sin } from "react-native-reanimated";

const SingleEvent = (props) => {
  const eventId = props.route.params.eventId;
  const eventTitle = props.route.params.eventTitle;
  const singleEvent = useSelector((state) => state.singleEvent);
  const user = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  let isRSVP = false;
  let host = false;
  const username = user.username;
  // const [disableButton, setDisableButton] = useState("false")

  const dispatch = useDispatch();
  const { attendanceDate, maxAttendees, description, location, name, time } =
    singleEvent;
  const navigation = useNavigation();
  const attendanceNumber = singleEvent.users ? singleEvent.users.length : 0;
  const userList = singleEvent.users ? singleEvent.users : [];

  useEffect(() => {
    dispatch(getSingleEventThunk(eventId));
    navigation.setOptions({ headerTitle: eventTitle });
  }, []);

  let disableButton = false;
  if (user.id === singleEvent.hostId) {
    host = true;
    disableButton = true;
  }

  if (maxAttendees <= attendanceNumber) {
    disableButton = true;
  }

  function RSVPstatus(eId, uId) {
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].id === user.id) {
        dispatch(removeRSVPThunk(eId, uId));
        isRSVP = false;
        return;
      }
    }

    dispatch(sendRSVPThunk(eventId, user.id));
  }
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === user.id) {
      isRSVP = true;
    }
  }

  function joinEventRoom(eventId, eventTitle) {
    navigation.navigate("Chatroom", { eventId, eventTitle });
    //Emit to join/create the room
    socketio.emit("joinRoom", { username, eventId });
  }

  return (
    <View style={styles.container}>
      <View style={styles.eventDetails}>
        <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
          {name}
        </Text>
        <View>
          <Text style={styles.headerText}>Time: </Text>
          <Text>{time}</Text>
          <Text style={styles.headerText}>Date: </Text>
          <Text>{attendanceDate}</Text>

          <Text style={styles.headerText}>Location: </Text>
          <Text>{location}</Text>

          <Text style={styles.headerText}>Description: </Text>
          <Text>{description}</Text>

          <Text style={styles.headerText}>Attendees:</Text>
          <Text>
            {attendanceNumber}/{maxAttendees}
          </Text>
        </View>
      </View>

      <Text>Attendees:</Text>
      <View style={styles.attendeeBox}>
        <FlatList
          data={userList}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 1, backgroundColor: "#F3A712" }} />;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                // onPress={() => {}}
                style={{ margin: 15 }}
                // onPress={()=>navigation.navigate("SingleEvent", { eventId:item.id })}
              >
                <Text>{item.username}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.objectContainer}>
        <View style={styles.buttonContainer}>
          <Button
            color="#E4572E"
            title="Join Chatroom"
            onPress={() => joinEventRoom(eventId, name)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color="#669BBC"
            title={isRSVP == true ? "UNRSVP" : "RSVP"}
            disabled={disableButton}
            onPress={() => RSVPstatus(eventId, user.id)}
          ></Button>
        </View>
      </View>
      {host && (
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={[styles.centeredView, { backgroundColor: "#DDDDDE" }]}>
              <View style={styles.modalView}>
                <Text style={{ textAlign: "center", paddingBottom: 5 }}>
                  Are You Sure You Want to Delete This Event?
                </Text>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { height: 35, width: 100 },
                  ]}
                  onPress={() => {
                    dispatch(deleteEventThunk(eventId, navigation));
                  }}
                >
                  <Text style={{ textAlign: "center" }}>Delete</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { height: 35, width: 100 },
                  ]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={{ textAlign: "center" }}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Button title="Delete Event" onPress={() => setModalVisible(true)} />
          {/* <Button
      title="Delete Event"
      onPress={() => dispatch(deleteEventThunk(eventId, navigation))}
      /> */}
          <Button
            title="Edit Event"
            onPress={() => navigation.navigate("EditEvent", { singleEvent })}
          />
        </View>
      )}
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
  buttonContainer: {
    margin: 10,
  },
  objectContainer: {
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginHorizontal: 50,
    backgroundColor: "white",
    borderRadius: 20,

    paddingHorizontal: 75,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    marginBottom: 10,
    padding: 5,
    elevation: 2,
    width: 100,
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "#E4572E",
  },
  buttonClose: {
    backgroundColor: "#E4572E",
  },
  eventDetails: {
    flex: 0.8,
    marginTop: 80,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#F3A712",
  },
  headerText: {
    fontWeight: "bold",
  },
  attendeeBox: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default SingleEvent;
