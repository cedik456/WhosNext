// testExperience.js

const computeSimilarity = (preferences, candidate) => {
  let score = 0;
  let totalWeight = 0;

  // Experience (15%)
  if (
    preferences.experienceLevel &&
    candidate.hiringCriteria?.experienceLevel
  ) {
    if (
      preferences.experienceLevel === candidate.hiringCriteria.experienceLevel
    ) {
      console.log("Experience matched!");
      score += 1 * 0.15;
    } else {
      console.log("Experience did not match.");
    }
    totalWeight += 0.15;
  }

  return totalWeight > 0 ? score / totalWeight : 0;
};

// --- Test Cases ---
const preferences = { experienceLevel: "Mid-level" };

// Candidate 1: Matching experience
const candidate1 = { hiringCriteria: { experienceLevel: "Mid-level" } };

// Candidate 2: Different experience
const candidate2 = { hiringCriteria: { experienceLevel: "Entry-level" } };

console.log(
  "Candidate 1 Similarity:",
  computeSimilarity(preferences, candidate1)
); // Expect 1
console.log(
  "Candidate 2 Similarity:",
  computeSimilarity(preferences, candidate2)
); // Expect 0
