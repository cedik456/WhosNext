const JobSeeker = require("../../models/JobSeekerSchema");
const User = require("../../models/UserSchema");

exports.saveName = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "jobSeeker") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can perform this action.",
      });
    }

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

    if (req.user.role !== "jobSeeker") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can perform this action.",
      });
    }

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

    if (req.user.role !== "jobSeeker") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can perform this action.",
      });
    }

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

exports.saveWorkType = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "jobSeeker") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can perform this action.",
      });
    }

    const { workType } = req.body;

    const validTypes = ["Full-time", "Part-time", "Internship"];

    if (!validTypes.includes(workType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing work type",
      });
    }

    await JobSeeker.findOneAndUpdate(
      { userId },
      {
        $set: {
          workType,
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, message: "Work saved successfully" });
  } catch (error) {
    console.error("Error saving work type", error);

    res.status(500).json({
      success: false,
      message: "Server error while saving work type",
    });
  }
};

exports.saveWorkEnvironment = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "jobSeeker") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can perform this action.",
      });
    }

    const { workEnvironment } = req.body;

    const validEnvironments = ["On-site", "Remote", "Hybrid"];

    if (!validEnvironments.includes(workEnvironment)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing work environment",
      });
    }

    await JobSeeker.findOneAndUpdate(
      { userId },
      {
        $set: {
          workEnvironment,
        },
      },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Work environment saved successfully" });
  } catch (error) {
    console.error("Error saving work environment", error);

    res.status(500).json({
      success: false,
      message: "Server error while saving work environment",
    });
  }
};

exports.saveJobSeekerExperience = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "jobSeeker") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can perform this action.",
      });
    }

    const { experience } = req.body;

    const validLevels = [
      "Entry-level",
      "Junior",
      "Mid-level",
      "Senior",
      "Lead",
      "Director",
      "Executive",
    ];

    if (!validLevels.includes(experience)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing experience level",
      });
    }

    await JobSeeker.findOneAndUpdate(
      { userId },
      { $set: { experience } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Experience level saved successfully",
    });
  } catch (error) {
    console.error("Error saving experience level:", error);
    res.status(500).json({
      success: false,
      message: "Server error while saving experience level",
    });
  }
};
