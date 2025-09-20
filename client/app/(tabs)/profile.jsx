import { Image, Text, View, TouchableOpacity, Alert } from "react-native";
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
import * as ImagePicker from "expo-image-picker";

const CLOUD_NAME = "datadgjo1";
const UPLOAD_PRESET = "unsigned-logo";

const Profile = () => {
  const { colorScheme } = useColorScheme();
  const [profile, setProfile] = useState(null);
  const { notify } = useNotifier();

  const [localLogo, setLocalLogo] = useState(null); // 👈 preview state
  const [uploading, setUploading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        const token = await getToken();
        const response = await api.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setProfile(response.data.data);
        }
      };

      fetchProfile();
    }, [])
  );

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

  const handleRecruiterLogoUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const pickedUri = result.assets[0].uri;
      setLocalLogo(pickedUri); // show preview immediately
      setUploading(true);

      try {
        const data = new FormData();
        data.append("file", {
          uri: pickedUri,
          type: "image/jpeg",
          name: "logo.jpg",
        });
        data.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: data }
        );
        const cloudinaryData = await res.json();

        if (cloudinaryData.secure_url) {
          const token = await getToken();
          await api.patch(
            "/profile/companyLogoUpload",
            { companyPicture: cloudinaryData.secure_url },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setProfile({ ...profile, companyPicture: cloudinaryData.secure_url });
          setLocalLogo(null); // clear temp preview
          Alert.alert("Success", "Logo updated successfully!");
        } else {
          throw new Error("Cloudinary upload failed");
        }
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Failed to upload logo. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

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
              <TouchableOpacity
                onPress={() => {
                  if (profile?.role === "jobSeeker") {
                    router.push("profile/selectAvatar");
                  } else {
                    handleRecruiterLogoUpload();
                  }
                }}
              >
                <Image
                  source={
                    localLogo
                      ? { uri: localLogo }
                      : profile?.role === "jobSeeker"
                      ? { uri: profile?.avatar }
                      : { uri: profile?.companyPicture }
                  }
                  className="w-[100px] h-[100px] rounded-full dark:border-gray-500 dark:border bg-black dark:bg-white "
                />
                <View className="absolute bottom-0 right-0 items-center justify-center w-8 h-8 bg-black border-2 border-white rounded-full dark:border-black dark:bg-white ">
                  <Ionicons
                    name="add"
                    size={18}
                    color={colorScheme === "dark" ? "black" : "white"}
                  />
                </View>
              </TouchableOpacity>
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
              {/* <ProfileItem
                onPress={() => router.push("profile/changeAvatar")}
                label="Change Avatar"
                value=""
                icon="people-sharp"
                iconSet={Ionicons}
                showDivider={true}
              /> */}

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
