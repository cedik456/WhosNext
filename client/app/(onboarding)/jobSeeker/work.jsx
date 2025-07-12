import { Alert, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";

const Work = () => {
  const router = useRouter();

  const [workEnvironment, setWorkEnvironment] = useState(null);
  const [workType, setWorkType] = useState(null);

  const environments = ["On-site", "Remote", "Hybrid"];
  const types = ["Full-time", "Part-time", "Internship"];

  const isValid = workEnvironment && workType;

  const handleSubmit = async () => {
    if (!workEnvironment || !workType) {
      Alert.alert("Select Options", "Please select both fields");
      return;
    }

    try {
      const token = await getToken();

      const response = await api.patch(
        "/onboarding/workPreferences/jobSeeker",
        { workEnvironment, workType },
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
        Alert.alert("Error", response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save preferences.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-1 mt-2 bg-gray-200 rounded-full">
        <View
          className="h-1 bg-black rounded-r-full "
          style={{ width: `${(3 / 5) * 100}%` }}
        />
      </View>
      <View className="justify-between flex-1 gap-6 px-6 mt-14">
        <View>
          <Text className="mb-3 text-3xl font-poppins-600">
            Let's talk about what{"\n"}you want, User.
          </Text>
          <Text className="text-base text-gray-600 font-poppins">
            Select your preferred work setup and job type
          </Text>

          <View className="border-b-[#ccc] border-b my-4" />

          <Text className="mb-5 text-lg font-poppins-600">
            What type of job do you want?
          </Text>
          <View className="flex-row flex-wrap gap-3 mb-4">
            {types.map((type) => (
              <Pressable
                key={type}
                onPress={() => setWorkType(type)}
                className={`px-4 py-2 rounded-full  ${
                  workType === type ? "bg-black" : "bg-[#f6f6f6]"
                }`}
              >
                <Text
                  className={`font-poppins-500  ${
                    workType === type ? "text-white" : "text-black"
                  } `}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="border-b-[#ccc] border-b my-4" />

          <Text className="mb-5 text-lg font-poppins-600">
            What type of environment?
          </Text>
          <View className="flex-row flex-wrap gap-3 mb-4">
            {environments.map((env) => (
              <Pressable
                key={env}
                onPress={() => setWorkEnvironment(env)}
                className={`px-4 py-2 rounded-full  ${
                  workEnvironment === env ? "bg-black" : "bg-[#f6f6f6]"
                }`}
              >
                <Text
                  className={`font-poppins-500  ${
                    workEnvironment === env ? "text-white" : "text-black"
                  } `}
                >
                  {env}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="border-b-[#ccc] border-b my-4" />

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

export default Work;
