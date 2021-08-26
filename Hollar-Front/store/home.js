import axios from "axios";
import { LOCALHOST8080 } from "@env";

const GET_CHAT_LIST = 'GET_CHAT_LIST';

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
      const {data: chatList} = await axios.get(`${LOCALHOST8080}/api/events/${userId}`); // MAKE SURE TO CHANGE THIS IP ADDRESS TO YOUR OWN NETWORK IP
      dispatch(getChatList(chatList));
    } catch (e) {
      console.log(`e`, e);
    }
  }
}

const initialState = {
  chatList: []
}

export default function homeReducer(state = initialState, action) {
  switch(action.type) {
    case GET_CHAT_LIST: {
      return { ...state, chatList: action.chatList };
    }
    default: {
      return state;
    }
  }
}