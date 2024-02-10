const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name must be provided"]
  },
  email: {
    type: String,
    required: [true, "Email must be provided"]
  },
  password: {
    type: String,
    required: [true, "Password must be provided"]
  },
  gender: {
    type: String,
    values: ["Male", "Female", "Other"],
  },
  dob: {
    type: Date
  },
  mobile: {
    type: String
  },
  preferred: {
    type: String,
    values: ["Java", ".Net Core", "Express", "Django", "Flask", "Laravel", "Rails"],
    message: `{VALUE} is not a valid preferred framework`
  },
  status: {
    type: Number,
    values: [0, 1],
    message: `{VALUE} is not a valid status`
  },
  activationCode: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("User", userSchema);