const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  jobSeekerId: {
    type: Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: true,
  },
  recruiterId: {
    type: Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

MatchSchema.index({ jobSeekerId: 1, recruiterId: 1 }, { unique: true });

module.exports = mongoose.model("Match", MatchSchema);
