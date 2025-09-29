const mongoose = require("mongoose");

const SwipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default: null },
  action: {
    type: String,
    enum: ["like", "nope"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Swipe", SwipeSchema);
