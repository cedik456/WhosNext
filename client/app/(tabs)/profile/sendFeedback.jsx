import { useEffect, useMemo, useState } from "react";
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
import * as SecureStore from "expo-secure-store";

const FEEDBACK_COOLDOWN_KEY = (userId) => `lastFeedbackTimestamp_${userId}`;
const COOLDOWN_HOURS = 6;

const SendFeedback = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { user } = useAuth();
  const userId = user?.id;
  const { notify } = useNotifier();

  // Display-only name (server still computes displayName from DB)
  const name = useMemo(() => user?.name || user?.companyName || "", [user]);

  const appVersion =
    Constants?.expoConfig?.version || Constants?.manifest?.version || "dev";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = !!title.trim() && !!description.trim() && !submitting;

  const [coolDownUntil, setCoolDownUntil] = useState(null);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      const saved = await SecureStore.getItemAsync(
        FEEDBACK_COOLDOWN_KEY(userId)
      );

      if (saved) {
        const lastTime = parseInt(saved, 10);
        const nextAllowed = lastTime + COOLDOWN_HOURS * 60 * 60 * 1000;

        if (Date.now() < nextAllowed) {
          setCoolDownUntil(nextAllowed);
        }
      }
    })();
  }, [userId]);

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
        await SecureStore.setItemAsync(
          FEEDBACK_COOLDOWN_KEY(userId),
          Date.now().toString()
        );

        setCoolDownUntil(Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000);
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

  const now = Date.now();
  const inCoolDown = coolDownUntil && now < coolDownUntil;
  const remainingHours = inCoolDown
    ? Math.ceil((coolDownUntil - now) / (1000 * 60 * 60))
    : 0;

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
        <TextInput value={name} editable={false} />

        {/* Title */}

        <View>
          <Text className="mb-2 text-base text-gray-700 dark:text-gray-300 font-poppins-500">
            Title
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            editable={!inCoolDown}
            placeholder="e.g., Profile changes not saving"
            placeholderTextColor="#9ca3af"
            className={`px-4 py-3 rounded-xl border text-base font-poppins ${
              isDark
                ? "bg-zinc-900 text-white border-zinc-700"
                : "bg-white text-black border-gray-300"
            }`}
          />
        </View>

        {/* Description */}
        <View>
          <Text className="mb-2 text-base text-gray-700 dark:text-gray-300 font-poppins-500">
            Description
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            editable={!inCoolDown}
            placeholder="e.g., I edited my name and photo, tapped Save, but nothing changed on my profile. "
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            className={`px-4 py-3 h-40 rounded-xl border text-base font-poppins ${
              isDark
                ? "bg-zinc-900 text-white "
                : "bg-white text-black border-gray-300"
            }`}
          />
        </View>

        {inCoolDown && (
          <Text className="text-sm text-red-500">
            You can send feedback again in ~{remainingHours} hours.
          </Text>
        )}

        {/* Submit */}
        <Pressable
          disabled={!canSubmit || inCoolDown}
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
