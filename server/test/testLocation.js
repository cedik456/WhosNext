// testLocation.js
const computeSimilarity = (preferences, candidate) => {
  let score = 0;
  let totalWeight = 0;

  // Location (20%)
  if (preferences.preferredLocation && candidate.hiringCriteria?.location) {
    if (
      preferences.preferredLocation.toLowerCase() ===
      candidate.hiringCriteria.location.toLowerCase()
    ) {
      console.log("Location matched!");
      score += 1 * 0.2;
    } else {
      console.log("Location did not match.");
    }
    totalWeight += 0.2;
  }

  return totalWeight > 0 ? score / totalWeight : 0;
};

// --- Test Cases ---

// Candidate 1: Matching location
const candidate1 = { preferredLocation: "Quezon City" };

// Candidate 2: Different location
const candidate2 = { hiringCriteria: { location: "Quezon City" } };

console.log(
  "Candidate 1 Similarity:",
  computeSimilarity(candidate1, candidate2)
); // Expect 1
