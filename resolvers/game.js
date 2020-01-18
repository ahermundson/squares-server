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
          awayTeam: awayTeamId,
          homeTeamScore: 0,
          awayTeamScore: 0
        };
        const newGame = await models.Game.create(game);
        return { ok: true, newGame };
      } catch (err) {
        console.log(err);
        return { ok: false };
      }
    },
    updateScore: async (
      _,
      { homeTeamScore, awayTeamScore, gameId },
      { models, pubsub }
    ) => {
      try {
        const updatedGame = await models.Game.findOneAndUpdate(
          { _id: gameId },
          { homeTeamScore, awayTeamScore },
          { new: true }
        );
        pubsub.publish(GAME_SCORE_UPDATED, { scoreUpdated: updatedGame });
        return updatedGame;
      } catch (err) {
        console.log("ERR: ", err);
        return null;
      }
    }
  },
  Subscription: {
    scoreUpdated: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(GAME_SCORE_UPDATED),
        (payload, variables) => {
          console.log("PAYLOAD: ", payload);
          console.log("VARIABLES: ", variables);
          return payload.scoreUpdated.boardId == variables.gameId;
        }
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
