const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { handleSwipe } = require("../controllers/swipeController");

router.post("/", auth, handleSwipe);

module.exports = router;
