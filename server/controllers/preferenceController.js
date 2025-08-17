const { INDUSTRIES } = require("../constants/industries");
const JobSeeker = require("../models/JobSeekerSchema");
const Recruiter = require("../models/RecruiterSchema");

// Job Seeker
exports.updatePreferences = async (req, res) => {
  try {
    const preferences = req.body.preferences;

    if (!preferences) {
      return res
        .status(400)
        .json({ success: false, message: "Preferences data is required" });
    }

    if (
      preferences.preferredIndustry &&
      !INDUSTRIES.includes(preferences.preferredIndustry)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid preferred Industry" });
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

exports.getPreferences = async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findOne({ userId: req.user.id });

    if (!jobSeeker) {
      return res
        .status(404)
        .json({ success: false, message: "Job Seeker not found" });
    }

    res.status(200).json({ success: true, data: jobSeeker.preferences || {} });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Recruiter

exports.updateFilters = async (req, res) => {
  try {
    const filters = req.body.filters;

    if (!filters) {
      return res
        .status(400)
        .json({ success: false, message: "Filters data is required" });
    }

    if (
      filters.filterIndustry &&
      !INDUSTRIES.includes(filters.filterIndustry)
    ) {
      return res
        .status(400)
        .json({ success: 400, message: "Invalid filter Industry" });
    }

    const updated = await Recruiter.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { filters } },
      { new: true }
    );

    if (!updated) {
      res
        .status(404)
        .json({ success: false, message: "Recruiter profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Filters updated successfully",
      data: updated.filters,
    });
  } catch (error) {
    console.error("Error updating filters:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getFilters = async (req, res) => {
  try {
    const recruiter = await Recruiter.findOne({ userId: req.user.id });

    if (!recruiter) {
      return res
        .status(404)
        .json({ success: false, message: "Recruiter profile not found" });
    }

    res.status(200).json({
      success: true,
      data: recruiter.filters || {},
    });
  } catch (error) {
    console.error("Error getting filters:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
