// const JobSeeker = require("../models/JobSeekerSchema");
// const Recruiter = require("../models/RecruiterSchema");
const Swipe = require("../models/SwipeSchema");
const User = require("../models/UserSchema");

exports.handleSwipe = async (req, res) => {
  try {
    const { targetId, action } = req.body;
    const userId = req.user.id;

    if (!targetId || !action) {
      return res.status(400).json({
        success: false,
        message: "Target ID and action are required",
      });
    }

    if (userId === targetId) {
      return res.status(400).json({
        success: false,
        message: "You cannot swipe on yourself.",
      });
    }

    const currentUser = await User.findById(userId);
    const targetUser = await User.findById(targetId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({
        success: false,
        message: "One or both users not found.",
      });
    }

    if (currentUser.role === targetUser.role) {
      return res.status(400).json({
        success: false,
        message: "You can only swipe on users from the opposite role.",
      });
    }

    const existingSwipe = await Swipe.findOne({ userId, targetId });

    if (existingSwipe) {
      return res.status(400).json({
        success: false,
        message: "Swipe already exists",
      });
    }

    await Swipe.create({ userId, targetId, action });

    // let isMatch = false;
    // let mutual = null;

    // if (action === "like") {
    //   mutual = await Swipe.findOne({
    //     userId: targetId,
    //     targetId: userId,
    //     action: "like",
    //   });
    // }

    // if (mutual) {
    //   isMatch = true;

    //   const currentUser = await User.findById(userId);
    //   const targetUser = await User.findById(targetId);

    //   let jobSeekerId = null;
    //   let recruiterId = null;

    //   if (currentUser.role === "jobSeeker" && targetUser.role === "recruiter") {
    //     const jobSeeker = await JobSeeker.findOne({ userId: currentUser._id });
    //     const recruiter = await Recruiter.findOne({ userId: targetUser._id });
    //     if (jobSeeker && recruiter) {
    //       jobSeekerId = jobSeeker._id;
    //       recruiterId = recruiter._id;
    //     }
    //   } else if (
    //     currentUser.role === "recruiter" &&
    //     targetUser.role === "jobSeeker"
    //   ) {
    //     const recruiter = await Recruiter.findOne({ userId: currentUser._id });
    //     const jobSeeker = await JobSeeker.findOne({ userId: targetUser._id });
    //     if (recruiter && jobSeeker) {
    //       recruiterId = recruiter._id;
    //       jobSeekerId = jobSeeker._id;
    //     }
    //   }
    // }

    return res.status(201).json({
      success: true,
      message: "Swipe recorded successfully",
      //   match: isMatch,
    });
  } catch (error) {
    console.error("Swipe error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while processing the swipe.",
      error: error.message,
    });
  }
};
