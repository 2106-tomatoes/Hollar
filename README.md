# Hollar
![alt text](https://github.com/2106-tomatoes/Hollar/blob/main/Hollar-Front/assets/Hollar.png)

## Events on your terms
Why should you be locked into the first intention you had for an event? Hollar lets your plans to be as flexible as you are.
Hollar helps you create and coordinating events by allowing you to immediatly chat with organizers and other attendees

Search for events in your area, and chat with the group to find out more details or suggest changes. Make your own events and chat with friends.

//Review below
# create a .env file at the root with the details of:

make sure your .env file contains the following:
IP_ADD = http://YOUR_IP_HERE:8080
LOCALHOST8080 = http://localhost:8080 or http://YOUR_IP_HERE:8080

## Summary of socket
Starting on client side:
Socket.io is imported and created in Hollar-Front/store/index
Establishes connection with server and listens for getMessage(dispatches message when event occurs into store/chatroom.js)

Hollar-Front/store/chatroom.js:
socketio is imported from store/index
After axios.post for a message, socketio emits "chatMessage" with the response.data from the axios.post

Server side:
socket receives chatMessage and then broadcasts the message to all other clients using getMessage

Step-by-Step:
1. Send message through Chatroom Screen
2. Goes to thunk in store/chatroom and makes an axios.post call
3. socketio emits "chatMessage" with the response.data from the axios.post
4. socket receives chatMessage and then broadcasts the message to all other clients using getMessage
5. getMessage dispatches message when event occurs into store/chatroom and saves the message in redux-state


//credits here
