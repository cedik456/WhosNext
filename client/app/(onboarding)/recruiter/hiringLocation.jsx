import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/storage";

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
    } catch (error) {}
  };

  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View className="justify-between flex-1 mt-14">
        <View className="gap-4">
          <Text className="text-3xl font-poppins-600">
            Where are you hiring?
          </Text>
          <Text className="text-base text-gray-600 font-poppins-500">
            Enter the city, region, or area you're looking to hire in.
          </Text>
          <TextInput
            placeholder="e.g. Quezon City, Metro Manila"
            value={location}
            onChangeText={setLocation}
            className="py-3 text-black bg-white border-b border-gray-300 font-poppins-500"
            placeholderTextColor="#888"
          />
        </View>
        <Button
          title="Next"
          onPress={handleSubmit}
          disabled={location.trim() === ""}
        />
      </View>
    </SafeAreaView>
  );
};

export default HiringLocation;
