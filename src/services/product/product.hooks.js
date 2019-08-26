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

module.exports = {
  before: {
    all: [],
    find: [includeModels],
    get: [includeModels],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [removeNullModels],
    get: [removeNullModels],
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
