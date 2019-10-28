const payme = require('./payme');
const click = require('./click');

module.exports = app => {
  payme(app);
  click(app);
};