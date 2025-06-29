import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chip } from "react-native-paper";
import { useRouter } from "expo-router";
import Button from "../../../components/Button";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";

const JOB_TITLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Mobile Developer",
  "Data Analyst",
  "DevOps Engineer",
  "QA Engineer",
  "Other",
];

const JobTitle = () => {
  const router = useRouter();
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const toggleSelect = (title) => {
    setSelectedJobTitle(title);
  };

  const handleSubmit = async () => {
    if (!selectedJobTitle) {
      Alert.alert("Please select a job title");
      return;
    }

    try {
      const token = await getToken();

      const response = await api.patch(
        "/onboarding/jobTitle/recruiter",
        { jobTitle: selectedJobTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/skills");
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Failed to save job title. Try again.");
    }
  };
  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4 mt-14">
          <Text className="text-3xl font-poppins-600">
            What role are you hiring for?
          </Text>
          <Text className="text-base text-gray-600 font-poppins-500">
            Select one job title from the list below.
          </Text>

          <View className="mb-5 ">
            {JOB_TITLES.map((title) => (
              <Chip
                key={title}
                onPress={() => toggleSelect(title)}
                style={{
                  margin: 4,
                  paddingHorizontal: 4,
                  paddingVertical: 6,
                  backgroundColor:
                    selectedJobTitle === title ? "#000" : "#F6F6F6",

                  borderWidth: 1,
                  borderColor: "#ccc",
                }}
                textStyle={{
                  color: selectedJobTitle === title ? "#fff" : "#000",
                  fontFamily: "Poppins_500Medium",
                }}
              >
                {title}
              </Chip>
            ))}
          </View>
        </View>
      </ScrollView>

      <Button
        title="Next"
        className="mb-10 rounded-full"
        textClassName="text-center"
        disabled={!selectedJobTitle}
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default JobTitle;
