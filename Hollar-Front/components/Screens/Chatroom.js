import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { Link } from "react-router-native";
import { connect } from "react-redux";
import { getChatThunk, sendChatThunk } from "../../store/chatroom";
import { createDmEventThunk } from "../../store/directMsgsRoom";
import socketio from "../../socket";
import { useNavigation } from "@react-navigation/native";

const Chatroom = (props) => {
  // console.log("props in chatroom", props)
  const { getChat, createDmEvent, message, user } = props;
  const navigation = useNavigation();
  const userId = user.id;
  const username = user.username;
  const [input, setInput] = useState("");
  //Navigation params
  const eventId = props.route.params.eventId;
  const eventTitle = props.route.params.eventTitle;
  
  const chatPackage = {
    messageContent: input,
    userId,
    eventId,
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [currMsg, setCurrMsg] = useState(null);

  useEffect(() => {
    getChat(eventId);

    navigation.setOptions({ headerTitle: eventTitle });

    //ComponentWillUnmount and leave room
    return function leaveEventRoom() {
      socketio.emit('leaveRoom', { username, eventId });
      // console.log('Chatroom, after emitting leaveRoom');
    }
  }, []);

  async function submitChatMessage(e) {
    e.preventDefault();

    const postResponse = await props.sendChat(eventId, chatPackage);
    // console.log('Chatroom, postResponse', postResponse);
    socketio.emit("chatMessage", postResponse);
    // console.log('Chatroom, emitted');
    setInput("");
  }

  async function handleDirectMsg(user) {
    //Have to also check if pressing on a status msg or the user itself
    console.log('handleDirectMsg, id:', user.id, typeof user.id);
    const userToDm = currMsg.user;
    const today = new Date().toLocaleDateString(); //need to change this?
    const dmEventDetails = {
      user,
      userToDm,
      name: `${user.username} to ${userToDm.username}`,
      maxAttendees: 2,
      location: 'DM',
      description: 'DM',
      eventObjectType: 'dm',
      attendanceDate: today,
    }

    setModalVisible(!modalVisible);
    //Create DM event and pass in new DM event id and title to DirectMsgsRoom
    const dmEventInfo = await createDmEvent(dmEventDetails);
    const { dmEventId } = dmEventInfo;

    //Change the dmEventTitle here
    const dmEventTitle = `To ${userToDm.username}`;
    socketio.emit('joinDmRoom', { username, dmEventId });
    navigation.navigate("DirectMsgsRoom", { dmEventId, dmEventTitle });
  }

  function setUpModalThenDisplay(msg) {
    setCurrMsg(msg);
    setModalVisible(true);
  }

  // console.log('Chatroom, stateChatroom:', props.stateChatroom);
  // console.log('Chatroom, stateDmRoom:', props.stateDmRoom);
  // console.log('Chatroom, state:', props.state);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {currMsg === null ? '' : currMsg.user.username}{'\n'}
              {currMsg === null ? '' : currMsg.user.state}
            </Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleDirectMsg(user)}
            >
              <Text style={styles.textStyle}>Send direct message</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Go Back</Text>
            </Pressable>
          </View>
        </View>

      </Modal>

      {message.map((msg) => {
        return (
          
          <View key={msg.id}>
            <Pressable 
              onLongPress={() => setUpModalThenDisplay(msg)}
              style={[styles.button, styles.buttonOpen]}
            >
              {/* // style={({ pressed }) => [
              //   {
              //     backgroundColor: pressed
              //       ? 'rgb(210, 230, 255)'
              //       : 'white'
              //   },
              //   styles.wrapperCustom
              // ]}> */}
              {({ pressed }) => (
                <Text style={styles.text}>
                  {pressed ? msg.user.username : msg.user.username}: {msg.messageContent}
                </Text>
              )}
              {/* <Text>{msg.user.username}: {msg.messageContent}</Text> */}
            </Pressable>
          </View>
         
        );
      })}

      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={(chatMessage) => {
          setInput(chatMessage);
        }}
        onSubmitEditing={submitChatMessage}
        maxLength={20}
      />

      {/* <Link to={"/home"}>
        <Text>Back to Home</Text>
      </Link> */}
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
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 14
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

const mapStateToProps = (state) => {
  return {
    message: state.chatroom.messages,
    user: state.user,
    // stateDmRoom: state.dmRoom,
    // stateChatroom: state.chatroom,
    // state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChat: (eventId) => dispatch(getChatThunk(eventId)),
    sendChat: (eventId, chatPackage) => 
      dispatch(sendChatThunk(eventId, chatPackage)),
    createDmEvent: (dmEventDetails) => dispatch(createDmEventThunk(dmEventDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
