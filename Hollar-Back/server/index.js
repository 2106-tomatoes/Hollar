const { db } = require('./db')
const socket = require('socket.io');
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');
const axios = require('axios').default

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
<<<<<<< HEAD
      socket.on('testSocket', function(msg){
        console.log('received msg:', msg)
        socket.emit('recieved', msg);
=======
      socket.on('chatMessage', (message) => {
        console.log('message has been sent', message)
        socket.emit('getMessage', message)
>>>>>>> 7704f8af426e79c1de8ac9eaa52e12d27d826776
       
      });

     });
  } catch (ex) {
    console.log(ex)
  }
}

init()
