const mongoose = require("mongoose");
const { INDUSTRIES } = require("../constants/industries");
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
  industry: {
    type: String,
    enum: INDUSTRIES,
    default: "General",
  },
  bio: String,
  workEnvironment: {
    type: String,
    enum: ["On-site", "Remote", "Hybrid"],
  },
  workType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship"],
  },
  preferences: {
    preferredIndustry: {
      type: String,
      enum: INDUSTRIES,
    },

    preferredSkills: {
      type: [String],
      default: [],
    },
    preferredLocation: String,
    preferredExperienceLevel: String,
    preferredWorkEnvironment: {
      type: String,
      enum: ["On-Site", "Remote", "Hybrid"],
    },
    preferredWorkType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
    },
    preferredSalary: {
      min: Number,
      max: Number,
    },
    preferredJobTitle: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
