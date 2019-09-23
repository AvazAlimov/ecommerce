const { error, ERROR_INVALID_AMOUNT, ERROR_INVALID_ACCOUNT } = require('./errors');

module.exports = (app, { id, params }, res) => {
  app
    .service('orders')
    .get(params.account.order_id)
    .then(order => {
      if (order.paid) {
        error(ERROR_INVALID_ACCOUNT);
      } else {
        if (order.price * 1000 === parseInt(params.amount, 10)) {
          res.status(200).json({ result: { allow: true, id: id } });
        } else {
          error(ERROR_INVALID_AMOUNT);
        }
      }
    })
    .catch(() => {
      error(ERROR_INVALID_ACCOUNT);
    });
};
