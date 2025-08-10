import { View, Text, Pressable } from "react-native";

const AuthButton = ({ label, onPress, icon }) => {
  return (
    <Pressable
      onPress={onPress}
      className="p-5 bg-black rounded-full"
      android_ripple={{ color: "rgba(255,255,255,0.1)" }}
    >
      <View className="flex-row items-center justify-between">
        <View className="items-center w-6">{icon}</View>
        <Text className="flex-1 text-base text-center text-white font-poppins-500">
          {label}
        </Text>
        <View className="w-6" />
      </View>
    </Pressable>
  );
};

export default AuthButton;
