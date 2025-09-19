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
import PreferredJobTitleModal from "../../../modals/PreferredJobTitleModal";
import SalaryModal from "../../../modals/SalaryModal";

const EditProfileRecruiter = () => {
  const { colorScheme } = useColorScheme();

  const [user, setUser] = useState(null);
  const [changes, setChanges] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔹 modal states
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isWorkTypeModalOpen, setIsWorkTypeModalOpen] = useState(false);
  const [isWorkEnvModalOpen, setIsWorkEnvModalOpen] = useState(false);
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);
  const [isJobTitleModalOpen, setIsJobTitleModalOpen] = useState(false);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);

  const handleSave = async () => {
    if (Object.keys(changes).length === 0) {
      Alert.alert("Nothing to update", "You haven't made any changes");
      return;
    }

    try {
      const token = await getToken();

      const response = await api.patch("/profile/recruiter", changes, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("Success", "Profile updated successfully");
      setUser(response.data.data);
      setChanges({});
    } catch (error) {
      console.error("❌ Update error:", error.response?.data || error.message);
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
        <View className="flex-row items-center justify-between px-6 mt-5">
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

              {/* Job Description */}
              <View className="flex-row items-center justify-between px-6 py-2 mt-5 border-b border-gray-200 dark:border-b-gray-500">
                <View className="flex-1 gap-2">
                  <Text className="text-base text-black font-poppins-500 dark:text-white">
                    Job Description
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
                    numberOfLines={6}
                    onChangeText={(text) => {
                      setChanges((prev) => ({ ...prev, jobDescription: text }));
                    }}
                  />
                </View>
              </View>

              <ProfileField
                label="Salary Range"
                value={
                  user?.hiringCriteria?.salaryRange
                    ? `₱${user.hiringCriteria.salaryRange.min?.toLocaleString()} - ₱${user.hiringCriteria.salaryRange.max?.toLocaleString()}`
                    : "N/A"
                }
                onPress={() => setIsSalaryModalOpen(true)}
              />

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

              {/* Fields with modals */}
              <ProfileField
                label="Location"
                value={user?.hiringCriteria?.location || "N/A"}
                onPress={() => setIsLocationModalOpen(true)}
              />
              <ProfileField
                label="Industry"
                value={user?.industry || "N/A"}
                onPress={() => setIsIndustryModalOpen(true)}
              />
              <ProfileField
                label="Job Title"
                value={user?.jobTitle || "N/A"}
                onPress={() => setIsJobTitleModalOpen(true)}
              />
              <ProfileField
                label="Experience Level"
                value={user?.hiringCriteria?.experienceLevel || "N/A"}
                onPress={() => setIsExperienceModalOpen(true)}
              />
              <ProfileField
                label="Skills"
                value={
                  (user?.hiringCriteria?.requiredSkills || []).length > 0
                    ? user.hiringCriteria.requiredSkills.join(", ")
                    : "N/A"
                }
                onPress={() => setIsSkillsModalOpen(true)}
              />
              <ProfileField
                label="Work Type"
                value={user?.hiringCriteria?.workType || "N/A"}
                onPress={() => setIsWorkTypeModalOpen(true)}
              />
              <ProfileField
                label="Work Environment"
                value={user?.hiringCriteria?.workEnvironment || "N/A"}
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
          setUser((prev) => ({
            ...prev,
            hiringCriteria: { ...prev.hiringCriteria, location: selected },
          }));
        }}
        selected={user?.hiringCriteria?.location}
      />

      <ExperienceLevelModal
        isVisible={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)}
        onSelect={(level) => {
          setChanges((prev) => ({ ...prev, experienceLevel: level }));
          setUser((prev) => ({
            ...prev,
            hiringCriteria: { ...prev.hiringCriteria, experienceLevel: level },
          }));
        }}
        selected={user?.hiringCriteria?.experienceLevel}
      />

      <PreferredSkillsModal
        isVisible={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        selected={user?.hiringCriteria?.requiredSkills || []}
        onUpdate={(newSkills) => {
          setChanges((prev) => ({ ...prev, requiredSkills: newSkills }));
          setUser((prev) => ({
            ...prev,
            hiringCriteria: {
              ...prev.hiringCriteria,
              requiredSkills: newSkills,
            },
          }));
        }}
        industry={user?.industry || "General"}
      />

      <WorkTypeModal
        isVisible={isWorkTypeModalOpen}
        onClose={() => setIsWorkTypeModalOpen(false)}
        onSelect={(selected) => {
          setChanges((prev) => ({ ...prev, workType: selected }));
          setUser((prev) => ({
            ...prev,
            hiringCriteria: { ...prev.hiringCriteria, workType: selected },
          }));
        }}
        selected={user?.hiringCriteria?.workType}
      />

      <WorkEnvironmentModal
        isVisible={isWorkEnvModalOpen}
        onClose={() => setIsWorkEnvModalOpen(false)}
        onSelect={(selected) => {
          setChanges((prev) => ({ ...prev, workEnvironment: selected }));
          setUser((prev) => ({
            ...prev,
            hiringCriteria: {
              ...prev.hiringCriteria,
              workEnvironment: selected,
            },
          }));
        }}
        selected={user?.hiringCriteria?.workEnvironment}
      />

      <IndustryModal
        isVisible={isIndustryModalOpen}
        onClose={() => setIsIndustryModalOpen(false)}
        onSelect={(selected) => {
          Alert.alert(
            "Change Industry",
            "Changing your industry will reset your selected skills and job title. Continue?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Yes",
                onPress: () => {
                  setChanges((prev) => ({
                    ...prev,
                    industry: selected,
                    requiredSkills: [],
                    jobTitle: "", // ✅ reset root jobTitle
                  }));
                  setUser((prev) => ({
                    ...prev,
                    industry: selected,
                    jobTitle: "", // ✅ reset root jobTitle
                    hiringCriteria: {
                      ...prev.hiringCriteria,
                      requiredSkills: [],
                    },
                  }));
                },
              },
            ]
          );
        }}
        selected={user?.industry}
      />

      <PreferredJobTitleModal
        isVisible={isJobTitleModalOpen}
        onClose={() => setIsJobTitleModalOpen(false)}
        onSelect={(selected) => {
          setChanges((prev) => ({ ...prev, jobTitle: selected }));
          setUser((prev) => ({ ...prev, jobTitle: selected }));
        }}
        selected={user?.jobTitle}
        industry={user?.industry || "General"}
      />

      <SalaryModal
        isVisible={isSalaryModalOpen}
        onClose={() => setIsSalaryModalOpen(false)}
        selected={user?.hiringCriteria?.salaryRange}
        onChange={(range) => {
          setChanges((prev) => ({ ...prev, salaryRange: range }));
          setUser((prev) => ({
            ...prev,
            hiringCriteria: { ...prev.hiringCriteria, salaryRange: range },
          }));
        }}
      />
    </SafeAreaView>
  );
};

export default EditProfileRecruiter;
