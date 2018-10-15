const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    username: { type: String },
    password: { type: String }
  },
  { collection: "Users" }
);

userSchema.pre("save", next => {
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
