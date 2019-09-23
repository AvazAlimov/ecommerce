const { error, ERROR_COULD_NOT_PERFORM, ERROR_INVALID_ACCOUNT, ERROR_INVALID_AMOUNT } = require('./errors');

module.exports = (app, { params, id }, res) => {
  const success = (order) => {
    app
      .service('orders')
      .update(order.id, order)
      .then(() => {
        res.status(200).json({
          result: { 
            create_time: order.createdAt.getTime(),
            transaction: order.id.toString(),
            state: 1,
          }
        });
      });
  };
  
  app
    .service('orders')
    .find({ query: { transactionId: params.id }})
    .then(async (orders) => {
      const [order] = orders.data;
      if(order) {
        if(order.state === 1) {
          order.transactionId = params.id;
          success(order);
        } else {
          error(ERROR_COULD_NOT_PERFORM, id, res);
        }
      } else {
        app
          .service('orders')
          .get(params.account.order_id)
          .then(order => {
            if (order.status !== 0) {
              error(ERROR_INVALID_ACCOUNT, id, res);
            } else {
              if (order.price * 1000 === parseInt(params.amount, 10)) {
                order.state = 1;
                order.transactionId = params.id;
                success(order);
              } else {
                error(ERROR_INVALID_AMOUNT, id, res);
              }
            }
          })
          .catch(() => {
            error(ERROR_INVALID_ACCOUNT, id, res);
          });
      }
    })
    .catch(() => {
      error(ERROR_INVALID_ACCOUNT, id, res);
    });
};