import { Alert, Pressable, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../../utils/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../utils/axiosInstance";
import { getUserRole } from "../../utils/secureUser";
import Button from "../../components/Button";

const Name = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("jobSeeker");

  const handleSubmitName = async () => {
    const trimmedName = name.trim();

    if (trimmedName.length < 3) {
      Alert.alert("Error", "Name must be at least 3 characters long");
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
        { name: trimmedName },
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
              ? "What’s your company name?"
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
        <Button
          title="Next"
          onPress={handleSubmitName}
          disabled={name.trim().length < 3}
        />
      </View>
    </SafeAreaView>
  );
};

export default Name;
