export default {
  Mutation: {
    markSquare: async (_, { id, userID }, { models }) => {
      const updatedSquare = await models.Square.findOneAndUpdate(
        {
          _id: id
        },
        {
          isTaken: true,
          updatedByUserID: userID
        }
      );
      return updatedSquare;
    }
  },
  Query: {
    getGameSquares: (_, { id }, { models }) =>
      models.Square.find({ gameID: id })
  }
};
