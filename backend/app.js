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

app.get("/hello", (req, res) => {
  console.log("REQUEST RECEIVED");
  res.json({msg: 'hello there'});
  //res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});

http.listen(PORT, () => {
  console.log(`Chat app backend listening at port ${PORT}`);
})
