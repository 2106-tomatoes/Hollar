import axios from "axios";
// import socketio from '../socket';
//import {LOCALHOST8080} from "../components/env";

import { io } from "socket.io-client";
import {IP_ADD} from "@env";

const socketio = io(`http://192.168.1.34:8080`);

//Establish socket connection and listen...
socketio.on('connect', () => {
  console.log("connected with the server")
  //Listen for the sent chatMsg from server after connected
  socketio.on('getMessage', (message) => {
    console.log("got message from server with message: ", message)
    // dispatch(sendChat(message))
  })
});


const LOCALHOST8080 = 'http://localhost:8080';
const BEN_IP_ADDR = 'http://192.168.1.34:8080';

//Actions
const GET_CHAT = 'GET_CHAT';
const SEND_CHAT = 'SEND_CHAT'
const GET_CHAT_LIST = 'GET_CHAT_LIST';

//Action creators
const initialState = {
  messages: [],
  chatList: []
  //maybe a side thing
};
export function getChat(messages) {
    return {
    type: GET_CHAT,
    messages
    }
  }

  export function sendChat(info) {
    return {
    type: SEND_CHAT,
    info
    }
  }

  export function getChatList(chatList) {
    return {
    type: GET_CHAT_LIST,
    chatList
    }
  }

export const getChatListThunk = (userId) => {
  return async (dispatch) => { 
    try {
      console.log(`getChatListThunk, userId: ${userId}`);
      //console.log('localhost>', LOCALHOST8080)
      const {data: chatList} = await axios.get(`http://192.168.1.34:8080/api/events/${userId}`); // MAKE SURE TO CHANGE THIS IP ADDRESS TO YOUR OWN NETWORK IP
      dispatch(getChatList(chatList));
    } catch (e) {
      console.log(`e`, e);
    }
  }
}
export const getChatThunk = (eventId) => {
  
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://192.168.1.34:8080/api/chatroom/${eventId}`)
       
        dispatch(getChat(response.data))
      } catch (error) {
        console.log('e',error);
      }
    };
  };


  export const sendChatThunk = (eventId, chatPackage) => {
  
    return async (dispatch) => {
      try {
        //1. Post
        const response = await axios.post(`http://192.168.1.34:8080/api/chatroom/${eventId}`, chatPackage)
        console.log("response from post", response.data)
        // dispatch(sendChat(response.data))
        //Send the chatMsg to server socket
        //2. Emit chatMsg to server
        socketio.emit('chatMessage', response.data)
        //3. Dispatch msg to store
        // dispatch(sendChat(response.data))
      } catch (error) {
        console.log('e',error);
      }
    };
  };

export default function chatroomReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHAT:
            return {...state, messages: action.messages}
       case GET_CHAT_LIST:
              return {...state, chatList: action.chatList}
        case SEND_CHAT:
        //   console.log("action.info.messageContent", action.info.messageContent)
        //   console.log("Return statement in reducer", {...state, messages: [...state.messages, action.info.messageContent]})
             return {...state, messages: [...state.messages, action.info]}
        default:
            return state;
            

    }
}
