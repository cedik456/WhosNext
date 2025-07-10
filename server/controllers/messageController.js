const JobSeeker = require("../models/JobSeekerSchema");
const Match = require("../models/MatchSchema");
const Message = require("../models/MessageSchema");
const Recruiter = require("../models/RecruiterSchema");

exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const jobSeeker = await JobSeeker.findOne({ userId });
    const recruiter = await Recruiter.findOne({ userId });

    let matches = [];

    if (jobSeeker) {
      matches = await Match.find({ jobSeekerId: jobSeeker._id }).populate({
        path: "recruiterId",
        populate: { path: "userId", select: "name avatar" },
      });
    } else if (recruiter) {
      matches = await Match.find({ recruiterId: recruiter._id }).populate({
        path: "jobSeekerId",
        populate: { path: "userId", select: "name avatar" },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const results = await Promise.all(
      matches.map(async (match) => {
        const lastMsg = await Message.findOne({ matchId: match._id })
          .sort({
            createdAt: -1,
          })
          .lean();

        const user = match.jobSeekerId?.userId || match.recruiterId?.userId;

        return {
          matchId: match._id,
          user: {
            name: user?.name || match.recruiterId?.companyName || "Unknown",
            avatar: user?.avatar || "",
          },
          lastMessage: lastMsg ? lastMsg.text : null,
          lastMessageAt: lastMsg ? lastMsg.createdAt : null,
        };
      })
    );

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Get conversations error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving conversations",
      error: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { matchId } = req.params;

    const messages = await Message.find({ matchId })
      .sort({ createdAt: 1 })
      .populate("sender", "name avatar");

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Fetch messages error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving messages",
      error: error.message,
    });
  }
};

exports.sendMessages = async (req, res) => {
  try {
    const { matchId, text } = req.body;

    const sender = req.user.id;

    if (!matchId || !text) {
      return res.status(400).json({
        success: false,
        message: "matchId and text are required",
      });
    }

    const message = await Message.create({
      matchId,
      sender,
      text,
    });

    const populated = await message.populate("sender", "name avatar");

    res.status(201).json({
      success: true,
      message: "Message sent",
      data: populated,
    });
  } catch (error) {
    console.error("Send message error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending the message",
      error: error.message,
    });
  }
};
