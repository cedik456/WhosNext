import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileItem from "../../../components/ProfileItem";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { colorScheme, useColorScheme } from "nativewind";
import { useState } from "react";
import { router } from "expo-router";

const DarkMode = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const changeScheme = (scheme) => {
    setColorScheme(scheme);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${colorScheme === "dark" ? " bg-black" : ""}`}
    >
      <View
        className={`${
          colorScheme === "dark" ? "bg-black" : ""
        } text-2xl  font-poppins-600 `}
      >
        <View className="relative flex-row items-center justify-center px-6 mt-5">
          <Pressable onPress={() => router.back()} className="absolute left-7 ">
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
            Appearance
          </Text>
        </View>

        <View className="px-6 mt-8">
          <View
            className={`p-4 rounded-xl ${
              colorScheme === "dark" ? "bg-[#242526]" : "bg-gray-50"
            } `}
          >
            <ProfileItem
              label="Light"
              icon="sunny-outline"
              iconSet={Ionicons}
              dot={colorScheme === "light"}
              onPress={() => changeScheme("light")}
              showDivider={true}
            />

            <ProfileItem
              label="Dark"
              icon="moon-outline"
              iconSet={Ionicons}
              dot={colorScheme === "dark"}
              onPress={() => changeScheme("dark")}
              showDivider={true}
            />

            <ProfileItem
              label="System"
              icon="settings-outline"
              iconSet={Ionicons}
              dot={colorScheme === "system"}
              onPress={() => changeScheme("system")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DarkMode;
