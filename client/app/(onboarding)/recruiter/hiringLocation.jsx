import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";

const HiringLocation = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    if (!location.trim()) {
      Alert.alert("Location required", "Please enter a valid location.");
      return;
    }

    try {
      const token = await getToken();

      const response = await api.patch(
        "/onboarding/hiringLocation/recruiter",
        { location: location.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/complete");
      } else {
        Alert.alert("Recruiter location error:", error);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View className="justify-between flex-1 mt-14">
        <View className="gap-3">
          <Text className="text-3xl font-poppins-600">
            Where are you hiring?
          </Text>
          <Text className="text-base text-gray-600 font-poppins-500">
            Enter the city, region, or area you're looking{"\n"}to hire in.
          </Text>
          <TextInput
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
            className="py-4 bg-white border-b-2 border-gray-300 font-poppins"
          />
          <Text className="text-sm text-blue-700 font-poppins">
            Learn about our privacy and policy
          </Text>
        </View>
        <Button
          title="Next"
          className="mb-10 rounded-full"
          textClassName="text-center"
          onPress={handleSubmit}
          disabled={location.trim() === ""}
        />
      </View>
    </SafeAreaView>
  );
};

export default HiringLocation;
