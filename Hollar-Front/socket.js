import { io } from "socket.io-client";
import { sendChat, displayUserStatus } from './store/chatroom'
import { sendDmChat, displayDmUserStatus } from './store/directMsgsRoom' 
import store from './store/index'
import { IP_ADD } from "@env";

const socketio = io(`${IP_ADD}`);

// Establish socket connection and listen...
socketio.on('connect', () => {
  console.log("connected with the server")
  //Listen for the sent chatMsg from server 
  socketio.on('getChatMessage', (message) => {
    store.dispatch(sendChat(message))
  });

  socketio.on('getDmMessage', (message) => {
    console.log('socket, getDmMessage dispatching message:', message);
    store.dispatch(sendDmChat(message));
  })

  socketio.on('joinedRoom', (status) => {
    console.log('socket, dispatching joined status:', status);
    store.dispatch(displayUserStatus(status));
  });

  socketio.on('joinedDmRoom', (status) => {
    console.log('socket, dispatching joinedDm status:', status);
    store.dispatch(displayDmUserStatus(status));
  });

  socketio.on('leaveRoom', (status) => {
    console.log('socket, dispatching leave status:', status);
    store.dispatch(displayUserStatus(status));
  });

  socketio.on('leaveDmRoom', (status) => {
    console.log('socket, dispatching leaveDm status:', status);
    store.dispatch(displayDmUserStatus(status));
  });

});


export default socketio