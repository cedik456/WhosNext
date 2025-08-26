import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Chip } from "react-native-paper";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import Button from "../../components/Button";
import { getUserRole } from "../../utils/secureUser";
import { AntDesign } from "@expo/vector-icons";
import { SKILLS_BY_INDUSTRY } from "../../constants/skillsByIndustry";
import { useLocalSearchParams } from "expo-router";

const Skills = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const paramRole = Array.isArray(params.role) ? params.role[0] : params.role;
  const paramIndustry = Array.isArray(params.industry)
    ? params.industry[0]
    : params.industry;

  const [role, setRole] = useState(paramRole || "jobSeeker");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [industry, setIndustry] = useState(paramIndustry || "");
  const [loading, setLoading] = useState(!paramIndustry);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      if (selectedSkills.length >= 5) {
        Alert.alert(
          "You can only select up to 5-6 skills, Choose your best ones!"
        );
        return;
      }
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async () => {
    if (selectedSkills.length < 1) {
      Alert.alert("Select more skills", "Please choose at least 1 skill");
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
        router.replace("/workType");
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Couldn't save skills. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paramRole) return;
    const fetchRole = async () => {
      const role = await getUserRole();
      if (!role) {
        router.replace("/role");
      } else {
        setRole(role);
      }
    };
    fetchRole();
  }, [paramRole]);

  useEffect(() => {
    if (industry) {
      setLoading(false);
      return;
    }
    const fetchIndustry = async () => {
      try {
        const token = await getToken();
        const response = await api.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const saved = response.data?.data?.industry;

        if (!saved) {
          setLoading(false);
          router.replace("/industry");
          return;
        }
        setIndustry(saved);
        setLoading(false);
      } catch (error) {
        Alert.alert("Error", "Couldn't load industry");
        setLoading(false);
      }
    };
    fetchIndustry();
  }, [industry]);

  const skillOptions = industry
    ? SKILLS_BY_INDUSTRY[industry] || SKILLS_BY_INDUSTRY["Other"] || []
    : [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-5">
        <TouchableOpacity onPress={() => router.replace("/industry")}>
          <AntDesign name="left" size={24} color="gray" />
        </TouchableOpacity>

        <Text className="text-xs text-gray-500 font-poppins-500">
          {role === "recruiter" ? "4 of 10" : "4 of 8"}
        </Text>
      </View>

      <View className="justify-between flex-1 px-6 ">
        <View>
          <Text className="mb-2 text-3xl font-poppins-600">
            What are your
            {role === "recruiter" ? " \npreferred skills?" : " \nskills?"}
          </Text>
          <Text className="mb-4 text-base text-gray-600 font-poppins-500">
            Select skills that match your{" "}
            {role === "recruiter" ? "requirements" : "expertise "}
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} className="h-[70%]">
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
          </ScrollView>
        </View>

        <Button
          title="Next"
          className="mb-10 rounded-full"
          textClassName="text-center"
          onPress={handleSubmit}
          disabled={selectedSkills.length < 1}
        />
      </View>

      {loading && (
        <View className="absolute inset-0 z-10 items-center justify-center">
          <Text className="text-gray-500 font-poppins-500">
            Loading skills based on industry...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Skills;
