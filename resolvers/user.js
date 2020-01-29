import { tryLogin } from "../auth";

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
    },
    login: (_, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (_, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: "Something went wrong"
        };
      }
    }
  }
};
