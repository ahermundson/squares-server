const SQUARE_TAKEN = "SQUARE_TAKEN";

export default {
  Subscription: {
    squareTaken: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(SQUARE_TAKEN)
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
        }
      );
      console.log(updatedSquare);
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
      console.log("IS THIS HIT? ", takenByUser);
      return takenByUser ? loaders.userLoader.load(takenByUser) : null;
    }
  }
};
