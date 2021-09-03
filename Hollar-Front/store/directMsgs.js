import axios from "axios";
import { LOCALHOST8080, IP_ADD } from "@env";

const GET_DM_CHAT_LIST = 'GET_DM_CHAT_LIST';

export function getDmChatList(chatList) {
  return {
    type: GET_DM_CHAT_LIST,
    chatList
  }
}

export const getDmChatListThunk = (userId, username) => {
  return async (dispatch) => {
    try {
      console.log(`getDmChatListThunk, userId: ${userId}`);
      const {data: chatList} = await axios.get(`${LOCALHOST8080}/api/users/${userId}/events/directMsg`); // MAKE SURE TO CHANGE THIS IP ADDRESS TO YOUR OWN NETWORK IP

      //Change event names here
      for(let i = 0; i < chatList.length; i++) {
        const dmUsernames = chatList[i].name.split(' to ');
        if(username === dmUsernames[0]) {
          chatList[i].name = `From ${dmUsernames[1]}`;
        } else {
          chatList[i].name = `From ${dmUsernames[0]}`;
        }
      }

      dispatch(getDmChatList(chatList));
    } catch (e) {
      console.log(`e`, e);
    }
  }
}

const initialState = {
  chatList: []
}

export default function directMsgsReducer(state = initialState, action) {
  switch(action.type) {
    case GET_DM_CHAT_LIST: {
      return {...state, chatList: action.chatList}
    }
    default: {
      return state;
    }
  }
}
