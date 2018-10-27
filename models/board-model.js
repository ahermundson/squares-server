const mongoose = require("mongoose");

const { Schema } = mongoose;

const boardSchema = new Schema(
  {
    game: { type: Schema.Types.ObjectId, ref: "Game" }
  },
  { collection: "Boards" }
);

boardSchema.pre("save", next => {
  next();
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
