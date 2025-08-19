import { Text, View, ScrollView, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chip } from "react-native-paper";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";
import Button from "../../../components/Button";
import { AntDesign } from "@expo/vector-icons";
import { JOB_TITLES_BY_INDUSTRY } from "../../../constants/jobTitlesByIndustry";

const JobTitle = () => {
  const router = useRouter();

  const [industry, setIndustry] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [loading, setLoading] = useState(true);

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
        router.replace("/recruiter/companyPicture");
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Failed to save job title. Try again.");
    }
  };

  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        const token = await getToken();
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const saved = response.data?.data?.industry;

        if (!saved) {
          setLoading(false);
          router.replace("/industry");
          return;
        }
        setIndustry(saved);
      } catch (error) {
        Alert.alert("Error", "Couldn't load industry");
      } finally {
        setLoading(false);
      }
    };
    fetchIndustry();
  }, []);

  const titleOptions = industry ? JOB_TITLES_BY_INDUSTRY[industry] || [] : [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-5">
        <TouchableOpacity onPress={() => router.replace("/experienceLevel")}>
          <AntDesign name="left" size={24} color="gray" />
        </TouchableOpacity>

        <Text className="text-xs text-gray-500 font-poppins-500">8 of 10</Text>
      </View>

      <View className="justify-between flex-1 px-6 ">
        <View>
          <Text className="mb-2 text-3xl font-poppins-600">
            What type of job{"\n"}are you hiring for?
          </Text>
          <Text className="mb-2 text-base text-gray-600 font-poppins-500">
            Select one job title from the list below.
          </Text>
          <Text className="mb-4 text-sm text-blue-600 font-poppins-500">
            You can edit this in the profile settings later.
          </Text>
          <ScrollView showsVerticalScrollIndicator={false} className="h-[70%]">
            <View className="mb-5 ">
              {titleOptions.map((title) => (
                <Chip
                  key={title}
                  onPress={() => toggleSelect(title)}
                  style={{
                    margin: 4,
                    paddingHorizontal: 4,
                    paddingVertical: 8,
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
          </ScrollView>
        </View>

        <Button
          title="Next"
          className="mb-10 rounded-full"
          textClassName="text-center"
          disabled={!selectedJobTitle}
          onPress={handleSubmit}
        />
      </View>

      {loading && (
        <View className="absolute inset-0 z-10 items-center justify-center">
          <Text className="text-gray-500 font-poppins-500">
            Loading job titles based on industry...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default JobTitle;
