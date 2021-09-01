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
import { getDmChatThunk, sendDmChatThunk } from "../../store/directMsgsRoom";
import socketio from "../../socket";
import { useNavigation } from "@react-navigation/native";

const DirectMsgsRoom = (props) => {
  // console.log("props in chatroom", props)
  const { getChat, message, user } = props;
  const navigation = useNavigation();
  const userId = user.id;
  const username = user.username;
  const [input, setInput] = useState("");
  //Navigation params
  const dmEventId = props.route.params.dmEventId;
  const dmEventTitle = props.route.params.dmEventTitle;

  const chatPackage = {
    messageContent: input,
    userId,
    eventId: dmEventId,
  };


  useEffect(() => {
    getChat(dmEventId);

    navigation.setOptions({ headerTitle: dmEventTitle });

    //ComponentWillUnmount and leave room
    return function leaveEventRoom() {
      socketio.emit('leaveDmRoom', { username, dmEventId });
    }
  }, []);

  async function submitChatMessage(e) {
    e.preventDefault();

    const postResponse = await props.sendChat(dmEventId, chatPackage);
    // console.log('Chatroom, postResponse', postResponse);
    socketio.emit("dmMessage", postResponse); //can't be chatMessage
    // console.log('Chatroom, emitted');
    setInput("");
  }

  // console.log('DirectMsgsRoom, stateChatroom:', props.stateChatroom);
  // console.log('DirectMsgsRoom, stateDmRoom:', props.stateDmRoom);

  return (
    <View style={styles.container}>
      {message.map((msg) => {
        return (
          <View key={msg.id}>
            <Text>{msg.user.username}: {msg.messageContent}</Text>
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
    message: state.dmRoom.messages,
    user: state.user,
    // stateDmRoom: state.dmRoom,
    // stateChatroom: state.chatroom
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChat: (dmEventId) => dispatch(getDmChatThunk(dmEventId)),
    sendChat: (dmEventId, chatPackage) =>
      dispatch(sendDmChatThunk(dmEventId, chatPackage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectMsgsRoom);
