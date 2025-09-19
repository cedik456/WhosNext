const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getProfile,
  updateProfile,
  updateJobSeekerProfile,
} = require("../controllers/profileController");

router.get("/", auth, getProfile);
router.patch("/", auth, updateProfile);
router.patch("/jobSeeker", auth, updateJobSeekerProfile);
router.patch("/recruiter", auth);

module.exports = router;
