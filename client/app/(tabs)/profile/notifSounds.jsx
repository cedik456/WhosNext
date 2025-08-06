import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationsToggle from "../../../components/NotificationsToggle";
import { useState } from "react";
import { useColorScheme } from "nativewind";

const NotificationAndSounds = () => {
  const { colorScheme } = useColorScheme();

  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [newMatch, setNewMatch] = useState(true);
  const [newMessage, setNewMessage] = useState(true);
  const [emailMatchAlerts, setEmailMatchAlerts] = useState(true);
  const [emailNewMessage, setEmailNewMessage] = useState(false);

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
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
          Notifications
        </Text>
      </View>

      <View className="px-6 mt-6">
        <Text className="mb-3 text-lg text-black font-poppins-600 dark:text-white">
          Push Notifications
        </Text>

        <View
          className={`p-4 rounded-xl ${
            colorScheme === "dark" ? "bg-[#242526]" : "bg-gray-50"
          } `}
        >
          <NotificationsToggle
            label="Do not disturb"
            description="Mutes all notifications"
            value={doNotDisturb}
          />

          <NotificationsToggle
            label="New Match"
            description="Notify me when I get a mutual match."
            value={newMatch}
            onValueChange={setNewMatch}
          />

          <NotificationsToggle
            label="New Message"
            description="Notify me when I receive a new message."
            value={newMessage}
            onValueChange={setNewMessage}
          />
        </View>
        <Text className="mt-8 mb-3 text-lg text-black font-poppins-600 dark:text-white">
          Email Notifications
        </Text>
        <View
          className={`rounded-xl ${
            colorScheme === "dark" ? "bg-[#242526]" : "bg-gray-50"
          } p-4`}
        >
          <NotificationsToggle
            label="Match Alerts"
            description="Get an email when you've matched with someone."
            value={emailMatchAlerts}
            onValueChange={setEmailMatchAlerts}
          />
          <NotificationsToggle
            label="New Message"
            description="Receive an email when you’ve got a new message."
            value={emailNewMessage}
            onValueChange={setEmailNewMessage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationAndSounds;
