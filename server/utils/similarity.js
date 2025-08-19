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
    score += skillScore * 3.5;
    totalWeight += 3.5;
  }

  if (jobSeekerProfile.location && recruiterProfile.hiringCriteria?.location) {
    if (
      jobSeekerProfile.location.toLowerCase() ===
      recruiterProfile.hiringCriteria.location.toLowerCase()
    ) {
      score += 1 * 0.5;
    }
    totalWeight += 0.5;
  }

  if (
    jobSeekerProfile.experience &&
    recruiterProfile.hiringCriteria?.experienceLevel
  ) {
    if (
      jobSeekerProfile.experience.toLowerCase() ===
      recruiterProfile.hiringCriteria.experienceLevel.toLowerCase()
    ) {
      score += 1 * 2.0;
    }
    totalWeight += 2.0;
  }

  if (jobSeekerProfile.workType && recruiterProfile.hiringCriteria?.workType) {
    if (
      jobSeekerProfile.workType.toLowerCase() ===
      recruiterProfile.hiringCriteria.workType.toLowerCase()
    ) {
      score += 1 * 1.0;
    }
    totalWeight += 1.0;
  }

  if (
    jobSeekerProfile.workEnvironment &&
    recruiterProfile.hiringCriteria?.workEnvironment
  ) {
    if (
      jobSeekerProfile.workEnvironment.toLowerCase() ===
      recruiterProfile.hiringCriteria.workEnvironment.toLowerCase()
    ) {
      score += 1 * 0.5;
    }
    totalWeight += 0.5;
  }

  if (jobSeekerProfile.industry && recruiterProfile?.industry) {
    const jp = jobSeekerProfile.industry.toLowerCase();
    const ri = recruiterProfile.industry.toLowerCase();

    if (ri !== "general") {
      if (jp === ri) {
        score += 1 * 3.0;
      }
      totalWeight += 3.0; // weight only counts if not general
    }
  }

  return totalWeight > 0 ? score / totalWeight : 0;
};

// Recruiter Similarity

const computeRecruiterSimilarity = (
  jobSeekerProfile,
  recruiterCriteria,
  recruiterIndustry
) => {
  let score = 0;
  let totalWeight = 0;

  if (
    jobSeekerProfile.skills?.length &&
    recruiterCriteria?.requiredSkills?.length
  ) {
    const skillScore = jaccardSimilarity(
      new Set(jobSeekerProfile.skills),
      new Set(recruiterCriteria.requiredSkills)
    );
    score += skillScore * 3.5;
    totalWeight += 3.5;
  }

  if (jobSeekerProfile.location && recruiterCriteria?.location) {
    if (
      jobSeekerProfile.location.toLowerCase() ===
      recruiterCriteria.location.toLowerCase()
    ) {
      score += 1 * 0.5;
    }
    totalWeight += 0.5;
  }

  if (jobSeekerProfile.experience && recruiterCriteria?.experienceLevel) {
    if (
      jobSeekerProfile.experience.toLowerCase() ===
      recruiterCriteria.experienceLevel.toLowerCase()
    ) {
      score += 1 * 2.0;
    }
    totalWeight += 2.0;
  }

  if (jobSeekerProfile.workType && recruiterCriteria?.workType) {
    if (
      jobSeekerProfile.workType.toLowerCase() ===
      recruiterCriteria.workType.toLowerCase()
    ) {
      score += 1 * 1.0;
    }
    totalWeight += 1.0;
  }

  if (jobSeekerProfile.workEnvironment && recruiterCriteria?.workEnvironment) {
    if (
      jobSeekerProfile.workEnvironment.toLowerCase() ===
      recruiterCriteria.workEnvironment.toLowerCase()
    ) {
      score += 1 * 0.5;
    }
    totalWeight += 0.5;
  }

  if (jobSeekerProfile.industry && recruiterIndustry) {
    const jp = jobSeekerProfile.industry.toLowerCase();
    const ri = recruiterIndustry.toLowerCase();

    if (ri !== "general") {
      // only count when not general
      if (jp === ri) {
        score += 1 * 3.0;
      }
      totalWeight += 3.0; // weight only added if considered
    }
  }

  return totalWeight > 0 ? score / totalWeight : 0;
};

module.exports = { computeJobSeekerSimilarity, computeRecruiterSimilarity };
