import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomSwitch from "../../../components/CustomSwitch";

const NotificationAndSounds = ({ navigation }) => {
  const scheme = useColorScheme();
  const [pushDND, setPushDND] = useState(false);
  const [pushChat, setPushChat] = useState(false);
  const [emailMatch, setEmailMatch] = useState(false);
  const [emailNew, setEmailNew] = useState(false);

  return (
    <SafeAreaView edges={['top']} className="flex-1 dark:bg-black">
      <View className="flex-row items-center p-4 bg-white dark:bg-black">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={scheme === "dark" ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <Text className="ml-3 text-xl font-semibold text-black dark:text-white">
          Notifications
        </Text>
      </View>

      <ScrollView className="py-2">
        <View className="mb-2 bg-white dark:bg-[#242526]">
          <Text className="mx-4 my-3 text-lg font-semibold text-black dark:text-white">
            Push Notifications
          </Text>

          <View className="flex-row items-center justify-between px-4 py-3">
            <View className="flex-1 pr-3">
              <Text className="text-base font-medium text-black dark:text-white">
                Do not disturb
              </Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Mutes all notifications
              </Text>
            </View>
            <CustomSwitch value={pushDND} onValueChange={setPushDND} />
          </View>

          <View className="flex-row items-center justify-between px-4 py-3">
            <View className="flex-1 pr-3">
              <Text className="text-base font-medium text-black dark:text-white">
                Chat Message
              </Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                If disabled, you will stop receiving notifications for messages.
              </Text>
            </View>
            <CustomSwitch value={pushChat} onValueChange={setPushChat} />
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
            <CustomSwitch value={emailMatch} onValueChange={setEmailMatch} />
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
            <CustomSwitch value={emailNew} onValueChange={setEmailNew} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationAndSounds;
