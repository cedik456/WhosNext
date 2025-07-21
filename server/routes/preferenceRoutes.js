const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  updatePreferences,
  getPreferences,
} = require("../controllers/preferenceController");

// Job Seeker
router.patch("/jobSeeker", auth, updatePreferences);
router.get("/jobSeeker", auth, getPreferences);

module.exports = router;
