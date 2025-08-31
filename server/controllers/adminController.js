const User = require("../models/UserSchema");

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, jobSeekers, recruiters, admins, unassigned] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: "jobSeeker" }),
        User.countDocuments({ role: "recruiter" }),
        User.countDocuments({ role: "admin" }),
        User.countDocuments({ role: null }),
      ]);

    res.json({
      success: true,
      data: { totalUsers, jobSeekers, recruiters, admins, unassigned },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email role isVerified isOnboarded createdAt")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};
