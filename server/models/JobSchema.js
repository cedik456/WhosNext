const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredSkills: {
      type: [String],
      default: [],
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Entry", "Mid", "Senior"],
      required: true,
    },
    workType: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      required: true,
    },
    workEnvironment: {
      type: String,
      enum: ["Full-time", "Part-time", "Freelance"],
      required: true,
    },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
