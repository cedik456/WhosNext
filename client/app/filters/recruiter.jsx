import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
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
import PreferredJobTitleModal from "../../modals/PreferredJobTitleModal";
import ExperienceLevelModal from "../../modals/ExperienceLevelModal";
import PreferredLocationModal from "../../modals/PreferredLocationModal";
import PreferredSkillsModal from "../../modals/PreferredSkillsModal";
import getSkillColor from "../../utils/getSkillColor";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import Button from "../../components/Button";
import { useRefetch } from "../../contexts/RefetchContext";

const RecruiterFilters = () => {
  const router = useRouter();

  const { setShouldRefetch } = useRefetch();

  // Skills
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [preferredSkills, setPreferredSkills] = useState([]);

  // Location
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // job title
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  // Experience Level
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(null);

  // Work Type
  const [selectedWorkType, setSelectedWorkType] = useState(null);
  const workTypes = ["Full-time", "Part-time", "Internship"];

  // Work Environment
  const [selectedWorkEnv, setSelectedWorkEnv] = useState(null);
  const workEnvironments = ["Remote", "Hybrid", "Onsite"];

  const [originalFilters, setOriginalFilters] = useState(null);

  const handleSavePreferences = async () => {
    const token = await getToken();

    if (!token) {
      Alert.alert("Error", "Token not found. Please login again.");
      return;
    }

    try {
      const payload = {
        filters: {
          filterSkills: preferredSkills,
          filterLocation: selectedLocation,
          filterJobTitle: selectedJobTitle,
          filterExperienceLevel: selectedExperienceLevel,
          filterWorkType: selectedWorkType,
          filterWorkEnvironment: selectedWorkEnv,
        },
      };

      const response = await api.patch("/preferences/recruiter", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Preferences Saved", response.data);
      setOriginalFilters(payload.filters);
      setShouldRefetch(true);
      Alert.alert("Success", "Your filters have been saved.");
    } catch (error) {
      console.error(
        "❌ Error saving preferences:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to save preferences.");
    }
  };

  const isFiltersChanged = () => {
    if (!originalFilters) return false;

    return (
      JSON.stringify(originalFilters.filterSkills) !==
        JSON.stringify(preferredSkills) ||
      originalFilters.filterLocation !== selectedLocation ||
      originalFilters.filterJobTitle !== selectedJobTitle ||
      originalFilters.filterExperienceLevel !== selectedExperienceLevel ||
      originalFilters.filterWorkType !== selectedWorkType ||
      originalFilters.filterWorkEnvironment !== selectedWorkEnv
    );
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

        const response = await api.get("/preferences/recruiter", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filters = response.data.data;

        if (filters) {
          setPreferredSkills(filters?.filterSkills || []);
          setSelectedLocation(filters?.filterLocation || null);
          setSelectedJobTitle(filters?.filterJobTitle || "");
          setSelectedExperienceLevel(filters?.filterExperienceLevel || null);
          setSelectedWorkType(filters?.filterWorkType || null);
          setSelectedWorkEnv(filters?.filterWorkEnvironment || null);

          setOriginalFilters({
            filterSkills: filters.filterSkills || [],
            filterLocation: filters.filterLocation || null,
            filterJobTitle: filters.filterJobTitle || "",
            filterExperienceLevel: filters.filterExperienceLevel || null,
            filterWorkType: filters.filterWorkType || null,
            filterWorkEnvironment: filters.filterWorkEnvironment || null,
          });
        }
      } catch (error) {
        console.error(
          "Failed to load recruiter preferences:",
          error.response?.data || error.message
        );
      }
    };

    fetchPreferences();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-5">
        <Pressable onPress={() => router.back()} className="mr-16">
          <FontAwesome6 name="chevron-left" size={24} />
        </Pressable>
        <Text className="text-2xl font-poppins-600">Narrow your search</Text>
      </View>
      <View className="h-px bg-gray-200" />

      <ScrollView className="flex-1">
        <View className="gap-4 p-5">
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

          <View>
            <Text className="mb-2 ml-4 text-sm text-gray-600 font-poppins-500">
              Preferred Job Title
            </Text>
            <Pressable
              onPress={() => setIsJobModalOpen(true)}
              className="flex-row items-center justify-between p-4 border border-gray-200 rounded-full"
            >
              <Text className="text-base font-poppins-500">
                {selectedJobTitle || "Preferred Job Title"}
              </Text>
              <AntDesign name="right" size={20} />
            </Pressable>
          </View>

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
            disabled={!isFiltersChanged()}
          />
        </View>
      </ScrollView>

      {/* Modals */}
      <PreferredJobTitleModal
        isVisible={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onSelect={(role) => setSelectedJobTitle(role)}
        selected={selectedJobTitle}
      />

      <ExperienceLevelModal
        isVisible={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)}
        onSelect={(level) => setSelectedExperienceLevel(level)}
        selected={selectedExperienceLevel}
      />

      <PreferredLocationModal
        isVisible={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={(level) => setSelectedLocation(level)}
        selected={selectedLocation}
      />

      <PreferredSkillsModal
        isVisible={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        selected={preferredSkills}
        onUpdate={setPreferredSkills}
      />
    </SafeAreaView>
  );
};

export default RecruiterFilters;
