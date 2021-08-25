import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import countReducer from "./count";
import chatroomReducer from "./chatroom";
// import { sendChat } from './chatroom'
// import { io } from "socket.io-client";

const rootReducer = combineReducers({
  // count: countReducer,
  chatroom: chatroomReducer,
});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, middleware);

// export const socketio = io(`http://192.168.1.34:8080`);

// socketio.on('connect', () => {
//   console.log("connected with the server")
//   //Listen for the sent chatMsg from server and update redux store
//   socketio.on('getMessage', (message) => {
//     console.log("got message from server with message: ", message)
//     store.dispatch(sendChat(message))
//   })
// });

export default store;
