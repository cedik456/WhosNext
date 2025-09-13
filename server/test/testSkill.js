const { jaccardSimilarity } = require("../utils/similarity");

const computeSimilarity = (preferences, candidate) => {
  let score = 0;
  let totalWeight = 0;

  // Skills (40%)

  if (
    preferences.preferredSkills?.length &&
    candidate.hiringCriteria?.requiredSkills?.length
  ) {
    const skillScore = jaccardSimilarity(
      new Set(preferences.preferredSkills),
      new Set(candidate.hiringCriteria.requiredSkills)
    );
    score += skillScore * 0.4;
    totalWeight += 0.4;
  }

  return totalWeight > 0 ? score / totalWeight : 0;
};

const preferences = {
  preferredSkills: ["React", "Node"],
};

const candidate = {
  hiringCriteria: {
    requiredSkills: ["React", "Node"],
  },
};

console.log(
  "Compute Similarity (Skills Only):",
  computeSimilarity(preferences, candidate)
);
