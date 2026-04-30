const Match = require("../models/MatchSchema");
const User = require("../models/UserSchema");

function lastNDates(n) {
  const out = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    out.push(`${yyyy}-${mm}-${dd}`);
  }
  return out;
}

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

exports.getMatchesTimeseries = async (req, res) => {
  try {
    const days = Number(req.query.days || 7);
    const dates = lastNDates(days);
    const since = new Date(dates[0] + "T00:00:00.000Z");

    const agg = await Match.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: {
            y: { $year: "$createdAt" },
            m: { $month: "$createdAt" },
            d: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          day: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.y",
                  month: "$_id.m",
                  day: "$_id.d",
                },
              },
            },
          },
          count: 1,
        },
      },
    ]);

    const byDay = Object.fromEntries(agg.map((r) => [r.day, r.count]));

    const data = dates.map((iso) => {
      const label = new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
        weekday: "short",
      });
      return { date: iso, name: label, matched: byDay[iso] || 0 };
    });

    res.json({ success: true, data });
  } catch (err) {
    console.error("getMatchesTimeseries error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getRecruiters = async (req, res) => {
  try {
    const recruiters = await User.find({ role: "recruiter" })
      .select("name email role isVerified isOnboarded companyName createdAt")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: recruiters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getJobSeekers = async (req, res) => {
  try {
    const jobSeekers = await User.find({ role: "jobSeeker" })
      .select("name email role isVerified isOnboarded skills createdAt")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: jobSeekers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
