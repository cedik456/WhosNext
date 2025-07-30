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

const computeRecruiterSimilarity = (jobSeekerProfile, recruiterFilters) => {
  let score = 0;
  let totalWeight = 0;

  if (
    jobSeekerProfile.skills?.length &&
    recruiterFilters?.filterSkills?.length
  ) {
    const skillScore = jaccardSimilarity(
      new Set(jobSeekerProfile.skills),
      new Set(recruiterFilters.filterSkills)
    );
    score += skillScore * 0.4;
    totalWeight += 0.4;
  }

  if (jobSeekerProfile.location && recruiterFilters?.filterLocation) {
    if (
      jobSeekerProfile.location.toLowerCase() ===
      recruiterFilters.filterLocation.toLowerCase()
    ) {
      score += 1 * 0.2;
    }
    totalWeight += 0.2;
  }

  if (jobSeekerProfile.experience && recruiterFilters?.filterExperienceLevel) {
    if (
      jobSeekerProfile.experience.toLowerCase() ===
      recruiterFilters.filterExperienceLevel.toLowerCase()
    ) {
      score += 1 * 0.15;
    }
    totalWeight += 0.15;
  }

  if (jobSeekerProfile.workType && recruiterFilters?.filterWorkType) {
    if (
      jobSeekerProfile.workType.toLowerCase() ===
      recruiterFilters.filterWorkType.toLowerCase()
    ) {
      score += 1 * 0.15;
    }
    totalWeight += 0.15;
  }

  if (
    jobSeekerProfile.workEnvironment &&
    recruiterFilters?.filterWorkEnvironment
  ) {
    if (
      jobSeekerProfile.workEnvironment.toLowerCase() ===
      recruiterFilters.filterWorkEnvironment.toLowerCase()
    ) {
      score += 1 * 0.1;
    }
    totalWeight += 0.1;
  }

  return totalWeight > 0 ? score / totalWeight : 0;
};

module.exports = { computeJobSeekerSimilarity, computeRecruiterSimilarity };
