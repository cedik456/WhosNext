import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chip } from "react-native-paper";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import Button from "../../components/Button";
import { getUserRole } from "../../utils/secureUser";

const SKILL_SETS = {
  skills: [
    "JavaScript",
    "React",
    "Vue.js",
    "Node.js",
    "Python",
    "Django",
    "PHP",
    "Laravel",
    "UI/UX Design",
    "Figma",
    "Photoshop",
    "Project Management",
    "Sales",
    "DevOps",
    "AWS",
    "SQL",
    "MongoDB",
    "TypeScript",
    "Customer Service",
    "Other",
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
      return;
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
        if (role === "recruiter") {
          router.replace("/recruiter/hiringLocation");
        } else {
          router.replace("/jobSeeker/location");
        }
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

  const skillOptions = SKILL_SETS.skills;

  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-3 mt-14">
          <Text className="text-3xl font-poppins-600">
            Let's talk about
            {role === "recruiter"
              ? " your\nskill requirements"
              : " your \nskills"}
          </Text>
          <Text className="text-base text-gray-600 font-poppins-500">
            Select 3 to 8 skills that match your{" "}
            {role === "recruiter" ? "requirements" : "expertise "}
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

      <Button
        title="Next"
        className="mb-10 rounded-full"
        textClassName="text-center"
        onPress={handleSubmit}
        disabled={selectedSkills.length < 3}
      />
    </SafeAreaView>
  );
};

export default Skills;
