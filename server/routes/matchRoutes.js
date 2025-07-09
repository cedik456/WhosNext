const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { getMatches } = require("../controllers/matchController");

router.get("/", auth, getMatches);

module.exports = router;
