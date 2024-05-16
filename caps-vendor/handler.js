'use strict';

function handlePackageDelivered(payload, storeName){
  console.log('----------------------');
  console.log(`${storeName} SAYS: Thank you for your order ${payload.customer}`);
}

module.exports = handlePackageDelivered;