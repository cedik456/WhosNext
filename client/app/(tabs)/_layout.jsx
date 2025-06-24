import React from "react";
import { Redirect, Tabs, useRouter } from "expo-router";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { ActivityIndicator } from "react-native-paper";

const TabsLayout = () => {
  const { user } = useAuth();

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
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={24}
              color="black"
              className="text-black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="bars-staggered"
              size={24}
              color="black"
              className="text-black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="like1"
              size={24}
              color="black"
              className="text-black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="message"
              size={24}
              color="black"
              className="text-black"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
