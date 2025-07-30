const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getAllRecruiters,
  getAllJobSeekers,
  getRecommendations,
  getRecommendationsv2,
  getRecommendationsv3,
} = require("../controllers/cardController");

// Recruiter card
router.get("/recruiter", auth, getAllRecruiters);

// Job seeker card
router.get("/jobSeeker", auth, getAllJobSeekers);

// Recommendation card
router.get("/recommendations", auth, getRecommendations);

// Recommendation CARD V2
router.get("/recommendations/v2", auth, getRecommendationsv2);

// V3
router.get("/recommendations/v3", auth, getRecommendationsv3);

module.exports = router;
