import { Pressable, Text, View } from "react-native";
import SwipeDeck from "../../components/SwipeDeck";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getUserRole } from "../../utils/secureUser";

const Home = () => {
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await getUserRole();
        console.log("Stored role from secure storage:", storedRole); // ✅ Debug this
        setRole(storedRole);
      } catch (error) {
        console.error("Failed to get role:", error);
      }
    };
    fetchRole();
  }, []);

  const handleFilterPress = () => {
    if (!role) return;

    console.log(role);

    if (role === "recruiter") {
      router.push("/filters/recruiter");
    } else {
      router.push("/filters/jobSeeker");
    }
  };

  return (
    <SafeAreaView className="flex-1 ">
      <View className="px-5">
        <View className="absolute z-10 top-5 left-5 right-5 ">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-poppins-600">Who's Next?</Text>

            <Pressable onPress={handleFilterPress}>
              <Ionicons name="options" size={26} />
            </Pressable>
          </View>
        </View>
      </View>

      <SwipeDeck />
    </SafeAreaView>
  );
};

export default Home;
