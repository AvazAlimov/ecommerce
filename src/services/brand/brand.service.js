// Initializes the `brand` service on path `/brands`
const createService = require('feathers-sequelize');
const createModel = require('../../models/brand.model');
const hooks = require('./brand.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/brands', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('brands');

  service.hooks(hooks);
};
