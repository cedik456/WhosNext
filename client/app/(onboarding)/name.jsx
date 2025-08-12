import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../../utils/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../utils/axiosInstance";
import { getUserRole } from "../../utils/secureUser";
import Button from "../../components/Button";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Name = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("jobSeeker");

  const handleSubmitName = async () => {
    const trimmedName = name.trim();

    if (trimmedName.length < 3) {
      Alert.alert("Error", "Name must be at least 3 characters long");
      return;
    }

    try {
      const token = await getToken();

      if (!token) {
        Alert.alert("Error", "Token not found. Please login again.");
        return;
      }

      const endpoint =
        role === "recruiter"
          ? "/onboarding/name/recruiter"
          : "/onboarding/name/jobSeeker";

      const response = await api.patch(
        endpoint,
        { name: trimmedName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        if (role === "recruiter") {
          router.replace("/recruiter/companyPicture");
        } else {
          router.replace("/skills");
        }
      } else {
        Alert.alert("Error saving name", "Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole();
      if (!role) {
        router.replace("/role");
      } else {
        setRole(role);
      }
    };
    fetchRole();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-1 mt-2 bg-gray-200 rounded-full">
        <View
          className="h-1 bg-black rounded-r-full "
          style={{ width: `${(2 / 9) * 100}%` }}
        />
      </View>

      <View className="flex-row items-center justify-between p-5">
        <TouchableOpacity onPress={() => router.replace("/role")}>
          <AntDesign name="left" size={24} color="gray" />
        </TouchableOpacity>

        <Text className="text-xs text-gray-500 font-poppins-500">2 of 7</Text>
      </View>

      <View className="justify-between flex-1 px-6 ">
        <View className="gap-4">
          <Text className="text-3xl font-poppins-600">
            {role === "recruiter"
              ? "What’s your\ncompany name?"
              : "What’s your\nfirst name?"}
          </Text>
          <TextInput
            className="py-4 border-b-2 border-gray-300 font-poppins-500"
            placeholder={
              role === "recruiter" ? "eg: Who's Next" : "eg: Charles"
            }
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <Text className="text-gray-400 font-poppins">
            This is how it will appear on your profile
          </Text>
          <Text className="font-semibold text-black font-poppins-500">
            It cannot be changed later.
          </Text>
        </View>
        <Button
          title="Next"
          className="mb-10 rounded-full"
          textClassName="text-center"
          onPress={handleSubmitName}
          disabled={name.trim().length < 3}
        />
      </View>
    </SafeAreaView>
  );
};

export default Name;
