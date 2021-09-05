import axios from "axios";
import { LOCALHOST8080, IP_ADD } from "@env";

const GET_CHAT_LIST = 'GET_CHAT_LIST';
const GET_CHAT_LIST_BY_ACTIVE_DATE = 'GET_CHAT_LIST_BY_ACTIVE_DATE'
const GET_CHAT_LIST_BY_INACTIVE_DATE = 'GET_CHAT_LIST_BY_INACTIVE_DATE'

export function getChatList(chatList) {
  return {
    type: GET_CHAT_LIST,
    chatList
  }
}

export function getChatActiveDateList(chatList) {
  return {
    type: GET_CHAT_LIST_BY_ACTIVE_DATE,
    chatList
  }
}

export function getChatInActiveDateList(chatList) {
  return {
    type: GET_CHAT_LIST_BY_INACTIVE_DATE,
    chatList
  }
}

export const getChatListThunk = (userId) => {
  return async (dispatch) => {
    try {
      console.log(`getChatListThunk, userId: ${userId}`);
      const {data: chatList} = await axios.get(`${LOCALHOST8080}/api/users/${userId}/events`); // MAKE SURE TO CHANGE THIS IP ADDRESS TO YOUR OWN NETWORK IP
      dispatch(getChatList(chatList));
    } catch (e) {
      console.log(`e`, e);
    }
  }
}

export const getChatListActiveDateThunk = (userId,date) => {
  return async (dispatch) => {
    try {
     
      const {data: chatList} = await axios.get(`${LOCALHOST8080}/api/users/${userId}/events/active`); // MAKE SURE TO CHANGE THIS IP ADDRESS TO YOUR OWN NETWORK IP
      dispatch(getChatActiveDateList(chatList));
    } catch (e) {
      console.log(`e`, e);
    }
  }
}

export const getChatListInActiveDateThunk = (userId,date) => {
  return async (dispatch) => {
    try {
      
      const {data: chatList} = await axios.get(`${LOCALHOST8080}/api/users/${userId}/events/inactive`); // MAKE SURE TO CHANGE THIS IP ADDRESS TO YOUR OWN NETWORK IP
      dispatch(getChatInActiveDateList(chatList));
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
      return {...state, chatList: action.chatList}
    }
    case GET_CHAT_LIST_BY_ACTIVE_DATE:
      return {...state, chatList: action.chatList}
    case GET_CHAT_LIST_BY_INACTIVE_DATE:
      return {...state, chatList: action.chatList}
    default: {
      return state;
    }
  }
}
