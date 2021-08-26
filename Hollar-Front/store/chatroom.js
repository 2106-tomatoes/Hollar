import axios from "axios";
import { LOCALHOST8080 } from "@env";


//Actions
const GET_CHAT = 'GET_CHAT';
const SEND_CHAT = 'SEND_CHAT'

//Action creators
export function getChat(messages) {
  return {
    type: GET_CHAT,
    messages
  }
}

export function sendChat(msg) {
  return {
    type: SEND_CHAT,
    msg
  }
}

//Thunk creators
export const getChatThunk = (eventId) => {

  return async (dispatch) => {
    try {
      const response = await axios.get(`${LOCALHOST8080}/api/chatroom/${eventId}`)
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
      const response = await axios.post(`${LOCALHOST8080}/api/chatroom/${eventId}`, chatPackage)
      // console.log("sendChatThunk, response from post", response.data)
      //2. Emit chatMsg to server, CAN WE DO THIS HERE?
      // socketio.emit('chatMessage', response.data)
      //3. Dispatch msg to store
      // dispatch(sendChat(response.data))
      return response.data;
    } catch (error) {
      console.log('e',error);
    }
  };
};

const initialState = {
  messages: [],
  //maybe a side thing
};

export default function chatroomReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT:
      return {...state, messages: action.messages}
    case SEND_CHAT:
    // console.log("action.msg.messageContent", action.msg.messageContent)
    // console.log("Return statement in reducer", {...state, messages: [...state.messages, action.msg.messageContent]})
      return {...state, messages: [...state.messages, action.msg]}
    default:
      return state;
  }
}
