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

// 🔹 import modals
import PreferredSkillsModal from "../../../modals/PreferredSkillsModal";
import PreferredLocationModal from "../../../modals/PreferredLocationModal";
import ExperienceLevelModal from "../../../modals/ExperienceLevelModal";
import WorkTypeModal from "../../../modals/WorkTypeModal";
import WorkEnvironmentModal from "../../../modals/WorkEnvironmentModal";
import IndustryModal from "../../../modals/IndustryModal";

const EditProfile = () => {
  const { colorScheme } = useColorScheme();

  const [user, setUser] = useState(null);
  const [changes, setChanges] = useState({});
  const [loading, setLoading] = useState(true);

  // modal states
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isWorkTypeModalOpen, setIsWorkTypeModalOpen] = useState(false);
  const [isWorkEnvModalOpen, setIsWorkEnvModalOpen] = useState(false);
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);

  const handleSave = async () => {
    if (Object.keys(changes).length === 0) {
      Alert.alert("Nothing to update", "You haven't made any changes");
      return;
    }

    try {
      const token = await getToken();

      const response = await api.patch("/profile/jobseeker", changes, {
        headers: { Authorization: `Bearer ${token}` },
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
          headers: { Authorization: `Bearer ${token}` },
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
      className={`flex-1 ${colorScheme === "dark" ? "bg-black" : ""}`}
    >
      <View className="flex-1">
        {/* Header */}
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

        {/* Content */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView className="h-[85%]">
              {/* Name */}
              <View className="px-6 py-2 mt-5 border-b border-gray-200 dark:border-b-gray-500">
                <Text className="mb-2 text-base text-gray-600 font-poppins-500 dark:text-white">
                  Name
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

              <View className="flex-row items-center justify-between px-6 py-2 mt-5 border-b border-gray-200 dark:border-b-gray-500">
                <View className="w-full gap-2">
                  <Text className="text-base text-black font-poppins-500 dark:text-white">
                    Bio
                  </Text>
                  <TextInput
                    className="text-gray-400 font-poppins"
                    style={{ borderWidth: 0 }}
                    placeholderTextColor={
                      colorScheme === "dark" ? "#9CA3AF" : "#9CA3AF"
                    }
                    value={changes.bio ?? user?.bio ?? ""}
                    placeholder="Add a bio"
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => {
                      setChanges((prev) => ({ ...prev, bio: text }));
                      setUser((prev) => ({ ...prev, bio: text }));
                    }}
                  />
                </View>
              </View>

              {/* Email (read-only) */}
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

              {/* Location */}
              <ProfileField
                label="Location"
                value={user?.location || "N/A"}
                onPress={() => setIsLocationModalOpen(true)}
              />

              {/* Industry */}
              <ProfileField
                label="Industry"
                value={user?.industry || "N/A"}
                onPress={() => setIsIndustryModalOpen(true)}
              />

              {/* Experience Level */}
              <ProfileField
                label="Experience Level"
                value={user?.experience || "N/A"}
                onPress={() => setIsExperienceModalOpen(true)}
              />

              {/* Skills */}
              <ProfileField
                label="Skills"
                value={
                  (user?.skills || []).length > 0
                    ? user.skills.join(", ")
                    : "N/A"
                }
                onPress={() => setIsSkillsModalOpen(true)}
              />

              {/* Work Type */}
              <ProfileField
                label="Work Type"
                value={user?.workType || "N/A"}
                onPress={() => setIsWorkTypeModalOpen(true)}
              />

              {/* Work Environment */}
              <ProfileField
                label="Work Environment"
                value={user?.workEnvironment || "N/A"}
                onPress={() => setIsWorkEnvModalOpen(true)}
              />
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>

      {/* 🔹 Modals */}
      <PreferredLocationModal
        isVisible={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={(selected) => {
          setChanges((prev) => ({ ...prev, location: selected }));
          setUser((prev) => ({ ...prev, location: selected }));
        }}
        selected={user?.location}
      />

      <ExperienceLevelModal
        isVisible={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)}
        onSelect={(level) => {
          setChanges((prev) => ({ ...prev, experience: level }));
          setUser((prev) => ({ ...prev, experience: level }));
        }}
        selected={user?.experience}
      />

      <PreferredSkillsModal
        isVisible={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        selected={user?.skills || []}
        onUpdate={(newSkills) => {
          setChanges((prev) => ({ ...prev, skills: newSkills }));
          setUser((prev) => ({ ...prev, skills: newSkills }));
        }}
        industry={user?.industry || "General"}
      />

      <WorkTypeModal
        isVisible={isWorkTypeModalOpen}
        onClose={() => setIsWorkTypeModalOpen(false)}
        onSelect={(selected) => {
          setChanges((prev) => ({ ...prev, workType: selected }));
          setUser((prev) => ({ ...prev, workType: selected }));
        }}
        selected={user?.workType}
      />

      <WorkEnvironmentModal
        isVisible={isWorkEnvModalOpen}
        onClose={() => setIsWorkEnvModalOpen(false)}
        onSelect={(selected) => {
          setChanges((prev) => ({ ...prev, workEnvironment: selected }));
          setUser((prev) => ({ ...prev, workEnvironment: selected }));
        }}
        selected={user?.workEnvironment}
      />

      <IndustryModal
        isVisible={isIndustryModalOpen}
        onClose={() => setIsIndustryModalOpen(false)}
        onSelect={(selected) => {
          Alert.alert(
            "Change Industry",
            "Changing your industry will reset your selected skills. Continue?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Yes",
                onPress: () => {
                  setChanges((prev) => ({
                    ...prev,
                    industry: selected,
                    skills: [], // reset skills
                  }));
                  setUser((prev) => ({
                    ...prev,
                    industry: selected,
                    skills: [],
                  }));
                },
              },
            ]
          );
        }}
        selected={user?.industry}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
