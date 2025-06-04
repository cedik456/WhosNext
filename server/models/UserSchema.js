const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  role: {
    type: String,
    enum: ["jobSeeker", "recruiter"],
    required: true,
  },
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
