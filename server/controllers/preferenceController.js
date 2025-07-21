const JobSeeker = require("../models/JobSeekerSchema");

exports.updatePreferences = async (req, res) => {
  try {
    const preferences = req.body.preferences;

    if (!preferences) {
      return res
        .status(400)
        .json({ success: false, message: "Preferences data is required" });
    }

    const updated = await JobSeeker.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { preferences } },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Job Seeker profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Preferences updated successfully",
      data: updated.preferences,
    });
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
