import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  // Button,
  Pressable,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import { Link } from "react-router-native";
import { connect } from "react-redux";
import { getDmChatThunk, sendDmChatThunk } from "../../store/directMsgsRoom";
import socketio from "../../socket";
import { useNavigation } from "@react-navigation/native";
import { GiftedChat } from 'react-native-gifted-chat';


const DirectMsgsRoom = (props) => {
  // console.log("props in chatroom", props)
  const { getChat, messages, user } = props;
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
    getChat(dmEventId, userId);
    navigation.setOptions({ headerTitle: dmEventTitle });

    //ComponentWillUnmount and leave room
    return function leaveEventRoom() {
      socketio.emit('leaveDmRoom', { username, dmEventId });
    }
  }, []);

  async function submitChatMessage() {
    // e.preventDefault();

    const postResponse = await props.sendChat(dmEventId, chatPackage);
    socketio.emit("dmMessage", postResponse); //can't be chatMessage
    setInput("");
  }


  return (
    <View
      style={styles.container}
    >
      <GiftedChat
        messages={messages}
        text={input}
        onInputTextChanged={text => setInput(text)}
        onSend={submitChatMessage}
        placeholder={'Type a message...'}
        user={{
          _id: userId, //if this matches with msg.user._id then right side, if not then left side
        }}
        inverted={false}
        renderUsernameOnMessage={true}
        showUserAvatar={true}
        keyboardShouldPersistTaps={'never'}
      />
    </View>
  );
};

//gifted
const styles = StyleSheet.create({
  container: { flex: 1 },
})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   textInput: {
//     borderColor: "#CCCCCC",
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     height: 20,
//     fontSize: 14,
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   text: {
//     fontSize: 14
//   },
//   wrapperCustom: {
//     borderRadius: 8,
//     padding: 6
//   },
// });



const mapStateToProps = (state) => {
  return {
    messages: state.dmRoom.messages,
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
