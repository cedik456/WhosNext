const JobSeeker = require("../models/JobSeekerSchema");
const Match = require("../models/MatchSchema");
const Recruiter = require("../models/RecruiterSchema");
const Swipe = require("../models/SwipeSchema");
const User = require("../models/UserSchema");

exports.handleSwipe = async (req, res) => {
  try {
    const { targetId, action, jobId } = req.body;
    const userId = req.user.id;
    const normalizedJobId = jobId || null; // normalize once

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

    // Check for duplicate swipe
    const existingSwipe = await Swipe.findOne({ userId, targetId });
    if (existingSwipe) {
      return res.status(400).json({
        success: false,
        message: "Swipe already exists",
      });
    }

    // Save swipe
    await Swipe.create({ userId, targetId, jobId: normalizedJobId, action });

    let createdMatch = null;
    let wasCreated = false;

    if (action === "like") {
      const mutual = await Swipe.findOne({
        userId: targetId,
        targetId: userId,
        action: "like",
      });

      if (mutual) {
        let jobSeekerId = null;
        let recruiterId = null;

        if (
          currentUser.role === "jobSeeker" &&
          targetUser.role === "recruiter"
        ) {
          const jobSeeker = await JobSeeker.findOne({
            userId: currentUser._id,
          });
          const recruiter = await Recruiter.findOne({ userId: targetUser._id });
          if (jobSeeker && recruiter) {
            jobSeekerId = jobSeeker._id;
            recruiterId = recruiter._id;
          }
        } else if (
          currentUser.role === "recruiter" &&
          targetUser.role === "jobSeeker"
        ) {
          const recruiter = await Recruiter.findOne({
            userId: currentUser._id,
          });
          const jobSeeker = await JobSeeker.findOne({ userId: targetUser._id });
          if (recruiter && jobSeeker) {
            recruiterId = recruiter._id;
            jobSeekerId = jobSeeker._id;
          }
        }

        if (jobSeekerId && recruiterId) {
          let match = await Match.findOne({ jobSeekerId, recruiterId });

          if (!match) {
            // ✅ Always prefer jobId from the job seeker’s swipe
            let finalJobId = null;

            if (currentUser.role === "jobSeeker") {
              finalJobId = normalizedJobId; // came from this swipe
            } else if (targetUser.role === "jobSeeker") {
              finalJobId = mutual.jobId || null; // came from the earlier swipe
            }

            match = await Match.create({
              jobSeekerId,
              recruiterId,
              jobId: finalJobId,
            });
            wasCreated = true;
          }
          createdMatch = match;
        }
      }
    }

    // Notify sockets
    if (createdMatch && wasCreated) {
      const io = req.app.get("io");
      if (io) {
        io.to(currentUser._id.toString()).emit("matchFound", {
          matchId: createdMatch._id,
        });
        io.to(targetUser._id.toString()).emit("matchFound", {
          matchId: createdMatch._id,
        });
      }
    }

    console.log("Swipe received:", {
      from: userId,
      to: targetId,
      action,
      jobId,
      normalizedJobId,
    });

    return res.status(201).json({
      success: true,
      message: "Swipe recorded successfully",
      match: createdMatch?._id,
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
