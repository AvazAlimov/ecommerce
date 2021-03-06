const crypto = require('crypto');
const { error, ERROR_SIGN_CHECK_FAILED, ERROR_TRANSACTION_NOT_FOUND } = require('./errors');

const SECRET_KEY = 'xF93O0851xcdPt8';

function validate(req) {
  const { sign_string, sign_time, click_trans_id, service_id, merchant_trans_id, amount, action } = req.query;

  const hash = crypto.createHash('md5')
    .update(`${click_trans_id}${service_id}${SECRET_KEY}${merchant_trans_id}${amount}${action}${sign_time}`)
    .digest('hex');

  if (hash !== sign_string) {
    return ERROR_SIGN_CHECK_FAILED;
  }

  return true;
}

module.exports = (app, req, res) => {
  const validation = validate(req, res);
  if(validation === true) {
    app
      .service('orders')
      .get(req.query.merchant_trans_id)
      .then(order => {
        order.transactionId = req.query.click_trans_id;
        app
          .service('orders')
          .update(order.id, order)
          .then(() => res.status(200).json({
            click_trans_id: req.query.click_trans_id,
            merchant_trans_id: req.query.merchant_trans_id,
            merchant_prepare_id: order.id,
          }));
      })
      .catch(() => {
        error(ERROR_TRANSACTION_NOT_FOUND, res);
      });
  } else {
    error(validation, res);
  }
};

