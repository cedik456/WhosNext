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

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const e = email.trim().toLowerCase();
    const p = password.trim();

    if (!e || !p) {
      Alert.alert("Email and password required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(e)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const result = await login(e, p);

      if (result.success) {
        if (!result.user.isVerified) {
          router.replace("/verifyCode");
          return;
        }

        if (result.user.isOnboarded) {
          router.replace("/home?justLoggedIn=1");
        } else {
          router.replace("/role");
        }
      } else {
        Alert.alert("Login Failed", result.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Something went wrong", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 px-6 bg-white">
        <View className="items-center">
          <Image
            source={require("../../assets/logown.png")}
            className="h-36 w-36"
          />
        </View>

        <View className="justify-center flex-1">
          <Text className="mb-2 text-3xl text-center font-poppins-500">
            Welcome Back!
          </Text>
          <Text className="mb-6 text-center font-poppins">
            Ready to find what you are looking for?
          </Text>

          <View className="mb-4">
            <Text className="mb-1 ml-2 text-lg text-gray-700 font-poppins-500 ">
              Email
            </Text>
            <TextInput
              className="p-5 border border-gray-300 rounded-full font-poppins-500"
              placeholder="Enter your email"
              placeholderTextColor="#9ca3af"
              value={email}
              autoCorrect={false}
              inputMode="email"
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View className="relative mb-4">
            <Text className="mb-1 ml-2 text-lg font-poppins-500 ">
              Password
            </Text>
            <TextInput
              className="p-5 border border-gray-300 rounded-full font-poppins-500"
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              maxLength={128}
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

          <View className="flex-row items-center justify-between px-1 mb-6">
            <Pressable
              onPress={() => setRememberMe((prev) => !prev)}
              className="flex-row items-center gap-2"
            >
              <View
                className={`w-5 h-5 rounded border  items-center justify-center ${
                  rememberMe
                    ? "bg-black border-black"
                    : "bg-white border-gray-400"
                }`}
              >
                {rememberMe && <Feather name="check" size={14} color="#fff" />}
              </View>
              <Text className="text-gray-700 font-poppins-500">
                Remember me
              </Text>
            </Pressable>
            <Pressable onPress={() => router.replace("/forgotPassword")}>
              <Text className="text-sm text-blue-500 font-poppins-500">
                Forgot password?
              </Text>
            </Pressable>
          </View>

          <Pressable
            className="p-5 bg-black border rounded-full"
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-center text-white font-poppins-700">
                LOGIN
              </Text>
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

          <Text className="text-center text-gray-700 font-poppins-500">
            Don't have an account?
            <Text
              className="underline"
              onPress={() => router.replace("/register")}
            >
              {" "}
              Sign up
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
