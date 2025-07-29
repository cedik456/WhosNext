import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Button from "../../components/Button";
import { router } from "expo-router";
import ProfileItem from "../../components/ProfileItem";

const Profile = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);

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

  return (
    <SafeAreaView className="flex-1">
      <View className="dark:bg-black">
        <View className="px-6 mt-5">
          <Text className="text-2xl font-poppins-600 dark:text-white">
            Profile
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="">
            <View className="items-center">
              <View className="relative">
                <Image
                  source={
                    profile?.role === "jobSeeker"
                      ? { uri: profile?.avatar }
                      : { uri: profile?.companyPicture }
                  }
                  className="w-[100px] h-[100px] rounded-full "
                />
                {/* <TouchableOpacity className="absolute bottom-0 right-0">
            <FontAwesome name="camera" size={20} />
          </TouchableOpacity> */}
              </View>
              <Text className="mt-2 text-3xl font-poppins-600">
                {profile?.name || profile?.companyName}
              </Text>
              <Text className="text-xl text-gray-500">
                {profile?.role === "jobSeeker" ? "Job Seeker" : "Recruiter"}
              </Text>
            </View>

            <View className="px-6 mt-8 ">
              <View className="p-4 rounded-xl bg-gray-50">
                <ProfileItem
                  onPress={() => router.push("/darkMode")}
                  label="Dark Mode"
                  value="Off"
                  icon="moon"
                  iconSet={Ionicons}
                  showDivider={true}
                />
                <ProfileItem
                  label="Edit Profile"
                  value=""
                  icon="user-alt"
                  iconSet={FontAwesome5}
                />
              </View>
            </View>

            <View className="px-6 mt-8 ">
              <View className="p-5 rounded-xl bg-gray-50">
                <ProfileItem
                  label={`${
                    profile?.role === "jobSeeker" ? "Work" : "Hiring"
                  } Preferences`}
                  value=""
                  icon="suitcase"
                  iconSet={FontAwesome}
                  showDivider={true}
                />

                <ProfileItem
                  label="Change Avatar"
                  value=""
                  icon="people-sharp"
                  iconSet={Ionicons}
                  showDivider={true}
                />

                <ProfileItem
                  label="Notifications & Sounds"
                  value=""
                  icon="people-sharp"
                  iconSet={Ionicons}
                  showDivider={false}
                />
              </View>
            </View>

            <View className="px-6 mt-8 ">
              <View className="p-4 rounded-xl bg-gray-50">
                <ProfileItem
                  label="Privacy & Safety"
                  value=""
                  icon="privacy-tip"
                  iconSet={MaterialIcons}
                  showDivider={true}
                />
                <ProfileItem
                  label="Account Settings"
                  value=""
                  icon="settings-sharp"
                  iconSet={Ionicons}
                  showDivider={false}
                />
              </View>
            </View>

            <View className="px-6 mt-8 ">
              <Button
                title="Logout"
                onPress={logout}
                className="px-2 py-4 bg-red-500 rounded-xl "
                textClassName="text-center"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
