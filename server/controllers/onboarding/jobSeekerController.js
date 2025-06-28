const JobSeeker = require("../../models/JobSeekerSchema");
const User = require("../../models/UserSchema");

exports.saveName = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    await User.findByIdAndUpdate(userId, { name: name.trim() });

    res.status(200).json({ success: true, message: "Name saved successfully" });
  } catch (error) {
    console.error("Error saving name:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving name." });
  }
};

exports.saveSkills = async (req, res) => {
  try {
    const userId = req.user.id;

    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Skills must be a non-empty array" });
    }

    await JobSeeker.findOneAndUpdate(
      { userId },
      { $set: { skills } },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Skills saved successfully" });
  } catch (error) {
    console.error("Error saving skills:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving skills." });
  }
};

exports.saveLocation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { location } = req.body;

    if (!location || location.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Location is required" });
    }

    await JobSeeker.findOneAndUpdate(
      { userId },
      { location: location.trim() },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Location saved successfully" });
  } catch (error) {
    console.error("JobSeeker location error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving location" });
  }
};

exports.saveWorkPreferencesJobSeekers = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workEnvironment, workType } = req.body;

    const validEnvironments = ["On-site", "Remote", "Hybrid"];
    const validTypes = ["Full-time", "Part-time", "Internship"];

    if (
      !validEnvironments.includes(workEnvironment) ||
      !validTypes.includes(workType)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing work preference",
      });
    }

    await JobSeeker.findOneAndUpdate(
      { userId },
      {
        $set: {
          "preferences.workEnvironment": workEnvironment,
          "preferences.workType": workType,
        },
      },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Work Preferences saved successfully" });
  } catch (error) {
    console.error("Error saving work preferences", error);

    res.status(500).json({
      success: false,
      message: "Server error while saving work preferences",
    });
  }
};
