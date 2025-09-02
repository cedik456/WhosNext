import React from "react";
import { Redirect, Tabs, useSegments } from "expo-router";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { ActivityIndicator } from "react-native-paper";
import { useColorScheme } from "nativewind";
import { View, TouchableOpacity } from "react-native";
import { useNotifStore } from "../../stores/notifStore";

const TabsLayout = () => {
  const { user } = useAuth();
  const { colorScheme } = useColorScheme();
  const segments = useSegments();

  const badge = useNotifStore((s) => s.count);

  const hideTabs =
    segments.includes("settings") || segments.includes("settingsScreen");

  if (user === undefined) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colorScheme === "dark" ? "white" : "black",
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "Poppins-Medium",
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: colorScheme === "dark" ? "black" : "#F3F3F3",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          display: hideTabs ? "none" : "flex",
        },
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={
                focused
                  ? colorScheme === "dark"
                    ? "white"
                    : "black"
                  : "#9ca3af"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "People",
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="bars-staggered"
              size={25}
              color={
                focused
                  ? colorScheme === "dark"
                    ? "white"
                    : "black"
                  : "#9ca3af"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          tabBarLabel: "Matches",
          tabBarBadge: badge > 0 ? badge : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "red",
            color: "white",
            fontSize: 11,
            fontWeight: "600",
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            textAlign: "center",
            lineHeight: 18,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubble-sharp"
              size={24}
              color={
                focused
                  ? colorScheme === "dark"
                    ? "white"
                    : "black"
                  : "#9ca3af"
              }
            />
          ),
        }}
      />
      {/* Profile Screens */}
      <Tabs.Screen
        name="profile/darkMode"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/editProfile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/editProfileRecruiter"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/changeAvatar"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/notifSounds"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/privacySafety"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/sendFeedback"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settingsScreen"
        options={{
          href: null,
        }}
      />

      {/* Settings Screens */}
      <Tabs.Screen
        name="profile/settings/about"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/contact"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/general"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/help"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/terms"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
