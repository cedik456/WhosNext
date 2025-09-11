import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import JobPostCard from "../../../components/JobPostCard";
import { useEffect, useState } from "react";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";
import { router } from "expo-router";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = await getToken();
        const response = await api.get("/jobs/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setJobs(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      <View className="dark:bg-black">
        <View className="flex-row items-center justify-between pl-6 pr-8 mt-5">
          <Text className="text-2xl font-poppins-600 dark:text-white">
            Job Posts
          </Text>

          <Pressable onPress={() => router.replace("/jobs/createJobs")}>
            <FontAwesome5 size={24} name="plus" />
          </Pressable>
        </View>
      </View>

      {loading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <JobPostCard job={item} />}
          contentContainerStyle={{ paddingVertical: 10 }}
          ListEmptyComponent={
            <Text className="mt-10 text-center text-gray-500 dark:text-gray-400">
              No jobs posted yet
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Jobs;
