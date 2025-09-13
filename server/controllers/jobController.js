const Job = require("../models/JobSchema");

exports.createJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;

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

    const job = new Job({
      recruiterId,
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

exports.getMyJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiter can view their jobs",
      });
    }

    const jobs = await Job.find({ recruiterId }).sort({ createdAt: -1 });

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

exports.updateJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const { id } = req.params;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can update jobs",
      });
    }

    const job = await Job.findOne({ _id: id, recruiterId });

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found or authorized" });
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

exports.deleteJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const { id } = req.params;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can delete jobs",
      });
    }

    const job = await Job.findOneAndDelete({ _id: id, recruiterId });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or not authorized",
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
