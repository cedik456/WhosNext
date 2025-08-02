import { AntDesign } from "@expo/vector-icons";
import { View, Text, Touchable, TouchableOpacity } from "react-native";

const ProfileField = ({ label, value, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between px-6 py-3 mt-5 border-b border-gray-200"
    >
      <View className="gap-2">
        <Text className="text-base font-poppins-500 dark:text-white">
          {label}
        </Text>
        <Text className="text-gray-400 font-poppins">{value}</Text>
      </View>
      <AntDesign name="right" size={20} color="#888" />
    </TouchableOpacity>
  );
};

export default ProfileField;
