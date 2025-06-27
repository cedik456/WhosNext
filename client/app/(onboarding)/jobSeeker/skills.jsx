import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chip } from "react-native-paper";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";
import Button from "../../../components/Button";

const SKILL_SETS = {
  jobSeeker: [
    "JavaScript",
    "React",
    "Python",
    "Angular",
    "PHP",
    "HTML/CSS",
    "Node.js",
    "SQL",
    "Figma",
    "UI/UX Design",
    "Graphic Design",
    "Video Editing",
    "Project Management",
    "DevOps",
    "Cybersecurity",
    "Networking",
    "Technical Support",
    "Customer Service",
    "Sales",
    "SEO",
    "Marketing",
    "Quality Assurance",
  ],
};

const Skills = () => {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      if (selectedSkills.length >= 8) {
        Alert.alert("Limit, You can only select up to 8 skills");
        return;
      }
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async () => {
    if (selectedSkills.length < 3) {
      Alert.alert("Select more skills", "Please choose at least 3 skills");
      return;
    }

    try {
      const token = await getToken();

      const response = await api.patch(
        "/onboarding/skills/jobSeeker",
        { skills: selectedSkills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/jobSeeker/location");
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Couldn't save skills. Try again.");
    }
  };

  const skillOptions = SKILL_SETS.jobSeeker;

  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4 mt-14">
          <Text className="text-3xl font-poppins-600">
            What are your skills?
          </Text>
          <Text className="text-base text-gray-600 font-poppins-500">
            Select 3 to 8 professional skills that match your expertise.
          </Text>

          <View className="flex-row flex-wrap mb-5">
            {skillOptions.map((skill) => (
              <View key={skill}>
                <Chip
                  onPress={() => toggleSkill(skill)}
                  style={{
                    margin: 4,
                    padding: 4,
                    backgroundColor: selectedSkills.includes(skill)
                      ? "#000"
                      : "#F6F6F6",

                    borderWidth: 1,
                    borderColor: "#ccc",
                  }}
                  textStyle={{
                    color: selectedSkills.includes(skill) ? "#fff" : "#000",
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  {skill}
                </Chip>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Text className="mb-2 text-gray-500 font-poppins-500">
        This info will help you find your rightful job
      </Text>

      <Button
        title="Next"
        onPress={handleSubmit}
        disabled={selectedSkills.length < 3}
      />
    </SafeAreaView>
  );
};

export default Skills;
