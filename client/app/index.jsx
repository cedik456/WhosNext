import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import LandingPageLogo from "../assets/landing-page-logo-black.png";

const LandingPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View className="mt-14 flex-1 justify-between">
        <View className="items-center mb-16">
          <Image source={LandingPageLogo} />
          {/* <Text className="font-poppins-500 text-2xl text-black font-semibold text-center mb-72">
            Swipe, Match, Hire!
          </Text> */}
        </View>

        <View className="gap-4 mb-10">
          <Text className="text-gray-500 text-center ">
            By signing up, you agree to our{" "}
            <Text className="underline">Terms</Text>. See how we use your data
            in our <Text className="underline">Privacy Policy</Text>
          </Text>

          <Pressable
            className="bg-black p-5 rounded-3xl"
            onPress={() => router.replace("/login")}
          >
            <Text className="text-white text-center text-lg font-poppins-500">
              Sign in
            </Text>
          </Pressable>

          <Pressable
            className="bg-black p-5 rounded-3xl mb-4"
            onPress={() => router.replace("/register")}
          >
            <Text className="text-white text-center text-lg font-poppins-500">
              Create an account
            </Text>
          </Pressable>

          <Text className="text-black text-center text-lg font-poppins-600">
            Trouble signing in?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
