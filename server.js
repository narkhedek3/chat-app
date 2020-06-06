
const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const http = require('http').createServer(app);

const path = require('path');
const bodyParser = require('body-parser');

const io = require('socket.io')(http);

const messages = [];

app.use(bodyParser.json());

app.use(serveStatic(path.join(__dirname, '/dist/pg-chat')))

app.use('*', (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, '/dist/pg-chat/index.html'));
  next();
});


io.on('connection', (socket) => {
  socket.on('diconnect', () => {
    console.log('user disconnected');
  });

  socket.on('msg', (messageBody) => {
    currentTime = new Date();
    messageBody.time = currentTime.getHours() + ":" + currentTime.getMinutes();
    messages.push(messageBody);
    socket.broadcast.emit('new message', messages);
  });


});

app.get('/api/v1/messages', (req, res) => {
  res.status(200).json({ messages: messages });
});

http.listen(process.env.PORT || 3000, () => {
 console.log(`server is running on ${process.env.PORT} || 3000`);
});
