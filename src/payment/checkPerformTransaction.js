const { error, ERROR_INVALID_AMOUNT, ERROR_INVALID_ACCOUNT } = require('./errors');

module.exports = (app, { id, params }, res) => {
  app
    .service('orders')
    .get(params.account.order_id)
    .then(order => {
      if (order.state !== 0) {
        error(ERROR_INVALID_ACCOUNT, res);
      } else {
        if (order.price * 1000 === parseInt(params.amount, 10)) {
          res.status(200).json({ result: { allow: true, id } });
        } else {
          error(ERROR_INVALID_AMOUNT, res);
        }
      }
    })
    .catch(() => {
      error(ERROR_INVALID_ACCOUNT, res);
    });
};
