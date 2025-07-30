// Jaccard Similarity

const jaccardSimilarity = (setA, setB) => {
  const intersection = [...setA].filter((x) => setB.has(x));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.length / union.size;
};

// Job Seeker Similarity

const computeJobSeekerSimilarity = (jobSeekerProfile, recruiterProfile) => {
  let score = 0;
  let totalWeight = 0;

  if (
    jobSeekerProfile.skills?.length &&
    recruiterProfile.hiringCriteria?.requiredSkills?.length
  ) {
    const skillScore = jaccardSimilarity(
      new Set(jobSeekerProfile.skills),
      new Set(recruiterProfile.hiringCriteria.requiredSkills)
    );
    score += skillScore * 0.4;
    totalWeight += 0.4;
  }

  if (jobSeekerProfile.location && recruiterProfile.hiringCriteria?.location) {
    if (
      jobSeekerProfile.location.toLowerCase() ===
      recruiterProfile.hiringCriteria.location.toLowerCase()
    ) {
      score += 1 * 0.2;
    }
    totalWeight += 0.2;
  }

  if (
    jobSeekerProfile.experience &&
    recruiterProfile.hiringCriteria?.experienceLevel
  ) {
    if (
      jobSeekerProfile.experience.toLowerCase() ===
      recruiterProfile.hiringCriteria.experienceLevel.toLowerCase()
    ) {
      score += 1 * 0.15;
    }
    totalWeight += 0.15;
  }

  if (jobSeekerProfile.workType && recruiterProfile.hiringCriteria?.workType) {
    if (
      jobSeekerProfile.workType.toLowerCase() ===
      recruiterProfile.hiringCriteria.workType.toLowerCase()
    ) {
      score += 1 * 0.15;
    }
    totalWeight += 0.15;
  }

  if (
    jobSeekerProfile.workEnvironment &&
    recruiterProfile.hiringCriteria?.workEnvironment
  ) {
    if (
      jobSeekerProfile.workEnvironment.toLowerCase() ===
      recruiterProfile.hiringCriteria.workEnvironment.toLowerCase()
    ) {
      score += 1 * 0.1;
    }
    totalWeight += 0.1;
  }

  return totalWeight > 0 ? score / totalWeight : 0;
};

// Recruiter Similarity

const computeRecruiterSimilarity = (jobSeekerProfile, recruiterCriteria) => {
  let score = 0;
  let totalWeight = 0;

  // Skills (40%)
  if (
    jobSeekerProfile.skills?.length &&
    recruiterCriteria?.requiredSkills?.length
  ) {
    const skillScore = jaccardSimilarity(
      new Set(jobSeekerProfile.skills),
      new Set(recruiterCriteria.requiredSkills)
    );
    score += skillScore * 0.4;
    totalWeight += 0.4;
  }

  // Location (20%)
  if (jobSeekerProfile.location && recruiterCriteria?.location) {
    if (
      jobSeekerProfile.location.toLowerCase() ===
      recruiterCriteria.location.toLowerCase()
    ) {
      score += 1 * 0.2;
    }
    totalWeight += 0.2;
  }

  // Experience (15%)
  if (jobSeekerProfile.experience && recruiterCriteria?.experienceLevel) {
    if (
      jobSeekerProfile.experience.toLowerCase() ===
      recruiterCriteria.experienceLevel.toLowerCase()
    ) {
      score += 1 * 0.15;
    }
    totalWeight += 0.15;
  }

  // Work Type (15%)
  if (jobSeekerProfile.workType && recruiterCriteria?.workType) {
    if (
      jobSeekerProfile.workType.toLowerCase() ===
      recruiterCriteria.workType.toLowerCase()
    ) {
      score += 1 * 0.15;
    }
    totalWeight += 0.15;
  }

  // Work Environment (10%)
  if (jobSeekerProfile.workEnvironment && recruiterCriteria?.workEnvironment) {
    if (
      jobSeekerProfile.workEnvironment.toLowerCase() ===
      recruiterCriteria.workEnvironment.toLowerCase()
    ) {
      score += 1 * 0.1;
    }
    totalWeight += 0.1;
  }

  return totalWeight > 0 ? score / totalWeight : 0;
};

module.exports = { computeJobSeekerSimilarity, computeRecruiterSimilarity };
