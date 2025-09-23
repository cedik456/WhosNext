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
import JobPostCarousel from "./JobPostCarousel";

const JobCard = ({ data, color, onSeeMore }) => {
  // if (!data) return null;

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

        <JobPostCarousel
          recruiter={data}
          onSeeMore={onSeeMore}
          getCurrentId={(jobId) => {
            data.currentJobId = jobId; // 👈 attach the current jobId directly to the card data
          }}
        />
      </View>
    </View>
  );
};

export default JobCard;
