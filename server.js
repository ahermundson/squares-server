import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import mongoConnection from "./modules/mongo-connection";
import models from "./models";
import { createGameRoute, createGameHandler } from "./handlers/newGame";
import loaders from "./loaders";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

mongoose.Promise = global.Promise;
mongoConnection.connect();

app.use(cors("*"));

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(() => ({
    schema,
    context: {
      models,
      loaders
    }
  }))
);

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use(bodyParser.json());

app.post(createGameRoute, createGameHandler);

app.listen(4000, () => console.log(`🚀  Server ready at port 4000`));
