export default {
  Mutation: {
    createMessage: async (parent, args, { models, user }) => {
      try {
        return await models.Message.create({
          ...args,
          userId: user.id,
        });
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
