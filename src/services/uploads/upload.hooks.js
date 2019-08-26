const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

function compressFile(path, destination) {
  return imagemin([path], {
    destination,
    plugins: [ imageminJpegtran(), imageminPngquant({ quality: [0.6, 0.8] }) ]
  });
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [async context => {
      const { app, data } = context;
      await compressFile(
        `${app.get('uploads')}/${data.filename}`,
        `${app.get('uploads')}/thumbnails`
      ).then(() => { data.thumbnail = `thumbnails/${data.filename}`; });
      return context;
    }],
    update: [],
    patch: [],
    remove: [
      context => {
        const { app } = context;
        return context.app.service('uploads').get(context.id)
          .then(async file => {
            fs.unlinkSync(`${app.get('uploads')}/${file.filename}`);
            fs.unlinkSync(`${app.get('uploads')}/thumbnails/${file.filename}`);
            return context;
          });
      }
    ]
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
