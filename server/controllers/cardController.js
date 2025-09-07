const JobSeeker = require("../models/JobSeekerSchema");
const Recruiter = require("../models/RecruiterSchema");
const Swipe = require("../models/SwipeSchema");
const User = require("../models/UserSchema");
const {
  computeJobSeekerSimilarity,
  computeRecruiterSimilarity,
} = require("../utils/similarity");
const {
  findSimilarUsers,
  aggregateCFRecommendations,
} = require("../utils/swipeUtils");

exports.getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find().lean();

    res.status(200).json({ success: true, data: recruiters });
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllJobSeekers = async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find()
      .populate("userId", "name avatar")
      .lean();

    res.status(200).json({ success: true, data: jobSeekers });
  } catch (error) {
    console.error("Error fetching job seekers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Missing or invalid token.",
      });
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.role) {
      return res.status(403).json({
        success: false,
        message: "User role not set. Please complete onboarding.",
      });
    }

    const swipes = await Swipe.find({ userId });
    const swipeIds = swipes.map((swipe) => swipe.targetId.toString());

    if (user.role === "jobSeeker") {
      const jobSeeker = await JobSeeker.findOne({ userId });

      if (!jobSeeker) {
        return res.status(404).json({
          success: false,
          message: "Job seeker profile not found. Please complete onboarding.",
        });
      }

      const matches = await Recruiter.find({
        userId: { $nin: swipeIds },
        $or: [
          {
            "hiringCriteria.requiredSkills": { $in: jobSeeker.skills },
          },
          {
            "hiringCriteria.location": {
              $regex: jobSeeker.location,
              $options: "i",
            },
          },
        ],
      });

      return res.status(200).json({ success: true, data: matches });
    }

    if (user.role === "recruiter") {
      const recruiter = await Recruiter.findOne({ userId });

      if (!recruiter) {
        return res.status(404).json({
          success: false,
          message: "Recruiter profile not found. Please complete onboarding.",
        });
      }

      const matches = await JobSeeker.find({
        userId: { $nin: swipeIds },
        $or: [
          {
            skills: { $in: recruiter.hiringCriteria.requiredSkills },
          },
          {
            location: {
              $regex: recruiter.hiringCriteria.location,
              $options: "i",
            },
          },
        ],
      })
        .populate("userId", "name avatar")
        .lean();

      return res.status(200).json({ success: true, data: matches });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid user role. Must be 'jobSeeker' or 'recruiter'.",
    });
  } catch (error) {
    console.error("Recommendation error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching recommendations",
      error: error.message,
    });
  }
};

