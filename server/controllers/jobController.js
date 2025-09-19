const Job = require("../models/JobSchema");
const Recruiter = require("../models/RecruiterSchema");

// CREATE JOB
exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can create jobs",
      });
    }

    const {
      title,
      description,
      requiredSkills,
      location,
      experienceLevel,
      workType,
      workEnvironment,
      salaryRange,
    } = req.body;

    if (!title || !description || !requiredSkills || !location) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // find recruiter profile
    const recruiterProfile = await Recruiter.findOne({ userId: req.user.id });
    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    // create new job
    const job = new Job({
      recruiterId: recruiterProfile._id,
      title: title.trim(),
      description: description.trim(),
      requiredSkills,
      location: location.trim(),
      experienceLevel,
      workType,
      workEnvironment,
      salaryRange,
    });

    await job.save();

    // link to recruiter profile
    recruiterProfile.jobs.push(job._id);
    await recruiterProfile.save();

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating job",
    });
  }
};

// GET MY JOBS
exports.getMyJobs = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can view their jobs",
      });
    }

    const recruiterProfile = await Recruiter.findOne({ userId: req.user.id });
    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const jobs = await Job.find({ recruiterId: recruiterProfile._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching jobs",
    });
  }
};

// UPDATE JOB
exports.updateJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can update jobs",
      });
    }

    const recruiterProfile = await Recruiter.findOne({ userId: req.user.id });
    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const { id } = req.params;
    const job = await Job.findOne({
      _id: id,
      recruiterId: recruiterProfile._id,
    });

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found or unauthorized" });
    }

    Object.assign(job, req.body);
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating job",
    });
  }
};

// DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can delete jobs",
      });
    }

    const recruiterProfile = await Recruiter.findOne({ userId: req.user.id });
    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const { id } = req.params;
    const job = await Job.findOneAndDelete({
      _id: id,
      recruiterId: recruiterProfile._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting job",
    });
  }
};

// GET JOB BY ID
exports.getJobById = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can view their jobs",
      });
    }

    const recruiterProfile = await Recruiter.findOne({ userId: req.user.id });
    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const { id } = req.params;
    const job = await Job.findOne({
      _id: id,
      recruiterId: recruiterProfile._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching job",
    });
  }
};
