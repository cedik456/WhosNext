import { Alert, Pressable, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../../utils/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../utils/axiosInstance";
import { getUserRole } from "../../utils/secureUser";

const Name = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("jobSeeker");

  const handleSubmitName = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a name before proceeding.");
      return;
    }

    try {
      const token = await getToken();

      if (!token) {
        Alert.alert("Error", "Token not found. Please login again.");
        return;
      }

      const endpoint =
        role === "recruiter"
          ? "/onboarding/name/recruiter"
          : "/onboarding/name/jobSeeker";

      const response = await api.patch(
        endpoint,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        if (role === "recruiter") {
          router.replace("/complete");
        } else {
          router.replace("/jobSeeker/work");
        }
      } else {
        Alert.alert("Error saving name", "Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole();
      if (!role) {
        router.replace("/role");
      } else {
        setRole(role);
      }
    };
    fetchRole();
  }, []);
  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View className="justify-between flex-1 mt-14">
        <View className="gap-4">
          <Text className="text-3xl font-poppins-600">
            {role === "recruiter"
              ? "What’s your company or name?"
              : "What’s your name or alias?"}
          </Text>
          <TextInput
            className="p-5 bg-[#F6F6F6] font-poppins-500"
            placeholder="Enter your first name or alias"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>
        <Pressable
          onPress={handleSubmitName}
          className={`p-5 rounded-full ${
            name.trim() ? "bg-black" : "bg-gray-300"
          }`}
        >
          <Text
            className={`text-center font-poppins-600 ${
              name.trim() ? "text-white" : "text-gray-400"
            }`}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Name;
