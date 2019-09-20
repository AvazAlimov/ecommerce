/* eslint-disable no-console */
const { Router } = require('@feathersjs/express');
const errors = require('./errors');
const router = new Router();

const middleware = (req, res, next) => {
  const key = 'voyJ4K07futDdzKGPu6QZF&CX8J%TYOoR5kb';
  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }
  // verify auth credentials
  const base64Credentials =  req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  if (username === 'Paycom' && password === key) {
    return next();
  } else {
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }
};

router.post('/', middleware, (req, res) => {
  if ((typeof req.body.method) === 'string'
      && (typeof req.body.params) === 'object'
      && (typeof req.body.id) === 'number') {
    switch(req.body.method) {
    case 'CheckPerformTransaction':
      console.log('CheckPerformTransaction');
      req.sendStatus(200);
      break;
    case 'CheckTransaction':
      console.log('CheckTransaction');
      req.sendStatus(200);
      break;
    case 'CreateTransaction':
      console.log('CreateTransaction');
      req.sendStatus(200);
      break;
    case 'PerformTransaction':
      console.log('PerformTransaction');
      req.sendStatus(200);
      break;
    case 'CancelTransaction':
      console.log('CancelTransaction');
      req.sendStatus(200);
      break;
    case 'ChangePassword':
      console.log('ChangePassword');
      req.sendStatus(200);
      break;
    case 'GetStatement':
      console.log('GetStatement');
      req.sendStatus(200);
      break;
    default:
      res.status(403).json(errors.getErrorMessages(errors.ERROR_METHOD_NOT_FOUND));
      break;
    }
  } else {
    res.status(403).json(errors.getErrorMessages(errors.ERROR_INVALID_JSON_RPC_OBJECT));
  }
});

module.exports = router;