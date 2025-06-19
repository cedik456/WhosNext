const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSeekerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  location: String,
  experience: String,
  education: String,
  bio: String,
  preferences: {
    industry: String,
    desiredLocation: String,
    workEnvironment: {
      type: String,
      enum: ["onsite", "remote", "hybrid"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
