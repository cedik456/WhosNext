import { SafeAreaProvider } from "react-native-safe-area-context";

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
import { Provider as PaperProvider } from "react-native-paper";

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
        <PaperProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default RootLayout;
