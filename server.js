import mongoose from "mongoose";
import path from "path";
import { ApolloServer, PubSub } from "apollo-server";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import mongoConnection from "./modules/mongo-connection";
import models from "./models";
// import { createGameRoute, createGameHandler } from "./handlers/newGame";
import loaders from "./loaders";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

mongoose.Promise = global.Promise;
mongoConnection.connect();
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
    loaders,
    pubsub
  }
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));
