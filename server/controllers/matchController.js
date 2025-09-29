const JobSeeker = require("../models/JobSeekerSchema");
const Match = require("../models/MatchSchema");
const Recruiter = require("../models/RecruiterSchema");
const User = require("../models/UserSchema");
const Message = require("../models/MessageSchema");

exports.getMatches = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || !user.role) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized or incomplete profile",
      });
    }

    let matches;

    if (user.role === "jobSeeker") {
      const jobSeeker = await JobSeeker.findOne({ userId });

      if (!jobSeeker) {
        return res.status(404).json({
          success: false,
          message: "JobSeeker profile not found ",
        });
      }

      matches = await Match.find({ jobSeekerId: jobSeeker._id })
        .populate({
          path: "recruiterId",
          populate: {
            path: "userId",
            select: "name avatar companyName companyPicture",
          },
        })
        .populate({
          path: "jobSeekerId",
          populate: {
            path: "userId",
            select: "name avatar",
          },
        })
        .populate("jobId", "title")
        .sort({ createdAt: -1 });
    }

    if (user.role === "recruiter") {
      const recruiter = await Recruiter.findOne({ userId });
      if (!recruiter) {
        return res.status(404).json({
          success: false,
          message: "Recruiter profile not found",
        });
      }

      matches = await Match.find({ recruiterId: recruiter._id })
        .populate({
          path: "jobSeekerId",
          populate: {
            path: "userId",
            select: "name avatar companyName companyPicture",
          },
        })
        .populate("jobId", "title")
        .sort({ createdAt: -1 });
    }

    console.log(
      "DEBUG getMatches result:",
      matches.map((m) => ({
        id: m._id,
        jobId: m.jobId?._id || null,
        jobTitle: m.jobId?.title || null,
        recruiter: m.recruiterId?.companyName || m.recruiterId?.userId?.name,
        jobSeeker: m.jobSeekerId?.userId?.name,
      }))
    );

    res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    console.error("Get matches error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving matches.",
      error: error.message,
    });
  }
};

exports.unmatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }
    await Match.findByIdAndDelete(matchId);
    await Message.deleteMany({ matchId });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Unmatch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while unmatching",
      error: error.message,
    });
  }
};
