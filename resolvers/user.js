import bcrypt from "bcryptjs";
import { tryLogin, createTokens } from "../auth";

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
    register: async (_, args, { models, SECRET, SECRET2 }) => {
      try {
        // eslint-disable-next-line no-param-reassign
        args.password = await bcrypt.hash(args.password, 12);
        const user = await models.User.create(args);
        const refreshTokenSecret = user.password + SECRET2;
        const [token, refreshToken] = await createTokens(
          user,
          SECRET,
          refreshTokenSecret
        );
        return {
          ok: true,
          user,
          token,
          refreshToken
        };
      } catch (err) {
        console.log("ERR:", err);
        return {
          ok: false,
          errors: "Something went wrong"
        };
      }
    }
  }
};
