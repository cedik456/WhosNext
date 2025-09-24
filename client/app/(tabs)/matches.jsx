import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { formatMessengerStyleTime } from "../../utils/formatTime";
import { useNotifStore } from "../../stores/notifStore";
import ActionSheet from "../../components/ActionSheet";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Matches = () => {
  const resetBadge = useNotifStore((s) => s.reset);

  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [selectedConv, setSelectedConv] = useState(null);

  const router = useRouter();

  const fetchMatches = async () => {
    try {
      const token = await getToken();

      const response = await api.get("/matches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success, data } = response.data;

      if (success) {
        setMatches(data);
      }
    } catch (error) {
      console.error("Error fetching matches:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async () => {
    try {
      const token = await getToken();

      const response = await api.get("/messages/conversations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success, data } = response.data;

      if (success) {
        const sorted = data.sort(
          (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
        );
        setMessages(sorted);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error.message);
    }
  };
  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      await fetchMatches();
      await fetchConversations();
    };
    loadInitial();
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetBadge();
      fetchConversations();
      fetchMatches();
    }, [resetBadge])
  );

  const showActionSheet = (item) => {
    setSelectedConv(item);
    setActionSheetVisible(true);
  };
  const hideActionSheet = () => {
    setActionSheetVisible(false);
    setSelectedConv(null);
  };

  const handleDeleteChat = async () => {
    try {
      const token = await getToken();
      const resp = await api.delete(
        `/messages/conversations/${selectedConv.matchId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (resp.data.success) {
        setMessages((prev) =>
          prev.filter((c) => c.matchId !== selectedConv.matchId)
        );
      }
    } catch (error) {
      console.error("Delete chat error:", error);
    }
    hideActionSheet();
  };
  const handlePinToTop = () => {
    setMessages((prev) => {
      const filtered = prev.filter((c) => c.matchId !== selectedConv.matchId);
      return [selectedConv, ...filtered];
    });
    hideActionSheet();
  };
  const handleUnmatch = async () => {
    try {
      const token = await getToken();
      const resp = await api.delete(
        `/matches/${selectedConv.matchId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (resp.data.success) {
        setMatches((prev) =>
          prev.filter((m) => m._id !== selectedConv.matchId)
        );
        setMessages((prev) =>
          prev.filter((c) => c.matchId !== selectedConv.matchId)
        );
      }
    } catch (error) {
      console.error("Unmatch error:", error);
    }
    hideActionSheet();
  };

  const renderMatches = ({ item }) => {
    const isJobSeeker = !!item.recruiterId;
    const user = item.jobSeekerId?.userId || item.recruiterId?.userId;
    const companyName = item.recruiterId?.companyName;
    const profileImage = item.recruiterId?.companyPicture || user?.avatar;

    let displayName;
    if (item.recruiterId && companyName) {
      displayName = companyName;
    } else if (item.jobSeekerId && item.jobSeekerId.userId?.name) {
      displayName = item.jobSeekerId.userId.name;
    } else if (user?.name) {
      displayName = user.name;
    } else {
      displayName = "Recruiter";
    }

    if (!profileImage) return null;

    return (
      <View className="items-center mr-4">
        <Image
          source={{ uri: profileImage }}
          className="w-20 h-20 bg-gray-200 rounded-full "
        />
        <Text className="mt-1 text-base text-gray-700 font-poppins-500 dark:text-gray-200">
          {displayName}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      {loading ? (
        <View className="items-center justify-center flex-1">
          <Text className="mt-3 text-lg text-gray-500 font-poppins">
            Loading matches...
          </Text>
        </View>
      ) : (
        <View className="px-6 mt-5">
          <View className="mb-5">
            <Text className="mb-3 text-2xl font-poppins-600 dark:text-white">
              Matches
            </Text>

            {matches.length > 0 ? (
              <FlatList
                data={matches}
                renderItem={renderMatches}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <Text className="mt-10 text-sm text-center text-gray-400">
                No matches yet.
              </Text>
            )}
          </View>

          <View>
            <Text className="mb-3 text-xl font-poppins-600 dark:text-white">
              Messages
            </Text>

            {messages.length > 0 ? (
              <FlatList
                data={messages}
                className="h-[490px]"
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const {
                    user,
                    lastMessage,
                    matchId,
                    lastMessageAt,
                    isUnread,
                  } = item;

                  const profileImage = user.companyPicture || user.avatar;

                  return (
                    <Pressable
                      onPress={() =>
                        router.push({
                          pathname: "/chat",
                          params: {
                            matchId,
                            name: user.name,
                            avatar: profileImage,
                          },
                        })
                      }
                      onLongPress={() => showActionSheet(item)}
                      android_ripple={{ color: "#e5e7eb" }}
                      style={({ pressed }) => [
                        pressed && { backgroundColor: "#e5e7eb" },
                      ]}
                      className="rounded-lg"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center mb-4">
                          <Image
                            source={{ uri: profileImage }}
                            className="w-16 h-16 mr-3 bg-gray-200 rounded-full"
                          />
                          <View>
                            <Text className="text-lg text-gray-600 font-poppins-600 dark:text-white">
                              {user.name}
                            </Text>
                            <View className="flex-row items-center gap-4">
                              <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                className={`font-poppins  ${
                                  isUnread > 0
                                    ? "text-black font-poppins-500"
                                    : "text-gray-500"
                                } max-w-[180px]`}
                              >
                                {lastMessage ?? "Start a conversation!"}
                              </Text>

                              <Text className="text-xs text-gray-400">
                                {lastMessageAt
                                  ? formatMessengerStyleTime(lastMessageAt)
                                  : ""}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View className="flex-row items-center gap-10">
                          {isUnread > 0 ? (
                            <View className="w-2 h-2 bg-blue-600 rounded-full"></View>
                          ) : (
                            <View></View>
                          )}
                        </View>
                      </View>
                    </Pressable>
                  );
                }}
                keyExtractor={(item) => item.matchId}
              />
            ) : (
              <Text className="mt-5 text-sm text-gray-400">
                No messages yet
              </Text>
            )}
          </View>
        </View>
      )}

      <ActionSheet
        visible={actionSheetVisible}
        onClose={hideActionSheet}
        options={[
          {
            label: "Delete Chat",
            onPress: handleDeleteChat,
            icon: <AntDesign name="delete" size={20} color="#000" />,
          },
          {
            label: "Pin to Top",
            onPress: handlePinToTop,
            icon: <MaterialIcons name="push-pin" size={20} color="#000" />,
          },
          {
            label: "Unmatch",
            onPress: handleUnmatch,
            textClassName: "text-red-500",
            icon: <MaterialIcons name="person-remove" size={20} color="red" />,
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default Matches;