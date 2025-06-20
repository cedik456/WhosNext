import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../../utils/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../utils/axiosInstance";

const Name = () => {
  const router = useRouter();
  const [name, setName] = useState("");

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

      const response = await api.patch(
        "/onboarding/name",
        { name },
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
        Alert.alert("Error saving name", "Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View className="justify-between flex-1 mt-14">
        <View className="gap-4">
          <Text className="text-3xl font-poppins-600">Whats your alias?</Text>
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
          className={` rounded-full ${
            name.trim() ? "bg-black" : "bg-gray-300"
          }`}
        >
          <Text
            className={`p-5 text-center font-poppins-600 ${
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
