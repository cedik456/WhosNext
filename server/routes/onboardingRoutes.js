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
  saveIndustry,
} = require("../controllers/onboarding/sharedController");
const {
  saveName,
  saveSkills,
  saveLocation,
  saveWorkType,
  saveWorkEnvironment,
  saveJobSeekerExperience,
  saveJobSeekerIndustry,
} = require("../controllers/onboarding/jobSeekerController");
const {
  saveCompanyName,
  saveJobTitle,
  saveRequirements,
  saveHiringLocation,
  uploadCompanyLogo,
  saveRecruiterExperience,
  saveRecruiterWorkType,
  saveRecruiterWorkEnvironment,
  saveRecruiterIndustry,
} = require("../controllers/onboarding/recruiterController");

// Shared
router.patch("/role", auth, saveRole);
router.patch("/complete", auth, completeOnboarding);
router.patch("/industry", auth, saveIndustry);

// Job Seeker
router.patch("/name/jobSeeker", auth, saveName);
router.patch("/skills/jobSeeker", auth, saveSkills);
router.patch("/location/jobSeeker", auth, saveLocation);
router.patch("/workType/jobSeeker", auth, saveWorkType);
router.patch("/workEnvironment/jobSeeker", auth, saveWorkEnvironment);
router.patch("/experience/jobSeeker", auth, saveJobSeekerExperience);
router.patch("/industry/jobSeeker", auth, saveJobSeekerIndustry);

// Recruiter
router.patch("/name/recruiter", auth, saveCompanyName);
router.patch("/jobTitle/recruiter", auth, saveJobTitle);
router.patch("/skills/recruiter", auth, saveRequirements);
router.patch("/hiringLocation/recruiter", auth, saveHiringLocation);
router.patch("/experience/recruiter", auth, saveRecruiterExperience);
router.patch("/workType/recruiter", auth, saveRecruiterWorkType);
router.patch("/workEnvironment/recruiter", auth, saveRecruiterWorkEnvironment);
router.post("/logo/recruiter", auth, upload.single("logo"), uploadCompanyLogo);
router.post("/industry/recruiter", auth, saveRecruiterIndustry);

module.exports = router;
