import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const WORK_TYPES = ["Full-time", "Part-time", "Internship"];
const WORK_ENVIRONMENTS = ["On-site", "Remote", "Hybrid"];
const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior"];
const LOCATIONS = [
  "Quezon City",
  "Cebu City",
  "Davao",
  "Iloilo",
  "Makati",
  "Taguig",
];

const CreateJob = () => {
  const { colorScheme } = useColorScheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [workType, setWorkType] = useState(WORK_TYPES[0]); // default
  const [workEnvironment, setWorkEnvironment] = useState(WORK_ENVIRONMENTS[0]);
  const [experienceLevel, setExperienceLevel] = useState(EXPERIENCE_LEVELS[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [skills, setSkills] = useState(["React", "JavaScript"]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-2xl font-poppins-600 dark:text-white">
          Post a Job
        </Text>
      </View>

      {/* Form */}
      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Basic Info */}
        <Text className="mt-4 mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
          Basic Info
        </Text>
        <TextInput
          placeholder="Job Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#9CA3AF"
          className="p-4 mb-3 border border-gray-300 rounded-lg "
        />
        <TextInput
          placeholder="Job Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#9CA3AF"
          multiline
          className="p-4 mb-3 border border-gray-300 rounded-xl h-28"
        />

        {/* Details */}
        <Text className="mt-4 mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
          Details
        </Text>
        <View className="flex-row justify-between">
          <TextInput
            placeholder="Work Type"
            value={workType}
            onChangeText={setWorkType}
            placeholderTextColor="#9CA3AF"
            className="flex-1 p-4 mr-2 border border-gray-300 rounded-lg dark:bg-neutral-900 dark:text-white"
          />
          <TextInput
            placeholder="Work Environment"
            value={workEnvironment}
            onChangeText={setWorkEnvironment}
            placeholderTextColor="#9CA3AF"
            className="flex-1 p-4 ml-2 border border-gray-300 rounded-lg dark:bg-neutral-900 dark:text-white"
          />
        </View>
        <TextInput
          placeholder="Experience Level"
          placeholderTextColor="#9CA3AF"
          className="p-4 mt-3 border border-gray-300 rounded-xl dark:bg-neutral-900 dark:text-white"
        />

        {/* Location & Salary */}
        <Text className="mt-4 mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
          Location & Salary
        </Text>
        <TextInput
          placeholder="Location"
          placeholderTextColor="#9CA3AF"
          className="p-4 mb-3 border border-gray-300 rounded-xl dark:bg-neutral-900 dark:text-white"
        />
        <View className="flex-row justify-between">
          <TextInput
            placeholder="Min Salary"
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
            className="flex-1 p-4 mr-2 border border-gray-300 rounded-lg dark:bg-neutral-900 dark:text-white"
          />
          <TextInput
            placeholder="Max Salary"
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
            className="flex-1 p-3 ml-2 border border-gray-300 rounded-lg dark:bg-neutral-900 dark:text-white"
          />
        </View>

        {/* Skills */}
        <Text className="mt-4 mb-2 text-sm text-gray-600 font-poppins-500 dark:text-gray-300">
          Skills
        </Text>
        <View className="flex-row flex-wrap">
          {skills.map((skill, idx) => (
            <View
              key={idx}
              className="px-3 py-1 mt-2 mr-2 bg-gray-200 rounded-full dark:bg-neutral-800"
            >
              <Text className="text-xs font-poppins-500 dark:text-white">
                {skill}
              </Text>
            </View>
          ))}
        </View>
        <View className="flex-row items-center mt-3">
          <TextInput
            placeholder="Add a skill"
            value={newSkill}
            onChangeText={setNewSkill}
            className="flex-1 p-3 border rounded-lg dark:bg-neutral-900 dark:text-white"
          />
          <Pressable
            onPress={addSkill}
            className="p-3 ml-3 bg-blue-600 rounded-lg"
          >
            <Ionicons name="add" size={20} color="white" />
          </Pressable>
        </View>
      </ScrollView>

      {/* Sticky Submit Button */}
      <View className="absolute left-0 right-0 p-4 bottom-5 dark:bg-neutral-900">
        <Pressable className="p-4 bg-blue-600 rounded-lg">
          <Text className="text-center text-white font-poppins-600">
            Post Job
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateJob;