exports.getRecommendationsv2 = async (req, res) => {
  try {
    // token check
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Missing or invalid token",
      });
    }

    // user check
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // onboarding check

    if (!user.isOnboarded) {
      return res.status(403).json({
        success: false,
        message: "Please complete onboarding to access recommendations.",
      });
    }

    // role check

    if (!user.role) {
      return res.status(403).json({
        success: false,
        message: "User role not set. Please complete onboarding.",
      });
    }

    // swiped ids check (already swiped user)

    const swipes = await Swipe.find({ userId });
    const swipeIds = swipes.map((swipe) => swipe.targetId.toString());

    // Job Seeker Logic

    if (user.role === "jobSeeker") {
      const jobSeeker = await JobSeeker.findOne({ userId });
      if (!jobSeeker) {
        return res.status(404).json({
          success: false,
          message: "Job seeker profile not found. Please complete onboarding.",
        });
      }

      // preferences

      const preferences = jobSeeker.preferences || {};
      const query = { userId: { $nin: swipeIds } };

      const filterConditions = [];

      if (preferences.preferredSkills?.length) {
        filterConditions.push({
          "hiringCriteria.requiredSkills": { $in: preferences.preferredSkills },
        });
      }
      if (preferences.preferredLocation) {
        filterConditions.push({
          "hiringCriteria.location": {
            $regex: preferences.preferredLocation,
            $options: "i",
          },
        });
      }
      if (preferences.experienceLevel) {
        filterConditions.push({
          "hiringCriteria.experienceLevel": preferences.experienceLevel,
        });
      }
      if (preferences.preferredWorkType) {
        filterConditions.push({
          "hiringCriteria.workType": preferences.preferredWorkType,
        });
      }
      if (preferences.preferredWorkEnvironment) {
        filterConditions.push({
          "hiringCriteria.workEnvironment":
            preferences.preferredWorkEnvironment,
        });
      }

      if (preferences.preferredJobTitle) {
        filterConditions.push({
          jobTitle: {
            $regex: preferences.preferredJobTitle,
            $options: "i",
          },
        });
      }

      if (filterConditions.length > 0) {
        query.$and = filterConditions;
      }

      // matches

      const matches = await Recruiter.find(query)
        .populate("userId", "name avatar")
        .lean();

      return res.status(200).json({ success: true, data: matches });
    }

    // Recruiter Logic

    if (user.role === "recruiter") {
      const recruiter = await Recruiter.findOne({ userId });
      if (!recruiter) {
        return res.status(404).json({
          success: false,
          message: "Recruiter profile not found. Please complete onboarding.",
        });
      }

      // filters

      const filters = recruiter.filters || {};
      const query = { userId: { $nin: swipeIds } };

      const filterConditions = [];

      if (filters.filterSkills?.length) {
        filterConditions.push({ skills: { $in: filters.filterSkills } });
      }
      if (filters.filterLocation) {
        filterConditions.push({
          location: { $regex: filters.filterLocation, $options: "i" },
        });
      }
      if (filters.filterExperienceLevel) {
        filterConditions.push({
          experience: filters.filterExperienceLevel,
        });
      }
      if (filters.filterWorkType) {
        filterConditions.push({
          workType: filters.filterWorkType,
        });
      }
      if (filters.filterWorkEnvironment) {
        filterConditions.push({
          workEnvironment: filters.filterWorkEnvironment,
        });
      }

      if (filterConditions.length > 0) {
        query.$and = filterConditions;
      }

      // matches

      const matches = await JobSeeker.find(query)
        .populate("userId", "name avatar")
        .lean();

      return res.status(200).json({ success: true, data: matches });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid user role. Must be 'jobSeeker' or 'recruiter'.",
    });
  } catch (error) {
    console.error("Recommendation error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching recommendations",
      error: error.message,
    });
  }
};

