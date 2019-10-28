const { Router } = require('@feathersjs/express');
const router = new Router();
const { error, ERROR_IN_REQUEST_FROM_CLICK } = require('./errors');
const prepare = require('./prepare');
const complete = require('./complete');

module.exports = app => {
  router.post('/', (req, res) => {
    const { action } = req.query;
    switch(action) {
    case '0':
      prepare(app, req, res);
      break;
    case '1':
      complete(app, req, res);
      break;
    default:
      error(ERROR_IN_REQUEST_FROM_CLICK, res);
    }
  });

  app.use('/api/payment/click', router);
};