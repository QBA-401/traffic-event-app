'use strict';

const io = require('socket.io-client');

require('dotenv').config();

const URL = process.env.URL;
console.log(URL)
const hubConnection = io.connect(URL);

hubConnection.on('alert-available', handleAlertAvailable);

function driverReady(){
  hubConnection.emit('driver-ready-for-alerts')
}

setInterval(driverReady, 2000);

function handleAlertAvailable(payload){
  console.log('----------------------');
  console.log(`DRIVER RECEIVED: ${payload.alertMessage}`)
  // hubConnection.emit('in-transit', payload);

  // console.log(`DRIVER SAYS: I delivered order ${payload.orderId} to ${payload.customer}`)
  hubConnection.emit('received', payload);
}
