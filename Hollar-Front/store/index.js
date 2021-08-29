import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import chatroomReducer from "./chatroom";
import userReducer from './user'
import eventsReducer from './event'
import homeReducer from './home';

import originReducer from './origin'



const rootReducer = combineReducers({
  chatroom: chatroomReducer,
  home: homeReducer,
  user: userReducer,
  events: eventsReducer,
  origin: originReducer
});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, middleware);

export default store;
