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
