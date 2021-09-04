import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  // Button,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { Link } from "react-router-native";
import { connect } from "react-redux";
import { getDmChatThunk, sendDmChatThunk } from "../../store/directMsgsRoom";
import socketio from "../../socket";
import { useNavigation } from "@react-navigation/native";
// kitten ui test
import { ImageSourcePropType, Keyboard, Platform } from 'react-native';
import { Button, Input, StyleService, useStyleSheet } from '@ui-kitten/components';
import { KeyboardAvoidingView } from './layout/chat-1/extra/keyboard-avoiding-view.component';
import { Chat } from './layout/chat-1/extra/chat.component';
import { AttachmentsMenu } from './layout/chat-1/extra/attachments-menu.component';
import { MicIcon, PaperPlaneIcon, PlusIcon } from './layout/chat-1/extra/icons';
import { Message } from './layout/chat-1/extra/data';

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

  //kitten ui
  const kittenStyles = useStyleSheet(themedStyles);
  const keyboardOffset = function (height) { 
    return Platform.select({
      android: 0,
      ios: height,
    }); 
  };

  useEffect(() => {
    getChat(dmEventId, userId);
    navigation.setOptions({ headerTitle: dmEventTitle });

    //ComponentWillUnmount and leave room
    return function leaveEventRoom() {
      socketio.emit('leaveDmRoom', { username, dmEventId });
    }
  }, []);

  async function submitChatMessage(e) {
    e.preventDefault();

    const postResponse = await props.sendChat(dmEventId, chatPackage);
    socketio.emit("dmMessage", postResponse); //can't be chatMessage
    setInput("");
  }

  // console.log('DirectMsgsRoom, messages:', messages);

  return (
    <>
      <Chat
        style={kittenStyles.chat}
        contentContainerStyle={kittenStyles.chatContent}
        followEnd={true}
        data={messages}
      />

      <KeyboardAvoidingView
        style={kittenStyles.messageInputContainer}
        offset={keyboardOffset}>
        {/* <Button
          style={[kittenStyles.iconButton, kittenStyles.attachButton]}
          accessoryLeft={PlusIcon}
          onPress={toggleAttachmentsMenu}
        /> */}
        {/* <Input
          style={kittenStyles.messageInput}
          placeholder='Message...'
          value={message}
          onChangeText={setInput}
          accessoryRight={MicIcon}
        /> */}
        {/* <Button
          appearance='ghost'
          style={[kittenStyles.iconButton, kittenStyles.sendButton]}
          accessoryLeft={PaperPlaneIcon}
          disabled={!sendButtonEnabled()}
          onPress={onSendButtonPress}
        /> */}
      </KeyboardAvoidingView>
    </>

    // <View style={styles.container}>
    //   {messages.map((msg) => {
    //     return (
    //       <View key={msg.id}>
    //         <Text>{msg.user.username}: {msg.messageContent}</Text>
    //       </View>
         
    //     );
    //   })}

    //   <TextInput
    //     style={styles.textInput}
    //     value={input}
    //     onChangeText={(chatMessage) => {
    //       setInput(chatMessage);
    //     }}
    //     onSubmitEditing={submitChatMessage}
    //     maxLength={20}
    //   />

    // </View>
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

//kitten ui
const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  chat: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  messageInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: 'background-basic-color-1',
  },
  attachButton: {
    borderRadius: 24,
    marginHorizontal: 8,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  sendButton: {
    marginRight: 4,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
});


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
    getChat: (dmEventId, userId) => dispatch(getDmChatThunk(dmEventId, userId)),
    sendChat: (dmEventId, chatPackage) =>
      dispatch(sendDmChatThunk(dmEventId, chatPackage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectMsgsRoom);
