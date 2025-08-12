import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const CompanyPicture = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    console.log("pickImage fired");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: false,
      quality: 0.7,
    });

    console.log("Picker result:", result);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert("No image selected", "Please choose a logo to upload");
      return;
    }

    try {
      setUploading(true);
      const token = await getToken();
      const formData = new FormData();

      formData.append("logo", {
        uri: image.uri,
        type: "image/jpeg",
        name: "company-logo.jpg",
      });

      const response = await api.post("/onboarding/logo/recruiter", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { success } = response.data;

      if (success) {
        router.replace("/recruiter/jobTitle");
      } else {
        Alert.alert(
          "Upload Failed",
          response.data.message || "Something went wrong"
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Upload error",
        "Check your internet connection or try again"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-1 mt-2 bg-gray-200 rounded-full">
        <View
          className="h-1 bg-black rounded-r-full "
          style={{ width: `${(3 / 9) * 100}%` }}
        />
      </View>

      <View className="flex-row items-center justify-between p-5">
        <TouchableOpacity onPress={() => router.replace("/name")}>
          <AntDesign name="left" size={24} color="gray" />
        </TouchableOpacity>

        <Text className="text-xs text-gray-500 font-poppins-500">3 of 9</Text>
      </View>

      <View className="flex-1 px-6">
        <View>
          <Text className="mb-6 text-3xl font-poppins-600">
            Upload your {"\n"}Company Logo
          </Text>
          {/* <Text className="mb-2 text-gray-400 font-poppins">
            This is how it will appear on your profile
          </Text> */}
          <View
            className={`relative items-center w-full h-[75%] ${
              image ? "" : "border-2 border-gray-300 border-dashed"
            } rounded-xl`}
          >
            <TouchableOpacity
              className="absolute inset-0 items-center justify-center"
              onPress={pickImage}
              activeOpacity={0.9}
            >
              {image ? (
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                  }}
                  resizeMode="contain"
                  pointerEvents="none"
                />
              ) : (
                <FontAwesome name="plus" size={50} color="#888" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title={uploading ? "Uploading..." : "Next"}
          onPress={handleUpload}
          textClassName="text-center"
          disabled={!image || uploading}
          className="mb-10 rounded-full"
        />
      </View>
    </SafeAreaView>
  );
};

export default CompanyPicture;
