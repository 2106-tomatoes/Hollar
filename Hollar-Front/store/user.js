import axios from 'axios'
import {LOCALHOST8080} from "@env"

const SET_USER = 'SET_USER'
const CREATE_USER = 'CREATE_USER'


const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

const createUser = (user) => {
  return {
    type: CREATE_USER,
    user
  }
}

export const setUserThunk = (username, password, navigation) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${LOCALHOST8080}/api/users/login`, {headers: {
        username,
        password
      }})
      if (typeof data === 'string') {
        // navigation.navigate("Login")
        return data;
      } else {
        dispatch(setUser(data))
        navigation.navigate("Drawer")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const createUserThunk = (username, firstName, lastName, email, password, navigation) => {
  return async (dispatch) => {
    try {
      // const numberZip = parseInt(zipCode, 10)
      const { data } = await axios.post(`${LOCALHOST8080}/api/users`, {username, firstName, lastName, email, password})
      dispatch(createUser(data))
      navigation.navigate("Drawer")
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    case CREATE_USER:
      return action.user
    default:
      return state
  }
}
