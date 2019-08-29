const app = require('../../src/app');

describe('\'price\' service', () => {
  it('registered the service', () => {
    const service = app.service('prices');
    expect(service).toBeTruthy();
  });
});
