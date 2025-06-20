import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveUserRole } from "../../utils/secureUser";

const Role = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelectRole = async (role) => {
    setSelectedRole(role);
  };

  const handleSubmitRole = async () => {
    try {
      if (!selectedRole) {
        Alert.alert("Error", "Please select a role before proceeding.");
        return;
      }
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
          <Text className="text-3xl font-poppins-600">I am a</Text>

          <Pressable
            onPress={() => handleSelectRole("jobSeeker")}
            className={`p-5 border rounded-md ${
              selectedRole === "jobSeeker" ? "border-black" : "border-gray-300"
            }`}
          >
            <Text className="text-gray-500 ">Job Seeker</Text>
          </Pressable>

          <Pressable
            onPress={() => handleSelectRole("recruiter")}
            className={`p-5 border rounded-md ${
              selectedRole === "recruiter" ? "border-black" : "border-gray-300"
            }`}
          >
            <Text className="text-gray-500 ">Recruiter</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleSubmitRole}
          className={` rounded-full ${
            selectedRole ? "bg-black" : "bg-gray-300"
          }`}
        >
          <Text
            className={`p-5 text-center font-poppins-600 ${
              selectedRole ? "text-white" : "text-gray-400"
            }`}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Role;
