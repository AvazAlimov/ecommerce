// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const brand = sequelizeClient.define('brand', {
    logoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'upload',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    names: {
      type: DataTypes.JSONB,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    }
  });

  // eslint-disable-next-line no-unused-vars
  brand.associate = function (models) {
    brand.belongsTo(models.upload, { as: 'logo', foreignKey: 'logoId' });
  };

  return brand;
};
