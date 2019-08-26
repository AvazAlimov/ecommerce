function includeModels(context) {
  // Get the Sequelize instance. In the generated application via:
  const sequelize = context.app.get('sequelizeClient');
  const { upload } = sequelize.models;

  context.params.sequelize = {
    include: [{
      model: upload,
      as: 'logo',
      required: false
    }],
    nest: true,
  };

  return Promise.resolve(context);
}

function addPath(context) {
  if (context.result.data instanceof Array) {
    context.result.data.forEach(element => {
      const { logo } = element;
      if (logo.id) {
        logo.path = context.app.get('url') + 'uploads/';
      } else {
        delete element.logo;
      }
    });
  } else {
    const { logo } = context.result;
    if (logo.id) {
      logo.path = context.app.get('url') + 'uploads/';
    } else {
      delete context.result.logo;
    }
  }
  return context;
}

module.exports = {
  before: {
    all: [],
    find: [includeModels],
    get: [includeModels],
    create: [],
    update: [],
    patch: [],
    remove: [
      context => {
        return context.app.service('brands').get(context.id)
          .then(async brand => {
            if (brand.logoId) {
              await context.app.service('uploads').remove(brand.logoId);
            }
            return context;
          });
      }
    ]
  },

  after: {
    all: [],
    find: [ addPath ],
    get: [ addPath ],
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
