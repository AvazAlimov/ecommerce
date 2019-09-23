const { error, ERROR_TRANSACTION_NOT_FOUND, ERROR_INVALID_ACCOUNT } = require('./errors');

module.exports = (app, { params }, res) => {
  app
    .service('orders')
    .get(params.account.order_id)
    .then(async order => {
      if(order.transactionId === params.id) {
        res.status(200).json({
          result: { 
            'create_time' : order.createdAt.getTime(),
            'perform_time' : (new Date()).getTime(),
            'cancel_time' : 0,
            'transaction' : order.id,
            'state' : 2,
            'reason' : null
          }
        });
      } else {
        error(ERROR_TRANSACTION_NOT_FOUND, res);
      }
    })
    .catch(() => {
      error(ERROR_INVALID_ACCOUNT, res);
    });
};