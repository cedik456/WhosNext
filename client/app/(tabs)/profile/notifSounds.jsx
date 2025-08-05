import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomSwitch from "../../../components/CustomSwitch";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

const NotificationAndSounds = () => {
  // const [pushDND, setPushDND] = useState(false);
  // const [pushChat, setPushChat] = useState(false);
  // const [emailMatch, setEmailMatch] = useState(false);
  // const [emailNew, setEmailNew] = useState(false);

  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      <View className="relative flex-row items-center justify-center px-6 mt-5">
        <TouchableOpacity
          onPress={onPress}
          className="flex-row items-center justify-between py-4"
        >
          <View className="flex-row items-center">
            <View className="flex-row gap-4">
              <Text className="text-lg font-poppins dark:text-white">
                Do not disturb
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            {/* <CustomSwitch value={pushDND} onValueChange={setPushDND} /> */}
          </View>
        </TouchableOpacity>
        {showDivider && (
          <View className="h-px ml-10 bg-gray-200 dark:bg-gray-500" />
        )}
      </View>

      <View className="px-6 mt-8">
        <View
          className={`p-4 rounded-xl ${
            colorScheme === "dark" ? "bg-[#242526]" : "bg-gray-50"
          } `}
        >
          <View className="flex-1 pr-3">
            <Text className="text-base font-medium text-black dark:text-white">
              Do not disturb
            </Text>
            <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Mutes all notifications
            </Text>
          </View>
          {/* <CustomSwitch value={pushDND} onValueChange={setPushDND} /> */}

          <View />

          <View className="flex-row items-center justify-between px-4 py-3">
            <View className="flex-1 pr-3">
              <Text className="text-base font-medium text-black dark:text-white">
                Chat Message
              </Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                If disabled, you will stop receiving notifications for messages.
              </Text>
            </View>
            {/* <CustomSwitch value={pushChat} onValueChange={setPushChat} /> */}
          </View>
        </View>

        <View className="mb-4 bg-white dark:bg-[#242526]">
          <Text className="mx-4 my-3 text-lg font-semibold text-black dark:text-white">
            Email notifications
          </Text>

          <View className="flex-row items-center justify-between px-4 py-3">
            <View className="flex-1 pr-3">
              <Text className="text-base font-medium text-black dark:text-white">
                Match Alerts
              </Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get a notification when you’ve matched with someone.
              </Text>
            </View>
            {/* <CustomSwitch value={emailMatch} onValueChange={setEmailMatch} /> */}
          </View>

          <View className="flex-row items-center justify-between px-4 py-3">
            <View className="flex-1 pr-3">
              <Text className="text-base font-medium text-black dark:text-white">
                New Message
              </Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Receive an email when you’ve got a new message.
              </Text>
            </View>
            {/* <CustomSwitch value={emailNew} onValueChange={setEmailNew} /> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationAndSounds;
