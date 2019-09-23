const { error, ERROR_COULD_NOT_PERFORM, ERROR_INVALID_ACCOUNT } = require('./errors');

module.exports = (app, { params }, res) => {
  app
    .service('orders')
    .find({ query: { transactionId: params.id }})
    .then(async (orders) => {
      const [order] = orders.data;
      if(order) {
        if(order.state === 1) {
          order.transactionId = params.id;
          app.service('orders').update(order.id, order).then(() => {
            res.status(200).json({
              result: { 
                create_time: order.createdAt.getTime(),
                transaction: order.id.toString(),
                state: 1,
              }
            });
          });
        } else {
          error(ERROR_COULD_NOT_PERFORM, res);
        }
      } else {
        error(ERROR_INVALID_ACCOUNT, res);
      }
    })
    .catch(() => {
      error(ERROR_INVALID_ACCOUNT, res);
    });
};