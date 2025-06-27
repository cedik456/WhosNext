import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import Button from "../../components/Button";

const Complete = () => {
  const router = useRouter();

  const handleFinish = async () => {
    try {
      const token = await getToken();

      const response = await api.patch(
        "/onboarding/complete",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/home");
      } else {
        Alert.alert("Error", "Could not complete onboarding.");
      }
    } catch (error) {
      console.error("Complete error:", error);
      Alert.alert("Something went wrong.");
    }
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1 px-6 bg-white ">
      <Text className="mb-4 text-3xl text-center font-poppins-600">
        You're all set!
      </Text>

      <Text className="mb-2 text-gray-500 font-poppins-500">
        We’ll match you with the right candidates nearby.
      </Text>

      <Text className="mb-5 text-sm text-gray-400 font-poppins-500">
        You can update your profile anytime from the Settings.
      </Text>

      <View className="w-full">
        <Button title="Explore now" onPress={handleFinish} />
      </View>
    </SafeAreaView>
  );
};

export default Complete;

const styles = StyleSheet.create({});
