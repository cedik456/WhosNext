const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
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
    required: function () {
      return !this.googleId;
    },
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

  isVerified: {
    type: Boolean,
    default: false,
  },

  preferences: {
    industry: String,
    location: String,
    skills: [String],
  },

  profile: {
    experience: String,
    education: String,
    bio: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
