const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  updatePreferences,
  getPreferences,
  updateFilters,
  getFilters,
} = require("../controllers/preferenceController");

// Job Seeker
router.patch("/jobSeeker", auth, updatePreferences);
router.get("/jobSeeker", auth, getPreferences);

// Recruiters
router.patch("/recruiter", auth, updateFilters);
router.get("/recruiter", auth, getFilters);

module.exports = router;
