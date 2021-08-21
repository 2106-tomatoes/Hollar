const COUNTER_CHANGE = 'COUNTER_CHGE'


export function changeCount(count) {
  return {
  type: COUNTER_CHANGE,
  payload: count
  }
}


const initialState = 0

const countReducer = (state = initialState, action) => {
  switch(action.type) {
    case COUNTER_CHANGE:
      return action.payload
    default:
      return state;
  }
}
export default countReducer;
