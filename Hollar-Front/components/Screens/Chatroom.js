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
import socketio from '../../socket.js';

const Chatroom = (props) => {

  const {history,getChat,message,socket} = props 
  const userId = 1;
  const [input, setInput] = useState("");
  const eventId = props.match.params.id
  const chatPackage = {
    messageContent: input,
    userId,
    eventId,
  };

  useEffect(() => {
    //Get chat for current eventId
    getChat(eventId);

  }, []);
  
  function submitChatMessage(e) {
    e.preventDefault();
    
    props.sendChat(eventId, chatPackage);
    // socketio.emit('chatMessage', )
    setInput("");
  }


  // console.log('Chatroom, eventId:', props.match.params.id);
  // console.log('Chatroom, msgs from getChat:', messages);

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
    getChat: (eventId) => dispatch(getChatThunk(eventId)),
    sendChat: (eventId, chatPackage) => dispatch(sendChatThunk(eventId, chatPackage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
