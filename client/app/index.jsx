import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

import LandingPageLogo from "../assets/landing-page-logo-black.png";

const LandingPage = () => {
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
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View className="mt-14">
        <View className="items-center">
          <Image className="mb-16" source={LandingPageLogo} />
          <Text className="text-2xl text-black font-semibold text-center mb-60">
            Swipe, Match, Hire!
          </Text>
        </View>

        <View className="mb-20">
          <View className="gap-4 mb-10">
            <Text className="text-black text-center ">
              By signing up, you agree to our{" "}
              <Text className="underline">Terms</Text>. See how we use your data
              in our <Text className="underline">Privacy Policy</Text>
            </Text>

            <Pressable className="bg-black p-5 rounded-3xl">
              <Text className="text-white text-center text-lg font-semibold">
                Sign in with Google
              </Text>
            </Pressable>

            <Pressable className="bg-[#1D70EE] p-5 rounded-3xl">
              <Text className="text-white text-center text-lg font-semibold">
                Sign in with Facebook
              </Text>
            </Pressable>

            <Pressable className="bg-white p-5 rounded-3xl shadow-md ">
              <Text className="text-black text-center text-lg font-semibold">
                Sign in with phone number
              </Text>
            </Pressable>
          </View>

          <Text className="text-black text-center text-lg font-semibold">
            Trouble signing in?
          </Text>
        </View>

        {/* <View className="gap-2">
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
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
