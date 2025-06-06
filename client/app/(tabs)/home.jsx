import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import ProtectedRoutes from "../../components/ProtectedRoutes";

const Home = () => {
  const { logout } = useAuth();
  return (
    <ProtectedRoutes>
      <View className="flex-1 justify-center px-6">
        <Text className="mb-4">Home</Text>

        <Text className="mb-4">Logout here</Text>

        <Pressable className="p-3 bg-red-500 rounded-md w-32" onPress={logout}>
          <Text className="text-white text-center">Logout</Text>
        </Pressable>
      </View>
    </ProtectedRoutes>
  );
};

export default Home;

const styles = StyleSheet.create({});
