import axios from "axios";
//import {LOCALHOST8080} from "../components/env";
const LOCALHOST8080 = 'http://localhost:8080';
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
      const {data: chatList} = await axios.get(`http://192.168.1.34:8080/api/events/${userId}`);
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
        console.log('response', response.data)
        dispatch(getChat(response.data))
      } catch (error) {
        console.log('e',error);
      }
    };
  };


  export const sendChatThunk = (eventId,content) => {
  
    return async (dispatch) => {
      try {
        
        const response = await axios.post(`${LOCALHOST8080}/api/chatroom/${eventId}`,content)
        console.log('response', response.data)
        dispatch(getChat(response.data))
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
             return {...state, messages:action.info.messageContent}
        default:
            return state;
            

    }
}