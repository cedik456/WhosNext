import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getToken } from "../utils/storage";
import api from "../utils/axiosInstance";
import socket from "../utils/socket";
import { useColorScheme } from "nativewind";

const Chat = () => {
  const router = useRouter();
  const flatListRef = useRef(null);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const { matchId, name, avatar } = useLocalSearchParams();

  const { colorScheme } = useColorScheme();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await getToken();

        const response = await api.get(`/messages/${matchId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { success, data } = response.data;

        if (success) {
          setMessages(data);
        }
      } catch (error) {
        console.error("Fetch messages error:", error.message);
      }
    };

    const markAsRead = async () => {
      try {
        const token = await getToken();

        await api.patch(`/messages/markAsRead/${matchId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Reading messages error:", error.message);
      }
    };

    const handleNewMessage = (message) => {
      if (message.matchId === matchId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.emit("join", matchId);
    socket.on("newMessage", handleNewMessage);

    if (matchId) {
      markAsRead();
      fetchMessages();
      fetchCurrentUser();
    }

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [matchId]);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const token = await getToken();
      const response = await api.post(
        "/messages",
        { matchId, text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success, data } = response.data;

      if (success) {
        socket.emit("sendMessage", { matchId, message: data });

        setText("");
      }
    } catch (error) {
      console.error("Send message error:", error.message);
    }
  };

  const fetchCurrentUser = async () => {
    const token = await getToken();
    const response = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { success, data } = response.data;

    if (success) {
      setCurrentUserId(data._id);
    }
  };

  const renderMessage = ({ item }) => {
    const senderIsMe = item.sender?._id === currentUserId;

    return (
      <View
        className={`px-3 py-2 rounded-2xl my-1 max-w-[60%] ${
          senderIsMe
            ? "bg-gray-200 self-end rounded-tr-none"
            : "bg-gray-100 self-start rounded-tl-none"
        }`}
      >
        <Text className="text-base font-poppins">{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <View className="flex-row items-center justify-between p-4 ">
              <View className="flex-row items-center">
                <Pressable onPress={() => router.back()} className="mr-4">
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </Pressable>
                <Image
                  source={{ uri: avatar }}
                  className="w-10 h-10 mr-2 border border-gray-300 rounded-full"
                />
                <Text className="text-2xl font-poppins-600 dark:text-white ">
                  {name}
                </Text>
              </View>
              <Entypo name="dots-three-vertical" size={18} />
            </View>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item, index) =>
                item._id?.toString() || `${item.createdAt}-${index}`
              }
              contentContainerStyle={{ padding: 16, flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={() => {
                if (flatListRef.current) {
                  flatListRef.current.scrollToEnd({ animated: true });
                }
              }}
            />
            <View className="flex-row items-center gap-4 p-4 bg-white dark:bg-black">
              <Pressable>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "gray"}
                />
              </Pressable>

              <View className="flex-row items-center flex-1 px-3 border border-gray-200 rounded-full justify-items-end">
                <TextInput
                  className="flex-1 px-3 py-3 font-poppins dark:text-white"
                  value={text}
                  onChangeText={setText}
                />
                <Pressable onPress={sendMessage}>
                  <Ionicons
                    name="send"
                    size={22}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
