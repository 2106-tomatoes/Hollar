import { io } from "socket.io-client";
import { sendChat } from './store/chatroom'
import store from './store/index'
import { IP_ADD } from "@env";

const socketio = io(`${IP_ADD}`);

// Establish socket connection and listen...
socketio.on('connect', () => {
  console.log("connected with the server")
  //Listen for the sent chatMsg from server 
  socketio.on('getMessage', (message) => {
    // console.log("got message from server with message: ", message)
    store.dispatch(sendChat(message))
  })
});


export default socketio