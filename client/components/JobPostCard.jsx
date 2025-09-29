import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

const JobPostCard = ({ job, onDelete }) => {
  return (
    <View className="p-4 mx-4 my-3 bg-white shadow-sm rounded-xl dark:bg-neutral-900">
      <Text className="text-lg font-poppins-600 dark:text-white">
        {job.title}
      </Text>
      <Text
        className="mt-1 text-sm text-gray-700 dark:text-gray-300 "
        numberOfLines={2} // keep it short in the card
        ellipsizeMode="tail"
      >
        {job.description}
      </Text>
      <Text className="mt-1 text-sm text-gray-600 dark:text-gray-300 ">
        ₱{job.salaryRange.min.toLocaleString()}–₱
        {job.salaryRange.max.toLocaleString()} | {job.workType} |{" "}
        {job.workEnvironment} | {job.location}
      </Text>

      <View className="flex-row flex-wrap mt-2">
        {job.requiredSkills.map((skill, index) => (
          <View
            key={index}
            className="px-3 py-1 mt-2 mr-2 bg-gray-200 rounded-full dark:bg-neutral-800"
          >
            <Text className="text-xs font-poppins-500 dark:text-white">
              {skill}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row justify-end mt-3">
        <Pressable
          className="mr-4"
          onPress={() =>
            router.push({
              pathname: "/(tabs)/jobs/updateJobs",
              params: { id: job._id },
            })
          }
        >
          <Text className="text-blue-600 dark:text-blue-400 font-poppins-500">
            Edit
          </Text>
        </Pressable>
        <Pressable onPress={() => onDelete(job._id)}>
          <Text className="text-red-600 dark:text-red-400 font-poppins-500">
            Delete
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default JobPostCard;
