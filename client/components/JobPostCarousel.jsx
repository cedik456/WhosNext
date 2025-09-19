import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import React, { useState } from "react";
import getSkillColor from "../utils/getSkillColor";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";

const JobPostCarousel = ({ recruiter, onSeeMore }) => {
  const [index, setIndex] = useState(0);

  const panels = [
    {
      type: "hiringCriteria",
      ...recruiter.hiringCriteria,
      jobTitle: recruiter.jobTitle,
      jobDescription: recruiter.jobDescription,
    },
    ...(recruiter.jobs || []).map((job) => ({ type: "job", ...job })),
  ];

  const current = panels[index];

  const handleNext = () => {
    setIndex((i) => (i + 1) % panels.length); // 👈 loop back to start
  };

  return (
    <View className="relative">
      {/* Counter */}
      <Text className="absolute text-xs text-gray-500 right-4 top-2 font-poppins-500">
        {index + 1} of {panels.length}
      </Text>

      {/* Panel content */}
      {current.type === "hiringCriteria" ? (
        <>
          <Text className="mb-2 text-base text-black font-poppins-600">
            ₱70,000 - ₱90,000
          </Text>
          {current.jobTitle && (
            <Text className="mb-1 text-xl text-gray-900 font-poppins-500">
              {current.jobTitle}
            </Text>
          )}

          <View className="self-start px-3 py-1 mb-2 bg-blue-100 border border-blue-400 rounded-full">
            <Text className="text-sm text-blue-800 font-poppins-500">
              {current.experienceLevel}
            </Text>
          </View>
          {current.location && (
            <View className="flex-row items-center gap-2 mb-1">
              <FontAwesome6 name="location-dot" size={15} />
              <Text className="text-base text-gray-600 font-poppins">
                {current.location}
              </Text>
            </View>
          )}
          <Text className="mt-1 text-base text-gray-600">
            {current.workType} | {current.workEnvironment}
          </Text>

          {current.requiredSkills?.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mt-3">
              {current.requiredSkills.map((skill, idx) => (
                <View
                  key={idx}
                  className={`px-3 py-1 rounded-full ${getSkillColor(skill)}`}
                >
                  <Text className="text-xs text-gray-600">{skill}</Text>
                </View>
              ))}
            </View>
          )}
          {current.jobDescription && (
            <>
              <Text className="mt-3 text-base text-gray-700 font-poppins-600">
                Job Description
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onSeeMore(current);
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="mt-1 text-gray-500 text-md font-poppins w-80"
                >
                  {current.description || current.jobDescription}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <>
          <Text className="mb-2 text-base text-black font-poppins-600">
            ₱{current.salaryRange?.min?.toLocaleString()} – ₱
            {current.salaryRange?.max?.toLocaleString()}
          </Text>
          <Text className="mb-1 text-xl text-gray-900 font-poppins-500">
            {current.title}
          </Text>
          <View className="self-start px-3 py-1 mb-2 bg-blue-100 border border-blue-400 rounded-full">
            <Text className="text-sm text-blue-800 font-poppins-500">
              {current.experienceLevel}
            </Text>
          </View>
          {current.location && (
            <View className="flex-row items-center gap-2 mb-1">
              <FontAwesome6 name="location-dot" size={15} />
              <Text className="text-base text-gray-600 font-poppins">
                {current.location}
              </Text>
            </View>
          )}

          <Text className="mt-1 text-base text-gray-600">
            {current.workType} | {current.workEnvironment}
          </Text>

          {current.requiredSkills?.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mt-3">
              {current.requiredSkills.map((skill, idx) => (
                <View
                  key={idx}
                  className={`px-3 py-1 rounded-full ${getSkillColor(skill)}`}
                >
                  <Text className="text-xs text-gray-600">{skill}</Text>
                </View>
              ))}
            </View>
          )}

          {current.description && (
            <>
              <Text className="mt-3 text-base text-gray-700 font-poppins-600">
                Job Description
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onSeeMore(current);
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="mt-1 text-gray-500 text-md font-poppins"
                >
                  {current.description || current.jobDescription}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      <View className="absolute -translate-y-1/2 right-2 top-1/2">
        {panels.length > 1 && (
          <TouchableOpacity onPress={handleNext} className="mr-5">
            <FontAwesome6 name="arrow-right-long" size={24} color="#4B4B4B" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default JobPostCarousel;
