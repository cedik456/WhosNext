const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getProfile,
  updateProfile,
  updateJobSeekerProfile,
  updateRecruiterProfile,
  uploadCompanyLogo,
  uploadAvatar,
} = require("../controllers/profileController");

router.get("/", auth, getProfile);
router.patch("/", auth, updateProfile);
router.patch("/jobSeeker", auth, updateJobSeekerProfile);
router.patch("/recruiter", auth, updateRecruiterProfile);
router.patch("/companyLogoUpload", auth, uploadCompanyLogo);
router.patch("/avatarUpload", auth, uploadAvatar);

module.exports = router;
