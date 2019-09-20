const { authenticate } = require('@feathersjs/authentication').hooks;

function includeClient(context) {
  // Get the Sequelize instance. In the generated application via:
  const sequelize = context.app.get('sequelizeClient');
  const { users } = sequelize.models;

  context.params.sequelize = {
    include: [{
      model: users,
      as: 'client',
    }],
    nest: true,
  };

  return Promise.resolve(context);
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [includeClient],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
