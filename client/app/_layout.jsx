import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
