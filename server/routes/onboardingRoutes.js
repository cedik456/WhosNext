const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const auth = require("../middlewares/authMiddleware");
const JobSeeker = require("../models/JobSeekerSchema");
const Recruiter = require("../models/RecruiterSchema");

router.patch("/role", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { role } = req.body;

    const allowedRoles = ["jobSeeker", "recruiter"];

    if (!allowedRoles.includes(role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role selected" });
    }

    await User.findByIdAndUpdate(userId, { role });

    res.status(200).json({ success: true, message: "Role saved successfully" });
  } catch (error) {
    console.error("Error saving role:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving role." });
  }
});

// name

router.patch("/name/jobSeeker", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    await User.findByIdAndUpdate(userId, { name: name.trim() });

    res.status(200).json({ success: true, message: "Name saved successfully" });
  } catch (error) {
    console.error("Error saving name:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving name." });
  }
});

// company name

router.patch("/name/recruiter", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    await Recruiter.findOneAndUpdate(
      { userId },
      { companyName: name.trim() },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: "Name saved successfully" });
  } catch (error) {
    console.error("Error saving name:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving name." });
  }
});

// skills

router.patch("/skills/jobSeeker", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("REQ BODY:", req.body);

    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Skills must be a non-empty array" });
    }

    await JobSeeker.findOneAndUpdate(
      { userId },
      { $set: { skills } },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Skills saved successfully" });
  } catch (error) {
    console.error("Error saving skills:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving skills." });
  }
});

router.patch("/skills/recruiter", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Skills must be a non-empty array" });
    }

    await Recruiter.findOneAndUpdate(
      { userId },
      { $set: { "hiringCriteria.skills": skills } },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Skills saved successfully" });
  } catch (error) {
    console.error("Error saving recruiter skills:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// location

router.patch("/location/jobSeeker", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { location } = req.body;

    if (!location || location.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Location is required" });
    }

    await JobSeeker.findOneAndUpdate(
      { userId },
      { location: location.trim() },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Location saved successfully" });
  } catch (error) {
    console.error("JobSeeker location error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.patch("/location/recruiter", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { location } = req.body;

    if (!location || location.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Location is required" });
    }

    await Recruiter.findOneAndUpdate(
      { userId },
      { "hiringCriteria.location": location.trim() },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Location saved successfully" });
  } catch (error) {
    console.error("Recruiter location error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
