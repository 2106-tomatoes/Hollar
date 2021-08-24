import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import countReducer from "./count";
import chatroomReducer from "./chatroom";

const rootReducer = combineReducers({
  count: countReducer,
  chatroom: chatroomReducer,
});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, middleware);
export default store;
