const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  companyName: String,
  companyPicture: {
    type: String,
    default: "",
  },
  jobDescription: String,
  jobTitle: String,

  hiringCriteria: {
    requiredSkills: {
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

    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
    },
    salaryRange: {
      min: Number,
      max: Number,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
