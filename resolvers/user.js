export default {
  Mutation: {
    createUser: async (_, __, { models }) => {
      const newUser = await models.User.create({
        email: "alex.hermundson@gmail.com",
        first_name: "Alex",
        last_name: "Hermundson",
        isAdmin: true,
        username: "ahermundson"
      });
      return newUser;
    }
  }
};
