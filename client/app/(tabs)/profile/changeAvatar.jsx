import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangeAvatar = () => {
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
          Change Avatar
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ChangeAvatar;
