import { View, Text } from "react-native";
import Button from "../../../components/Button";
import { useAuth } from "../../../hooks/useAuth";

const AccountSettings = () => {
  const { logout } = useAuth();
  return (
    <View>
      <View className="px-6 mt-8 ">
        <Button
          title="Logout"
          onPress={logout}
          className="px-2 py-4 bg-red-500 rounded-xl "
          textClassName="text-center"
        />
      </View>
    </View>
  );
};

export default AccountSettings;
