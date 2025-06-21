import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chip, TextInput } from "react-native-paper";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import { getUserRole } from "../../utils/secureUser";

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
  recruiter: [
    "Interviewing",
    "Talent Sourcing",
    "Hiring Strategy",
    "Job Posting",
    "Resume Screening",
    "Team Management",
  ],
};

const Skills = () => {
  const router = useRouter();
  const [role, setRole] = useState("jobSeeker");
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
    }

    try {
      const token = await getToken();

      const endpoint =
        role === "recruiter"
          ? "/onboarding/skills/recruiter"
          : "/onboarding/skills/jobSeeker";

      const response = await api.patch(
        endpoint,
        { skills: selectedSkills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/location");
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Couldn't save skills. Try again.");
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole();
      if (!role) {
        router.replace("onboarding/role");
      } else {
        setRole(role);
      }
    };
    fetchRole();
  }, []);

  const skillOptions = SKILL_SETS[role] || [];

  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4 mt-14">
          <Text className="text-3xl font-poppins-600">
            {role === "recruiter"
              ? "What are you looking for?"
              : "What are your skills?"}
          </Text>
          <Text className="text-base text-gray-600 font-poppins-500">
            Select 3 to 8{" "}
            {role === "recruiter" ? "recruitment" : "professional"} skills that
            match your expertise.
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
      <Text className="text-gray-500 font-poppins-500">
        This info will help you find your rightful
        {role === "recruiter" ? " employee" : "job"}
      </Text>

      <Pressable
        onPress={handleSubmit}
        className={`rounded-full mt-6 mb-10 ${
          selectedSkills.length >= 3 ? "bg-black" : "bg-gray-300"
        }`}
      >
        <Text
          className={`p-5 text-center font-poppins-600 ${
            selectedSkills.length >= 3 ? "text-white" : "text-gray-400"
          }`}
        >
          Next
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Skills;
