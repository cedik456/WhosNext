const JobSeeker = require("../models/JobSeekerSchema");
const Recruiter = require("../models/RecruiterSchema");
const User = require("../models/UserSchema");

exports.getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find().lean();

    res.status(200).json({ success: true, data: recruiters });
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllJobSeekers = async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find()
      .populate("userId", "name avatar")
      .lean();

    res.status(200).json({ success: true, data: jobSeekers });
  } catch (error) {
    console.error("Error fetching job seekers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Missing or invalid token.",
      });
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.role) {
      return res.status(403).json({
        success: false,
        message: "User role not set. Please complete onboarding.",
      });
    }

    if (user.role === "jobSeeker") {
      const jobSeeker = await JobSeeker.findOne({ userId });

      if (!jobSeeker) {
        return res.status(404).json({
          success: false,
          message: "Job seeker profile not found. Please complete onboarding.",
        });
      }

      const matches = await Recruiter.find({
        $or: [
          {
            "hiringCriteria.requiredSkills": { $in: jobSeeker.skills },
          },
          {
            "hiringCriteria.location": {
              $regex: jobSeeker.location,
              $options: "i",
            },
          },
        ],
      });

      return res.status(200).json({ success: true, data: matches });
    }

    if (user.role === "recruiter") {
      const recruiter = await Recruiter.findOne({ userId });

      if (!recruiter) {
        return res.status(404).json({
          success: false,
          message: "Recruiter profile not found. Please complete onboarding.",
        });
      }

      const matches = await JobSeeker.find({
        $or: [
          {
            skills: { $in: recruiter.hiringCriteria.requiredSkills },
          },
          {
            location: {
              $regex: recruiter.hiringCriteria.location,
              $options: "i",
            },
          },
        ],
      })
        .populate("userId", "name avatar")
        .lean();

      return res.status(200).json({ success: true, data: matches });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid user role. Must be 'jobSeeker' or 'recruiter'.",
    });
  } catch (error) {
    console.error("Recommendation error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching recommendations",
      error: error.message,
    });
  }
};
