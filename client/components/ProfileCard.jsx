import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";

const ProfileCard = ({ card, color }) => {
  // if (!card) return null;
  return (
    <View
      className={`${
        Platform.OS === "ios" ? "h-[87%]" : "h-[100%]"
      } p-5 shadow-sm rounded-2xl`}
      style={{ backgroundColor: color || "#fbfbfb" }}
    >
      <Image
        source={{ uri: card.userId?.avatar }}
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

      {card.workEnvironment || card.workType ? (
        <Text className="mb-2 text-gray-700 font-poppins-500">
          {[card.workType, card.workEnvironment].filter(Boolean).join(" | ")}
        </Text>
      ) : null}

      {card.location && (
        <Text className="items-center mb-2 text-gray-700 ">
          <FontAwesome6 name="location-dot" size={15} /> {card.location}
        </Text>
      )}

      {card.experience && (
        <View className="self-start px-3 py-1 mb-2 bg-blue-100 border border-blue-400 rounded-full">
          <Text className="text-sm text-blue-800 font-poppins-500">
            {card.experience}
          </Text>
        </View>
      )}

      {card.skills?.length > 0 && (
        <View className="mb-3">
          <Text className="mb-2 text-base font-poppins-600">Skills</Text>

          <View className="flex-row flex-wrap gap-2 max-w-[280px]">
            {card.skills?.map((skill, index) => (
              <View
                key={index}
                className={`px-3 py-1 rounded-full ${getSkillColor(skill)}`}
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
      <TouchableOpacity className="flex-row items-center mt-2">
        <Text className="mr-1 font-poppins-500"> See more...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

const getSkillColor = (skill) => {
  switch (skill.toLowerCase()) {
    case "javascript":
      return "bg-yellow-100";
    case "typescript":
      return "bg-blue-100";
    case "react":
      return "bg-blue-100";
    case "vue.js":
    case "vue":
      return "bg-green-100";
    case "node.js":
    case "nodejs":
    case "node":
      return "bg-green-100";
    case "python":
      return "bg-blue-100";
    case "django":
      return "bg-emerald-100";
    case "php":
      return "bg-indigo-100";
    case "laravel":
      return "bg-purple-100";
    case "ui/ux design":
      return "bg-pink-100";
    case "figma":
      return "bg-orange-100";
    case "photoshop":
      return "bg-rose-100";
    case "project management":
      return "bg-orange-100";
    case "sales":
      return "bg-yellow-100";
    case "devops":
      return "bg-gray-100";
    case "aws":
      return "bg-orange-100";
    case "sql":
      return "bg-indigo-100";
    case "mongodb":
      return "bg-green-100";
    case "customer service":
      return "bg-sky-100";
    case "other":
      return "bg-gray-300";
    default:
      return "bg-gray-200";
  }
};
