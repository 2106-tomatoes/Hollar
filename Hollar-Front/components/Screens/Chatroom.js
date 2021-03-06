import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { Link } from "react-router-native";
import { connect } from "react-redux";
import { getChatThunk, sendChatThunk } from "../../store/chatroom";
import { createDmEventThunk } from "../../store/directMsgsRoom";
import socketio from "../../socket";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { GiftedChat } from "react-native-gifted-chat";

const Chatroom = (props) => {
  // console.log("props in chatroom", props)
  const { getChat, createDmEvent, messages, user } = props;
  const navigation = useNavigation();
  const userId = user.id;
  const username = user.username;

  const [input, setInput] = useState("");
  const [textHeight, setTextHeight] = useState(0);
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
      socketio.emit("leaveRoom", { username, eventId });
    };
  }, []);

  async function submitChatMessage() {
    // e.preventDefault();

    const postResponse = await props.sendChat(eventId, chatPackage);
    socketio.emit("chatMessage", postResponse);
    setInput("");
  }

  async function handleDirectMsg(user) {
    const userToDm = currMsg.user;
    const today = new Date().toISOString().split("T")[0];
    const dmEventDetails = {
      user,
      userToDm,
      name: `${user.username} to ${userToDm.name}`,
      maxAttendees: 2,
      location: "DM",
      description: "DM",
      eventObjectType: "dm",
      attendanceDate: today,
    };

    setModalVisible(!modalVisible);
    //Create DM event and pass in new DM event id and title to DirectMsgsRoom
    const dmEventInfo = await createDmEvent(dmEventDetails);
    const { dmEventId } = dmEventInfo;

    const dmEventTitle = `To ${userToDm.name}`;
    socketio.emit("joinDmRoom", { username, dmEventId });
    navigation.navigate("DirectMsgsRoom", { dmEventId, dmEventTitle });
  }

  function setUpModalThenDisplay(context, msg) {
    //When longPressing self or status msg, do nothing
    if (msg.user.name === user.username) {
      return;
    }
    // else if(typeof msg.id === 'string') {
    //   return;
    // }

    setCurrMsg(msg);
    setModalVisible(true);
  }

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
              {currMsg === null ? "" : currMsg.user.name}
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

      <GiftedChat
        messages={messages}
        text={input}
        onInputTextChanged={(text) => setInput(text)}
        onSend={submitChatMessage}
        placeholder={"Type a message..."}
        user={{
          _id: userId, //if this matches with msg.user._id then right side, if not then left side
        }}
        inverted={false}
        renderUsernameOnMessage={true}
        // showUserAvatar={true}
        keyboardShouldPersistTaps={"never"}
        onLongPress={(context, msg) => setUpModalThenDisplay(context, msg)}
      />
    </View>
  );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  container: {
    flex: 1,
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 2,
    borderRadius: 3,
    height: 40,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 80,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5,
    textAlign: "left",
    width: width,
  },
  text: {
    fontSize: 14,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  submitButton: {
    right: 100,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    backgroundColor: "#fff",
    width: 100,
    color: "#424242",
  },
});

const mapStateToProps = (state) => {
  return {
    messages: state.chatroom.messages,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChat: (eventId) => dispatch(getChatThunk(eventId)),
    sendChat: (eventId, chatPackage) =>
      dispatch(sendChatThunk(eventId, chatPackage)),
    createDmEvent: (dmEventDetails) =>
      dispatch(createDmEventThunk(dmEventDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
