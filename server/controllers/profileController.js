const JobSeeker = require("../models/JobSeekerSchema");
const Recruiter = require("../models/RecruiterSchema");
const User = require("../models/UserSchema");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let profile = { ...user._doc };

    if (user.role === "jobSeeker") {
      const jobSeeker = await JobSeeker.findOne({ userId: user._id });
      if (jobSeeker) {
        profile = { ...profile, ...jobSeeker._doc };
      }
    }

    if (user.role === "recruiter") {
      const recruiter = await Recruiter.findOne({ userId: user._id });
      if (recruiter) {
        profile = { ...profile, ...recruiter._doc };
      }
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
