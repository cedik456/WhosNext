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
// import SplashScreen from "../components/SplashScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { RefetchProvider } from "../contexts/RefetchContext";
import { ActivityIndicator } from "react-native";
import { useColorScheme } from "nativewind";

const RootLayout = () => {
  const { colorScheme } = useColorScheme();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator color="#ffffff" className="flex-1" />; // or a loading spinner
  }

  return (
    <AuthProvider>
      <RefetchProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </PaperProvider>
        </SafeAreaProvider>
      </RefetchProvider>
    </AuthProvider>
  );
};

export default RootLayout;
