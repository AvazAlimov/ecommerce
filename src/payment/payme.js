/* eslint-disable no-console */
const { Router } = require('@feathersjs/express');
const { error, ERROR_METHOD_NOT_FOUND, ERROR_INVALID_JSON_RPC_OBJECT } = require('./errors');
const checkPerformTransaction = require('./checkPerformTransaction');
const createTransaction = require('./createTransaction');
const checkTransaction = require('./checkTransaction');
const performTransaction = require('./performTransaction');

const router = new Router();

const middleware = (req, res, next) => {
  const key = 'voyJ4K07futDdzKGPu6QZF&CX8J%TYOoR5kb';
  
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }
  
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  
  if (username === 'Paycom' && password === key) {
    return next();
  } else {
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }
};

module.exports = app => {
  router.post('/', middleware, (req, res) => {
    if (
      typeof req.body.method === 'string' &&
      typeof req.body.params === 'object' &&
      typeof req.body.id === 'number'
    ) {
      const body = {
        id: req.body.id,
        method: req.body.method,
        params: req.body.params,
      };

      switch (req.body.method) {
      case 'CheckPerformTransaction':
        checkPerformTransaction(app, body, res);
        break;
      case 'CreateTransaction':
        createTransaction(app, body, res);
        break;
      case 'CheckTransaction':
        checkTransaction(app, body, res);
        break;
      case 'PerformTransaction':
        performTransaction(app, body, res);
        break;
      default:
        error(ERROR_METHOD_NOT_FOUND, res);
        break;
      }
    } else {
      error(ERROR_INVALID_JSON_RPC_OBJECT, null, res);
    }
  });

  app.use('/api/payment/payme', router);
};
