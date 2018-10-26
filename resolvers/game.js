export default {
  Query: {
    allGames: async (_, __, { models }) => models.Game.find({})
  },
  Mutation: {
    createNewGame: async (_, { homeTeamId, awayTeamId }, { models }) => {
      try {
        const game = {
          firstQuarterHome: null,
          firstQuarterAway: null,
          secondQuarterHome: null,
          secondQuarterAway: null,
          thirdQuarterHome: null,
          thirdQuarterAway: null,
          fourthQuarterHome: null,
          fourthQuarterAway: null,
          homeTeam: homeTeamId,
          awayTeam: awayTeamId
        };
        const newGame = await models.Game.create(game);
        return { ok: true, newGame };
      } catch (err) {
        console.log(err);
        return { ok: false };
      }
    }
  },
  Game: {
    homeTeam({ homeTeam }, _, { models }) {
      return models.Team.findOne({ _id: homeTeam });
    },
    awayTeam({ awayTeam }, _, { models }) {
      return models.Team.findOne({ _id: awayTeam });
    }
  }
};
