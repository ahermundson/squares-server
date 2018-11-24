export default {
  Mutation: {
    markSquare: async (_, { id }, { models }) => {
      const updatedSquare = await models.Square.findOneAndUpdate(
        {
          _id: id
        },
        {
          isTaken: true,
          takenByUser: "5bf616b49a7d1e306f841fe8"
        }
      );
      return updatedSquare;
    }
  },
  Query: {
    getGameSquares: (_, { id }, { models }) =>
      models.Square.find({ board: id }).sort("y")
  },
  Square: {
    takenByUser({ takenByUser }, _, { loaders }) {
      return takenByUser ? loaders.userLoader.load(takenByUser) : null;
    }
  }
};
