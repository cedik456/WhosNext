import { StyleSheet, Text, View } from "react-native";
import React from "react";

const JobCard = ({ data }) => {
  if (!data) return null;

  const criteria = data.hiringCriteria || {};
  return (
    <View className="self-center bg-white shadow-md rounded-2xl">
      <Text>JobCard</Text>
    </View>
  );
};

export default JobCard;
