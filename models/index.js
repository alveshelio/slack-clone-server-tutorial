import Sequelize from 'sequelize';

const { Op } = Sequelize;
const operatorsAliases = {
  $gt: Op.gt,
};

const sequelize = new Sequelize('slack', 'slack', 'slack', {
  dialect: 'postgres',
  operatorsAliases,
});
const models = {
  User: sequelize.import('./user'),
  Team: sequelize.import('./team'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
