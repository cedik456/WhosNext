import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/storage";
import api from "../../utils/axiosInstance";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Button from "../../components/Button";

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
    <SafeAreaView className="flex-1 ">
      <View className="px-5 mt-5">
        <Text className="text-2xl font-poppins-600">Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="">
          <View className="items-center">
            <View className="relative">
              <Image
                source={{ uri: profile?.avatar || profile?.companyPicture }}
                className="w-[100px] h-[100px] rounded-full border"
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
                label="Work Preferences"
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
              className="px-2 py-4 bg-red-500 rounded-xl "
              textClassName="text-center"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileItem = ({
  label,
  value,
  icon,
  iconSet: IconSet,
  dot,
  onPress,
  showDivider,
}) => (
  <>
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4"
    >
      <View className="flex-row items-center">
        <View className="flex-row gap-4">
          <IconSet name={icon} size={22} color="black" />
          <Text className="text-lg font-poppins">{label}</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        {value ? (
          <Text className="text-gray-500 font-poppins-400">{value}</Text>
        ) : dot ? (
          <View className="w-2 h-2 bg-blue-500 rounded-full" />
        ) : null}
        <AntDesign name="right" size={20} color="#888" />
      </View>
    </TouchableOpacity>
    {showDivider && <View className="h-px ml-10 bg-gray-200" />}
  </>
);

export default Profile;
