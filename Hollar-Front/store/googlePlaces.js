import axios from 'axios'
import { LOCALHOST8080 } from "@env";

const GET_PLACES = "GET_PLACES"
const CLEAR_PLACES = 'CLEAR_PLACES'

const getPlaces = (places) => {
  return {
    type: GET_PLACES,
    places
  }
}

export const clearPlaces = () => {
  return {
    type: CLEAR_PLACES
  }
}

export const getPlacesThunk = (location) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${LOCALHOST8080}/api/places`, {headers: {location}})
      dispatch(getPlaces(data))
    } catch (error) {
      console.log(error)
    }
  }
}



const placesReducer = (state = [], action) => {
  switch(action.type) {
    case GET_PLACES:
      return action.places
    case CLEAR_PLACES:
      return []
    default:
      return state
  }
}

export default placesReducer
