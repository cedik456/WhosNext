import { View, Text } from "react-native";
import Button from "../../../components/Button";
import { useAuth } from "../../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountSettings = () => {
  const { logout } = useAuth();
  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      <View className="px-6 mt-8 ">
        <Button
          title="Logout"
          onPress={logout}
          className="px-2 py-4 bg-red-500 rounded-xl "
          textClassName="text-center"
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountSettings;
