import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PreferredJobTitleModal from "../../modals/PreferredJobTitleModal";
import ExperienceLevelModal from "../../modals/ExperienceLevelModal";
import PreferredLocationModal from "../../modals/PreferredLocationModal";
import PreferredSkillsModal from "../../modals/PreferredSkillsModal";
import getSkillColor from "../../utils/getSkillColor";

const RecruiterFilters = () => {
  const router = useRouter();

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
