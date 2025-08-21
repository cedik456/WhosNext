import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import api from "../utils/axiosInstance";
import { getToken } from "../utils/storage";
import { formatTime } from "../utils/formatCodeTime";

const VerifyCode = () => {
  const router = useRouter();
  const inputRef = useRef(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  const BOXES = 6;

  const boxes = Array.from({ length: BOXES }).map((_, i) => {
    const char = code[i] || "";
    const isActive = i === code.length;
    return (
      <View
        key={i}
        className={`h-16 w-14 rounded-xl  items-center justify-center border ${
          isActive ? "border-black" : "border-gray-300"
        } bg-white`}
      >
        <Text className="text-2xl font-poppins-600">{char}</Text>
      </View>
    );
  });

  useEffect(() => {
    if (code.length === BOXES) {
      handleVerify();
    }
  }, [code]);

  const handleVerify = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const token = await getToken();

      const response = await api.post(
        "/auth/verify",
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success, user, message } = response.data;

      if (success) {
        Alert.alert("Success!", "Email verified successfully");

        if (user.isOnboarded) {
          router.replace("/home");
        } else {
          router.replace("/role");
        }
      } else {
        Alert.alert("Error", message || "Verification failed.");
        setCode(""); // reset if failed
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || error.message || "Verification Failed"
      );
      setCode("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return; // stop when it reaches 0
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-8 mt-14">
        <View>
          <Text className="mb-2 text-2xl font-poppins-500">
            Enter the code we sent {"\n"}to your email
          </Text>

          <Text className="mb-6 text-gray-500 font-poppins">
            This code will expire in 10 minutes
          </Text>
        </View>

        <Pressable className="flex-row items-center justify-between mb-6">
          {boxes}
        </Pressable>

        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-500 font-poppins">
            Resend code
          </Text>

          <Text className="mb-6 text-xs text-gray-500 font-poppins">
            {formatTime(timeLeft)}
          </Text>
        </View>

        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={BOXES}
          autoFocus
          style={{ position: "absolute", opacity: 0, height: 0, width: 0 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default VerifyCode;