exports.getRecommendationsv3 = async (req, res) => {
  try {
    // token check
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Missing or invalid token",
      });
    }

    // user check
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // onboarding check

    if (!user.isOnboarded) {
      return res.status(403).json({
        success: false,
        message: "Please complete onboarding to access recommendations.",
      });
    }

    // role check

    if (!user.role) {
      return res.status(403).json({
        success: false,
        message: "User role not set. Please complete onboarding.",
      });
    }

    // swiped ids check (already swiped user)

    const swipes = await Swipe.find({ userId });
    const swipeIds = swipes.map((swipe) => swipe.targetId.toString());

    // Job Seeker Logic

    if (user.role === "jobSeeker") {
      const jobSeeker = await JobSeeker.findOne({ userId });
      if (!jobSeeker) {
        return res.status(404).json({
          success: false,
          message: "Job seeker profile not found. Please complete onboarding.",
        });
      }

      // preferences

      const preferences = jobSeeker.preferences || {};
      const query = { userId: { $nin: swipeIds } };

      const filterConditions = [];

      if (
        preferences.preferredIndustry &&
        preferences.preferredIndustry !== "General"
      ) {
        filterConditions.push({ industry: preferences.preferredIndustry }); // recruiter root
      }

      if (preferences.preferredSkills?.length) {
        filterConditions.push({
          "hiringCriteria.requiredSkills": { $in: preferences.preferredSkills },
        });
      }
      if (preferences.preferredLocation) {
        filterConditions.push({
          "hiringCriteria.location": {
            $regex: preferences.preferredLocation,
            $options: "i",
          },
        });
      }
      if (preferences.preferredExperienceLevel) {
        filterConditions.push({
          "hiringCriteria.experienceLevel":
            preferences.preferredExperienceLevel,
        });
      }
      if (preferences.preferredWorkType) {
        filterConditions.push({
          "hiringCriteria.workType": preferences.preferredWorkType,
        });
      }
      if (preferences.preferredWorkEnvironment) {
        filterConditions.push({
          "hiringCriteria.workEnvironment":
            preferences.preferredWorkEnvironment,
        });
      }

      if (preferences.preferredJobTitle) {
        filterConditions.push({
          jobTitle: {
            $regex: preferences.preferredJobTitle,
            $options: "i",
          },
        });
      }

      if (filterConditions.length > 0) {
        query.$and = filterConditions;
      }

      // matches

      let matches = await Recruiter.find(query)
        .populate("userId", "name avatar")
        .lean();

      matches = matches
        .map((candidate) => {
          const similarityScore = computeJobSeekerSimilarity(
            jobSeeker,
            candidate
          );
          return { ...candidate, _similarity: similarityScore };
        })
        .sort((a, b) => b._similarity - a._similarity);

      return res.status(200).json({ success: true, data: matches });
    }

    // Recruiter Logic

    if (user.role === "recruiter") {
      const recruiter = await Recruiter.findOne({ userId });
      if (!recruiter) {
        return res.status(404).json({
          success: false,
          message: "Recruiter profile not found. Please complete onboarding.",
        });
      }

      // filters

      const filters = recruiter.filters || {};
      const query = { userId: { $nin: swipeIds } };

      const filterConditions = [];

      if (filters.filterIndustry && filters.filterIndustry !== "General") {
        filterConditions.push({ industry: filters.filterIndustry });
      }

      if (filters.filterSkills?.length) {
        filterConditions.push({ skills: { $in: filters.filterSkills } });
      }
      if (filters.filterLocation) {
        filterConditions.push({
          location: { $regex: filters.filterLocation, $options: "i" },
        });
      }
      if (filters.filterExperienceLevel) {
        filterConditions.push({
          experience: filters.filterExperienceLevel,
        });
      }
      if (filters.filterWorkType) {
        filterConditions.push({
          workType: filters.filterWorkType,
        });
      }
      if (filters.filterWorkEnvironment) {
        filterConditions.push({
          workEnvironment: filters.filterWorkEnvironment,
        });
      }

      if (filterConditions.length > 0) {
        query.$and = filterConditions;
      }

      // matches

      let matches = await JobSeeker.find(query)
        .populate("userId", "name avatar")
        .lean();

      matches = matches
        .map((candidate) => {
          const similarityScore = computeRecruiterSimilarity(
            candidate,
            recruiter.hiringCriteria,
            recruiter.industry
          );
          return { ...candidate, _similarity: similarityScore };
        })
        .sort((a, b) => b._similarity - a._similarity);

      return res.status(200).json({ success: true, data: matches });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid user role. Must be 'jobSeeker' or 'recruiter'.",
    });
  } catch (error) {
    console.error("Recommendation error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching recommendations",
      error: error.message,
    });
  }
};

