const mongoose = require("mongoose");

const { Schema } = mongoose;

const squareSchema = new Schema(
  {
    first_name: { type: String },
    x: { type: Number },
    y: { type: Number },
    isTaken: { type: Boolean },
    takenByUserID: { type: Number },
    gameID: { type: Number }
  },
  { collection: "Squares" }
);

squareSchema.pre("save", next => {
  next();
});

const Square = mongoose.model("Square", squareSchema);

module.exports = Square;
