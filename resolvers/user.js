import bcrypt from "bcryptjs";
import { tryLogin, createTokens } from "../auth";

export default {
  Query: {
    getAllUsers: (_, __, { models }) => models.User.find(),
    getUser: (_, { id }, { models }) => models.User.findOne({ _id: id })
  },
  Mutation: {
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
  },
  User: {
    async games({ games }, __, { models }) {
      const promises = [];
      games.forEach(game => promises.push(models.Game.find({ _id: game })));
      const results = await Promise.all(promises);
      return results.flat();
    }
  }
};
