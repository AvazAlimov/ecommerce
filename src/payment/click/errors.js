module.exports.ERROR_IN_REQUEST_FROM_CLICK = {
  error: -8,
  error_note: 'Error in request from click'
};

module.exports.ERROR_SIGN_CHECK_FAILED = {
  error: -1,
  error_note: 'SIGN CHECK FAILED!'
};

module.exports.ERROR_TRANSACTION_NOT_FOUND = {
  error: -6,
  error_note: 'Transaction does not exist'
};

module.exports.error = (error, res) => {
  res.status(200).json(error);
};