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

    const userUpdates = {};
    const jobSeekerUpdates = {};
    const recruiterUpdates = {};

    if (updates.name !== undefined) userUpdates.name = updates.name;
    if (updates.email !== undefined) userUpdates.email = updates.email;

    if (updates.skills !== undefined) jobSeekerUpdates.skills = updates.skills;
    if (updates.location !== undefined)
      jobSeekerUpdates.location = updates.location;
    if (updates.experience !== undefined)
      jobSeekerUpdates.experience = updates.experience;
    if (updates.bio !== undefined) jobSeekerUpdates.bio = updates.bio;
    if (updates.workEnvironment !== undefined)
      jobSeekerUpdates.workEnvironment = updates.workEnvironment;
    if (updates.workType !== undefined)
      jobSeekerUpdates.workType = updates.workType;

    if (updates.companyName !== undefined)
      recruiterUpdates.companyName = updates.companyName;
    if (updates.companyPicture !== undefined)
      recruiterUpdates.companyPicture = updates.companyPicture;
    if (updates.jobDescription !== undefined)
      recruiterUpdates.jobDescription = updates.jobDescription;
    if (updates.jobTitle !== undefined)
      recruiterUpdates.jobTitle = updates.jobTitle;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: userUpdates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (
      updatedUser.role === "jobSeeker" &&
      Object.keys(jobSeekerUpdates).length > 0
    ) {
      await JobSeeker.findOneAndUpdate(
        { userId },
        { $set: jobSeekerUpdates },
        { new: true, runValidators: true }
      );
    }

    if (
      updatedUser.role === "recruiter" &&
      Object.keys(recruiterUpdates).length > 0
    ) {
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
