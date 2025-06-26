import { Pressable, Text, View } from "react-native";
// import { useAuth } from "../../hooks/useAuth";
import SwipeDeck from "../../components/SwipeDeck";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  // const { logout } = useAuth();
  return (
    <SafeAreaView className="flex-1">
      <View className="px-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-poppins-700">Who's Next</Text>

          <Ionicons name="options-outline" size={24} />
        </View>
      </View>
      {/* <Pressable className="w-32 p-3 bg-red-500 rounded-md" onPress={logout}>
        <Text className="text-center text-white">Logout</Text>
      </Pressable> */}
      <SwipeDeck />
    </SafeAreaView>
  );
};

export default Home;
