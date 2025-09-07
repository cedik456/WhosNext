const JobSeeker = require("../models/JobSeekerSchema");
const Recruiter = require("../models/RecruiterSchema");
const Swipe = require("../models/SwipeSchema");
const { cosineSimilarity } = require("./similarity");

// build swipe vector
// find similar users
// aggregate cf recommendations

async function buildSwipeVector(userId) {
  const swipes = await Swipe.find({ userId, action: "like" }).lean();
  const vector = {};
  for (const s of swipes) {
    vector[s.targetId.toString()] = 1;
  }

  return vector;
}

async function findSimilarUsers(userId, role) {
  const currentVec = await buildSwipeVector(userId);

  // avoid cold start
  if (Object.keys(currentVec).length < 3) return [];

  const userPool =
    role === "jobSeeker"
      ? await JobSeeker.find({ userId: { $ne: userId } }).lean()
      : await Recruiter.find({ userId: { $ne: userId } }).lean();

  const similarities = [];

  for (const other of userPool) {
    const otherVec = await buildSwipeVector(other.userId.toString());
    const sim = cosineSimilarity(currentVec, otherVec);
    if (sim > 0) {
      similarities.push({ userId: other.userId.toString(), score: sim });
    }
  }
  return similarities.sort((a, b) => b.score - a.score);
}

async function aggregateCFRecommendations(similarUsers, swipeIds) {
  const scores = {};

  for (const neighbor of similarUsers) {
    const neighborSwipes = await Swipe.find({
      userId: neighbor.userId,
      action: "like",
    }).lean();

    for (const s of neighborSwipes) {
      const tid = s.targetId.toString();
      if (swipeIds.includes(tid)) continue;

      if (!scores[tid]) scores[tid] = 0;
      scores[tid] += neighbor.score;
    }
  }

  return scores;
}

module.exports = {
  buildSwipeVector,
  findSimilarUsers,
  aggregateCFRecommendations,
};
