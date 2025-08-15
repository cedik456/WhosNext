import { AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import { INDUSTRIES } from "../../constants/industries";
import { Chip } from "react-native-paper";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import { getUserRole } from "../../utils/secureUser";

const Industry = () => {
  const router = useRouter();
  const [role, setRole] = useState("jobSeeker");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const handleSelect = (industry) => {
    setSelectedIndustry((prev) => (prev === industry ? "" : industry));
  };

  const handleSubmit = async () => {
    if (!selectedIndustry) {
      Alert.alert("Select an industry", "Please choose at least 1 industry");
      return;
    }

    try {
      const token = await getToken();

      const endpoint =
        role === "recruiter"
          ? "/onboarding/industry/recruiter"
          : "/onboarding/industry/jobSeeker";

      const response = await api.patch(
        endpoint,
        { industry: selectedIndustry },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/skills");
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Network Error", error.message);
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole();
      if (!role) {
        router.replace("/role");
      } else {
        setRole(role);
      }
    };
    fetchRole();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-5">
        <TouchableOpacity
          onPress={() =>
            router.replace({
              pathname: "/name",
              params: { industry: selectedIndustry, role },
            })
          }
        >
          <AntDesign name="left" size={24} color="gray" />
        </TouchableOpacity>

        <Text className="text-xs text-gray-500 font-poppins-500">
          {role === "recruiter" ? "3 of 10" : "3 of 8"}
        </Text>
      </View>

      <View className="justify-between flex-1 px-6">
        <View>
          <Text className="mb-2 text-3xl font-poppins-600">
            What industry are {"\n"}you in?
          </Text>
          <Text className="mb-4 text-base text-gray-600 font-poppins">
            Pick the sector that best matches your work.
          </Text>

          <ScrollView className="h-[70%]" showsVerticalScrollIndicator={false}>
            <View className="mb-6 ">
              {INDUSTRIES.map((industry) => (
                <View key={industry}>
                  <Chip
                    onPress={() => handleSelect(industry)}
                    style={{
                      marginVertical: 6,
                      alignSelf: "stretch",
                      width: "100%",
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      backgroundColor:
                        selectedIndustry === industry ? "#000" : "#F6F6F6",
                      borderWidth: 1,
                      borderColor: "#ccc",
                    }}
                    textStyle={{
                      color: selectedIndustry === industry ? "#fff" : "#000",
                      fontFamily: "Poppins_500Medium",
                    }}
                  >
                    {industry}
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
          disabled={!selectedIndustry}
        />
      </View>
    </SafeAreaView>
  );
};

export default Industry;
