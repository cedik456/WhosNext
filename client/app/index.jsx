import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const LadingPage = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-red-500 mb-4">LadingPage</Text>
      <View className="flex-row gap-2">
        <Pressable
          className="p-2 bg-black rounded-md"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text className="text-white">Login</Text>
        </Pressable>

        <Pressable
          className="p-2 bg-black rounded-md"
          onPress={() => router.push("/(auth)/register")}
        >
          <Text className="text-white">Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LadingPage;

const styles = StyleSheet.create({});
