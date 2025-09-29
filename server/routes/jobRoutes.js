const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createJob,
  getMyJobs,
  updateJob,
  deleteJob,
  getJobById,
} = require("../controllers/jobController");

router.post("/create", auth, createJob);
router.get("/my", auth, getMyJobs);
router.patch("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);
router.get("/:id", auth, getJobById);

module.exports = router;
