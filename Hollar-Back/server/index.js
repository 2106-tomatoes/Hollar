const { db } = require('./db')
const socket = require('socket.io');
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    const io = socket(server);
    // Listen for incoming client connections
    io.on('connection', (socket) => {
      console.log(`Connection from client ${socket.id}`);
      socket.on('disconnect', function () {
        console.log('user disconnected: ', socket.id);
      });
      
      let joinedNum = 0;
      let leaveNum = 0;
      //Listen for joinRoom to join the client to a room by eventId
      socket.on('joinRoom', (roomInfo) => {
        const eventId = roomInfo.eventId;
        const username = roomInfo.username;
        socket.join(`eventRm${eventId}`);
        console.log('joinRoom, socket.rooms:', socket.rooms);

        socket.to(`eventRm${eventId}`).emit('joinedRoom', {
          id: `joined${++joinedNum}`,
          user: {
            username: `${username}`
          },
          messageContent: ` has joined the room`
        });
        console.log('socket, joinedNum:', joinedNum);
      });

      socket.on('joinDmRoom', (roomInfo) => {
        const dmEventId = roomInfo.dmEventId;
        const username = roomInfo.username;
        console.log('server/index joinDmRoom dmEventId, username:', dmEventId, username);
        socket.join(`eventRm${dmEventId}`);
        console.log('joinDmRoom, socket.rooms:', socket.rooms);

        socket.to(`eventRm${dmEventId}`).emit('joinedDmRoom', {
          id: `joined${++joinedNum}`,
          user: {
            username: `${username}`
          },
          messageContent: ` has joined the room`
        });
        // console.log('socket, joinedNum:', joinedNum);
      });

      //Listen for chatMsg from client and emit chatMsg to room
      socket.on('chatMessage', (message) => {
        const eventId = message.eventId;

        //Emit chatMsg to all clients (including sender) in room
        io.to(`eventRm${eventId}`).emit('getChatMessage', message);
      });

      //Listen for dmMsg from client and emit dmMsg to room
      socket.on('dmMessage', (message) => {
        const eventId = message.eventId;
        io.to(`eventRm${eventId}`).emit('getDmMessage', message);
      });

      // Listen for leaveRoom from client and leave the room for client
      socket.on('leaveRoom', (roomInfo) => {
        const eventId = roomInfo.eventId;
        const username = roomInfo.username;
        socket.leave(`eventRm${eventId}`);
        console.log('socket.rooms:', socket.rooms);

        socket.to(`eventRm${eventId}`).emit('leaveRoom', {
          id: `leave${++leaveNum}`,
          user: {
            username: `${username}`
          },
          messageContent: ` has left the room`
        });
        console.log('socket, leaveNum:', leaveNum);
      });

      socket.on('leaveDmRoom', (roomInfo) => {
        const dmEventId = roomInfo.dmEventId;
        const username = roomInfo.username;
        socket.leave(`eventRm${dmEventId}`);
        console.log('socket.rooms:', socket.rooms);

        socket.to(`eventRm${dmEventId}`).emit('leaveDmRoom', {
          id: `leave${++leaveNum}`,
          user: {
            username: `${username}`
          },
          messageContent: ` has left the room`
        });
        // console.log('socket, leaveNum:', leaveNum);
      })
    });
    
  } catch (ex) {
    console.log(ex)
  }
}

init()
