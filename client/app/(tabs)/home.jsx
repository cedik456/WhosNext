import { Pressable, Text, View } from "react-native";
import SwipeDeck from "../../components/SwipeDeck";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUserRole } from "../../utils/secureUser";
import { useColorScheme } from "nativewind";
import { useNotifier } from "../../contexts/NotifierContext";
import socket from "../../utils/socket";

const Home = () => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const { notify } = useNotifier();
  const [role, setRole] = useState(null);
  const welcomedRef = useRef(false);

  const { justLoggedIn } = useLocalSearchParams();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await getUserRole();
        setRole(storedRole);
      } catch (error) {}
    };
    fetchRole();
  }, []);

  useEffect(() => {
    if (welcomedRef.current || !justLoggedIn) return;

    welcomedRef.current = true;

    const timer = setTimeout(() => {
      notify({
        title: "Welcome to Who's Next!",
        body: "Swipe to discover your next match.",
        duration: 3000,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [notify, justLoggedIn]);

  const handleFilterPress = () => {
    if (!role) return;

    if (role === "recruiter") {
      router.push("/filters/recruiter");
    } else {
      router.push("/filters/jobSeeker");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onNewMessage = (payload) => {
        notify({
          title: payload?.senderName ?? "New message",
          body: payload?.text ?? "You received a message",
          avatar: payload?.senderAvatar,
          variant: "message",
        });
      };

      socket.on("newMessage", onNewMessage);

      // cleanup when screen loses focus
      return () => {
        socket.off("newMessage", onNewMessage);
      };
    }, [notify])
  );

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      <View className="px-5">
        <View className="absolute z-10 top-5 left-5 right-7 ">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-poppins dark:text-gray-100">
              who'snext?
            </Text>

            <View className="flex-row items-center gap-5">
              {role === "recruiter" && (
                <View className="">
                  <Pressable onPress={() => router.replace("/jobs/")}>
                    <Ionicons
                      name="briefcase" // suitcase-style icon
                      size={25}
                      color={colorScheme === "dark" ? "#D1D5DB" : "black"}
                    />
                    {/* <Text
                      className="text-xs font-poppins"
                      style={{
                        color: colorScheme === "dark" ? "#D1D5DB" : "black",
                      }}
                    >
                      Jobs
                    </Text> */}
                  </Pressable>
                </View>
              )}
              <Pressable onPress={handleFilterPress}>
                <Ionicons
                  name="options"
                  size={24}
                  color={colorScheme === "dark" ? "#D1D5DB" : "black"}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <SwipeDeck />
    </SafeAreaView>
  );
};

export default Home;
