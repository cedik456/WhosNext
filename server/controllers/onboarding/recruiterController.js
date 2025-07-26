const Recruiter = require("../../models/RecruiterSchema");
const cloudinary = require("../../config/cloudinary");
const streamifier = require("streamifier");

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
        .json({ success: false, message: "Hiring Location is required" });
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
    res.status(500).json({
      success: false,
      message: "Server error while saving hiring location",
    });
  }
};

exports.uploadCompanyLogo = async (req, res) => {
  const userId = req.user.id;

  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "whos-next/company-pictures",
      public_id: `logo_${userId}`,
      overwrite: true,
    });

    const recruiter = await Recruiter.findOneAndUpdate(
      { userId },
      { companyPicture: result.secure_url },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Company logo uploaded",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Logo upload server error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

exports.saveRecruiterWorkType = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workType } = req.body;

    const validTypes = ["Full-time", "Part-time", "Internship"];

    if (!validTypes.includes(workType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing work type",
      });
    }

    await Recruiter.findOneAndUpdate(
      { userId },
      {
        $set: {
          "hiringCriteria.workType": workType,
        },
      },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Work type saved successfully" });
  } catch (error) {
    console.error("Error saving recruiter work type", error);

    res.status(500).json({
      success: false,
      message: "Server error while saving recruiter work type",
    });
  }
};

exports.saveRecruiterWorkEnvironment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workEnvironment } = req.body;

    const validEnvironments = ["On-site", "Remote", "Hybrid"];

    if (!validEnvironments.includes(workEnvironment)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing work environment",
      });
    }

    await Recruiter.findOneAndUpdate(
      { userId },
      {
        $set: {
          "hiringCriteria.workEnvironment": workEnvironment,
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Work environment saved successfully",
    });
  } catch (error) {
    console.error("Error saving recruiter work environment", error);

    res.status(500).json({
      success: false,
      message: "Server error while saving work environment",
    });
  }
};

exports.saveRecruiterExperience = async (req, res) => {
  try {
    const userId = req.user.id;

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

    await Recruiter.findOneAndUpdate(
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
