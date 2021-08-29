import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Pressable,
  TextInput,
} from "react-native";
import { Link } from "react-router-native";
import { connect } from "react-redux";
import { getChatThunk, sendChatThunk } from "../../store/chatroom";
import socketio from '../../socket';

const Chatroom = (props) => {
  const { history, getChat, messages, user } = props 

  const userId = user.id;
  const username = user.username;
  const [input, setInput] = useState("");
  const eventId = props.match.params.id
  const chatPackage = {
    messageContent: input,
    userId,
    eventId,
  };

  useEffect(() => {
    getChat(eventId);

    //ComponentWillUnmount and leave room
    return function leaveEventRoom() {
      socketio.emit('leaveRoom', { username, eventId });
      console.log('Chatroom, after emitting leaveRoom');
    }

  }, []);
  
  async function submitChatMessage(e) {
    e.preventDefault();

    const postResponse = await props.sendChat(eventId, chatPackage);
    // console.log('Chatroom, postResponse', postResponse);
    socketio.emit('chatMessage', postResponse);
    // console.log('Chatroom, emitted');

    setInput("");
  }

  function handleDirectMsg(id) {
    console.log('long press, id:', id, typeof id);
  }


  return (
    <View style={styles.container}>
      {messages.map((msg) => {
        return (
          
          <View key={msg.id}>
            <Pressable 
              onLongPress={() => handleDirectMsg(msg.id)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? 'rgb(210, 230, 255)'
                    : 'white'
                },
                styles.wrapperCustom
              ]}>
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
    sendChat: (eventId, chatPackage) => dispatch(sendChatThunk(eventId, chatPackage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
