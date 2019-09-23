const { error, ERROR_TRANSACTION_NOT_FOUND, ERROR_INVALID_ACCOUNT } = require('./errors');

module.exports = (app, { params }, res) => {
  app
    .service('orders')
    .find({ query: { transactionId: params.id }})
    .then((orders) => {
      const [order] = orders.data;
      if(order) {
        order.state = 2;
        order.performTime = new Date();
        app.service('orders').update(order.id, order).then(() => {
          res.status(200).json({
            result: {
              'perform_time' : order.performTime.getTime(),
              'transaction' : order.id.toString(),
              'state' : order.state,
            }
          });
        });
      } else {
        error(ERROR_TRANSACTION_NOT_FOUND, res);
      }
    })
    .catch(() => {
      error(ERROR_INVALID_ACCOUNT, res);
    });
};