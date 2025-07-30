const jaccardSimilarity = (setA, setB) => {
  const intersection = [...setA].filter((x) => setB.has(x));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.length / union.size;
};

const computeSimilarity = (jobSeekerProfile, candidate) => {
  let score = 0;
  let totalWeight = 0;

  // Skills (40%)

  if (
    jobSeekerProfile.skills?.length &&
    candidate.hiringCriteria?.requiredSkills?.length
  ) {
    const skillScore = jaccardSimilarity(
      new Set(jobSeekerProfile.skills),
      new Set(candidate.hiringCriteria.requiredSkills)
    );
    console.log("Skill Score:", skillScore);
    score += skillScore * 0.4;
    totalWeight += 0.4;
  }

  // Location (20%)

  if (jobSeekerProfile.location && candidate.hiringCriteria?.location) {
    if (
      jobSeekerProfile.location.toLowerCase() ===
      candidate.hiringCriteria.location.toLowerCase()
    ) {
      console.log("Location matched!");
      score += 1 * 0.2;
    } else {
      console.log("Location mismatch!");
    }
    totalWeight += 0.2;
  }

  // Experience

  if (
    jobSeekerProfile.experience &&
    candidate.hiringCriteria?.experienceLevel
  ) {
    if (
      jobSeekerProfile.experience.toLowerCase() ===
      candidate.hiringCriteria.experienceLevel.toLowerCase()
    ) {
      console.log("Experience matched!");
      score += 1 * 0.15;
    } else {
      console.log("Experience mismatch.");
    }
    totalWeight += 0.15;
  }

  // Work Type

  if (jobSeekerProfile.workType && candidate.hiringCriteria?.workType) {
    if (
      jobSeekerProfile.workType.toLowerCase() ===
      candidate.hiringCriteria.workType.toLowerCase()
    ) {
      console.log("Work Type Matched!");
      score += 1 * 0.15;
    } else {
      console.log("Work Type Mismatched!");
    }
    totalWeight += 0.15;
  }

  // Work Environments

  if (
    jobSeekerProfile.workEnvironment &&
    candidate.hiringCriteria?.workEnvironment
  ) {
    if (
      jobSeekerProfile.workEnvironment.toLowerCase() ===
      candidate.hiringCriteria.workEnvironment.toLowerCase()
    ) {
      score += 1 * 0.1;
    }
    totalWeight += 0.1;
  }

  console.log(totalWeight);
  return totalWeight > 0 ? score / totalWeight : 0;
};

// --- Test Case ---
// --- Test Case ---
const jobSeekerProfile = {
  skills: ["React", "Node"],
  location: "Quezon City",
  experience: "Mid-level",
  workType: "Full-time",
  workEnvironment: "Remote",
};

const candidate = {
  hiringCriteria: {
    requiredSkills: ["React", "Node", "Express"],
    location: "Quezon City",
    experienceLevel: "Mid-level",
    workType: "Part-time",
    workEnvironment: "Remote",
  },
};

console.log(
  "Final Similarity:",
  computeSimilarity(jobSeekerProfile, candidate)
);
