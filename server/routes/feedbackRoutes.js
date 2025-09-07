const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createFeedback,
  listFeedback,
} = require("../controllers/feedbackController");

router.post("/", auth, createFeedback);
router.get("/admin/feedback", auth, listFeedback);

module.exports = router;
