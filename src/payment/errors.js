module.exports.ERROR_INSUFFICIENT_PRIVILEGE = {
  code: -32504,
  message: {
    ru: 'Недостаточно привилегий для выполнения метода',
    uz: 'Usulni bajarishda yetarli huquqlar yo\'q',
    en: 'Not enough privileges to execute method'
  }
};

module.exports.ERROR_INVALID_JSON_RPC_OBJECT = {
  code: -32600,
  message: {
    ru: 'Отсутствуют обязательные поля в RPC-запросе',
    uz: 'RPC so\'rovida majburiy maydonlar yo\'q',
    en: 'Missing required fields in RPC request'
  }
};

module.exports.ERROR_COULD_NOT_PERFORM = {
  code: -31008,
  message: {
    ru: 'Не удалось выполнить операцию',
    uz: 'Ushbu amalni bajarib bo\'lmadi',
    en: 'Could not perform operation'
  }
};

module.exports.ERROR_INVALID_ACCOUNT = {
  code: -31050,
  message: {
    ru: 'Неверный номер кредит',
    uz: 'Noto‘g‘ri kredit raqami',
    en: 'Invalid credit number'
  }
};

module.exports.ERROR_METHOD_NOT_FOUND = {
  code: -32601,
  message: {
    ru: 'Запрашиваемый метод не найден',
    uz: 'So‘ralgan usul topilmadi',
    en: 'The requested method was not found'
  }
};

module.exports.ERROR_INVALID_AMOUNT = {
  code: -31001,
  message: {
    ru: 'Неверная сумма',
    uz: 'Noto‘g‘ri miqdor',
    en: 'Invalid amount'
  }
};

module.exports.ERROR_TRANSACTION_NOT_FOUND = {
  code: -31003,
  message: {
    ru: 'Транзакция не найдена',
    uz: 'Transaksiya topilmadi',
    en: 'Transaction not found'
  }
};

module.exports.ERROR_COULD_NOT_CANCEL = {
  code: -31007,
  message: {
    ru: 'Оплата уже проведена',
    uz: 'To\'lov amalga oshirildi',
    en: 'Payment already done'
  }
};

module.exports.error = (error, id, res) => {
  res.status(200).json({ error, id });
};