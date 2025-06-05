import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";

const Login = () => {
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");

  return (
    <TouchableWithoutFeedback>
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
            placeholder="Email"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Pressable className="p-4 border bg-black rounded-md">
            <Text className="text-white font-bold text-center">Submit</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({});
