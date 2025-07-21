import { AntDesign, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PreferredSkillsModal from "../../modals/PreferredSkillsModal";
import getSkillColor from "../../utils/getSkillColor";
import PreferredLocationModal from "../../modals/PreferredLocationModal";
import ExperienceLevelModal from "../../modals/ExperienceLevelModal";
import api from "../../utils/axiosInstance";
import Button from "../../components/Button";
import { getToken } from "../../utils/storage";

const JobSeekerFilters = () => {
  const router = useRouter();

  // Skills
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [preferredSkills, setPreferredSkills] = useState([]);

  // Location
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Experience Level
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(null);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  // Work Type
  const [selectedWorkType, setSelectedWorkType] = useState(null);
  const workTypes = ["Full-time", "Part-time", "Internship"];

  // Work Environment
  const [selectedWorkEnv, setSelectedWorkEnv] = useState(null);
  const workEnvironments = ["Remote", "Hybrid", "Onsite"];

  // Salary Range (Minimum Salary)
  const [minSalary, setMinSalary] = useState("");

  const handleSavePreferences = async () => {
    console.log("🚀 handleSavePreferences() called");

    try {
      const payload = {
        preferences: {
          preferredSkills,
          preferredLocation: selectedLocation,
          preferredExperienceLevel: selectedExperienceLevel,
          preferredWorkType: selectedWorkType,
          preferredWorkEnvironment: selectedWorkEnv,
          preferredSalary: {
            min: parseInt(minSalary) || 0,
            max: null,
          },
        },
      };

      const token = await getToken();

      if (!token) {
        Alert.alert("Error", "Token not found. Please login again.");
        return;
      }

      const response = await api.patch("/preferences/jobSeeker", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Preferences Saved", response.data);
      Alert.alert("Success", "Your preferences have been saved.");
    } catch (error) {
      console.error(
        "❌ Error saving preferences:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to save preferences.");
    }
  };

  const handleSaveConfirmation = async () => {
    Alert.alert(
      "Confirm Save",
      "Are you sure you want to save these preferences",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Save", onPress: handleSavePreferences },
      ]
    );
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const token = await getToken();

        const response = await api.get("/preferences/jobSeeker", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const prefs = response.data.data;

        if (prefs) {
          setPreferredSkills(prefs.preferredSkills || []);
          setSelectedLocation(prefs.preferredLocation || null);
          setSelectedExperienceLevel(prefs.preferredExperienceLevel || null);
          setSelectedWorkType(prefs.preferredWorkType || null);
          setSelectedWorkEnv(prefs.preferredWorkEnvironment || null);
          setMinSalary(prefs.preferredSalary?.min?.toString() || "");
        }
      } catch (error) {
        console.error(
          "❌ Failed to load preferences:",
          error.response?.data || error.message
        );
      }
    };

    fetchPreferences();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-5">
        <Pressable onPress={() => router.back()} className="mr-28">
          <FontAwesome6 name="chevron-left" size={24} />
        </Pressable>
        <Text className="text-2xl font-poppins-600">Filter Jobs</Text>
      </View>
      <View className="h-px bg-gray-200" />
      <ScrollView className="flex-1">
        <View className="gap-4 p-5">
          {/* Skills */}
          <View>
            <Text className="mb-2 ml-4 text-sm text-gray-600 font-poppins-500">
              Preferred Skills
            </Text>
            <View className="relative flex-row flex-wrap gap-2 p-4 border border-gray-200 h-36 rounded-xl">
              {preferredSkills.map((skill, index) => (
                <View
                  key={index}
                  className={`px-3 py-1 rounded-full ${getSkillColor(skill)}`}
                >
                  <Text className="text-sm text-gray-800">{skill}</Text>
                </View>
              ))}
              <Pressable
                // className="absolute p-2 bottom-2 right-2"
                onPress={() => setIsSkillsModalOpen(true)}
              >
                <FontAwesome6 name="plus" size={20} />
              </Pressable>
            </View>
          </View>
          {/* Location */}
          <View>
            <Text className="mb-2 ml-4 text-sm text-gray-600 font-poppins-500">
              Preferred Location
            </Text>
            <Pressable
              onPress={() => setIsLocationModalOpen(true)}
              className="flex-row items-center justify-between p-4 border border-gray-200 rounded-full"
            >
              <Text className="text-base font-poppins-500">
                {selectedLocation || "Select"}
              </Text>
              <AntDesign name="right" size={20} />
            </Pressable>
          </View>
          {/* Experience Level */}
          <View>
            <Text className="mb-2 ml-4 text-sm text-gray-600 font-poppins-500">
              Experience Level
            </Text>
            <Pressable
              onPress={() => setIsExperienceModalOpen(true)}
              className="flex-row items-center justify-between p-4 border border-gray-200 rounded-full"
            >
              <Text className="text-base font-poppins-500">
                {selectedExperienceLevel || "Select"}
              </Text>
              <AntDesign name="right" size={20} />
            </Pressable>
          </View>

          {/* Work Type */}
          <View>
            <Text className="mb-2 ml-4 text-sm text-gray-600 font-poppins-500">
              Work Type
            </Text>

            <View className="gap-4 p-4 border border-gray-200 rounded-xl">
              {workTypes.map((type) => (
                <Pressable
                  key={type}
                  onPress={() => setSelectedWorkType(type)}
                  className="flex-row justify-between"
                >
                  <Text className="font-poppins-500">{type}</Text>
                  <FontAwesome
                    name={
                      selectedWorkType === type ? "check-square" : "square-o"
                    }
                    size={24}
                    color={selectedWorkType === type ? "black" : "gray"}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Minimum Salary */}
          <View>
            <Text className="mb-2 ml-4 text-sm text-gray-600 font-poppins-500">
              Preferred Salary
            </Text>
            <View className="flex-row items-center justify-between p-4 border border-gray-200 rounded-full">
              <TextInput
                className="flex-1 mr-2"
                placeholder="Enter amount (e.g. 40000)"
                keyboardType="numeric"
                value={minSalary}
                onChangeText={setMinSalary}
              />
              <Text className="text-gray-500">PHP</Text>
            </View>
          </View>

          {/* Work Environment */}

          <View>
            <Text className="mb-2 ml-4 text-sm text-gray-600 font-poppins-500">
              Work Environment
            </Text>
            <View className="gap-4 p-4 border border-gray-200 rounded-xl">
              {workEnvironments.map((env) => (
                <Pressable
                  key={env}
                  onPress={() => setSelectedWorkEnv(env)}
                  className="flex-row justify-between"
                >
                  <Text className="font-poppins-500">{env}</Text>
                  <FontAwesome
                    name={selectedWorkEnv === env ? "check-square" : "square-o"}
                    size={24}
                    color={selectedWorkEnv === env ? "black" : "gray"}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          <Button
            title="Save Preferences"
            className="w-auto rounded-full"
            textClassName="text-center"
            onPress={handleSaveConfirmation}
          />
        </View>
      </ScrollView>

      <PreferredSkillsModal
        isVisible={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        selected={preferredSkills}
        onUpdate={setPreferredSkills}
      />

      <PreferredLocationModal
        isVisible={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={(level) => setSelectedLocation(level)}
        selected={selectedLocation}
      />

      <ExperienceLevelModal
        isVisible={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)}
        onSelect={(level) => setSelectedExperienceLevel(level)}
        selected={selectedExperienceLevel}
      />
    </SafeAreaView>
  );
};

export default JobSeekerFilters;
