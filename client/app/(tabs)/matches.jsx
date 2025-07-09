import { useEffect, useState } from "react";
import { FlatList, Text, View, Image } from "react-native";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
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
    fetchMatches();
  }, []);

  const renderMatches = ({ item }) => {
    const user = item.jobSeekerId?.userId || item.recruiterId?.userId;
    const companyName = item.recruiterId?.companyName;

    const displayName = user?.name || companyName || "Recruiter";

    if (!user) return null;

    return (
      <View className="items-center mr-4">
        <Image
          source={{ uri: user.avatar }}
          className="w-20 h-20 border-2 border-gray-400 rounded-full"
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Matches;
