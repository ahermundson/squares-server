import { withFilter } from "graphql-subscriptions";

const SQUARE_TAKEN = "SQUARE_TAKEN";

export default {
  Subscription: {
    squareTaken: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(SQUARE_TAKEN),
        (payload, variables) => payload.squareTaken.board == variables.id
      )
    }
  },
  Mutation: {
    markSquare: async (_, { id }, { models, pubsub }) => {
      const updatedSquare = await models.Square.findOneAndUpdate(
        {
          _id: id
        },
        {
          isTaken: true,
          takenByUser: "5bf616b49a7d1e306f841fe8"
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
