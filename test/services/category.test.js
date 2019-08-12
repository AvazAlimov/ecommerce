const app = require('../../src/app');

describe('\'category\' service', () => {
  it('registered the service', () => {
    const service = app.service('categories');
    expect(service).toBeTruthy();
  });
});
