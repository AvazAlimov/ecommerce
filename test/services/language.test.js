const app = require('../../src/app');

describe('\'language\' service', () => {
  it('registered the service', () => {
    const service = app.service('languages');
    expect(service).toBeTruthy();
  });
});
