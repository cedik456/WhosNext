import { Pressable, Text, View } from "react-native";
import SwipeDeck from "../../components/SwipeDeck";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getUserRole } from "../../utils/secureUser";
import { useColorScheme } from "nativewind";

const Home = () => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await getUserRole();
        setRole(storedRole);
      } catch (error) {}
    };
    fetchRole();
  }, []);

  const handleFilterPress = () => {
    if (!role) return;

    if (role === "recruiter") {
      router.push("/filters/recruiter");
    } else {
      router.push("/filters/jobSeeker");
    }
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      <View className="px-5">
        <View className="absolute z-10 top-5 left-5 right-5 ">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-poppins-600 dark:text-white">
              Who's Next?
            </Text>

            <Pressable onPress={handleFilterPress}>
              <Ionicons
                name="options"
                size={26}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <SwipeDeck />
    </SafeAreaView>
  );
};

export default Home;
