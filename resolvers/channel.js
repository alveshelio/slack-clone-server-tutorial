export default {
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        return await models.Channel.create(args);
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
