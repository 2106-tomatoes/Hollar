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
import { io } from "socket.io-client";
import IP from "../env";
import { getChatThunk, sendChatThunk } from "../../store/chatroom";

const Chatroom = (props) => {

  const {history,getChat,message,socket} = props 
  const userId = 1;
  const [input, setInput] = useState("");
  const chatPackage = {
    messageContent: input,
    userId,
    eventId: props.match.params.id,
  };
  useEffect(() => {
  
    getChat(props.match.params.id);

  }, []);
  function submitChatMessage(e) {
    e.preventDefault();
    props.socket.emit("chatMessage", chatPackage);

    setInput("");
  }

    socket.on("getMessage", function (message) {
      props.sendChat(props.match.params.id, message);
    });


  return (
    <View style={styles.container}>
      {message.map((mes) => {
        return (
          <View>
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

      <Link to={"/home"}>
        <Text>Back to Home</Text>
      </Link>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChat: (id) => dispatch(getChatThunk(id)),
    sendChat: (id, content) => dispatch(sendChatThunk(id, content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
