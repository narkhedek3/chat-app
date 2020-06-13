
const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const http = require('http').createServer(app);

const path = require('path');
const bodyParser = require('body-parser');

const io = require('socket.io')(http);

const mongoose = require('mongoose');
const config = require('./config/dev');

const {
  createMessage
} = require('./controller/messages');

app.use(bodyParser.json());

app.use(serveStatic(path.join(__dirname, '../dist/pg-chat')))


const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages'); 

app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/user', userRoutes);

app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, '../dist/pg-chat/index.html'));
});


io.on('connection', (socket) => {

  socket.on('diconnect', () => {
    console.log('user disconnected');
  });

  socket.on('msg', (messageBody) => {
    createMessage(messageBody,socket);
  });

});

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
});


http.listen(process.env.PORT || 3000, () => {
 console.log(`server is running on ${process.env.PORT} || 3000`);
});
