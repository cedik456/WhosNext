const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const User = require("../models/UserSchema");
const {
  getStats,
  getUsers,
  deleteUser,
  getMatchesTimeseries,
} = require("../controllers/adminController");

router.get("/ping", auth, isAdmin, (req, res) => {
  res.json({ success: true, message: "Admin access OK" });
});

router.get("/stats", auth, isAdmin, getStats);
router.get("/users", auth, isAdmin, getUsers);
router.delete("/users/:id", auth, isAdmin, deleteUser);
router.get("/metrics/matches", auth, isAdmin, getMatchesTimeseries);

module.exports = router;
