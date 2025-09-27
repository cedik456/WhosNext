const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { getMatches, unmatch } = require("../controllers/matchController");

router.get("/", auth, getMatches);
router.delete("/:matchId", auth, unmatch);

module.exports = router;
