const mongoose = require("mongoose");

const { Schema } = mongoose;

const squareSchema = new Schema(
  {
    x: { type: Number },
    y: { type: Number },
    isTaken: { type: Boolean },
    takenByUser: { type: Schema.Types.ObjectId, ref: "User" },
    board: { type: Schema.Types.ObjectId, ref: "Board" }
  },
  { collection: "Squares" }
);

squareSchema.pre("save", next => {
  next();
});

const Square = mongoose.model("Square", squareSchema);

module.exports = Square;
