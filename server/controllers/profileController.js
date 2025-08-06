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

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    // update base user info
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (updatedUser.role === "jobSeeker") {
      const jobSeeker = await JobSeeker.findOne({ userId });
      if (!jobSeeker) {
        return res
          .status(404)
          .json({ success: false, message: "Job Seeker not found" });
      }

      await JobSeeker.findOneAndUpdate(
        { userId },
        { $set: { ...jobSeeker.toObject(), ...updates } },
        { new: true, runValidators: true }
      );
    }

    if (updatedUser.role === "recruiter") {
      const recruiter = await Recruiter.findOne({ userId });
      if (!recruiter) {
        return res
          .status(404)
          .json({ success: false, message: "Recruiter not found" });
      }

      // merge hiringCriteria instead of overwriting it
      const recruiterUpdates = {
        companyName: updates.companyName ?? recruiter.companyName,
        jobDescription: updates.jobDescription ?? recruiter.jobDescription,
        jobTitle: updates.jobTitle ?? recruiter.jobTitle,
        hiringCriteria: {
          ...recruiter.hiringCriteria.toObject(), // keep old
          ...(updates.hiringCriteria || {}), // apply new
        },
      };

      await Recruiter.findOneAndUpdate(
        { userId },
        { $set: recruiterUpdates },
        { new: true, runValidators: true }
      );
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
