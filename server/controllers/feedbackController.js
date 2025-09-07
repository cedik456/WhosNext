const Feedback = require("../models/FeedbackSchema");
const Recruiter = require("../models/RecruiterSchema");
const User = require("../models/UserSchema");

exports.createFeedback = async (req, res) => {
  try {
    const { title, description, appVersion } = req.body || {};

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const user = await User.findById(userId).select("name email role").lean();

    let displayName = user?.name || user?.email || "User";
    if (user?.role === "recruiter") {
      const rec = await Recruiter.findOne({ userId })
        .select("companyName")
        .lean();
      if (rec?.companyName) displayName = rec.companyName;
    } else if (!user?.role) {
      const rec = await Recruiter.findOne({ userId })
        .select("companyName")
        .lean();
      if (rec?.companyName) displayName = rec.companyName;
    }

    const doc = await Feedback.create({
      userId,
      displayName,
      title: title.trim(),
      description: description.trim(),
      appVersion: appVersion || null,
    });

    return res.status(201).json({
      success: true,
      data: { id: doc._id, status: doc.status },
    });
  } catch (error) {
    console.error("[POST /feedback] failed:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create feedback." });
  }
};

exports.listFeedback = async (req, res) => {
  try {
    const docs = await Feedback.find({})
      .sort({ createdAt: -1 })
      .select("_id displayName title description status createdAt");

    res.json({ success: true, data: docs });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to load feedback" });
  }
};
