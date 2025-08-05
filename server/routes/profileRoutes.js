const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

router.get("/", auth, getProfile);
router.patch("/", auth, updateProfile);

module.exports = router;
