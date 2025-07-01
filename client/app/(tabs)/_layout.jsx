import React from "react";
import { Redirect, Tabs } from "expo-router";
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
        tabBarShowLabel: true,
        tabBarActiveTintColor: "black",
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
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="black" />
            ) : (
              <Ionicons name="person" size={24} color="#9ca3af" />
            ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "People",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome6 name="bars-staggered" size={24} color="black" />
            ) : (
              <FontAwesome6 name="bars-staggered" size={24} color="#9ca3af" />
            ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          tabBarLabel: "Liked you",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="like1" size={24} color="black" />
            ) : (
              <AntDesign name="like1" size={24} color="#9ca3af" />
            ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="chatbubble-sharp" size={24} color="black" />
            ) : (
              <Ionicons name="chatbubble-sharp" size={24} color="#9ca3af" />
            ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
