const { 
  error, 
  ERROR_TRANSACTION_NOT_FOUND, 
  ERROR_INVALID_ACCOUNT, 
  ERROR_COULD_NOT_PERFORM
} = require('./errors');

module.exports = (app, { params, id }, res) => {
  const success = (order) => {
    res.status(200).json({
      result: {
        'state' : order.state,
        'perform_time' : order.performTime.getTime(),
        'transaction' : order.id.toString(),
      }
    });
  };

  app
    .service('orders')
    .find({ query: { transactionId: params.id }})
    .then((orders) => {
      const [order] = orders.data;
      if(order) {
        if(order.state === 1) {
          order.paid = true;
          order.state = 2;
          order.performTime = new Date();
          app
            .service('orders')
            .update(order.id, order)
            .then(() => success(order));
        } else {
          if (order.state === 2) {
            success(order);
          } else {
            error(ERROR_COULD_NOT_PERFORM, id, res);
          }
        }
      } else {
        error(ERROR_TRANSACTION_NOT_FOUND, id, res);
      }
    })
    .catch(() => {
      error(ERROR_INVALID_ACCOUNT, id, res);
    });
};