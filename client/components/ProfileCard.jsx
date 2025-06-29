import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AvatarPlaceholder from "../assets/Avatar3.png";
import { getSkillColor } from "../utils/getSkillColor";

const ProfileCard = ({ card, color }) => {
  if (!card) return null;
  return (
    <View
      className="p-5 rounded-2xl h-[90%] shadow-sm "
      style={{ backgroundColor: color || "#fbfbfb" }}
    >
      <Image
        source={AvatarPlaceholder}
        resizeMode="cover"
        className="self-center mt-10 mb-10 rounded-full w-72 h-72"
      />

      <View className="flex-row items-center mb-1">
        <Text className="text-2xl font-poppins-600">{card.userId?.name}</Text>
        <Ionicons
          name="checkmark-circle"
          size={20}
          color="#3b82f6"
          className="ml-2"
        />
      </View>

      {card.location && (
        <Text className="mb-1 text-base text-gray-500">{card.location}</Text>
      )}

      {card.preferences?.workEnvironment || card.preferences?.workType ? (
        <Text className="mb-1 text-base text-gray-600 font-poppins-500">
          {[card.preferences?.workEnvironment, card.preferences?.workType]
            .filter(Boolean)
            .join(" | ")}
        </Text>
      ) : null}

      <Text className="mb-1 text-base text-gray-500">1 year of experience</Text>

      {card.bio?.trim() && (
        <>
          <Text className="mb-1 text-base font-poppins-600">About me</Text>
          <Text className="mb-2 text-sm text-gray-500 font-poppins-500">
            {card.bio}
          </Text>
        </>
      )}

      {card.skills?.length > 0 && (
        <View className="mb-10">
          <Text className="mb-2 text-base font-poppins-600">Skills</Text>

          <View className="flex-row flex-wrap gap-2 max-w-[280px]">
            {card.skills?.map((skill, index) => (
              <View
                key={index}
                className={`px-3 py-2 rounded-full ${getSkillColor(skill)}`}
              >
                <Text
                  className={`text-sm text-black ${
                    getSkillColor(skill) === "bg-black"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileCard;
