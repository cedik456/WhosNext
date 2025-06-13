import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import SplashScreen from "../components/SplashScreen";

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <SplashScreen />; // or a loading spinner
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />
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
