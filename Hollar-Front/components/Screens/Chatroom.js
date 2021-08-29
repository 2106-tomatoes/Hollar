import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { Link } from "react-router-native";
import { connect } from "react-redux";
// import { io } from "socket.io-client";
// import IP from "../env";
import { getChatThunk, sendChatThunk } from "../../store/chatroom";
import socketio from "../../socket";
import { useNavigation } from "@react-navigation/native";

const Chatroom = (props) => {
  // console.log("props in chatroom", props)
  const { history, getChat, message, user } = props;
  const navigation = useNavigation();
  const userId = user.id;
  const [input, setInput] = useState("");
  const eventId = props.route.params.eventId;
  const eventTitle = props.route.params.eventTitle;
  const chatPackage = {
    messageContent: input,
    userId,
    eventId,
  };

  useEffect(() => {
    getChat(eventId);
    navigation.setOptions({ headerTitle: eventTitle });
  }, []);

  async function submitChatMessage(e) {
    e.preventDefault();

    const postResponse = await props.sendChat(eventId, chatPackage);
    // console.log('Chatroom, postResponse', postResponse);
    socketio.emit("chatMessage", postResponse);
    // console.log('Chatroom, emitted');
    setInput("");
  }

  // console.log('Chatroom, store state:', props.state);

  return (
    <View style={styles.container}>
      {message.map((mes) => {
        // console.log('mes',mes)
        return (
          <View key={mes.id}>
            <Text>{mes.user.username}:</Text>
            <Text>{mes.messageContent}</Text>
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
    fontSize: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    message: state.chatroom.messages,
    user: state.user,
    // state: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChat: (eventId) => dispatch(getChatThunk(eventId)),
    sendChat: (eventId, chatPackage) =>
      dispatch(sendChatThunk(eventId, chatPackage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
