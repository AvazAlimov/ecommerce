function includeModels(context) {
  // Get the Sequelize instance. In the generated application via:
  const sequelize = context.app.get('sequelizeClient');
  const { brand, category } = sequelize.models;

  context.params.sequelize = {
    include: [{
      model: brand,
      as: 'brand',
      required: false
    }, {
      model: category,
      as: 'category',
      required: false
    }],
    nest: true,
  };

  return Promise.resolve(context);
}

function removeNullModels(context) {
  if (context.result.data instanceof Array) {
    context.result.data.forEach(element => {
      const { brand, category } = element;
      if (!brand.id)  delete element.brand;
      if (!category.id)  delete element.category;
    });
  } else {
    const { brand, category } = context.result;
    if (!brand.id) delete context.result.brand;
    if (!category.id) delete context.result.category;
  }
  return context;
}

async function includeFiles(context) {
  const { app } = context;

  return Promise.all(context.result.photoIds.map(fileId => app.service('uploads').get(fileId)))
    .then(results => {
      results.forEach(file => file.path = context.app.get('url') + 'uploads/');
      context.result.photos = results;
      return context;
    });
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
        return context.app.service('products').get(context.id)
          .then(async product => {
            await product.photoIds.map(id => context.app.service('uploads').remove(id));
            return context;
          });   
      }
    ]
  },

  after: {
    all: [],
    find: [removeNullModels],
    get: [removeNullModels, includeFiles],
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
