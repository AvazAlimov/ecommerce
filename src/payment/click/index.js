const { Router } = require('@feathersjs/express');
const router = new Router();

module.exports = app => {
  router.post('/prepare', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  });

  //   router.post('/complete', (req, res) => {

  //   });

  app.use('/api/payment/click', router);
};