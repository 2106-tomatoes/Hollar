import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import countReducer from "./count";
import chatroomReducer from "./chatroom";
import userReducer from './user'
import eventReducer from './event'

const rootReducer = combineReducers({
  count: countReducer,
  chatroom: chatroomReducer,
  user: userReducer,
  event: eventReducer
});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, middleware);
export default store;
