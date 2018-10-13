import express from "express";
// import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
// import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
// import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
// import jwt from "jsonwebtoken";
// import mongoConnection from "./modules/mongo-connection";
// import models from "./models";
// import loaders from "./loaders";
// import { refreshTokens } from "./auth";
// import nodemailer from "nodemailer";
// import _ from "lodash";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));

const app = express();

app.use(cors("*"));

// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("OK"));

app.listen(4000, () => console.log(`🚀  Server ready at port 4000`));
