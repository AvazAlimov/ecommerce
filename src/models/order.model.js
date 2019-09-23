// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const order = sequelizeClient.define('order', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    items: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    performTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  order.associate = function (models) {
    order.belongsTo(models.users, { as: 'client' });
  };

  return order;
};
