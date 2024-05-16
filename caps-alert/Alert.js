'use strict';

const Chance = require('chance');
const handlePackageDelivered = require('./handler.js');

class Alert {
  constructor(channelURL, alertSystem, orderInterval) {
    this.orderInterval = orderInterval;
    this.io = require('socket.io-client');
    this.channelURL = channelURL;
    this.alertSystem = alertSystem;
    this.chance = new Chance();
    this.hubConnection = this.io.connect(channelURL);
    this.startSendingWeatherAlerts();
  }

  startSendingWeatherAlerts() {
    setInterval(() => {
      const alertSystem = this.alertSystem;
      const randomName = this.chance.name();
      const randomAddress = this.chance.address();
      const randomOrderId = this.chance.string({ length: 10, alpha: true, numeric: true });
      
      this.hubConnection.emit('get-delivery-info', alertSystem);
      const packageInfo = {
        alert: alertSystem,
        orderId: randomOrderId,
        customer: randomName,
        address: randomAddress
      }


      this.hubConnection.emit('package-available', packageInfo);
    }, this.orderInterval);

    this.hubConnection.on('package-delivered', (payload) => {
      handlePackageDelivered(payload, this.alertSystem);
      this.hubConnection.emit('received');
    });
  }
}

module.exports = Alert;