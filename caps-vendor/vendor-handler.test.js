'use strict';


// tests are partially chatgpt generated
const handlePackageDelivered = require('./handler.js');

// Mocking the console.log function
console.log = jest.fn();

describe('handlePackageDelivered', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log a message to the console with the correct customer name', () => {
    const payload = { customer: 'John Doe' };

    // Call the function
    handlePackageDelivered(payload);

    // Expect console.log to be called once with correct message
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(`VENDOR SAYS: Thank you for your order ${payload.customer}`);
  });
});