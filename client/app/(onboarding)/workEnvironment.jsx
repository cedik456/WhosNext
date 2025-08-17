import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import Button from "../../components/Button";
import { getUserRole } from "../../utils/secureUser";
import { AntDesign } from "@expo/vector-icons";

const WorkEnvironment = () => {
  const router = useRouter();
  const [workEnvironment, setWorkEnvironment] = useState(null);
  const [role, setRole] = useState(null);

  const environments = ["On-site", "Remote", "Hybrid"];
  const isValid = !!workEnvironment;

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getUserRole();
      setRole(userRole);
    };
    fetchRole();
  }, []);

  const handleSubmit = async () => {
    if (!workEnvironment) {
      Alert.alert("Select Work Setup", "Please select a work environment");
      return;
    }

    try {
      const token = await getToken();

      const endpoint =
        role === "recruiter"
          ? "/onboarding/workEnvironment/recruiter"
          : "/onboarding/workEnvironment/jobSeeker";

      const response = await api.patch(
        endpoint,
        { workEnvironment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/experienceLevel");
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
      <View className="flex-row items-center justify-between p-5">
        <TouchableOpacity onPress={() => router.replace("/workType")}>
          <AntDesign name="left" size={24} color="gray" />
        </TouchableOpacity>

        <Text className="text-xs text-gray-500 font-poppins-500">
          {" "}
          {role === "recruiter" ? "6 of 10" : "6 of 8"}
        </Text>
      </View>

      <View className="justify-between flex-1 gap-6 px-6">
        <View>
          <Text className="mb-3 text-3xl font-poppins-600">
            {role === "recruiter"
              ? "What work setup are \nyou offering?"
              : "What’s your preferred \nwork environment?"}
          </Text>
          <Text className="mb-4 text-base text-gray-600 font-poppins">
            {role === "recruiter"
              ? "Choose the environment this job will follow"
              : "Choose your preferred work setup"}
          </Text>

          <Text className="mb-5 text-sm font-poppins-500">
            {role === "recruiter"
              ? "Let candidates know if the job is remote, on-site or hybrid"
              : "Select where you'd be most comfortable \nworking from."}
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
