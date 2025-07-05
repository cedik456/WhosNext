import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button";

const Profile = () => {
  const { logout } = useAuth();
  return (
    <View className="items-center justify-center flex-1">
      <Button onPress={logout} title="Logout" className="rounded-full" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
