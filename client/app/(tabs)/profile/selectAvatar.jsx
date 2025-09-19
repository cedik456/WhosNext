import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";
import Button from "../../../components/Button";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";

const AVATARS = Array.from(
  { length: 100 },
  (_, i) =>
    `https://res.cloudinary.com/datadgjo1/image/upload/avatars/avatar${
      i + 1
    }.png`
);

const SelectAvatar = () => {
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);

  const { colorScheme } = useColorScheme;

  const saveAvatar = async () => {
    if (!selected) {
      return Alert.alert("Please select an avatar first.");
    }

    try {
      setSaving(true);
      const token = await getToken();

      await api.patch(
        "/profile/avatarUpload",
        { avatar: selected },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert("Success", "Avatar updated!");
      router.replace("/profile");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update avatar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="relative flex-row items-center justify-center px-6 mt-5">
        <Pressable
          onPress={() => router.replace("/profile")}
          className="absolute left-6 "
        >
          <FontAwesome6
            name="chevron-left"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </Pressable>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } text-2xl  font-poppins-600 `}
        >
          Change your avatar
        </Text>
      </View>

      <FlatList
        data={AVATARS}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`m-2 rounded-lg border ${
              selected === item ? "border-black border" : "border-gray-400"
            }`}
          >
            <Image source={{ uri: item }} className="rounded-full w-28 h-28" />
          </TouchableOpacity>
        )}
      />

      <View className="px-6">
        <Button
          title={saving ? "Saving..." : "Save Avatar"}
          onPress={saveAvatar}
          disabled={saving || !selected}
          textClassName="text-center"
          className="mt-4 rounded-full"
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectAvatar;
