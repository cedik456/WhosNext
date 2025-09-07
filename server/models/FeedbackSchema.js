const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    displayName: { type: String, required: true }, // snapshot of user's name/company at submit time
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    appVersion: { type: String, default: null },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "wont_fix"],
      default: "open",
      index: true,
    },
  },
  { timestamps: true } // adds createdAt / updatedAt
);

// Simple search support for admin
FeedbackSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Feedback", FeedbackSchema);
