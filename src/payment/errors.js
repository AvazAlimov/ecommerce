// module.export.ERROR_INVALID_CREDIT_PAYMENT = -31051;
// module.export.ERROR_INTERNAL_SYSTEM = -32400;
module.exports.ERROR_INSUFFICIENT_PRIVILEGE = -32504;
module.exports.ERROR_INVALID_JSON_RPC_OBJECT = -32600;
module.exports.ERROR_METHOD_NOT_FOUND = -32601;
module.exports.ERROR_INVALID_AMOUNT = -31001;
module.exports.ERROR_TRANSACTION_NOT_FOUND = -31003;
module.exports.ERROR_INVALID_ACCOUNT = -31050;
module.exports.ERROR_COULD_NOT_CANCEL = -31007;
module.exports.ERROR_COULD_NOT_PERFORM = -31008;

const error_messages = {};
error_messages[this.ERROR_INSUFFICIENT_PRIVILEGE] = {
  ru: 'Недостаточно привилегий для выполнения метода',
  uz: 'Usulni bajarishda yetarli huquqlar yo\'q',
  en: 'Not enough privileges to execute method'
};
error_messages[this.ERROR_METHOD_NOT_FOUND] = {
  ru: 'Запрашиваемый метод не найден',
  uz: 'So‘ralgan usul topilmadi',
  en: 'The requested method was not found'
};
error_messages[this.ERROR_INVALID_AMOUNT] = {
  ru: 'Неверная сумма',
  uz: 'Noto‘g‘ri miqdor',
  en: 'Invalid amount'
};
error_messages[this.ERROR_TRANSACTION_NOT_FOUND] = {
  ru: 'Транзакция не найдена',
  uz: 'Transaksiya topilmadi',
  en: 'Transaction not found'
};
error_messages[this.ERROR_COULD_NOT_CANCEL] = {
  ru: 'Оплата уже проведена',
  uz: 'To\'lov amalga oshirildi',
  en: 'Payment already done'
};
error_messages[this.ERROR_INVALID_ACCOUNT] = {
  ru: 'Неверный номер кредит',
  uz: 'Noto‘g‘ri kredit raqami',
  en: 'Invalid credit number'
};
error_messages[this.ERROR_COULD_NOT_PERFORM] = {
  ru: 'Не удалось выполнить операцию',
  uz: 'Ushbu amalni bajarib bo\'lmadi',
  en: 'Could not perform operation'
};
error_messages[this.ERROR_INVALID_JSON_RPC_OBJECT] = {
  ru: 'Отсутствуют обязательные поля в RPC-запросе',
  uz: 'RPC so\'rovida majburiy maydonlar yo\'q',
  en: 'Missing required fields in RPC request'
};
module.exports.getErrorMessages = error => error_messages[error];