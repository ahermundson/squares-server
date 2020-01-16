const mongoose = require("mongoose");

const { Schema } = mongoose;

const gameSchema = new Schema(
  {
    firstQuarterHome: { type: Number },
    firstQuarterAway: { type: Number },
    secondQuarterHome: { type: Number },
    secondQuarterAway: { type: Number },
    thirdQuarterHome: { type: Number },
    thirdQuarterAway: { type: Number },
    fourthQuarterHome: { type: Number },
    fourthQuarterAway: { type: Number },
    homeTeam: { type: Schema.Types.ObjectId, ref: "Team" },
    awayTeam: { type: Schema.Types.ObjectId, ref: "Team" },
    boardId: { type: Schema.Types.ObjectId, ref: "Board" },
    homeTeamScore: { type: Number },
    awayTeamScore: { type: Number }
  },
  { collection: "Games" }
);

gameSchema.pre("save", next => {
  next();
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
