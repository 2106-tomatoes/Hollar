import axios from "axios";
import { LOCALHOST8080, GOOGLE_MAPS_APIKEY } from "@env";

const CREATE_EVENT = "CREATE_EVENT";
const FIND_NEARBY_EVENT = "FIND_NEARBY_EVENT";
const DELETE_EVENT = 'DELETE_EVENT'

// not needed for now, thunk pushes to home and renders all the events
const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    event,
  };
};

const findEvent = (events) => {
  return {
    type: FIND_NEARBY_EVENT,
    events,
  };
};

const deleteEvent = (event) => {
  return {
    type: DELETE_EVENT,
    event
  }
}

export const createEventThunk = (
  name,
  maxAttendees,
  location,
  latitude,
  longitude,
  description,
  user,
  attendanceDate,
  time,
  navigation
) => {
  return async (dispatch) => {
    try {
      const numberAttendees = parseInt(maxAttendees, 10);
      const { data } = await axios.post(
        `${LOCALHOST8080}/api/events?user=${user.id}`,
        {
          name,
          maxAttendees: numberAttendees,
          location,
          latitude,
          longitude,
          description,
          eventObjectType:'event',
          attendanceDate,
          time:time.toLocaleTimeString(),
          hostId: user.id,

        }
      );
      navigation.navigate("Events");
    } catch (error) {
      console.log(error);
    }
  };
};

export const findEventsThunk = (origin, radius = 20, date) => {
  return async (dispatch) => {
    try {
      const { data: events } = await axios.get(
        `${LOCALHOST8080}/api/events?date=${date}`, {headers: {radius, latitude: origin.latitude, longitude: origin.longitude}}
      );
      dispatch(findEvent(events));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteEventThunk = (eventId, navigation) => {
  return async (dispatch) => {
    try {
      const {data:deletedEvent} = axios.delete(`${LOCALHOST8080}/api/events/${eventId}`)
      dispatch(deleteEvent(deletedEvent))
      navigation.goBack()
    }
    catch(e){
      console.log(e)
    }
  }
}



/**
 * REDUCER
 */
const eventReducer = (state = [], action) => {
  switch (action.type) {
    case FIND_NEARBY_EVENT:
      return action.events;
    default:
      return state;
  }
};

export default eventReducer;
