import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../utils/axiosInstance";
import { getToken } from "../../utils/storage";
import { getUserRole } from "../../utils/secureUser";
import Button from "../../components/Button";

const WorkType = () => {
  const router = useRouter();
  const [workType, setWorkType] = useState(null);
  const [role, setRole] = useState(null);

  const types = ["Full-time", "Part-time", "Internship"];
  const isValid = !!workType;

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getUserRole();
      setRole(userRole);
    };

    fetchRole();
  }, []);

  const handleSubmit = async () => {
    if (!workType) {
      Alert.alert("Select Options", "Please select your preferred job type");
      return;
    }

    try {
      const token = await getToken();

      const endpoint =
        role === "recruiter"
          ? "/onboarding/workType/recruiter"
          : "/onboarding/workType/jobSeeker";

      const response = await api.patch(
        endpoint,
        { workType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/workEnvironment");
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
        {role === "recruiter" ? (
          <View
            className="h-1 bg-black rounded-r-full "
            style={{ width: `${(6 / 9) * 100}%` }}
          />
        ) : (
          <View
            className="h-1 bg-black rounded-r-full "
            style={{ width: `${(4 / 7) * 100}%` }}
          />
        )}
      </View>
      <View className="justify-between flex-1 gap-6 px-6 mt-14">
        <View>
          <Text className="mb-3 text-3xl font-poppins-600">
            {role === "recruiter"
              ? "What type of job are \nyou offering?"
              : "What type of job are you looking for?"}
          </Text>
          <Text className="mb-4 text-base text-gray-600 font-poppins">
            {role === "recruiter"
              ? "Select the type of work arrangement you're offering"
              : "Select your preferred work arrangement"}
          </Text>

          <Text className="mb-5 text-lg font-poppins-600">
            {role === "recruiter"
              ? "Choose how this job will be structured"
              : "Choose how you'd like to be employed"}
          </Text>
          <View className="flex-col gap-3 mb-4">
            {types.map((type) => (
              <Pressable
                key={type}
                onPress={() => setWorkType(type)}
                className={`px-4 py-4 rounded-xl  ${
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

export default WorkType;
