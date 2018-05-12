export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    message: DataTypes.STRING,
  });

  Message.associate = (models) => {
    // 1:M
    Message.belongsTo(models.Channel, {
      foreignKey: 'channelId',
    });
    // 1:M
    Message.belongsTo(models.Channel, {
      foreignKey: 'userId',
    });
  };

  return Message;
};
