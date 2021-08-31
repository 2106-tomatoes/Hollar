import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import { Link } from "react-router-native";
import { connect } from "react-redux";
import { getChatThunk, sendChatThunk } from "../../store/chatroom";
import socketio from "../../socket";
import { useNavigation } from "@react-navigation/native";

const DirectMessageRoom = (props) => {
  // console.log("props in chatroom", props)
  const { history, getChat, message, user } = props;
  const navigation = useNavigation();
  const userId = user.id;
  const username = user.username;
  const [input, setInput] = useState("");
  const eventId = props.route.params.eventId;
  const eventTitle = props.route.params.eventTitle;
  const chatPackage = {
    messageContent: input,
    userId,
    eventId,
  };

  const [modalVisible, setModalVisible] = useState(false);
  let userObject ={};
  useEffect(() => {
    getChat(eventId);

    navigation.setOptions({ headerTitle: eventTitle });

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
    socketio.emit("chatMessage", postResponse);
    // console.log('Chatroom, emitted');
    setInput("");
  }

  function handleDirectMsg(msg) {
    console.log('long press, id:', msg.id, typeof msg.id);
    userObject = msg;
    setModalVisible(true);
  }



  return (
  
  
          {message.map((msg) => {
        // console.log('mes',mes)
        return (
          <View key={msg.id}>
            <Pressable 
              onLongPress={() => handleDirectMsg(msg)}
              style={[styles.button, styles.buttonOpen]}
            >

              {({ pressed }) => (
                <Text style={styles.text}>
                  {pressed ? msg.user.username : msg.user.username}: {msg.messageContent}
                </Text>
              )}

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChat: (eventId) => dispatch(getChatThunk(eventId)),
    sendChat: (eventId, chatPackage) =>
      dispatch(sendChatThunk(eventId, chatPackage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageRoom);
