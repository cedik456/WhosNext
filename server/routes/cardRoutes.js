const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getAllRecruiters,
  getAllJobSeekers,
} = require("../controllers/cardController");

// Recruiter card
router.get("/recruiter", auth, getAllRecruiters);

// Job seeker card
router.get("/jobSeeker", auth, getAllJobSeekers);

module.exports = router;
