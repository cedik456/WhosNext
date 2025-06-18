import {
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import LandingPageLogo from "../../assets/landing-page-logo-black.png";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Email and password required");
      return;
    }
    setError("");

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const result = await login(email, password);

    console.log("Login Result", result);

    if (result.success) {
      router.replace("/home");
    } else {
      setError("Login Failed");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 px-6 bg-white">
        <View className="justify-between flex-1 mt-14">
          <View className="items-center mb-16">
            <Image source={LandingPageLogo} />
          </View>
          <View className="gap-4">
            <TextInput
              className="p-5 bg-[#F6F6F6] rounded-full font-poppins-500"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              className="p-5 rounded-full bg-[#F6F6F6] font-poppins-500"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Pressable
              className="p-5 bg-black border rounded-full"
              onPress={handleSubmit}
            >
              <Text className="text-center text-white font-poppins-700">
                LOGIN
              </Text>
            </Pressable>

            <Text className="text-center text-gray-500 font-poppins-500">
              Forgot Password?
            </Text>
            {error ? (
              <Text className="mt-2 text-center text-red-500">{error}</Text>
            ) : null}
          </View>

          <Text className="text-center">
            Don't have an account?
            <Text onPress={() => router.replace("/register")}> Register</Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
