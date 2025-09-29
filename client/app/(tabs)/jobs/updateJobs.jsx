import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import ExperienceLevelModal from "../../../modals/ExperienceLevelModal";
import PreferredLocationModal from "../../../modals/PreferredLocationModal";
import ChipSelector from "../../../components/ChipSelector";
import { useColorScheme } from "nativewind";
import { router, useLocalSearchParams } from "expo-router"; // 👈 to get job passed in route
import JobSkillsModal from "../../../modals/JobSkillsModal";
import JobTitleModal from "../../../modals/JobTitleModal";
import api from "../../../utils/axiosInstance";
import { getToken } from "../../../utils/storage";
import { WORK_ENVIRONMENT } from "../../../constants/workEnvironments";
import { WORK_TYPES } from "../../../constants/workTypes";

const UpdateJobs = () => {
  const { id } = useLocalSearchParams(); // 👈 get ID from params
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = await getToken();
        const res = await api.get(`/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const jobData = res.data.data;
          setJob(jobData); // keep full job
          setJobTitle(jobData.title);
          setDescription(jobData.description);
          setSalaryMin(jobData.salaryRange?.min?.toString() || "");
          setSalaryMax(jobData.salaryRange?.max?.toString() || "");
          setWorkType(jobData.workType);
          setWorkEnvironment(jobData.workEnvironment);
          setExperienceLevel(jobData.experienceLevel);
          setLocation(jobData.location);
          setSkills(jobData.requiredSkills || []);
        }
      } catch (err) {
        console.error(
          "Failed to fetch job:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const { colorScheme } = useColorScheme();
  // 👈 job data passed from list

  // Prefill with job values
  const [description, setDescription] = useState(job?.description || "");
  const [salaryMin, setSalaryMin] = useState(
    job?.salaryRange?.min?.toString() || ""
  );
  const [salaryMax, setSalaryMax] = useState(
    job?.salaryRange?.max?.toString() || ""
  );
  const [updating, setUpdating] = useState(false);

  // Chips
  const [workType, setWorkType] = useState(job?.workType || null);
  const [workEnvironment, setWorkEnvironment] = useState(
    job?.workEnvironment || null
  );

  // Modals
  const [jobTitle, setJobTitle] = useState(job?.title || null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const [experienceLevel, setExperienceLevel] = useState(
    job?.experienceLevel || null
  );
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  const [location, setLocation] = useState(job?.location || null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Skills
  const [skills, setSkills] = useState(job?.requiredSkills || []);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = await getToken();
        const res = await api.get(`/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const job = res.data.data;
          setJobTitle(job.title);
          setDescription(job.description);
          setSalaryMin(job.salaryRange?.min?.toString() || "");
          setSalaryMax(job.salaryRange?.max?.toString() || "");
          setWorkType(job.workType);
          setWorkEnvironment(job.workEnvironment);
          setExperienceLevel(job.experienceLevel);
          setLocation(job.location);
          setSkills(job.requiredSkills || []);
        }
      } catch (err) {
        console.error(
          "Failed to fetch job:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleUpdateJob = async () => {
    if (
      !jobTitle ||
      !description ||
      !workType ||
      !workEnvironment ||
      !experienceLevel ||
      !location ||
      !salaryMin ||
      !salaryMax ||
      skills.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setUpdating(true);
      const token = await getToken();

      const payload = {
        title: jobTitle,
        description,
        requiredSkills: skills,
        location,
        experienceLevel,
        workType,
        workEnvironment,
        salaryRange: {
          min: Number(salaryMin),
          max: Number(salaryMax),
        },
      };

      const response = await api.patch(`/jobs/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        console.log("Job updated:", response.data.data);
        router.replace("/(tabs)/jobs"); // go back to list
      }
    } catch (error) {
      console.error(
        "Failed to update job:",
        error.response?.data || error.message
      );
      alert("Failed to update job. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="relative flex-row items-center justify-center px-6 mt-5">
        <Pressable
          onPress={() => router.replace("/(tabs)/jobs/")}
          className="absolute left-6 "
        >
          <FontAwesome6
            name="chevron-left"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </Pressable>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } text-2xl  font-poppins-600 `}
        >
          Edit Job
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5 mt-8"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Job Title */}
        <View className="mb-5">
          <Text className="mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
            Job Title
          </Text>
          <Pressable
            onPress={() => setIsJobModalOpen(true)}
            className="flex-row items-center justify-between p-4 border border-gray-200 rounded-lg dark:bg-neutral-900"
          >
            <Text className="text-base font-poppins-500 dark:text-white">
              {jobTitle || "Select Job Title"}
            </Text>
            <AntDesign name="right" size={20} color="gray" />
          </Pressable>
        </View>

        {/* Job Description */}
        <TextInput
          placeholder="Job Description"
          value={description}
          onChangeText={setDescription}
          multiline
          className="p-4 mb-5 border border-gray-200 rounded-xl h-28 dark:bg-neutral-900 dark:text-white"
        />

        {/* Work Type */}
        <View className="mb-5">
          <Text className="mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
            Work Type
          </Text>
          <ChipSelector
            options={WORK_TYPES}
            selected={workType}
            onSelect={setWorkType}
          />
        </View>

        {/* Work Environment */}
        <View className="mb-5">
          <Text className="mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
            Work Environment
          </Text>
          <ChipSelector
            options={WORK_ENVIRONMENT}
            selected={workEnvironment}
            onSelect={setWorkEnvironment}
          />
        </View>

        {/* Experience Level */}
        <View className="mb-5">
          <Text className="mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
            Experience Level
          </Text>
          <Pressable
            onPress={() => setIsExperienceOpen(true)}
            className="flex-row items-center justify-between p-4 border border-gray-200 rounded-lg dark:bg-neutral-900"
          >
            <Text className="text-base font-poppins-500 dark:text-white">
              {experienceLevel || "Select Experience Level"}
            </Text>
            <AntDesign name="right" size={20} color="gray" />
          </Pressable>
        </View>

        {/* Location */}
        <View className="mb-5">
          <Text className="mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
            Location
          </Text>
          <Pressable
            onPress={() => setIsLocationOpen(true)}
            className="flex-row items-center justify-between p-4 border border-gray-200 rounded-lg dark:bg-neutral-900"
          >
            <Text className="text-base font-poppins-500 dark:text-white">
              {location || "Select Location"}
            </Text>
            <AntDesign name="right" size={20} color="gray" />
          </Pressable>
        </View>

        {/* Salary */}
        <View className="mb-5">
          <Text className="mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
            Salary Range
          </Text>
          <View className="flex-row justify-between">
            <TextInput
              placeholder="Min Salary"
              value={salaryMin}
              onChangeText={setSalaryMin}
              keyboardType="numeric"
              className="flex-1 p-4 mr-2 border border-gray-200 rounded-xl dark:bg-neutral-900 dark:text-white"
            />
            <TextInput
              placeholder="Max Salary"
              value={salaryMax}
              onChangeText={setSalaryMax}
              keyboardType="numeric"
              className="flex-1 p-4 ml-2 border border-gray-200 rounded-xl dark:bg-neutral-900 dark:text-white"
            />
          </View>
        </View>

        {/* Skills */}
        <View className="mb-5">
          <Text className="mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
            Skills
          </Text>
          <Pressable
            onPress={() => setIsSkillsOpen(true)}
            className="flex-row items-center justify-between p-4 border border-gray-200 rounded-lg dark:bg-neutral-900"
          >
            <Text className="text-base font-poppins-500 dark:text-white">
              {skills.length > 0 ? skills.join(", ") : "Select Required Skills"}
            </Text>
            <AntDesign name="right" size={20} color="gray" />
          </Pressable>
        </View>
      </ScrollView>

      <View className="absolute left-0 right-0 p-4 bottom-7 dark:bg-neutral-900">
        <Pressable
          onPress={handleUpdateJob}
          disabled={updating}
          className="p-4 bg-black rounded-lg"
        >
          <Text className="text-center text-white font-poppins-600">
            {updating ? "Updating..." : "Save Changes"}
          </Text>
        </Pressable>
      </View>

      {/* Modals */}
      <JobTitleModal
        isVisible={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        selected={jobTitle}
        onSelect={setJobTitle}
      />
      <ExperienceLevelModal
        isVisible={isExperienceOpen}
        onClose={() => setIsExperienceOpen(false)}
        selected={experienceLevel}
        onSelect={setExperienceLevel}
      />
      <PreferredLocationModal
        isVisible={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selected={location}
        onSelect={setLocation}
      />

      <JobSkillsModal
        isVisible={isSkillsOpen}
        onClose={() => setIsSkillsOpen(false)}
        selected={skills}
        onUpdate={setSkills}
      />
    </SafeAreaView>
  );
};

export default UpdateJobs;
