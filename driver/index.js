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

setInterval(driverReady, 1000);

function handleAlertAvailable(payload){
  console.log('----------------------');
  console.log(`DRIVER RECEIVED: ${payload.alertMessage}`)
  hubConnection.emit('received', payload);
}
