import { Text, View } from "react-native";

const FallBackCard = () => {
  return (
    <View className="justify-center flex-1">
      <View className="items-center justify-center flex-1">
        <Text className="mb-2 text-3xl text-black font-poppins-600">
          You’re all caught up!
        </Text>
        <Text className="text-lg text-center text-gray-600 font-poppins-400">
          You’ve seen all available profiles.{"\n"}Check back later or update
          your filters.
        </Text>
      </View>
    </View>
  );
};

export default FallBackCard;
