import axios from "axios";
import { LOCALHOST8080, IP_ADD } from "@env";

const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'
const SEND_RSVP = 'SEND_RSVP'
const EDIT_SINGLE_EVENT = 'EDIT_SINGLE_EVENT'


export function getSingleEvent(event) {
  return {
  type: GET_SINGLE_EVENT,
  event
  }
}

const editEvent = (event) => {
  return {
    type: EDIT_SINGLE_EVENT,
    event
  }
}



export const getSingleEventThunk = (eventId) => {
    return async (dispatch) => {
      try {
        
        const {data: event} = await axios.get(`${LOCALHOST8080}/api/events/${eventId}`); 
        dispatch(getSingleEvent(event));
      } catch (e) {
        console.log(`e`, e);
      }
    }
  }

  export const sendRSVPThunk = (eventId,userId) => {
    return async (dispatch) => {
      try {
        
        const {data: rsvp} = await axios.post(`${LOCALHOST8080}/api/users/${userId}/events/${eventId}`); 
        dispatch(getSingleEvent(rsvp))
      } catch (e) {
        console.log(`e`, e);
      }
    }
  }

  export const editEventThunk = (eventId,obj, navigation) => {
    return async (dispatch) => {
      try {
        const {data: edit} = await axios.put(`${LOCALHOST8080}/api/events/${eventId}`,obj); 
        dispatch(editEvent(edit))
        navigation.goBack()
      } catch (e) {
        console.log(`e`, e);
      }
    }
  }
const initialState = {}

const singleEventReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_SINGLE_EVENT:
      return action.event
    case EDIT_SINGLE_EVENT:
      return action.event
    default:
      return state;
  }
}

export default singleEventReducer;
