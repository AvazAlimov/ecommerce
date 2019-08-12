const users = require('./users/users.service.js');
const category = require('./category/category.service.js');
const language = require('./language/language.service.js');
const brand = require('./brand/brand.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(category);
  app.configure(language);
  app.configure(brand);
};
