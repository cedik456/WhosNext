import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyAndSafety = () => {
  const { colorScheme } = useColorScheme();

  const items = [
    {
      label: "Profile Visibility",
      description: "Control who can see your profile",
    },
    { label: "Blocked Users", description: "Manage users you’ve blocked" },
    {
      label: "Sensitive Content",
      description: "Choose how sensitive content is displayed",
    },
    {
      label: "Data & Permissions",
      description: "Review how your data is used",
    },
    { label: "Privacy Policy", description: "Read our privacy practices" },
    { label: "Delete Account", description: "Request account deletion" },
  ];

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      {/* Header */}
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
          } text-2xl font-poppins-600 `}
        >
          Privacy & Safety
        </Text>
      </View>

      {/* Placeholder Items */}
      <ScrollView className="px-6 mt-6">
        {items.map((item) => (
          <Pressable
            key={item.label}
            className="flex-row items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700"
          >
            <View>
              <Text
                className={`${
                  colorScheme === "dark" ? "text-white" : "text-black"
                } text-base font-poppins-500`}
              >
                {item.label}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
                {item.description}
              </Text>
            </View>
            <FontAwesome6
              name="chevron-right"
              size={16}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyAndSafety;
