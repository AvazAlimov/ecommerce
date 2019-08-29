// Initializes the `uploads` service on path `/uploads`
const createService = require('feathers-sequelize');
const createModel = require('../../models/upload.model');
const hooks = require('./upload.hooks');
const multer = require('multer');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    // paginate,
  };

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, app.get('uploads')),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  });

  const upload = multer({ storage });

  app.use('/uploads', upload.single('file'), (req, _res, next) => {
    if (req.method === 'POST') {
      req.body = {
        original: req.file.originalname,
        filename: req.file.filename,
      };
    }
    next();
  },
  createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
