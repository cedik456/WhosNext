import { Pressable, Text, View } from "react-native";
// import { useAuth } from "../../hooks/useAuth";
import SwipeDeck from "../../components/SwipeDeck";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";

const Home = () => {
  // const { logout } = useAuth();
  return (
    <SafeAreaView className="flex-1">
      <View className="px-5">
        <View className="absolute z-10 top-5 left-5 right-5 ">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-poppins-600">Who's Next?</Text>

            <Ionicons name="options" size={26} />
          </View>
        </View>
      </View>

      <SwipeDeck />
    </SafeAreaView>
  );
};

export default Home;
