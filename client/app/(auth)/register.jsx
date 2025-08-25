import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

const Register = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const timerRef = useRef(null);
  const onPressSignup = () => {
    if (loading) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleSubmit, 300);
  };

  const handleSubmit = async () => {
    const e = email.trim().toLowerCase();
    const p = password.trim();
    const cp = confirmPassword.trim();

    if (!e || !p || !cp) {
      Alert.alert("All inputs are required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(e)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }

    if (p.length < 8) {
      Alert.alert("Password must be at least 8 characters.");
      return;
    }

    if (p !== cp) {
      Alert.alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await register(e, p);

      if (result.success) {
        router.replace("/verifyCode");
      } else {
        Alert.alert("Sign up failed", result.message || "Please try again.");
      }
    } catch (error) {
      Alert.alert("Something went wrong", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 px-6 bg-white ">
        <View className="items-center">
          <Image
            source={require("../../assets/logown.png")}
            className="h-36 w-36"
          />
        </View>

        <View className="justify-center flex-1">
          <Text className="mb-2 text-3xl text-center font-poppins-500">
            Create your account
          </Text>

          <Text className="mb-6 text-center font-poppins">
            Sign up and find your future matches!
          </Text>

          <View className="mb-4">
            <Text className="mb-1 ml-2 text-lg text-gray-700 font-poppins-500 ">
              Email
            </Text>
            <TextInput
              className="p-5 border border-gray-300 rounded-full font-poppins-500"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              inputMode="email"
              returnKeyType="next"
            />
          </View>

          <View className="relative mb-4">
            <Text className="mb-1 ml-2 text-lg text-gray-700 font-poppins-500 ">
              Password
            </Text>

            <TextInput
              className="p-5 border border-gray-300 rounded-full font-poppins-500"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              textContentType="password"
              autoComplete="password"
              maxLength={128}
              returnKeyType="next"
            />

            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              className="absolute right-6 top-[65%] -translate-y-1/2"
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#9ca3af"
              />
            </Pressable>
          </View>

          <View className="relative mb-6">
            <Text className="mb-1 ml-2 text-lg text-gray-700 font-poppins-500 ">
              Confirm password
            </Text>

            <TextInput
              className="p-5 border border-gray-300 rounded-full font-poppins-500"
              placeholder="Re-type your password"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              textContentType="password"
              autoComplete="password"
              maxLength={128}
              returnKeyType="go"
              onSubmitEditing={onPressSignup}
            />

            <Pressable
              onPress={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-6 top-[65%] -translate-y-1/2"
            >
              <Feather
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={20}
                color="#9ca3af"
              />
            </Pressable>
          </View>

          <Pressable
            className="p-5 bg-black border rounded-full"
            onPress={onPressSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="font-bold text-center text-white">SIGNUP</Text>
            )}
          </Pressable>

          <View className="flex-row items-center my-4">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-3 text-gray-500">Or</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <View className="flex-row justify-center gap-4 mb-6">
            <View className="items-center justify-center w-16 h-16 border border-gray-300 rounded-full">
              <FontAwesome name="apple" size={24} />
            </View>
            <View className="items-center justify-center w-16 h-16 border border-gray-300 rounded-full">
              <AntDesign name="google" size={24} />
            </View>
            <View className="items-center justify-center w-16 h-16 border border-gray-300 rounded-full">
              <FontAwesome name="facebook-f" size={24} />
            </View>
          </View>

          <Text className="text-center font-poppins-500">
            Already have an account?
            <Text
              onPress={() => router.replace("/login")}
              className="underline"
            >
              {" "}
              Login here
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Register;
