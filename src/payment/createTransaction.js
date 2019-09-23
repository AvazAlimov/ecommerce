const { error, ERROR_COULD_NOT_PERFORM, ERROR_INVALID_ACCOUNT } = require('./errors');

module.exports = (app, { params }, res) => {
  app
    .service('orders')
    .get(params.account.order_id)
    .then(order => {
      if(order.state === 1) {
        res.status(200).json({
          result: { 
            create_time: order.createdAt.getTime(),
            transaction: order.id,
            state: 1,
          }
        });
      } else {
        error(ERROR_COULD_NOT_PERFORM, res);
      }
    })
    .catch((error) => {
      error(ERROR_INVALID_ACCOUNT, res);
    });
};