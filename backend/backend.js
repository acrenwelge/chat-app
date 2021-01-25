const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }});
const cors = require('cors');
const PORT = 8080;

app.use(cors());

let messages = [
  {
    username: 'serverbot',
    text: "Hello! Welcome to the Socket.io app!",
  },
  {
    username: 'serverbot',
    text: "Feel free to start chatting below"
  }
]

// app.get("/messages", (req, res) => {
//   console.log("REQUEST RECEIVED");
//   res.json(messages);
// });

io.on('connection', (socket) => {
  console.log('a user connected');
  // socket.on('join chat', (msg) => {
  //   socket.username = msg.username;
  //   const joinMsg = `${msg.username} has joined the chat`;
  //   console.log(joinMsg);
  //   io.emit('chat message', {username: msg.username, text: null, joined: true});
  // });
  socket.on('chat message', (msg) => {
    console.log(`broadcasting message: ${JSON.stringify(msg)}`)
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    // io.emit('chat message', {username: socket.username, text: null, joined: false});
  })
});

io.listen(PORT);
// , () => {
  console.log(`Chat app backend listening at port ${PORT}`);
// })
