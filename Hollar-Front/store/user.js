import axios from 'axios'
import {LOCALHOST8080} from "@env"



const SET_USER = 'SET_USER'
const CREATE_USER = 'CREATE_USER'


const gotUser = (user) => {
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

export const gotUserThunk = (username, password, history) => {
  return async (dispatch) => {
    try {
      const lowerUsername = username.toLowerCase()
      const { data } = await axios.get(`${LOCALHOST8080}/api/users/login`, {headers: {
        username: lowerUsername,
        password
      }})
      if (data === null) {
        history.push('/login')
      } else {
        dispatch(gotUser(data))
        history.push('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const createUserThunk = (username, firstName, lastName, email, zipCode, city, state, password, phoneNumber, history) => {
  return async (dispatch) => {
    try {
      const numberZip = parseInt(zipCode, 10)
      const { data } = await axios.post(`${LOCALHOST8080}/api/users`, {username, firstName, lastName, email, zipCode: numberZip, city, state, password, phoneNumber})
      dispatch(createUser(data))
      console.log("data", data)
      history.push('/home')
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
