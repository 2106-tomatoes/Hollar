const SET_ORIGIN = 'SET_ORIGIN'


export function setOrigin(origin) {
  return {
  type: SET_ORIGIN,
  origin
  }
}


const initialState = null

const originReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_ORIGIN:
      return action.origin
    default:
      return state;
  }
}
export default originReducer;
