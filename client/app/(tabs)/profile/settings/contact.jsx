import { Pressable, Text, View, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileItem from "../../../../components/ProfileItem";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";

const Contact = () => {
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
          <Pressable
            onPress={() => router.replace("profile/settingsScreen")}
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
            Contact
          </Text>
        </View>

        <View className="px-6 mt-8">
          <View
            className={`p-4 rounded-xl ${
              colorScheme === "dark" ? "bg-[#242526]" : "bg-gray-50"
            } `}
          >
            <ProfileItem
              label="Email Us"
              value="support@whosnext.com"
              icon="mail-outline"
              iconSet={Ionicons}
              onPress={() => Linking.openURL("mailto:support@whosnext.com")}
              showDivider
            />
            <ProfileItem
              label="Call Us"
              value="+63 9091234567"
              icon="call-outline"
              iconSet={Ionicons}
              onPress={() => Linking.openURL("tel:+639191234567")}
              showDivider
            />
            <ProfileItem
              label="Visit Website"
              value="www.whosnext.com"
              icon="globe-outline"
              iconSet={Ionicons}
              onPress={() => Linking.openURL("https://www.whosnext.com")}
              showDivider
            />
            <ProfileItem
              label="Address"
              value="Bicol, Philippines"
              icon="location-outline"
              iconSet={Ionicons}
              onPress={() => {}}
              showDivider
            />
            <ProfileItem
              label="Report a Bug"
              icon="bug-outline"
              iconSet={Ionicons}
              onPress={() => {}}
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

export default Contact;
