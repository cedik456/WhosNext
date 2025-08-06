import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import ProfileField from "../../../components/ProfileField";
import { useEffect, useState } from "react";
import api from "../../../utils/axiosInstance";
import { getToken } from "../../../utils/storage";
import { useColorScheme } from "nativewind";
import PreferredSkillsModal from "../../../modals/PreferredSkillsModal";
import PreferredLocationModal from "../../../modals/PreferredLocationModal";
import ExperienceLevelModal from "../../../modals/ExperienceLevelModal";

const EditProfile = () => {
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
      setChanges({});
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
      <SafeAreaView className="items-center justify-center flex-1 dark:bg-black">
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
        } text-2xl  font-poppins-600 flex-1 `}
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

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <View className="px-6 py-3 mt-5 border-b border-gray-200 dark:border-b-gray-500">
                <Text className="mb-2 text-base text-gray-600 font-poppins-500 dark:text-white">
                  {user?.role === "recruiter" ? "Company name" : "Name"}
                </Text>
                <TextInput
                  className="text-base border border-gray-300 rounded-lg font-poppins dark:text-white"
                  value={changes.name ?? user?.name ?? ""}
                  style={{ borderWidth: 0 }}
                  onChangeText={(text) => {
                    setChanges((prev) => ({ ...prev, name: text }));
                    setUser((prev) => ({ ...prev, name: text }));
                  }}
                  placeholder="Enter your name"
                />
              </View>

              <View className="flex-row items-center justify-between px-6 py-3 mt-5 border-b border-gray-200 dark:border-b-gray-500">
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

              <ProfileField
                label="Location"
                value={
                  user?.location || user?.hiringCriteria?.location || "N/A"
                }
                onPress={() => {}}
              />
              <ProfileField
                label="Work Type"
                value={
                  user?.workType || user?.hiringCriteria?.workType || "N/A"
                }
                onPress={() => {}}
              />
              <ProfileField
                label="Work Environment"
                value={
                  user?.workEnvironment ||
                  user?.hiringCriteria?.workEnvironment ||
                  "N/A"
                }
                onPress={() => {}}
              />
              <ProfileField
                label="Experience"
                value={
                  user?.experience ||
                  user?.hiringCriteria?.experienceLevel ||
                  "N/A"
                }
                onPress={() => {}}
              />

              <View className="flex-row items-center justify-between px-6 py-3 mt-5 border-b border-gray-200 dark:border-b-gray-500">
                <View className="gap-2">
                  <Text className="text-base text-black font-poppins-500 dark:text-white">
                    {user?.role === "recruiter" ? "Job Description" : "Bio"}
                  </Text>
                  <TextInput
                    className="text-gray-600 font-poppins dark:text-white"
                    style={{ borderWidth: 0 }}
                    value={
                      changes.bio ??
                      (user?.role === "recruiter"
                        ? user?.jobDescription
                        : user?.bio) ??
                      ""
                    }
                    placeholder={
                      user?.role === "recruiter"
                        ? "Add a job description"
                        : "Add a bio"
                    }
                    onChangeText={(text) =>
                      setChanges((prev) => ({ ...prev, bio: text }))
                    }
                  />
                </View>
              </View>

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
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
