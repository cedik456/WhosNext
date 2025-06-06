import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";

const LadingPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/home");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
