function includeModels(context) {
  // Get the Sequelize instance. In the generated application via:
  const sequelize = context.app.get('sequelizeClient');
  const { brand, category } = sequelize.models;

  context.params.sequelize = {
    include: [
      {
        model: brand,
        as: 'brand',
        required: false
      },
      {
        model: category,
        as: 'category',
        required: false
      }
    ],
    nest: true,
  };

  return Promise.resolve(context);
}

function removeNullModels(context) {
  const products = context.result.data instanceof Array ? context.result.data : [context.result];
  products.forEach(element => {
    const { brand, category } = element;
    if (!brand.id)  delete element.brand;
    if (!category.id)  delete element.category;
  });
  return context;
}

async function includePrices(context) {
  const { app } = context;
  const products = context.result.data instanceof Array ? context.result.data : [context.result];
  return Promise.all(
    products.map(
      product => app.service('prices')
        .find({ query: { 
          productId: product.id,
          $sort: { createdAt: -1 }
        }})
        .then(results => { product.prices = results; })
    )
  ).then(() => context);
}

async function includeFiles(context) {
  const { app } = context;
  const products = context.result.data instanceof Array ? context.result.data : [context.result];
  const promises = [];
  
  products.map(
    product => {
      product.photos = [];
      product.photoIds.forEach(
        id => promises.push(
          app.service('uploads')
            .get(id)
            .then(file => {
              file.path = context.app.get('url') + 'uploads/';
              product.photos.push(file);
            })
        )
      );
    }
  );

  return Promise.all(promises).then(() => context);
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
    find: [removeNullModels, includeFiles, includePrices],
    get: [removeNullModels, includeFiles, includePrices],
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
