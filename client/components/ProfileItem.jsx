import { Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const ProfileItem = ({
  label,
  value,
  icon,
  iconSet: IconSet,
  dot,
  onPress,
  showDivider,
  showStatus,
}) => {
  const { colorScheme } = useColorScheme();

  let statusText = null;
  if (showStatus) {
    statusText = colorScheme === "dark" ? "On" : "Off";
  }

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-between py-4"
      >
        <View className="flex-row items-center">
          <View className="flex-row gap-4">
            <IconSet
              name={icon}
              size={22}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text className="text-lg font-poppins dark:text-white">
              {label}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          {showStatus && statusText !== null ? (
            <Text className="text-gray-500 font-poppins-400">{statusText}</Text>
          ) : value ? (
            <Text className="text-gray-500 font-poppins-400">{value}</Text>
          ) : dot ? (
            <View className="w-2 h-2 bg-blue-500 rounded-full" />
          ) : null}
          <AntDesign name="right" size={20} color="#888" />
        </View>
      </TouchableOpacity>
      {showDivider && (
        <View className="h-px ml-10 bg-gray-200 dark:bg-gray-500" />
      )}
    </>
  );
};

export default ProfileItem;
