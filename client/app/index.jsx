import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthButton from "../components/AuthButton";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

const LandingPage = () => {
  const [logoReady, setLogoReady] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const isReady = logoReady && heroReady;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="justify-between flex-1 px-6 ">
        {!isReady && (
          <View className="absolute inset-0 z-10 items-center justify-center bg-white">
            <Image
              source={require("../assets/logown.png")}
              className="w-44 h-44"
            />
          </View>
        )}
        <View className="items-center">
          <Image
            source={require("../assets/logown.png")}
            className="w-44 h-44"
            onLoadEnd={() => setLogoReady(true)}
          />
        </View>

        <View className="gap-8">
          <Image
            source={require("../assets/landing-page.png")}
            className="w-auto h-auto"
            onLoadEnd={() => setHeroReady(true)}
          />
          <Text>
            <Text className="mt-4 text-sm leading-5 text-center text-neutral-600 max-w-[420px]">
              By tapping “Sign in”, you agree to our{" "}
              <Text className="underline">Terms</Text>. Learn how we process
              your data in our <Text className="underline">Privacy Policy</Text>{" "}
              and <Text className="underline">Cookies Policy</Text>.
            </Text>
          </Text>

          <View className="w-full gap-3">
            <AuthButton
              label="Sign in with Email"
              onPress={() => router.push("/login")}
              icon={<MaterialIcons name="email" size={24} color="white" />}
            />
            <AuthButton
              label="Sign in with Google"
              onPress={() => {}}
              icon={<AntDesign name="google" size={24} color="white" />}
            />
            <AuthButton
              label="Sign in with phone number"
              onPress={() => {}}
              icon={<FontAwesome name="phone" size={24} color="white" />}
            />
          </View>
          <Text className="text-sm text-center font-poppins-600">
            Trouble signing in?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
