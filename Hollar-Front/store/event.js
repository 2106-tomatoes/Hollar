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
    console.log('radius', radius)
    console.log('date', date)

    try {
      const { data: openEvents } = await axios.get(
        `${LOCALHOST8080}/api/events?date=${date}`, {headers: {radius: radius}}
      );
      console.log(`openEvents`, openEvents)

      //COMMENT OUT THIS LINE WHEN YOU WANT TO USE GOOGLE API!!!
      dispatch(findEvent(openEvents));

      //UNCOMMENT TO USE GOOGLE API!!!!!!

      // const latLng = openEvents.map((event) => {
      //   const lat = event.latitude
      //   const lng = event.longitude
      //   return {lat, lng}
      // })
      // const combineLatLng = []

      // latLng.forEach((coords) => {
      //   return combineLatLng.push(`${coords.lat},${coords.lng}`)
      // })
      // // console.log('combineLatLng final', combineLatLng.join('|'))

      // const config = {
      //   method: 'get',
      //   url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.latitude+','+origin.longitude}&destinations=${combineLatLng.join('|')}&key=${GOOGLE_MAPS_APIKEY}`,
      //   headers: { }
      // };
      // const { data } = await axios(config)
      // // console.log("data", data)

      // const availableEvents = []

      // for (let i = 0; i < openEvents.length; i++) {
      //   // console.log("inisde for loop")
      //   const poi = data.rows[0].elements[i]
      //   // console.log("poi is", poi)
      //   const mileValue = 0.6214 * poi.distance.value / 1000
      //   // console.log("mileValue", mileValue)
      //   if (mileValue <= radius) {
      //     availableEvents.push(openEvents[i])
      //   }
      // }

      // dispatch(findEvent(availableEvents))
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
