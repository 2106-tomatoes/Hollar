import axios from "axios";
import { LOCALHOST8080 } from "@env";
import { getDateTime } from "../reusableFuncs/reusableFunctions";


//Actions
const GET_DM_CHAT = 'GET_DM_CHAT';
const SEND_DM_CHAT = 'SEND_DM_CHAT'
const DISPLAY_DM_USER_STATUS = 'DISPLAY_DM_USER_STATUS';

//Action creators
export function getDmChat(messages) {
  return {
    type: GET_DM_CHAT,
    messages
  }
}

export function sendDmChat(msg) {
  return {
    type: SEND_DM_CHAT,
    msg
  }
}

export function displayDmUserStatus(status) {
  return {
    type: DISPLAY_DM_USER_STATUS,
    status
  }
}



//Thunk creators
export const getDmChatThunk = (eventId, userId) => {

  return async (dispatch) => {
    try {
      console.log('getDmChatThunk, eventId:', eventId);
      const response = await axios.get(`${LOCALHOST8080}/api/chatroom/${eventId}`)
      const messages = response.data;
    
      //Create kitten format msg
      const kittenFormat = [];
      for(let i = 0; i < messages.length; i++) {
        const dateTime = getDateTime(messages[i].createdAt);
        kittenFormat.push({
          attachment: null,
          date: dateTime,
          reply: (userId === messages[i].user.id ? true : false),
          text: `${messages[i].user.username}: ${messages[i].messageContent}`
        });
      }

      dispatch(getDmChat(kittenFormat));
      // dispatch(getDmChat(response.data))
      // return response.data;
    } catch (error) {
      console.log('getDmChatThunk:', error);
    }
  };
};

export const sendDmChatThunk = (eventId, chatPackage) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${LOCALHOST8080}/api/chatroom/${eventId}`, chatPackage);
      return response.data;
    } catch (error) {
      console.log('sendDmChatThunk:', error);
    }
  };
};

export const createDmEventThunk = (dmEventDetails) => {
  return async (dispatch) => {
    // console.log('createDmEventThunk, dmEventDetails:', dmEventDetails);
    const userId = dmEventDetails.user.id;
    try {
      const { data } = await axios.post(`${LOCALHOST8080}/api/users/${userId}/events/directMsg`, {dmEventDetails})
      console.log('createDmEvent, data:', data);
      const dmEventInfo = {
        dmEventId: data.id,
        // dmEventTitle: data.name
      };

      return dmEventInfo;
    } catch (error) {
      console.log(error);
    }
  }
}


const initialState = {
  messages: [],
};

export default function dmRoomReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DM_CHAT:
      return {...state, messages: action.messages}
    case SEND_DM_CHAT:
      return {...state, messages: [...state.messages, action.msg]}
    case DISPLAY_DM_USER_STATUS: {
      return {...state, messages: [...state.messages, action.status]}
    }
    default:
      return state;
  }
}
