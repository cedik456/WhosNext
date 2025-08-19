import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileItem from "../../../components/ProfileItem";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useRouter } from "expo-router";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../../components/Button";

const SettingsScreen = () => {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { logout } = useAuth();

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
          <Pressable
            onPress={() => router.replace("/profile")}
            className="absolute left-6 "
          >
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
            Settings
          </Text>
        </View>

        {/* Section 1 */}
        <View className="px-6 mt-8">
          <View
            className={`p-4 rounded-xl ${
              colorScheme === "dark" ? "bg-[#242526]" : "bg-gray-50"
            }`}
          >
            <ProfileItem
              label="General"
              icon="settings-outline"
              iconSet={Ionicons}
              onPress={() => router.push("profile/settings/general")}
              showDivider
            />
            <ProfileItem
              label="Contact"
              icon="mail-outline"
              iconSet={Ionicons}
              onPress={() => router.push("profile/settings/contact")}
              showDivider
            />
            <ProfileItem
              label="Terms & Conditions"
              icon="document-text-outline"
              iconSet={Ionicons}
              onPress={() => router.push("profile/settings/terms")}
              showDivider
            />
            <ProfileItem
              label="Help"
              icon="help-circle-outline"
              iconSet={Ionicons}
              onPress={() => router.push("profile/settings/help")}
            />
          </View>
        </View>

        {/* Section 2 */}
        <View className="px-6 mt-5">
          <View
            className={`p-4 rounded-xl ${
              colorScheme === "dark" ? "bg-[#242526]" : "bg-gray-50"
            }`}
          >
            <ProfileItem
              label="About"
              icon="information-circle-outline"
              iconSet={Ionicons}
              onPress={() => router.push("profile/settings/about")}
            />
          </View>
        </View>

        <View className="px-6 mt-5">
          <Button
            onPress={() => {
              logout();
              router.push("/login");
            }}
            title="Log out"
            className="items-center w-full py-4 bg-red-500 rounded-full"
            textClassName="text-base text-white font-poppins-600"
          />
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

export default SettingsScreen;
