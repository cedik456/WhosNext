const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  hiringCriteria: {
    skills: {
      type: [String],
      default: [],
    },
    location: String, // where they want to hire
    experienceLevel: String, // e.g., "entry", "mid", "senior"
    industry: String,
    workEnvironment: {
      type: String,
      enum: ["onsite", "remote", "hybrid"],
    },
  },
  companyName: String,
  bio: String, // optional description
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
