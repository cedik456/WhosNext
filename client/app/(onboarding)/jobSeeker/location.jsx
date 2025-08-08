import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getReadableLocation } from "../../../utils/locationHelper";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";
import Button from "../../../components/Button";

const Location = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLocationSubmit = async () => {
    setLoading(true);

    try {
      const location = await getReadableLocation();
      if (!location) return setLoading(false);

      const token = await getToken();

      const response = await api.patch(
        "/onboarding/location/jobSeeker",
        { location },
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
        Alert.alert("Error", "Failed to save location");
      }
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Something went wrong.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-1 mt-2 bg-gray-200 rounded-full">
        <View
          className="h-1 bg-black rounded-r-full "
          style={{ width: `${(7 / 7) * 100}%` }}
        />
      </View>
      <View className="justify-between flex-1 px-6 mt-14">
        <View className="items-center mt-20 ">
          <Text className="mb-4 text-3xl text-center font-poppins-600">
            Enable Location
          </Text>
          <Text className="mb-4 text-center text-gray-500 font-poppins-500">
            We'll use your location to recommend nearby jobs
          </Text>

          <Image
            source={require("../../../assets/locationAvatar.png")}
            className="w-auto h-auto"
          />
        </View>

        <Button
          title="Allow Location"
          className="mb-10 rounded-full"
          textClassName="text-center"
          onPress={handleLocationSubmit}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default Location;
