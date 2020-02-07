import { withFilter } from "graphql-subscriptions";

const SQUARE_TAKEN = "SQUARE_TAKEN";

export default {
  Subscription: {
    squareTaken: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(SQUARE_TAKEN),
        (payload, variables) => {
          return payload.squareTaken.board == variables.id;
        }
      )
    }
  },
  Mutation: {
    markSquare: async (_, { id }, { models, pubsub, user }) => {
      const updatedSquare = await models.Square.findOneAndUpdate(
        {
          _id: id
        },
        {
          isTaken: true,
          takenByUser: user._id
        },
        { new: true }
      );
      pubsub.publish(SQUARE_TAKEN, {
        squareTaken: updatedSquare
      });
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
    },
    board({ board }, _, { loaders }) {
      return board ? loaders.boardLoader.load(board) : null;
    }
  }
};
