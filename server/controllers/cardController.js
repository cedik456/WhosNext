const JobSeeker = require("../models/JobSeekerSchema");
const Recruiter = require("../models/RecruiterSchema");

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
