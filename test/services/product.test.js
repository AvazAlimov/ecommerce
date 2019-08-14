const app = require('../../src/app');

describe('\'product\' service', () => {
  it('registered the service', () => {
    const service = app.service('products');
    expect(service).toBeTruthy();
  });
});
