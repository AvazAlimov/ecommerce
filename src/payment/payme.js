/* eslint-disable no-console */
const { Router } = require('@feathersjs/express');
const errors = require('./errors');
const router = new Router();

const middleware = (req, res, next) => {
  const key = 'voyJ4K07futDdzKGPu6QZF&CX8J%TYOoR5kb';
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }
  const base64Credentials =  req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  if (username === 'Paycom' && password === key) {
    return next();
  } else {
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }
};

module.exports = (app) => {
  
  const checkPerformTransaction = (req, res) => {
    app.service('orders')
      .get(req.body.params.account.order_id)
      .then(order => {
        if (order.paid) {
          res.status(403).json({ code: -31050 });
        } else {
          if (order.price === parseInt(req.body.params.amount, 10)) {
            res.status(200).json({
              result: {
                allow: true,
                id: req.body.id
              }
            });
          } else {
            res.status(403).json({ code: -31001 });
          }
        }
      })
      .catch(() => { res.status(403).json({ code: -31050 }); });
  };

  router.post('/', middleware, (req, res) => {
    if ((typeof req.body.method) === 'string'
        && (typeof req.body.params) === 'object'
        && (typeof req.body.id) === 'number') {
      
      switch(req.body.method) {
      case 'CheckPerformTransaction':
        checkPerformTransaction(req, res);
        break;
      default:
        res.status(403).json(errors.getErrorMessages(errors.ERROR_METHOD_NOT_FOUND));
        break;
      }
    } else {
      res.status(403).json(errors.getErrorMessages(errors.ERROR_INVALID_JSON_RPC_OBJECT));
    }
  });

  app.use('/api/payment/payme', router);
};