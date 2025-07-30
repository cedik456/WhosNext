const jaccardSimilarity = (setA, setB) => {
  const intersection = [...setA].filter((x) => setB.has(x));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.length / union.size;
};

const computeSimilarity = (
  jobSeekerProfile,
  recruiterProfile,
  mode = "jobSeeker"
) => {
  let score = 0;
  let totalWeight = 0;

  // pick the right structures depending on mode
  const jobSeeker = mode === "jobSeeker" ? jobSeekerProfile : recruiterProfile;
  const recruiter = mode === "jobSeeker" ? recruiterProfile : jobSeekerProfile;

  // Skills (40%)
  if (
    jobSeeker.skills?.length &&
    recruiter.hiringCriteria?.requiredSkills?.length
  ) {
    const skillScore = jaccardSimilarity(
      new Set(jobSeeker.skills),
      new Set(recruiter.hiringCriteria.requiredSkills)
    );
    score += skillScore * 0.4;
    totalWeight += 0.4;
  }

  // Location (20%)
  if (jobSeeker.location && recruiter.hiringCriteria?.location) {
    if (
      jobSeeker.location.toLowerCase() ===
      recruiter.hiringCriteria.location.toLowerCase()
    ) {
      score += 1 * 0.2;
    }
    totalWeight += 0.2;
  }

  // Experience (15%)
  if (jobSeeker.experience && recruiter.hiringCriteria?.experienceLevel) {
    if (
      jobSeeker.experience.toLowerCase() ===
      recruiter.hiringCriteria.experienceLevel.toLowerCase()
    ) {
      score += 1 * 0.15;
    }
    totalWeight += 0.15;
  }

  // Work Type (15%)
  if (jobSeeker.workType && recruiter.hiringCriteria?.workType) {
    if (
      jobSeeker.workType.toLowerCase() ===
      recruiter.hiringCriteria.workType.toLowerCase()
    ) {
      score += 1 * 0.15;
    }
    totalWeight += 0.15;
  }

  // Work Environment (10%)
  if (jobSeeker.workEnvironment && recruiter.hiringCriteria?.workEnvironment) {
    if (
      jobSeeker.workEnvironment.toLowerCase() ===
      recruiter.hiringCriteria.workEnvironment.toLowerCase()
    ) {
      score += 1 * 0.1;
    }
    totalWeight += 0.1;
  }

  return totalWeight > 0 ? score / totalWeight : 0;
};

module.exports = { computeSimilarity };
