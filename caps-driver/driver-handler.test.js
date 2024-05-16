'use strict'

// tests are chatgpt generated
const handlePackageReadyForPickup = require('./handler.js');

// Mocking the console.log function
console.log = jest.fn();

describe('handlePackageReadyForPickup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });



  it('should log messages to the console', () => {
    const payload = { orderId: 123 };

    // Call the function
    handlePackageReadyForPickup(payload);

    // Expect console.log to be called twice with correct messages
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenNthCalledWith(2, `DRIVER SAYS: I picked up order ${payload.orderId}`);
    expect(console.log).toHaveBeenNthCalledWith(3, `DRIVER SAYS: I delivered order ${payload.orderId}`);
  });
});