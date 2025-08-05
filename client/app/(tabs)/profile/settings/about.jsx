import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileItem from "../../../../components/ProfileItem";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";

const About = () => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorScheme === "dark" ? " bg-black" : ""}`}
    >
      <View
        className={`${
          colorScheme === "dark" ? "bg-black" : ""
        } text-2xl  font-poppins-600 `}
      >
        <View className="relative flex-row items-center justify-center px-6 mt-5">
          <Pressable onPress={() => router.back()} className="absolute left-6 ">
            <FontAwesome6
              name="chevron-left"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>

          <Text
            className={`${
              colorScheme === "dark" ? "text-white" : "text-black"
            } text-2xl  font-poppins-600 `}
          >
            About
          </Text>
        </View>

        <View className="px-6 mt-8">
          <View
            className={`p-4 rounded-xl ${
              colorScheme === "dark" ? "bg-[#242526]" : "bg-gray-50"
            } `}
          >
            <ProfileItem
              label="Acknowledgements"
              icon="ribbon-outline"
              iconSet={Ionicons}
              onPress={() => router.push("settings/acknowledgements")}
              showDivider
            />
            <ProfileItem
              label="Support"
              icon="help-circle-outline"
              iconSet={Ionicons}
              onPress={() => router.push("settings/support")}
              showDivider
            />
            <ProfileItem
              label="Connect with us"
              icon="chatbubbles-outline"
              iconSet={Ionicons}
              onPress={() => router.push("settings/connect")}
            />
          </View>
        </View>
      </View>

      <View className="items-center py-4 mt-auto">
        <Text className="text-3xl font-bold text-black dark:text-white">
          WN
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">
          Beta version
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">
          Created with anger.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default About;
