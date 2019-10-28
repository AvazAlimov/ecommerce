const crypto = require('crypto');
const { error, ERROR_SIGN_CHECK_FAILED, ERROR_TRANSACTION_NOT_FOUND } = require('./errors');

const SECRET_KEY = 'xF93O0851xcdPt8';

function validate(req) {
  const { sign_string, sign_time, click_trans_id, service_id, merchant_trans_id, amount, action } = req.params;
  
  // eslint-disable-next-line no-console
  console.log(sign_time);

  const hash = crypto.createHash('md5')
    .update(click_trans_id + service_id + SECRET_KEY + merchant_trans_id + amount + action + sign_time)
    .digest('hex');

  if (hash !== sign_string) {
    return ERROR_SIGN_CHECK_FAILED;
  }

  return true;
}

module.exports = (app, req, res) => {
  app
    .service('orders')
    .get(req.params.merchant_trans_id)
    .then(order => {
      const validation = validate(req, res);
      if(validation === true) {
        if (req.params.error === 0) {
          order.paid = true;
          order.performTime = new Date();
          app
            .service('orders')
            .update(order.id, order)
            .then(() => res.status(200).json({
              click_trans_id: req.params.click_trans_id,
              merchant_trans_id: req.params.merchant_trans_id,
              merchant_prepare_id: order.id,
            }));
        }
      } else {
        error(validation, res);
      }
    })
    .catch(() => {
      error(ERROR_TRANSACTION_NOT_FOUND, res);
    });
};

