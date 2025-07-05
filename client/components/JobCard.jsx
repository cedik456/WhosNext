import { Image, Text, View } from "react-native";
import Company1 from "../assets/linkedin.png";
import { Ionicons } from "@expo/vector-icons";

const JobCard = ({ data }) => {
  // if (!data) return null;

  return (
    <View className="bg-white overflow-hidden rounded-2xl h-[89%] shadow-sm">
      <Image source={Company1} resizeMode="cover" className="w-full h-[60%]" />

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
              <View key={index} className="px-3 py-1 bg-gray-100 rounded-full">
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
