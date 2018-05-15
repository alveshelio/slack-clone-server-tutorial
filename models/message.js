export default (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'message', {
      message: DataTypes.STRING,
    },
  );

  Message.associate = (models) => {
    // 1:M
    Message.belongsTo(models.Channel, {
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
      },
    });
    // 1:M
    Message.belongsTo(models.Channel, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return Message;
};
