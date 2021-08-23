import { createStore, combineReducers } from 'redux';
import countReducer from './count'
import chatroomReducer from './chatroom'
const rootReducer = combineReducers({
  count: countReducer,
  chatroom: chatroomReducer,
});

const store = createStore(rootReducer);
export default store;
