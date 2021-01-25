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

let activeUsers = new Set();
activeUsers.add('serverbot');
console.log(Array.from(activeUsers));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join chat', (username) => {
    socket.username = username;
    activeUsers.add(socket.username);
    const joinMsg = `${username} has joined the chat`;
    console.log(joinMsg);
    io.emit('chat message', {username: username, text: null, joined: true});
  });
  socket.on('chat message', (msg) => {
    console.log(`broadcasting message: ${JSON.stringify(msg)}`)
    io.emit('chat message', msg);
  });
  socket.on('typing', () => {
    socket.broadcast.emit('typing', socket.username);
  });
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', socket.username);
  });
  socket.on('disconnect', () => {
    console.log(`${socket.username} disconnected`);
    activeUsers.delete(socket.username);
    socket.broadcast.emit('stop typing', socket.username);
    io.emit('chat message', {username: socket.username, text: null, joined: false});
  });
});

// broadcast active user list every 5s
setInterval(() => {
  console.log(`sending active user list: ${Array.from(activeUsers)}`);
  io.emit('active userlist', Array.from(activeUsers));
}, 5000);

io.listen(PORT);
console.log(`Chat app backend listening at port ${PORT}`);
