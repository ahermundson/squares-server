const mongoose = require("mongoose");

const { Schema } = mongoose;

const boardSchema = new Schema(
  {
    gameId: { type: String }
  },
  { collection: "Boards" }
);

boardSchema.pre("save", next => {
  next();
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
