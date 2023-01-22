const express = require('express');
const {readdirSync} = require('fs');
const cors = require('cors');
const app = express();
const passport = require('passport');
require('./passport');
const cookieSession = require('cookie-session');
require('dotenv').config();
require('./config/database');
const socket = require('socket.io');
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

readdirSync('./routes').map((r)=> app.use('/api', require(`./routes/${r}`)))

const port = 8000;

const server = app.listen(port, () => {
  console.log(`server run on ${port}`);
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    console.log('sendMsg', { data });
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-receive', data.message);
    }
  });
});
