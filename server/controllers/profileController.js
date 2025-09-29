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

exports.updateJobSeekerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      bio,
      skills,
      location,
      experience,
      education,
      industry,
      workEnvironment,
      workType,
    } = req.body;

    // Build User updates
    const userUpdates = {};
    if (name !== undefined) userUpdates.name = name;

    if (Object.keys(userUpdates).length > 0) {
      await User.findByIdAndUpdate(
        userId,
        { $set: userUpdates },
        { new: true }
      );
    }

    // Build JobSeeker updates
    const seekerUpdates = {};
    if (bio !== undefined) seekerUpdates.bio = bio;
    if (skills !== undefined) seekerUpdates.skills = skills;
    if (location !== undefined) seekerUpdates.location = location;
    if (experience !== undefined) seekerUpdates.experience = experience;
    if (education !== undefined) seekerUpdates.education = education;
    if (industry !== undefined) seekerUpdates.industry = industry;
    if (workEnvironment !== undefined)
      seekerUpdates.workEnvironment = workEnvironment;
    if (workType !== undefined) seekerUpdates.workType = workType;

    if (Object.keys(seekerUpdates).length > 0) {
      await JobSeeker.findOneAndUpdate(
        { userId },
        { $set: seekerUpdates },
        { new: true, runValidators: true }
      );
    }

    // Return merged profile
    const user = await User.findById(userId).select("-password");
    const jobSeeker = await JobSeeker.findOne({ userId });
    const profile = { ...user._doc, ...jobSeeker._doc };

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("Update JobSeeker error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      companyName,
      jobDescription,
      jobTitle,
      industry,
      location,
      experienceLevel,
      workEnvironment,
      workType,
      requiredSkills,
      salaryRange,
    } = req.body;

    const updates = {};
    if (companyName !== undefined) updates.companyName = companyName;
    if (jobDescription !== undefined) updates.jobDescription = jobDescription;
    if (jobTitle !== undefined) updates.jobTitle = jobTitle;
    if (industry !== undefined) updates.industry = industry;

    // Handle nested hiringCriteria safely
    const hiringCriteriaUpdates = {};
    if (location !== undefined) hiringCriteriaUpdates.location = location;
    if (experienceLevel !== undefined)
      hiringCriteriaUpdates.experienceLevel = experienceLevel;
    if (workEnvironment !== undefined)
      hiringCriteriaUpdates.workEnvironment = workEnvironment;
    if (workType !== undefined) hiringCriteriaUpdates.workType = workType;
    if (requiredSkills !== undefined)
      hiringCriteriaUpdates.requiredSkills = requiredSkills;
    if (salaryRange !== undefined)
      hiringCriteriaUpdates.salaryRange = salaryRange;

    const recruiter = await Recruiter.findOneAndUpdate(
      { userId },
      {
        $set: {
          ...updates,
          hiringCriteria: {
            ...((await Recruiter.findOne({ userId }))?.hiringCriteria || {}),
            ...hiringCriteriaUpdates,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!recruiter) {
      return res
        .status(404)
        .json({ success: false, message: "Recruiter not found" });
    }

    const user = await User.findById(userId).select("-password");
    const profile = { ...user._doc, ...recruiter._doc };

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("Update Recruiter error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.uploadCompanyLogo = async (req, res) => {
  console.log("📥 [uploadCompanyLogo] Request received with body:", req.body);

  try {
    const { companyPicture } = req.body;

    const recruiter = await Recruiter.findOneAndUpdate(
      { userId: req.user.id }, // 👈 match recruiter by linked userId
      { companyPicture },
      { new: true }
    );

    if (!recruiter) {
      console.log("⚠️ No recruiter found for user:", req.user.id);
      return res
        .status(404)
        .json({ success: false, message: "Recruiter not found" });
    }

    console.log("✅ Recruiter logo updated:", recruiter.companyPicture);

    res.json({ success: true, data: recruiter });
  } catch (err) {
    console.error("❌ Error in uploadCompanyLogo:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.uploadAvatar = async (req, res) => {
  console.log("📥 [uploadAvatar] body:", req.body);

  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("✅ Job Seeker avatar updated:", user.avatar);

    res.json({ success: true, data: user });
  } catch (err) {
    console.error("❌ Error in uploadAvatar:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
