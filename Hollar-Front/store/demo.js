

const SET_DEMO = 'SET_DEMO'

export const setDemo = (demoStatus) => {
  return {
    type: SET_DEMO,
    demo: !demoStatus
  }
}


export default demoReducer = (state = false, action) => {
  switch(action.type) {
    case SET_DEMO:
      return action.demo
    default:
      return state
  }
}
