module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'ru',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
};
