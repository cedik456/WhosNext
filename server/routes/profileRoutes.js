const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { getProfile } = require("../controllers/profileController");

router.get("/", auth, getProfile);

module.exports = router;
