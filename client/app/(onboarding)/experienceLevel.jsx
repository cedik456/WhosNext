import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserRole } from "../../utils/secureUser";
import Button from "../../components/Button";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import { EXPERIENCE_LEVELS } from "../../constants/experienceLevel";

const ExperienceLevel = () => {
  const router = useRouter();
  const [experience, setExperience] = useState(null);
  const [role, setRole] = useState(null);

  const isValid = !!experience;

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getUserRole();
      setRole(userRole);
    };

    fetchRole();
  }, []);

  const handleSubmit = async () => {
    if (!experience) {
      Alert.alert("Select Option", "Please select your experience level");
      return;
    }

    try {
      const token = await getToken();

      const endpoint =
        role === "recruiter"
          ? "/onboarding/experience/recruiter"
          : "/onboarding/experience/jobSeeker";

      const response = await api.patch(
        endpoint,
        { experience },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        if (role === "recruiter") {
          router.replace("/recruiter/hiringLocation");
        } else {
          router.replace("/jobSeeker/location");
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save experience level.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-1 mt-2 bg-gray-200 rounded-full">
        {role === "recruiter" ? (
          <View
            className="h-1 bg-black rounded-r-full "
            style={{ width: `${(8 / 9) * 100}%` }}
          />
        ) : (
          <View
            className="h-1 bg-black rounded-r-full "
            style={{ width: `${(6 / 7) * 100}%` }}
          />
        )}
      </View>
      <View className="justify-between flex-1 gap-6 px-6 mt-14">
        <View>
          <Text className="mb-3 text-3xl font-poppins-600">
            {role === "recruiter"
              ? "What experience level \nare you hiring for?"
              : "What is your \nexperience level?"}
          </Text>
          <Text className="mb-4 text-base text-gray-600 font-poppins">
            {role === "recruiter"
              ? "Select the experience level you're looking for in a candidate."
              : "Select your current experience level."}
          </Text>

          <View className="flex-col gap-2 mb-4">
            {EXPERIENCE_LEVELS.map((level) => (
              <Pressable
                key={level}
                onPress={() => setExperience(level)}
                className={`px-4 py-4 rounded-xl ${
                  experience === level ? "bg-black" : "bg-[#f6f6f6]"
                }`}
              >
                <Text
                  className={`font-poppins-500 ${
                    experience === level ? "text-white" : "text-black"
                  }`}
                >
                  {level}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text className="mb-10 text-sm text-gray-400 font-poppins">
            This is how it'll appear in your profile
          </Text>
        </View>

        <Button
          title="Next"
          className="mb-10 rounded-full"
          textClassName="text-center"
          disabled={!isValid}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExperienceLevel;
