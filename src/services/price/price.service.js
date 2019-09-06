// Initializes the `price` service on path `/prices`
const createService = require('feathers-sequelize');
const createModel = require('../../models/price.model');
const hooks = require('./price.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  // const paginate = app.get('paginate');

  const options = {
    Model,
    multi: [ 'create' ]
    // paginate
  };

  // Initialize our service with any options it requires
  app.use('/prices', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('prices');

  service.hooks(hooks);
};
