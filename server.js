import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', (username) => {
    socket.username = username;
    io.emit('message', {
      type: 'system',
      content: `${username} joined the chat`
    });
  });

  socket.on('message', (message) => {
    io.emit('message', {
      type: 'user',
      user: socket.username,
      content: message
    });
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('message', {
        type: 'system',
        content: `${socket.username} left the chat`
      });
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