exports.getRecommendationsv4 = async (req, res) => {
  try {
    // token check
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Missing or invalid token",
      });
    }

    // user check
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // onboarding check

    if (!user.isOnboarded) {
      return res.status(403).json({
        success: false,
        message: "Please complete onboarding to access recommendations.",
      });
    }

    // role check

    if (!user.role) {
      return res.status(403).json({
        success: false,
        message: "User role not set. Please complete onboarding.",
      });
    }

    // swiped ids check (already swiped user)

    const swipes = await Swipe.find({ userId });
    const swipeIds = swipes.map((swipe) => swipe.targetId.toString());

    // Job Seeker Logic

    if (user.role === "jobSeeker") {
      const jobSeeker = await JobSeeker.findOne({ userId });
      if (!jobSeeker) {
        return res.status(404).json({
          success: false,
          message: "Job seeker profile not found. Please complete onboarding.",
        });
      }

      // preferences

      const preferences = jobSeeker.preferences || {};
      const query = { userId: { $nin: swipeIds } };

      const filterConditions = [];

      if (
        preferences.preferredIndustry &&
        preferences.preferredIndustry !== "General"
      ) {
        filterConditions.push({ industry: preferences.preferredIndustry }); // recruiter root
      }

      if (preferences.preferredSkills?.length) {
        filterConditions.push({
          "hiringCriteria.requiredSkills": { $in: preferences.preferredSkills },
        });
      }
      if (preferences.preferredLocation) {
        filterConditions.push({
          "hiringCriteria.location": {
            $regex: preferences.preferredLocation,
            $options: "i",
          },
        });
      }
      if (preferences.preferredExperienceLevel) {
        filterConditions.push({
          "hiringCriteria.experienceLevel":
            preferences.preferredExperienceLevel,
        });
      }
      if (preferences.preferredWorkType) {
        filterConditions.push({
          "hiringCriteria.workType": preferences.preferredWorkType,
        });
      }
      if (preferences.preferredWorkEnvironment) {
        filterConditions.push({
          "hiringCriteria.workEnvironment":
            preferences.preferredWorkEnvironment,
        });
      }

      if (preferences.preferredJobTitle) {
        filterConditions.push({
          jobTitle: {
            $regex: preferences.preferredJobTitle,
            $options: "i",
          },
        });
      }

      if (filterConditions.length > 0) {
        query.$and = filterConditions;
      }

      // matches

      let matches = await Recruiter.find(query)
        .populate("userId", "name avatar")
        .lean();

      matches = matches.map((candidate) => {
        const similarityScore = computeJobSeekerSimilarity(
          jobSeeker,
          candidate
        );
        return { ...candidate, _similarity: similarityScore };
      });

      // Collaborative Filtering

      const similarUsers = await findSimilarUsers(userId, "jobSeeker");
      if (similarUsers.length > 0) {
        const cfScores = await aggregateCFRecommendations(
          similarUsers,
          swipeIds
        );

        matches = matches.map((m) => {
          const tid = m.userId?._id?.toString() || m.userId?.toString();
          const cfScore = cfScores[tid] || 0;
          const hybrid = 0.6 * m._similarity + 0.4 * cfScore;
          return { ...m, _similarity: hybrid };
        });
      }

      matches.sort((a, b) => b._similarity - a._similarity);

      return res.status(200).json({ success: true, data: matches });
    }

    // Recruiter Logic

    if (user.role === "recruiter") {
      const recruiter = await Recruiter.findOne({ userId });
      if (!recruiter) {
        return res.status(404).json({
          success: false,
          message: "Recruiter profile not found. Please complete onboarding.",
        });
      }

      // filters

      const filters = recruiter.filters || {};
      const query = { userId: { $nin: swipeIds } };

      const filterConditions = [];

      if (filters.filterIndustry && filters.filterIndustry !== "General") {
        filterConditions.push({ industry: filters.filterIndustry });
      }

      if (filters.filterSkills?.length) {
        filterConditions.push({ skills: { $in: filters.filterSkills } });
      }
      if (filters.filterLocation) {
        filterConditions.push({
          location: { $regex: filters.filterLocation, $options: "i" },
        });
      }
      if (filters.filterExperienceLevel) {
        filterConditions.push({
          experience: filters.filterExperienceLevel,
        });
      }
      if (filters.filterWorkType) {
        filterConditions.push({
          workType: filters.filterWorkType,
        });
      }
      if (filters.filterWorkEnvironment) {
        filterConditions.push({
          workEnvironment: filters.filterWorkEnvironment,
        });
      }

      if (filterConditions.length > 0) {
        query.$and = filterConditions;
      }

      // matches

      let matches = await JobSeeker.find(query)
        .populate("userId", "name avatar")
        .lean();

      matches = matches.map((candidate) => {
        const similarityScore = computeRecruiterSimilarity(
          candidate,
          recruiter.hiringCriteria,
          recruiter.industry
        );
        return { ...candidate, _similarity: similarityScore };
      });

      // Collaborative Filtering

      const similarUsers = await findSimilarUsers(userId, "recruiter");
      if (similarUsers.length > 0) {
        const cfScores = await aggregateCFRecommendations(
          similarUsers,
          swipeIds
        );

        matches = matches.map((m) => {
          const tid = m.userId?._id?.toString() || m.userId?.toString();
          const cfScore = cfScores[tid] || 0;
          const hybrid = 0.6 * m._similarity + 0.4 * cfScore;
          return { ...m, _similarity: hybrid };
        });
      }

      matches.sort((a, b) => b._similarity - a._similarity);

      return res.status(200).json({ success: true, data: matches });
    }

    console.log("CF scores:", cfScores);

    return res.status(400).json({
      success: false,
      message: "Invalid user role. Must be 'jobSeeker' or 'recruiter'.",
    });
  } catch (error) {
    console.error("Recommendation error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching recommendations",
      error: error.message,
    });
  }
};
