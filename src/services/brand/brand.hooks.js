

module.exports = {
  before: {
    all: [],
    find: [
      context => {
        // Get the Sequelize instance. In the generated application via:
        const sequelize = context.app.get('sequelizeClient');
        const { upload } = sequelize.models;

        context.params.sequelize = {
          include: [{
            model: upload,
            as: 'logo',
          }],
          nest: true,
        };

        return Promise.resolve(context);
      },
    ],
    get: [],
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
    find: [
      context => {
        context.result.data.forEach(element => {
          const {logo} = element;
          if (logo) {
            logo.path = context.app.get('url') + 'uploads/';
          }
        });
        return context;
      }
    ],
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
