import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import ProfileField from "../../../components/ProfileField";
import { useEffect, useState } from "react";
import api from "../../../utils/axiosInstance";
import { getToken } from "../../../utils/storage";

const EditProfile = () => {
  const { colorScheme } = useColorScheme();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
      } catch (error) {
        Alert.alert("Error!", "Failed to load profile");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="items-center justify-center flex-1">
        <Text className="text-lg text-gray-500 font-poppins">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 ${colorScheme === "dark" ? " bg-black" : ""}`}
    >
      <View
        className={`${
          colorScheme === "dark" ? "bg-black" : ""
        } text-2xl  font-poppins-600 `}
      >
        <View className="flex-row items-center justify-between px-6 mt-5 ">
          <Pressable onPress={() => router.back()}>
            <FontAwesome6
              name="chevron-left"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>

          <Text
            className={`${
              colorScheme === "dark" ? "text-white" : "text-black"
            } text-2xl  font-poppins-600 `}
          >
            Edit Profile
          </Text>

          <Pressable>
            <Text className="text-sm text-blue-600 font-poppins-500">Save</Text>
          </Pressable>
        </View>

        <ScrollView>
          <ProfileField
            label="Name"
            value={user?.name || user?.companyName || "N/A"}
            onPress={() => {}}
          />
          <ProfileField
            label="Email"
            value={user?.email || "N/A"}
            onPress={() => {}}
          />

          <ProfileField
            label="Location"
            value={user?.location || user?.hiringLocation || "N/A"}
            onPress={() => {}}
          />
          <ProfileField
            label="Work Type"
            value={user?.workType || "N/A"}
            onPress={() => {}}
          />
          <ProfileField
            label="Work Environment"
            value={user?.workEnvironment || "N/A"}
            onPress={() => {}}
          />
          <ProfileField
            label="Experience"
            value={user?.experience || "N/A"}
            onPress={() => {}}
          />

          <View className="px-6 py-6">
            <Text className="mb-2 text-base font-poppins-500 dark:text-white">
              Skills
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {(user?.skills || user?.hiringCriteria?.requiredSkills || [])
                .length > 0 ? (
                (user?.skills || user?.hiringCriteria?.requiredSkills).map(
                  (skill, index) => (
                    <View
                      key={index}
                      className="px-3 py-1 bg-gray-200 rounded-full"
                    >
                      <Text className="text-sm text-gray-600 font-poppins">
                        {skill}
                      </Text>
                    </View>
                  )
                )
              ) : (
                <Text className="text-gray-500 font-poppins-400">N/A</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
