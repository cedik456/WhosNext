import { AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

const ProfileField = ({ label, value, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between px-6 py-2 mt-5 border-b border-gray-200 dark:border-b-gray-500"
    >
      <View className="gap-2">
        <Text className="text-base text-black font-poppins-500 dark:text-white">
          {label}
        </Text>
        <Text className="text-gray-600 font-poppins w-80">{value}</Text>
      </View>
      <AntDesign name="right" size={20} color="#888" />
    </TouchableOpacity>
  );
};

export default ProfileField;
