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
      
      let joinedNum = 0; // IDs for status msg
      let leaveNum = 0; // IDs for status msg
      //Listen for joinRoom to join the client to a room by eventId
      socket.on('joinRoom', (roomInfo) => {
        const eventId = roomInfo.eventId;
        const username = roomInfo.username;
        socket.join(`eventRm${eventId}`);
        console.log('joinRoom, socket.rooms:', socket.rooms);

        // const joinedStatus = {
        //   id: `joined${++joinedNum}`,
        //   user: {
        //     username: `${username}`
        //   },
        //   messageContent: ` has joined the room`
        // }
        const giftedJoinedStatus = {
          _id: `joined${++joinedNum}`,
          text: `${username} has joined the room`,
          createdAt: new Date(),
          system: true,
        }
        socket.to(`eventRm${eventId}`).emit('joinedRoom', giftedJoinedStatus);
        console.log('socket, joinedNum:', joinedNum);
      });

      socket.on('joinDmRoom', (roomInfo) => {
        const dmEventId = roomInfo.dmEventId;
        const username = roomInfo.username;
        console.log('server/index joinDmRoom dmEventId, username:', dmEventId, username);
        socket.join(`eventRm${dmEventId}`);
        console.log('joinDmRoom, socket.rooms:', socket.rooms);

        // const joinedStatus = {
        //   id: `joined${++joinedNum}`,
        //   user: {
        //     username: `${username}`
        //   },
        //   messageContent: ` has joined the room`
        // }
        const giftedJoinedStatus = {
          _id: `joined${++joinedNum}`,
          text: `${username} has joined the room`,
          createdAt: new Date(),
          system: true,
        }
        socket.to(`eventRm${dmEventId}`).emit('joinedDmRoom', giftedJoinedStatus);
      });

      //Listen for chatMsg from client and emit chatMsg to room
      socket.on('chatMessage', (message) => {
        const eventId = message.eventId;

        //Create gifted format msg
        const giftedFormat = {
          _id: message.id,
          text: `${message.messageContent}`,
          createdAt: new Date(`${message.createdAt}`),
          user: {
            _id: message.user.id,
            name: `${message.user.username}`,
            avatar: 'https://placeimg.com/140/140/any',
          },
        }
        //Emit chatMsg to all clients (including sender) in room
        io.to(`eventRm${eventId}`).emit('getChatMessage', giftedFormat);
      });

      //Listen for dmMsg from client and emit dmMsg to room
      socket.on('dmMessage', (message) => {
        const eventId = message.eventId;

        //Create gifted format msg
        const giftedFormat = {
          _id: message.id,
          text: `${message.messageContent}`,
          createdAt: new Date(`${message.createdAt}`),
          user: {
            _id: message.user.id,
            name: `${message.user.username}`,
            avatar: 'https://placeimg.com/140/140/any',
          },
        }
        io.to(`eventRm${eventId}`).emit('getDmMessage', giftedFormat);
      });

      // Listen for leaveRoom from client and leave the room for client
      socket.on('leaveRoom', (roomInfo) => {
        const eventId = roomInfo.eventId;
        const username = roomInfo.username;
        socket.leave(`eventRm${eventId}`);
        console.log('socket.rooms:', socket.rooms);

        // const leaveStatus = {
        //   id: `leave${++leaveNum}`,
        //   user: {
        //     username: `${username}`
        //   },
        //   messageContent: ` has left the room`
        // };
        const giftedLeaveStatus = {
          _id: `leave${++leaveNum}`,
          text: `${username} has left the room`,
          createdAt: new Date(),
          system: true,
        }
        socket.to(`eventRm${eventId}`).emit('leaveRoom', giftedLeaveStatus);
        console.log('socket, leaveNum:', leaveNum);
      });

      socket.on('leaveDmRoom', (roomInfo) => {
        const dmEventId = roomInfo.dmEventId;
        const username = roomInfo.username;
        socket.leave(`eventRm${dmEventId}`);
        console.log('socket.rooms:', socket.rooms);

        // const leaveStatus = {
        //   id: `leave${++leaveNum}`,
        //   user: {
        //     username: `${username}`
        //   },
        //   messageContent: ` has left the room`
        // }
        const giftedLeaveStatus = {
          _id: `leave${++leaveNum}`,
          text: `${username} has left the room`,
          createdAt: new Date(),
          system: true,
        }
        socket.to(`eventRm${dmEventId}`).emit('leaveDmRoom', giftedLeaveStatus);
        // console.log('socket, leaveNum:', leaveNum);
      })
    });
    
  } catch (ex) {
    console.log(ex)
  }
}

init()
