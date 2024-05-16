'use strict';

require('dotenv').config();

const Queue = require('./Queue.js');

const port = process.env.PORT || 3000;

let queuesObject = {};

const io = require('socket.io')(port);

const { handleDriverReady, handlePackageAvailable, handleInTransit, handleDelivered } = require('./hubHandlers.js');

console.log(`Server is running on port ${port}`);

io.on('connection', (socket) => {
  console.log('Connected', socket.id);

  // event listeners
  socket.on('package-available', (payload) => {
    handlePackageAvailable(payload);
  });

  socket.on('driver-ready', () => {
    let nextOrder = handleDriverReady();
    if (nextOrder) {
      socket.emit('package-ready-for-pickup', nextOrder);
    }
  });

  socket.on('in-transit', handleInTransit);

  socket.on('delivered', (payload) => {
    handleDelivered(payload);
    if (!queuesObject[payload.store]) {
      queuesObject[payload.store] = new Queue();
    }
    queuesObject[payload.store].enqueue(payload);
  });

  socket.on('get-delivery-info', (storeName) => {
    if (!queuesObject[storeName]) {
      queuesObject[storeName] = new Queue();
    }
    while (!queuesObject[storeName].isEmpty()) {
      const payload = queuesObject[storeName].dequeue();
      socket.emit('package-delivered', payload);
    }
  });

  socket.on('received', (storeName) => {
    if (queuesObject[storeName] && !queuesObject[storeName].isEmpty()) {
      queuesObject[storeName].dequeue();
    }
  });

});
