'use strict';

require('dotenv').config();

const Queue = require('./Queue.js');

const port = process.env.PORT || 3000;

let queuesObject = {};

const io = require('socket.io')(port);

const { handleDriverReady, handleAlertAvailable, handleReceived } = require('./hubHandlers.js');

console.log(`Server is running on port ${port}`);

io.on('connection', (socket) => {
  console.log('Connected', socket.id);

  socket.on('alert-available', (payload) => {
    handleAlertAvailable(payload);
    io.emit('alert-dash', { payload });
  });

  socket.on('driver-ready-for-alerts', () => {
    let nextOrder = handleDriverReady();
    if (nextOrder) {
      socket.emit('alert-available', nextOrder);
    }
  });

  socket.on('received', (payload) => {
    handleReceived(payload);
    if (!queuesObject[payload.alert]) {
      queuesObject[payload.alert] = new Queue();
    }
    queuesObject[payload.alert].enqueue(payload);
  });

  socket.on('received', (alertSystem) => {
    if (queuesObject[alertSystem] && !queuesObject[alertSystem].isEmpty()) {
      queuesObject[alertSystem].dequeue();
    }
  });

});
