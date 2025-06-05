import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "../contexts/AuthContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
