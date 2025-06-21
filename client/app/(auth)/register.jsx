import {
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

const Register = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("All inputs are required");
      return;
    }
    setError("");

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const result = await register(email, password);

    if (result.success) {
      console.log("Registration successful, redirecting to /home");
      router.replace("/login");
    } else {
      setError(result.message);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 px-6 bg-white ">
        <View className="justify-center flex-1 gap-4 mt-14">
          <Text className="text-3xl font-poppins-700">Create your account</Text>
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
              className="p-5 bg-[#F6F6F6] rounded-full font-poppins-500"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Pressable
              className="p-5 bg-black border rounded-full"
              onPress={handleSubmit}
            >
              <Text className="font-bold text-center text-white">Submit</Text>
            </Pressable>
            <Text className="text-center font-poppins-500">
              Already have an account?
              <Text onPress={() => router.replace("/login")}> Click here</Text>
            </Text>
            <Text
              className={`mt-2 text-center ${
                error ? "text-red-500" : "text-transparent"
              }`}
            >
              {error || "placeholder"}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Register;
