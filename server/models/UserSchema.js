const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId && !this.phoneNumber;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  role: {
    type: String,
    enum: ["jobSeeker", "recruiter", "admin"],
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
