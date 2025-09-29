import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import ExperienceLevelModal from "../../../modals/ExperienceLevelModal";
import PreferredLocationModal from "../../../modals/PreferredLocationModal";
import ChipSelector from "../../../components/ChipSelector";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";
import JobSkillsModal from "../../../modals/JobSkillsModal";
import JobTitleModal from "../../../modals/JobTitleModal";
import api from "../../../utils/axiosInstance";
import { getToken } from "../../../utils/storage";
import { WORK_ENVIRONMENT } from "../../../constants/workEnvironments";
import { WORK_TYPES } from "../../../constants/workTypes";

const CreateJob = () => {
  const { colorScheme } = useColorScheme();
  const [description, setDescription] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [posting, setPosting] = useState(false);

  // Chips
  const [workType, setWorkType] = useState(null);
  const [workEnvironment, setWorkEnvironment] = useState(null);

  // Modals
  const [jobTitle, setJobTitle] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const [experienceLevel, setExperienceLevel] = useState(null);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  const [location, setLocation] = useState(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Skills
  const [skills, setSkills] = useState([]);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const handlePostJob = async () => {
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
      setPosting(true);
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
          // ✅ match schema
          min: Number(salaryMin),
          max: Number(salaryMax),
        },
      };

      const response = await api.post(
        "/jobs/create",
        payload,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        console.log("Job created:", response.data.data);

        setJobTitle(null);
        setDescription("");
        setWorkType(null);
        setWorkEnvironment(null);
        setExperienceLevel(null);
        setLocation(null);
        setSalaryMin("");
        setSalaryMax("");
        setSkills([]);

        router.replace("/(tabs)/jobs");
      }
    } catch (error) {
      console.error(
        "Failed to post job:",
        error.response?.data || error.message
      );
      alert("Failed to post job. Please try again.");
    } finally {
      setPosting(false);
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
          Post a job
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5 mt-8"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Job Title (Modal) */}
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

        {/* Work Type (Chips) */}
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

        {/* Work Environment (Chips) */}
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

        {/* Experience Level (Modal) */}
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

        {/* Location (Modal) */}
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
          onPress={handlePostJob}
          disabled={posting}
          className="p-4 bg-black rounded-lg"
        >
          <Text className="text-center text-white font-poppins-600">
            Post Job
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

export default CreateJob;
