import { withFilter } from "graphql-subscriptions";

const GAME_SCORE_UPDATED = "GAME_SCORE_UPDATED";

export default {
  Query: {
    allGames: (_, __, { models }) => models.Game.find({})
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
  Subscription: {
    scoreUpdated: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(GAME_SCORE_UPDATED),
        (payload, variables) => payload.scoreUpdated.game == variables.id
      )
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
