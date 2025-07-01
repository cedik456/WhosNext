import {
  Alert,
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

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Email and password required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      if (result.isOnboarded) {
        router.replace("/home");
      } else {
        router.replace("/role");
      }
    } else {
      Alert.alert("Login Failed", result.message || "Invalid credentials");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 px-6 bg-white">
        <View className="justify-between flex-1 mt-14">
          <Text className="text-3xl font-poppins-700">Login your account</Text>
          <View className="gap-4">
            <TextInput
              className="p-5 bg-[#F6F6F6]  rounded-full font-poppins-500"
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
          </View>

          <Text className="text-center font-poppins-500">
            Don't have an account?
            <Text onPress={() => router.replace("/register")}> Register</Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
