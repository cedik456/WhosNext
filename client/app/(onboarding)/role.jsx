import { Alert, Pressable, Text, View, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveUserRole } from "../../utils/secureUser";
import Button from "../../components/Button";
import Onboarding1 from "../../assets/Onboarding.png";

const Role = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelectRole = async (role) => {
    setSelectedRole(role);
  };

  const handleSubmitRole = async () => {
    if (!selectedRole) {
      Alert.alert("Error", "Please select a role before proceeding.");
      return;
    }

    try {
      await saveUserRole(selectedRole);

      const token = await getToken();

      if (!token) {
        Alert.alert("Error", "Token not found. Please login again.");
        return;
      }

      const response = await api.patch(
        "/onboarding/role",
        { role: selectedRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/name");
      } else {
        Alert.alert("Error selecting role", " Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-1 mt-2 bg-gray-200 rounded-full">
        <View
          className="h-1 bg-black rounded-r-full "
          style={{ width: `${(1 / 4) * 100}%` }}
        />
      </View>
      {/* <Text className="mt-1 ml-2 text-sm text-gray-500">X</Text> */}

      <View className="justify-between flex-1 px-6 mt-14">
        <View>
          <View>
            <Text className="mb-2 text-5xl font-poppins-700">
              Welcome to {"\n"} Who's Next!
            </Text>
            <Text className="text-lg text-gray-500 font-poppins-600">
              {" "}
              Your one swipe away
            </Text>
            <Image
              source={Onboarding1}
              className="w-80 h-80"
              resizeMode="cover"
            />
          </View>

          <View className="gap-4">
            <Text className="text-lg text-gray-500 font-poppins-500">
              What is your role?
            </Text>

            <Pressable
              onPress={() => handleSelectRole("jobSeeker")}
              className={`rounded-lg border border-[#ccc] p-5 ${
                selectedRole === "jobSeeker" ? "bg-black" : "bg-white"
              }`}
            >
              <Text
                className={`font-poppins-500 ${
                  selectedRole === "jobSeeker" ? "text-white" : "text-gray-400"
                }`}
              >
                Job Seeker
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleSelectRole("recruiter")}
              className={`rounded-lg border border-[#ccc] p-5 ${
                selectedRole === "recruiter" ? "bg-black" : "bg-white"
              }`}
            >
              <Text
                className={`font-poppins-500 ${
                  selectedRole === "recruiter" ? "text-white" : "text-gray-400"
                }`}
              >
                Recruiter
              </Text>
            </Pressable>
          </View>
        </View>
        <Button
          title="Next"
          className="mb-10 rounded-full"
          textClassName="text-center"
          onPress={handleSubmitRole}
          disabled={!selectedRole}
        />
      </View>
    </SafeAreaView>
  );
};

export default Role;
