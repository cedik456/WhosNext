import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View, Image, Pressable } from "react-native";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState([]);

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
    fetchMatches();
    fetchConversations();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchConversations();
    }, [])
  );

  const renderMatches = ({ item }) => {
    const user = item.jobSeekerId?.userId || item.recruiterId?.userId;
    const companyName = item.recruiterId?.companyName;

    const displayName = user?.name || companyName || "Recruiter";

    if (!user) return null;

    return (
      <View className="items-center mr-4">
        <Image
          source={{ uri: user.avatar }}
          className="w-20 h-20 border border-gray-400 rounded-full "
        />
        <Text className="mt-1 text-base text-gray-800 font-poppins-500">
          {displayName}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="px-5">
        <View className="mb-5">
          <Text className="mb-3 text-2xl font-poppins-600">Matches</Text>

          {matches.length > 0 ? (
            <FlatList
              data={matches}
              renderItem={renderMatches}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Text className="mt-10 text-center text-gray-400">
              No matches yet.
            </Text>
          )}
        </View>

        <View>
          <Text className="mb-3 text-xl font-poppins-600">Messages</Text>

          {messages.length > 0 ? (
            <FlatList
              data={messages}
              renderItem={({ item }) => {
                const { user, lastMessage, matchId, lastMessageAt, isUnread } =
                  item;

                return (
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/chat",
                        params: {
                          matchId,
                          name: user.name,
                          avatar: user.avatar,
                        },
                      })
                    }
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center mb-4">
                        <Image
                          source={{ uri: user.avatar }}
                          className="w-16 h-16 mr-3 border border-gray-500 rounded-full"
                        />
                        <View>
                          <Text className="text-lg text-gray-600 font-poppins-600">
                            {user.name}
                          </Text>
                          <View className="flex-row items-center gap-4">
                            <Text
                              className={`text-base ${
                                isUnread > 0
                                  ? "font-poppins-600 text-black"
                                  : "text-gray-500"
                              }`}
                            >
                              {lastMessage ?? "Start a conversation !"}
                            </Text>

                            <Text className="text-xs text-gray-400">
                              {lastMessageAt
                                ? dayjs(lastMessageAt).fromNow()
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
            <Text className="mt-5 text-center text-gray-400"></Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Matches;
