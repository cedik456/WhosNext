import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileCard = ({ card }) => {
  if (!card) return null;
  return (
    <View className="p-5 bg-[#fbfbfb] rounded-2xl h-[85%] shadow-sm">
      <Image
        source={card.avatar}
        resizeMode="cover"
        className="self-center mt-10 mb-12 rounded-full w-72 h-72"
      />

      <View className="flex-row items-center mb-1">
        <Text className="text-2xl font-poppins-600">{card.name}</Text>
        <Ionicons
          name="checkmark-circle"
          size={20}
          color="#3b82f6"
          className="ml-2"
        />
      </View>

      {card.location && (
        <Text className="mb-1 text-base text-gray-500">
          Based in {card.location}
        </Text>
      )}

      <Text className="mb-2 text-base text-gray-600 font-poppins-500">
        {[card.preferences?.workEnvironment, card.preferences?.workType]
          .filter(Boolean)
          .join(" | ")}
      </Text>

      <Text className="mb-1 text-base font-poppins-600">About me</Text>
      <Text className="mb-2 text-sm text-gray-500 font-poppins-500">
        {card.bio}
      </Text>

      {card.skills?.length > 0 && (
        <View className="mb-10">
          <Text className="mb-2 text-base font-poppins-600">Skills</Text>

          <View className="flex-row flex-wrap gap-2 max-w-[280px]">
            {card.skills?.map((skill, index) => (
              <View key={index} className="px-3 py-1 bg-gray-100 rounded-full">
                <Text className="text-sm text-black">{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileCard;
