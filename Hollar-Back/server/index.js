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
      socket.on('joinRoom', (usernameAndEventId) => {
        const eventId = usernameAndEventId.eventId;
        const username = usernameAndEventId.username;
        socket.join(`eventRm${eventId}`);
        console.log('socket.rooms:', socket.rooms);

        io.to(`eventRm${eventId}`).emit('joinedRoom', {
          id: `joined${++joinedNum}`,
          user: {
            username: `${username}`
          },
          messageContent: ` has joined the room`
        });
        console.log('socket, joinedNum:', joinedNum);
      });

      //Listen for chatMsg from client and emit chatMsg to room
      socket.on('chatMessage', (message) => {
        const eventId = message.eventId;

        //Emit chatMsg to clients in room
        io.to(`eventRm${eventId}`).emit('getMessage', message);
        
      })

      // Listen for leaveRoom from client and leave the room for client
      socket.on('leaveRoom', (usernameAndEventId) => {
        const eventId = usernameAndEventId.eventId;
        const username = usernameAndEventId.username;
        socket.leave(`eventRm${eventId}`);
        console.log('socket.rooms:', socket.rooms);

        io.to(`eventRm${eventId}`).emit('leaveRoom', {
          id: `leave${++leaveNum}`,
          user: {
            username: `${username}`
          },
          messageContent: ` has left the room`
        });
        console.log('socket, leaveNum:', leaveNum);
      })
    });
    
  } catch (ex) {
    console.log(ex)
  }
}

init()
