import {
  Image,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import getSkillColor from "../utils/getSkillColor";

const JobCard = ({ data, color, onSeeMore }) => {
  // if (!data) return null;

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View
      className={`${
        Platform.OS === "ios" ? "h-[87%]" : "h-[100%]"
      }  shadow-sm rounded-xl overflow-hidden`}
      style={{ backgroundColor: color || "#fff" }}
    >
      {data.companyPicture ? (
        <Image
          source={{ uri: data.companyPicture }}
          resizeMode="cover"
          className="w-full h-[50%]"
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
          <Text className="mb-1 text-lg text-gray-700 font-poppins-500">
            {data.jobTitle}
          </Text>
        )}

        {(data.hiringCriteria?.workEnvironment ||
          data.hiringCriteria?.workType) && (
          <View className="flex-row items-center gap-2 mb-2 text-gray-700 font-poppins-500">
            {data.hiringCriteria?.workEnvironment && (
              <Text>{data.hiringCriteria.workEnvironment} |</Text>
            )}
            {data.hiringCriteria?.workType && (
              <Text>{data.hiringCriteria.workType}</Text>
            )}
          </View>
        )}

        {/* <Text className="mb-2 text-xl text-blue-600 font-poppins-500">
          ₱25-30K/mo
        </Text> */}

        {data.hiringCriteria?.location && (
          <Text className="gap-2 mb-2 text-gray-700 ">
            <FontAwesome6 name="location-dot" size={15} /> Based in{" "}
            {data.hiringCriteria.location}
          </Text>
        )}

        {data.hiringCriteria?.experienceLevel && (
          <View className="self-start px-3 py-1 mb-2 bg-blue-100 border border-blue-400 rounded-full">
            <Text className="text-sm text-blue-800 font-poppins-500">
              {data.hiringCriteria.experienceLevel}
            </Text>
          </View>
        )}

        <Text className="mb-2 text-base font-poppins-600">
          Preferred Skills
        </Text>

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
        <TouchableOpacity
          onPress={onSeeMore}
          className="flex-row items-center mt-2"
        >
          <Text className="mr-1 text-gray-600 font-poppins-500">
            {" "}
            See more...
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobCard;
