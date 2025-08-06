import { Switch, Text, View } from "react-native";

const NotificationsToggle = ({ label, description, value, onValueChange }) => {
  return (
    <View className="flex-row items-center justify-between py-3 border-gray-200">
      <View className="flex-1 pr-3">
        <Text className="text-base text-black font-poppins-500 dark:text-white">
          {label}
        </Text>
        {description ? (
          <Text className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
            {description}
          </Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E5E5E5", true: "black" }}
        thumbColor="white"
      />
    </View>
  );
};

export default NotificationsToggle;
