import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import chatroomReducer from "./chatroom";
import userReducer from './user'
import eventReducer from './event'
import homeReducer from './home';

const rootReducer = combineReducers({
  chatroom: chatroomReducer,
  home: homeReducer,
  user: userReducer,
  event: eventReducer
});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, middleware);


export default store;
