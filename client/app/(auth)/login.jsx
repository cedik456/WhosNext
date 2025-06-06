import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "expo-router";

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
      <View className="flex-1  justify-center px-6 bg-white">
        <Text className="mb-4">Login to your account</Text>
        <View className="gap-2">
          <TextInput
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Pressable
            className="p-4 border bg-black rounded-md"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-center">Submit</Text>
          </Pressable>
          {error ? (
            <Text className="text-red-500 text-center mt-2">{error}</Text>
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({});
