export default {
  Query: {
    getGameBoard: async (_, { id }, { models }) =>
      models.Board.find({ game: id })
  }
};
