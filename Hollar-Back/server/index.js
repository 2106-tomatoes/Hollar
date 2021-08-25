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
    const serverSocket = socket(server);
    serverSocket.on('connection', (socket) => {
      console.log(`Connection from client ${socket.id}`);
      socket.on('disconnect', function () {
        console.log('user disconnected: ', socket.id);
      });
      //Listen for chatMsg and send it to all connected clients
      socket.on('chatMessage', (message) => {
        console.log('message has been sent', message)
        // Post to db in here?
        
        socket.broadcast.emit('getMessage', message)
       
      })
    });
    
  } catch (ex) {
    console.log(ex)
  }
}

init()
