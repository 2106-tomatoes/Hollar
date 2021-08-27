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
      
      //Listen for joinRoom to join the clients to a room by eventId
      socket.on('joinRoom', (eventId) => {
        socket.join(`eventRm${eventId}`);
      });

      //Listen for chatMsg from clients and emit chatMsg to room
      socket.on('chatMessage', (message) => {
        const eventId = message.eventId;
        console.log('socket.rooms:', socket.rooms);

        //Emit chatMsg to clients in room
        io.to(`eventRm${eventId}`).emit('getMessage', message);
        
      })
    });
    
  } catch (ex) {
    console.log(ex)
  }
}

init()
