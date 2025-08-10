const { INDUSTRIES } = require("../../constants/industries");
const JobSeeker = require("../../models/JobSeekerSchema");
const Recruiter = require("../../models/RecruiterSchema");
const User = require("../../models/UserSchema");

exports.saveRole = async (req, res) => {
  try {
    const userId = req.user.id;

    const { role } = req.body;

    const allowedRoles = ["jobSeeker", "recruiter"];

    if (!allowedRoles.includes(role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role selected" });
    }

    await User.findByIdAndUpdate(userId, { role });

    res.status(200).json({ success: true, message: "Role saved successfully" });
  } catch (error) {
    console.error("Error saving role:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving role." });
  }
};

exports.completeOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, { isOnboarded: true });

    res.status(200).json({ success: true, message: "Onboarding completed." });
  } catch (error) {
    console.error("Onboarding complete error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to complete onboarding.",
    });
  }
};

exports.saveIndustry = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const { industry } = req.body;

    if (!["jobSeeker", "recruiter"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    if (!INDUSTRIES.includes(industry)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Industry" });
    }

    const Model = role === "recruiter" ? Recruiter : JobSeeker;

    await Model.findOneAndUpdate(
      { userId },
      { $set: { industry }, $setOnInsert: { userId } },
      { new: true, upsert: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "Industry saved successfully" });
  } catch (error) {
    console.error("saveIndustry error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error while saving industry." });
  }
};
