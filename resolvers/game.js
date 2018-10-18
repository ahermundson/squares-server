export default {
  Query: {
    allGames: async (_, __, { models }) => models.Game.find({})
  },
  Mutation: {
    createNewGame: async (_, __, { models }) => {
      try {
        const game = {
          firstQuarterHome: null,
          firstQuarterAway: null,
          secondQuarterHome: null,
          secondQuarterAway: null,
          thirdQuarterHome: null,
          thirdQuarterAway: null,
          fourthQuarterHome: null,
          fourthQuarterAway: null
        };
        const newGame = await models.Game.create(game);
        return { ok: true, newGame };
      } catch (err) {
        console.log(err);
        return { ok: false };
      }
    }
  }
};
