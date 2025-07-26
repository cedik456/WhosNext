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

    workEnvironment: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"],
    },

    workType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
    },
    salaryRange: {
      min: Number,
      max: Number,
    },
  },

  filters: {
    filterSkills: {
      type: [String],
      default: [],
    },
    filterLocation: String,
    filterExperienceLevel: String,
    filterWorkEnvironment: {
      type: String,
      enum: ["On-Site", "Remote", "Hybrid"],
    },
    filterWorkType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
