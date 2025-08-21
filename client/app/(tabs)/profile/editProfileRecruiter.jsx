import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import ProfileField from "../../../components/ProfileField";

const EditProfileRecruiter = () => {
  const { colorScheme } = useColorScheme();

  const [user, setUser] = useState(null);
  const [changes, setChanges] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSave = async () => {
    if (Object.keys(changes).length === 0) {
      Alert.alert("Nothing to update", "You haven't made any changes");
      return;
    }

    try {
      const token = await getToken();

      const response = await api.patch("/profile/", changes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert("Success", "Profile updated successfully");
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

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
      <SafeAreaView className="items-center justify-center flex-1 ">
        <Text className="text-lg text-gray-500 font-poppins">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 ${colorScheme === "dark" ? "bg-black" : ""}`}
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
          } text-2xl font-poppins-600`}
        >
          Edit Profile
        </Text>

        <Pressable onPress={handleSave}>
          <Text className="text-sm text-blue-600 font-poppins-500">Save</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView className="h-[85%]" showsVerticalScrollIndicator={false}>
            {/* Job Description */}

            <View className="flex-row items-center justify-between px-6 py-2 mt-5 border-b border-gray-200 dark:border-b-gray-500">
              <View className="flex-1 gap-2">
                <Text className="text-base text-black font-poppins-500 dark:text-white">
                  Add Job Description
                </Text>
                <TextInput
                  className="text-gray-600 font-poppins"
                  style={{ borderWidth: 0 }}
                  placeholderTextColor={
                    colorScheme === "dark" ? "#9CA3AF" : "#9CA3AF"
                  }
                  value={changes.jobDescription ?? user?.jobDescription ?? ""}
                  placeholder="Add a job description"
                  multiline
                  numberOfLines={10}
                  onChangeText={(text) => {
                    setChanges((prev) => ({ ...prev, jobDescription: text }));
                  }}
                />
              </View>
            </View>

            {/* Email */}
            <View className="flex-row items-center justify-between px-6 py-2 mt-5 border-b border-gray-200 dark:border-b-gray-500">
              <View className="gap-2">
                <Text className="text-base text-black font-poppins-500 dark:text-white">
                  Email
                </Text>
                <Text
                  className="text-gray-400 font-poppins max-w-80"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {user?.email}
                </Text>
              </View>
            </View>

            {/* Company Name */}
            <View className="px-6 py-2 mt-5 border-b border-gray-200 dark:border-b-gray-500">
              <Text className="mb-2 text-base text-gray-600 font-poppins-500 dark:text-white">
                Company Name
              </Text>
              <TextInput
                className="text-base font-poppins dark:text-white"
                value={changes.companyName ?? user?.companyName ?? ""}
                style={{ borderWidth: 0 }}
                onChangeText={(text) => {
                  setChanges((prev) => ({ ...prev, companyName: text }));
                  setUser((prev) => ({ ...prev, companyName: text }));
                }}
                placeholder="Enter company name"
              />
            </View>

            {/* Location, WorkType, WorkEnv, Experience */}
            <ProfileField
              label="Location"
              value={user?.location || user?.hiringCriteria?.location || "N/A"}
            />
            <ProfileField
              label="Work Type"
              value={user?.workType || user?.hiringCriteria?.workType || "N/A"}
            />
            <ProfileField
              label="Work Environment"
              value={
                user?.workEnvironment ||
                user?.hiringCriteria?.workEnvironment ||
                "N/A"
              }
            />
            <ProfileField
              label="Experience"
              value={
                user?.experience ||
                user?.hiringCriteria?.experienceLevel ||
                "N/A"
              }
            />
            <ProfileField label="Industry" value={user?.industry} />

            {/* Skills */}
            <View className="px-6 py-5">
              <Text className="mb-2 text-base font-poppins-500 dark:text-white">
                Skill Preferences
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileRecruiter;
