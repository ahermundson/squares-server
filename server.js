import http from "http";
import mongoose from "mongoose";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { PubSub } from "graphql-subscriptions";
import mongoConnection from "./modules/mongo-connection";
import models from "./models";
// import { createGameRoute, createGameHandler } from "./handlers/newGame";
import loaders from "./loaders";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoConnection.connect();
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: i => ({
    models,
    loaders,
    pubsub,
    SECRET: process.env.SECRET,
    SECRET2: process.env.SECRET2,
    token: i.req.headers.authorization
  })
});

const app = express();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
