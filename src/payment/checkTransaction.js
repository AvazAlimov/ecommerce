const { error, ERROR_TRANSACTION_NOT_FOUND, ERROR_INVALID_ACCOUNT } = require('./errors');

module.exports = (app, { params, id }, res) => {
  app
    .service('orders')
    .find({ query: { transactionId: params.id }})
    .then((orders) => {
      const [order] = orders.data;
      if(order) {
        res.status(200).json({
          result: {
            'create_time' : order.createdAt.getTime(),
            'perform_time' : order.performTime ? order.performTime.getTime() : 0,
            'cancel_time' : 0,
            'transaction' : order.id.toString(),
            'state' : order.state,
            'reason' : null
          }
        });
      } else {
        error(ERROR_TRANSACTION_NOT_FOUND, id, res);
      }
    })
    .catch(() => {
      error(ERROR_INVALID_ACCOUNT, id, res);
    });
};