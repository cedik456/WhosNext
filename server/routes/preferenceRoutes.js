const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { updatePreferences } = require("../controllers/preferenceController");

router.patch("/jobSeeker", auth, updatePreferences);

module.exports = router;
