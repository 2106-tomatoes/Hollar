import axios from "axios";
import { LOCALHOST8080 } from "@env";

const CREATE_EVENT = "CREATE_EVENT";

const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    event,
  };
};

export const createEventThunk = (
  name,
  maxAttendees,
  location,
  description,
  eventObjectType,
  user,
  history
) => {
  return async (dispatch) => {
    try {
      const numberAttendees = parseInt(maxAttendees, 10);
      const { data } = await axios.post(`${LOCALHOST8080}/api/events?user=${user.id}`, {
        name,
            maxAttendees:numberAttendees,
            location,
            description,
            eventObjectType,
      });
      console.log('Thunk data recieved:', data)
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * REDUCER
 */
const eventReducer =  (state = {}, action) => {
  switch (action.type) {

    default:
      return state;
  }
}

export default eventReducer

