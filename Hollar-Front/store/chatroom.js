import axios from "axios";
import { LOCALHOST8080 } from "@env";


//Actions
const GET_CHAT = 'GET_CHAT';
const SEND_CHAT = 'SEND_CHAT'
const DISPLAY_USER_STATUS = 'DISPLAY_USER_STATUS';

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

export function displayUserStatus(status) {
  return {
    type: DISPLAY_USER_STATUS,
    status
  }
}

//Thunk creators
export const getChatThunk = (eventId) => {

  return async (dispatch) => {
    try {
      const response = await axios.get(`${LOCALHOST8080}/api/chatroom/${eventId}`)
      const messages = response.data;
    
      //Create gifted format msg
      const giftedFormat = [];
      for(let i = 0; i < messages.length; i++) {
        // const dateTime = getDateTime(messages[i].createdAt);
        giftedFormat.push({
          _id: messages[i].id,
          text: `${messages[i].messageContent}`,
          createdAt: new Date(`${messages[i].createdAt}`),
          user: {
            _id: messages[i].user.id,
            name: `${messages[i].user.username}`,
            avatar: 'https://placeimg.com/140/140/any',
          },
          
        });
      }

      dispatch(getChat(giftedFormat));
      // dispatch(getChat(response.data));
    } catch (error) {
      console.log('e',error);
    }
  };
};

export const sendChatThunk = (eventId, chatPackage) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${LOCALHOST8080}/api/chatroom/${eventId}`, chatPackage);
      return response.data;
    } catch (error) {
      console.log('e',error);
    }
  };
};


const initialState = {
  messages: [],
  // userStatus: ''
};

export default function chatroomReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT:
      return {...state, messages: action.messages}
    case SEND_CHAT:
      return {...state, messages: [...state.messages, action.msg]}
    case DISPLAY_USER_STATUS: {
      return {...state, messages: [...state.messages, action.status]}
    }
    default:
      return state;
  }
}
