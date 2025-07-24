import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const JobCard = ({ data, color }) => {
  // if (!data) return null;

  return (
    <View
      className="h-[90%] overflow-hidden shadow-sm  rounded-2xl"
      style={{ backgroundColor: color || "#fff" }}
    >
      {data.companyPicture ? (
        <Image
          source={{ uri: data.companyPicture }}
          resizeMode="cover"
          className="w-full h-[60%]"
        />
      ) : (
        <View className="w-full h-[60%] bg-gray-100 items-center justify-center">
          <Text className="text-lg text-gray-400 font-poppins-500">
            No Company Logo
          </Text>
        </View>
      )}

      <View className="p-4">
        <View className="flex-row items-center mb-1">
          <Text className="text-2xl font-poppins-600">{data.companyName}</Text>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color="#3b82f6"
            className="ml-2"
          />
        </View>

        {data.jobTitle && (
          <Text className="mb-2 text-lg text-gray-700 font-poppins-500">
            {data.jobTitle}
          </Text>
        )}

        <Text className="mb-2 text-xl text-blue-600 font-poppins-500">
          ₱25-30K/mo
        </Text>

        {data.hiringCriteria?.location && (
          <Text className="mb-2 text-gray-700 text-ba">
            Based in {data.hiringCriteria.location}
          </Text>
        )}

        <Text className="mb-2 text-base font-poppins-600">Required Skills</Text>

        {data.hiringCriteria?.requiredSkills.length > 0 && (
          <View className="flex-row flex-wrap gap-2 mb-3">
            {data.hiringCriteria.requiredSkills?.map((skill, index) => (
              <View
                key={index}
                className={`px-3 py-1  rounded-full ${getSkillColor(skill)}`}
              >
                <Text className="text-sm text-gray-800">{skill}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default JobCard;

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
