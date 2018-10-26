const mongoose = require("mongoose");

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    teamName: { type: String }
  },
  { collection: "Teams" }
);

teamSchema.pre("save", next => {
  next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
