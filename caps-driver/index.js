'use strict';

const io = require('socket.io-client');

require('dotenv').config();

const URL = process.env.URL;

const hubConnection = io.connect(URL);

hubConnection.on('package-ready-for-pickup', handlePackageReadyForPickup);

function driverReady(){
  hubConnection.emit('driver-ready')
}

setInterval(driverReady, 5000);

function handlePackageReadyForPickup(payload){
  console.log('----------------------');
  console.log(`DRIVER SAYS: I picked up order ${payload.orderId} from ${payload.store}`)
  hubConnection.emit('in-transit', payload);

  console.log(`DRIVER SAYS: I delivered order ${payload.orderId} to ${payload.customer}`)
  hubConnection.emit('delivered', payload);
}
