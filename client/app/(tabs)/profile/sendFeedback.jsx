import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";
import Constants from "expo-constants";

import api from "../../../utils/axiosInstance";
import { useAuth } from "../../../hooks/useAuth";
import { getToken } from "../../../utils/storage";
import { useNotifier } from "../../../contexts/NotifierContext";

const SendFeedback = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { user } = useAuth();
  const { notify } = useNotifier();

  // Display-only name (server still computes displayName from DB)
  const name = useMemo(() => user?.name || user?.companyName || "", [user]);

  const appVersion =
    Constants?.expoConfig?.version || Constants?.manifest?.version || "dev";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = !!title.trim() && !!description.trim() && !submitting;

  const onSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);

    try {
      const token = await getToken();
      const payload = {
        name: name || "Anonymous", // UI-only; backend uses DB snapshot
        title: title.trim(),
        description: description.trim(),
        appVersion,
      };

      const res = await api.post("/feedbacks", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.data?.success) {
        setTitle("");
        setDescription("");
        Keyboard.dismiss();

        notify?.({
          title: "Thanks!",
          body: "Your feedback was sent.",
          type: "success",
        });
        router.back();
      } else {
        Alert.alert("Failed to send feedback.");
      }
    } catch (e) {
      Alert.alert(
        e?.response?.data?.message || e?.message || "Failed to send feedback."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      {/* Header */}
      <View className="relative flex-row items-center justify-center px-6 mt-5">
        <Pressable onPress={() => router.back()} className="absolute left-6">
          <FontAwesome6
            name="chevron-left"
            size={24}
            color={isDark ? "white" : "black"}
          />
        </Pressable>
        <Text
          className={`${
            isDark ? "text-white" : "text-black"
          } text-2xl font-poppins-600`}
        >
          Send Feedback
        </Text>
        <Text className="absolute text-xs text-gray-500 right-6">
          v{appVersion}
        </Text>
      </View>

      {/* Form */}
      <View className="gap-4 px-6 mt-8">
        {/* Name (read-only) */}
        <TextInput
          value={name}
          editable={false}
          className={`px-4 py-3 rounded-xl border text-base font-poppins ${
            isDark
              ? "bg-zinc-900 text-white border-zinc-700"
              : "bg-gray-100 text-black border-gray-200"
          }`}
        />

        {/* Title */}
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Profile changes not saving"
          placeholderTextColor="#9ca3af"
          className={`px-4 py-3 rounded-xl border text-base font-poppins ${
            isDark
              ? "bg-zinc-900 text-white border-zinc-700"
              : "bg-white text-black border-gray-300"
          }`}
        />

        {/* Description */}
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="e.g., I edited my name and photo, tapped Save, but nothing changed on my profile. "
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          className={`px-4 py-3 h-40 rounded-xl border text-base font-poppins ${
            isDark
              ? "bg-zinc-900 text-white border-zinc-700"
              : "bg-white text-black border-gray-300"
          }`}
        />

        {/* Submit */}
        <Pressable
          disabled={!canSubmit}
          onPress={onSubmit}
          className={`mt-2 rounded-full items-center justify-center h-12 ${
            canSubmit
              ? "bg-black dark:bg-white"
              : "bg-gray-300 dark:bg-zinc-700"
          }`}
        >
          {submitting ? (
            <ActivityIndicator
              size="small"
              color={isDark ? "black" : "white"}
            />
          ) : (
            <Text
              className={`font-poppins-600 ${
                isDark ? "text-black" : "text-white"
              }`}
            >
              Send
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SendFeedback;
