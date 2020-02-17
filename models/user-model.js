const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    games: { type: Array }
  },
  { collection: "Users" }
);

userSchema.pre("save", next => {
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
