import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";

const WorkEnvironment = () => {
  const router = useRouter();

  const [workEnvironment, setWorkEnvironment] = useState(null);

  const environments = ["On-site", "Remote", "Hybrid"];

  const isValid = !!workEnvironment;

  const handleSubmit = async () => {
    if (!workEnvironment) {
      Alert.alert("Select Work Setup", "Please select a work environment");
      return;
    }

    try {
      const token = await getToken();

      const response = await api.patch(
        "/onboarding/workEnvironment/jobSeeker",
        { workEnvironment },
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
        console.error(error);
        Alert.alert("Error", "Failed to save work environment.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save work environment.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-1 mt-2 bg-gray-200 rounded-full">
        <View
          className="h-1 bg-black rounded-r-full "
          style={{ width: `${(4 / 6) * 100}%` }}
        />
      </View>
      <View className="justify-between flex-1 gap-6 px-6 mt-14">
        <View>
          <Text className="mb-3 text-3xl font-poppins-600">
            What’s your preferred work environment?
          </Text>
          <Text className="mb-4 text-base text-gray-600 font-poppins">
            Choose your preferred work setup
          </Text>

          <Text className="mb-5 text-lg font-poppins-600">
            Select where you'd be most comfortable {"\n"}working from.
          </Text>
          <View className="flex-col gap-3 mb-4">
            {environments.map((env) => (
              <Pressable
                key={env}
                onPress={() => setWorkEnvironment(env)}
                className={`px-4 py-4 rounded-xl  ${
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

export default WorkEnvironment;
