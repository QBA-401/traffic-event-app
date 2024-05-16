'use strict';

const getDate = require('./getDate.js');

require('dotenv').config();

const Queue = require('./Queue.js')

const ordersQueue = new Queue();

function handleAlertAvailable(payload){
  console.log('----------------------');
  ordersQueue.enqueue(payload);
  logEvent('pickup', payload);
  console.log('Orders in Queue', ordersQueue.length());
}

function handleDriverReady(){
  if(ordersQueue.isEmpty()){
    console.log('no current orders');
    return null
  }
  return ordersQueue.peek();
}

// function handleInTransit(payload){
//   logEvent('in-transit', payload);
// }

function handleReceived(payload){
  logEvent('delivered', payload);
  ordersQueue.dequeue();
  console.log('Orders in Queue', ordersQueue.length());
}

function logEvent(eventType, payload){
  const event = { 

    time: getDate(),
    payload: payload
  }
  console.log('HUB SAYS: ', event);
}

module.exports = {handleDriverReady, handleAlertAvailable, handleReceived};