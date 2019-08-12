const app = require('../../src/app');

describe('\'brand\' service', () => {
  it('registered the service', () => {
    const service = app.service('brands');
    expect(service).toBeTruthy();
  });
});
