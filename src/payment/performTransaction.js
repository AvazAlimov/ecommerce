const { error, ERROR_TRANSACTION_NOT_FOUND, ERROR_INVALID_ACCOUNT, ERROR_COULD_NOT_PERFORM } = require('./errors');

module.exports = (app, { params }, res) => {
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
          app.service('orders').update(order.id, order).then(() => {
            res.status(200).json({
              result: {
                'state' : order.state,
                'perform_time' : order.performTime.getTime(),
                'transaction' : order.id.toString(),
              }
            });
          });
        } else {
          if (order.state === 2) {
            order.performTime = new Date();
            app.service('orders').update(order.id, order).then(() => {
              res.status(200).json({
                result: {
                  'state' : order.state,
                  'perform_time' : order.performTime.getTime(),
                  'transaction' : order.id.toString(),
                }
              });
            });
          } else {
            error(ERROR_COULD_NOT_PERFORM, res);
          }
        }
      } else {
        error(ERROR_TRANSACTION_NOT_FOUND, res);
      }
    })
    .catch(() => {
      error(ERROR_INVALID_ACCOUNT, res);
    });
};