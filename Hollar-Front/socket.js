// import { io } from "socket.io-client";
// import {IP_ADD} from "@env"
// import { sendChat } from './store/chatroom'
// import store from './store/index'

// const socketio = io(`http://192.168.1.34:8080`);

//Establish socket connection and listen...
// socketio.on('connect', () => {
//   console.log("connected with the server")
//   //Listen for the sent chatMsg from server 
//   socketio.on('getMessage', (message) => {
//     console.log("got message from server with message: ", message)
//     // store.dispatch(sendChat(message))
//   })
// });

// const socketio = io(`${IP_ADD}`);

// socketio.on('connect', () => {
//   console.log("connected with the server")
//   socketio.on('getMessage', (message) => {
//     console.log("got message from server with message: ", message)
//     sendChat(3,message)
//   })
// })

// const mapDispatch = (dispatch) => {
//   return {
//     sendChat: (eventId, content) => dispatch(sendChat(eventId, content)),
//   }
// }

// export default socketio