const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

// upload middlewares
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  saveRole,
  completeOnboarding,
} = require("../controllers/onboarding/sharedController");
const {
  saveName,
  saveSkills,
  saveLocation,
  saveWorkPreferencesJobSeekers,
} = require("../controllers/onboarding/jobSeekerController");
const {
  saveCompanyName,
  saveJobTitle,
  saveRequirements,
  saveHiringLocation,
  uploadCompanyLogo,
} = require("../controllers/onboarding/recruiterController");

// Shared
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
router.patch("/skills/recruiter", auth, saveRequirements);
router.patch("/hiringLocation/recruiter", auth, saveHiringLocation);
router.post("/logo/recruiter", auth, upload.single("logo"), uploadCompanyLogo);

module.exports = router;
