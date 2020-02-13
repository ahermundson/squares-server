import http from "http";
import mongoose from "mongoose";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { PubSub } from "graphql-subscriptions";
import jwt from "jsonwebtoken";
import mongoConnection from "./modules/mongo-connection";
import models from "./models";
import { refreshTokens } from "./auth";
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

const app = express();

const addUser = async req => {
  const token = req.headers.authorization;
  console.log("TOKEN: ", token);
  if (token) {
    try {
      const { user } = jwt.verify(token, process.env.SECRET);
      return user;
    } catch (err) {
      // const refreshToken = req.headers["x-refresh-token"];
      // const newTokens = await refreshTokens(
      //   token,
      //   refreshToken,
      //   models,
      //   process.env.SECRET,
      //   process.env.SECRET2
      // );

      // if (newTokens.token && newTokens.refreshToken) {
      //   res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
      //   res.set("x-token", newTokens.token);
      //   res.set("x-refresh-token", newTokens.refreshToken);
      // }
      // req.user = newTokens.user;
      return "";
    }
  }
  return "";
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: i => {
    const user = addUser(i.req);
    return {
      models,
      loaders,
      pubsub,
      SECRET: process.env.SECRET,
      SECRET2: process.env.SECRET2,
      user
    };
  }
});
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
