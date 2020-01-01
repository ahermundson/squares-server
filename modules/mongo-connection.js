/* eslint no-console:0 */
require("dotenv").config();

import mongoose from "mongoose"; // eslint-disable-line

const connectionString = process.env.MONGODB_URI;

const connectToMongoDatabase = () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set("debug", true);

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to ", connectionString);
  });

  mongoose.connection.on("error", err => {
    console.log("Mongoose failed to connect because error: ", err);
  });
};

export default { connect: connectToMongoDatabase };
