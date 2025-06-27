const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  saveRole,
  saveName,
  saveCompanyName,
  saveSkills,
  saveLocation,
  saveWorkPreferencesJobSeekers,
  completeOnboarding,
  saveJobTitle,
} = require("../controllers/onboardingController");

// Both
router.patch("/role", auth, saveRole);
router.patch("/complete", auth, completeOnboarding);

// Job Seeker
router.patch("/name/jobSeeker", auth, saveName);
router.patch("/skills/jobSeeker", auth, saveSkills);
router.patch("/location/jobSeeker", auth, saveLocation);
router.patch("/workPreferences/jobSeeker", auth, saveWorkPreferencesJobSeekers);

// Recruiter
router.patch("/name/recruiter", auth, saveCompanyName);
router.patch("/jobTitle/recruiter", auth, saveJobTitle);

module.exports = router;
