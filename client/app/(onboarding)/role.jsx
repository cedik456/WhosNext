import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveUserRole } from "../../utils/secureUser";
import Button from "../../components/Button";

const Role = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelectRole = async (role) => {
    setSelectedRole(role);
  };

  const handleSubmitRole = async () => {
    if (!selectedRole) {
      Alert.alert("Error", "Please select a role before proceeding.");
      return;
    }

    try {
      await saveUserRole(selectedRole);

      const token = await getToken();

      if (!token) {
        Alert.alert("Error", "Token not found. Please login again.");
        return;
      }

      const response = await api.patch(
        "/onboarding/role",
        { role: selectedRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/name");
      } else {
        Alert.alert("Error selecting role", " Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View className="justify-between flex-1 mt-14">
        <View className="gap-4">
          <Text className="text-3xl font-poppins-600">What is your role?</Text>
          <Text className="mb-3 text-gray-600">
            Tell us what type of user you are and how you plan to use our
            application.
          </Text>

          <Pressable
            onPress={() => handleSelectRole("jobSeeker")}
            className={`rounded-lg border border-[#ccc] p-5 ${
              selectedRole === "jobSeeker" ? "bg-black" : "bg-white"
            }`}
          >
            <Text
              className={`font-poppins-500 ${
                selectedRole === "jobSeeker" ? "text-white" : "text-gray-400"
              }`}
            >
              Job Seeker
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleSelectRole("recruiter")}
            className={`rounded-lg border border-[#ccc] p-5 ${
              selectedRole === "recruiter" ? "bg-black" : "bg-white"
            }`}
          >
            <Text
              className={`font-poppins-500 ${
                selectedRole === "recruiter" ? "text-white" : "text-gray-400"
              }`}
            >
              Recruiter
            </Text>
          </Pressable>
        </View>
        <Button
          title="Next"
          className="mb-10 rounded-full"
          textClassName="text-center"
          onPress={handleSubmitRole}
          disabled={!selectedRole}
        />
      </View>
    </SafeAreaView>
  );
};

export default Role;
