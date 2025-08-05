import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

import Button from "../../../components/Button";
import { useAuth } from "../../../hooks/useAuth";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";

const AccountSettings = () => {
  const { colorScheme } = useColorScheme();

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
          Account Settings
        </Text>
      </View>
      <View className="px-6 mt-5">
        <Text className="mb-2 ml-2 text-lg font-poppins-500 dark:text-white">
          Verify Email
        </Text>
        <Text className="mb-4 ml-2 text-lg font-poppins dark:text-gray-400">
          We send an email to ch*****@gmail.com. Please check you inbox and get
          the actual code to verify.
        </Text>
        <TextInput className="p-3 mb-4 text-lg text-black bg-white border-gray-300 rounded-xl" />
        <Button
          title="Verify account"
          className="text-center rounded-full dark:bg-white"
          textClassName="text-center dark:text-black"
        />
        <TouchableOpacity className="mt-3">
          <Text className="text-center text-gray-400 font-poppins">
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountSettings;
