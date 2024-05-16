'use strict';

const Chance = require('chance');
const handlePackageDelivered = require('./handler.js');

class Vendor {
  constructor(channelURL, storeName, orderInterval) {
    this.orderInterval = orderInterval;
    this.io = require('socket.io-client');
    this.channelURL = channelURL;
    this.storeName = storeName;
    this.chance = new Chance();
    this.hubConnection = this.io.connect(channelURL);
    this.startSendingPackages();
  }

  startSendingPackages() {
    setInterval(() => {
      const storeName = this.storeName;
      const randomName = this.chance.name();
      const randomAddress = this.chance.address();
      const randomOrderId = this.chance.string({ length: 10, alpha: true, numeric: true });
      
      this.hubConnection.emit('get-delivery-info', storeName);
      const packageInfo = {
        store: storeName,
        orderId: randomOrderId,
        customer: randomName,
        address: randomAddress
      }


      this.hubConnection.emit('package-available', packageInfo);
    }, this.orderInterval);

    this.hubConnection.on('package-delivered', (payload) => {
      handlePackageDelivered(payload, this.storeName);
      this.hubConnection.emit('received');
    });
  }
}

module.exports = Vendor;