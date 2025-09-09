import { Image, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import ProfileItem from "../../components/ProfileItem";
import { useColorScheme } from "nativewind";
import Button from "../../components/Button";
import { useNotifier } from "../../contexts/NotifierContext";
import socket from "../../utils/socket";

const Profile = () => {
  const { colorScheme } = useColorScheme();
  const [profile, setProfile] = useState(null);
  const { notify } = useNotifier();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await getToken();

      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setProfile(response.data.data);
      }
    };

    fetchProfile();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onNewMessage = (payload) => {
        notify({
          title: payload?.senderName ?? "New message",
          body: payload?.text ?? "You received a message",
          avatar: payload?.senderAvatar,
          variant: "message",
        });
      };

      socket.on("newMessage", onNewMessage);

      return () => {
        socket.off("newMessage", onNewMessage);
      };
    }, [notify])
  );

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      <View className="dark:bg-black">
        <View className="flex-row items-center justify-between px-6 mt-4">
          <Text className="text-2xl font-poppins-600 dark:text-white">
            Profile
          </Text>
          <ProfileItem
            onPress={() => router.replace("profile/settingsScreen")}
            value=""
            icon="settings-sharp"
            iconSet={Ionicons}
            iconOnly
          />
        </View>

        <View className="">
          <View className="items-center">
            <View className="relative">
              <Image
                source={
                  profile?.role === "jobSeeker"
                    ? { uri: profile?.avatar }
                    : { uri: profile?.companyPicture }
                }
                className="w-[100px] h-[100px] rounded-full dark:border-gray-500 dark:border bg-black dark:bg-white "
              />
              {/* <TouchableOpacity className="absolute bottom-0 right-0">
            <FontAwesome name="camera" size={20} />
          </TouchableOpacity> */}
            </View>
            <Text className="mt-2 text-3xl font-poppins-600 dark:text-white">
              {profile?.name || profile?.companyName}
            </Text>
            <Text className="text-xl text-gray-500">
              {profile?.role === "jobSeeker" ? "Job Seeker" : "Recruiter"}
            </Text>
          </View>

          <View className="px-6 mt-8">
            <View className="p-5 rounded-xl bg-gray-50 dark:bg-[#242526]">
              <ProfileItem
                onPress={() => router.push("profile/darkMode")}
                label="Dark Mode"
                value="Off"
                icon="moon"
                iconSet={Ionicons}
                showDivider={true}
                showStatus={true}
              />
              <ProfileItem
                onPress={async () => {
                  const role = profile?.role;
                  if (role === "recruiter") {
                    router.push("profile/editProfileRecruiter");
                  } else {
                    router.push("profile/editProfile");
                  }
                }}
                label="Edit Profile"
                value=""
                icon="user-alt"
                iconSet={FontAwesome5}
              />
            </View>
          </View>

          <View className="p-5">
            <View className="py-6 px-5 rounded-xl bg-gray-50 dark:bg-[#242526]">
              <ProfileItem
                onPress={() => router.push("profile/notifSounds")}
                label="Notifications & Sounds"
                value=""
                icon="people-sharp"
                iconSet={Ionicons}
                showDivider={true}
              />

              <ProfileItem
                onPress={() => router.push("profile/privacySafety")}
                label="Privacy & Safety"
                value=""
                icon="privacy-tip"
                iconSet={MaterialIcons}
                showDivider={true}
              />
              <ProfileItem
                onPress={() => router.push("profile/changeAvatar")}
                label="Change Avatar"
                value=""
                icon="people-sharp"
                iconSet={Ionicons}
                showDivider={true}
              />

              <ProfileItem
                onPress={() => router.push("profile/sendFeedback")}
                label="Send Feedback"
                value=""
                icon="feedback"
                iconSet={MaterialIcons}
                showDivider={false}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
