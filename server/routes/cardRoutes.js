const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getAllRecruiters,
  getAllJobSeekers,
  getRecommendations,
} = require("../controllers/cardController");

// Recruiter card
router.get("/recruiter", auth, getAllRecruiters);

// Job seeker card
router.get("/jobSeeker", auth, getAllJobSeekers);

// Recommendation card
router.get("/recommendations", auth, getRecommendations);

module.exports = router;
