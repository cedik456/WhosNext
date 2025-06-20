const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const auth = require("../middlewares/authMiddleware");

router.patch("/role", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { role } = req.body;

    const allowedRoles = ["jobSeeker", "recruiter"];

    if (!allowedRoles.includes(role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role selected" });
    }

    await User.findByIdAndUpdate(userId, { role });

    res.status(200).json({ success: true, message: "Role saved successfully" });
  } catch (error) {
    console.error("Error saving role:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving role." });
  }
});

router.patch("/name", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    await User.findByIdAndUpdate(userId, { name: name.trim() });

    res.status(200).json({ success: true, message: "Name saved successfully" });
  } catch (error) {
    console.error("Error saving name:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while saving name." });
  }
});

module.exports = router;
