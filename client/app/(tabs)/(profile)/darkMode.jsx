import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileItem from "../../../components/ProfileItem";
import { Ionicons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";
import { useState } from "react";

export const href = null; // Prevents this from showing as a tab

const DarkMode = () => {
  const [currentScheme, setCurrentScheme] = useState("light");

  const changeScheme = (scheme) => {
    setCurrentScheme(scheme);
    colorScheme.set(scheme);
  };

  return (
    <SafeAreaView
      className={currentScheme === "dark" ? "dark flex-1 bg-black" : "flex-1"}
    >
      <View
        className={`${
          currentScheme === "dark" ? "bg-black" : ""
        } text-2xl  font-poppins-600 `}
      >
        <View className="px-6 mt-5">
          <Text
            className={`${
              currentScheme === "dark" ? "text-white" : "text-black"
            } text-2xl  font-poppins-600 `}
          >
            Appearance
          </Text>
        </View>

        <View className="px-6 mt-8">
          <View
            className={`p-4 rounded-xl ${
              currentScheme === "dark" ? "bg-[#242526]" : "bg-gray-50"
            } `}
          >
            <ProfileItem
              label="Light"
              icon="sunny-outline"
              iconSet={Ionicons}
              dot={currentScheme === "light"}
              onPress={() => changeScheme("light")}
              showDivider={true}
            />

            <ProfileItem
              label="Dark"
              icon="moon-outline"
              iconSet={Ionicons}
              dot={currentScheme === "dark"}
              onPress={() => changeScheme("dark")}
              showDivider={true}
            />

            <ProfileItem
              label="System"
              icon="settings-outline"
              iconSet={Ionicons}
              dot={currentScheme === "system"}
              onPress={() => changeScheme("system")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DarkMode;
