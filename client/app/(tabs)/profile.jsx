import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { logout } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 mt-5">
        <Text className="text-2xl font-poppins-600">Profile</Text>
        <Button onPress={logout} title="Logout" className="rounded-full" />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
