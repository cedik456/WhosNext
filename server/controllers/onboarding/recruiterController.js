const Recruiter = require("../../models/RecruiterSchema");

exports.saveCompanyName = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    await Recruiter.findOneAndUpdate(
      { userId },
      { companyName: name.trim() },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: "Name saved successfully" });
  } catch (error) {
    console.error("Error saving name:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving name." });
  }
};

exports.saveJobTitle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobTitle } = req.body;

    if (!jobTitle || typeof jobTitle !== "string" || jobTitle.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Job title is required",
      });
    }

    await Recruiter.findOneAndUpdate(
      { userId },
      { jobTitle: jobTitle.trim() },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Job title saved successfully",
    });
  } catch (error) {
    console.error("Error saving job title:", error);
    res.status(500).json({
      success: false,
      message: "Server error while saving job title",
    });
  }
};
exports.saveRequirements = async (req, res) => {
  try {
    const userId = req.user.id;
    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Skills must be a non-empty array" });
    }

    await Recruiter.findOneAndUpdate(
      { userId },
      { $set: { "hiringCriteria.requiredSkills": skills } },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Skills saved successfully" });
  } catch (error) {
    console.error("Error saving recruiter skills:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

exports.saveHiringLocation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { location } = req.body;

    if (!location || location.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Location is required" });
    }

    await Recruiter.findOneAndUpdate(
      { userId },
      { "hiringCriteria.location": location.trim() },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Hiring location saved successfully",
    });
  } catch (error) {
    console.error("Hiring location error:", error);
    es.status(500).json({
      success: false,
      message: "Server error while saving hiring location",
    });
  }
};
