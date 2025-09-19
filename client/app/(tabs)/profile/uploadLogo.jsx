import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "../../../components/Button";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";

const CLOUD_NAME = "datadgjo1";
const UPLOAD_PRESET = "unsigned_logo";

const UploadLogo = () => {
  const [logo, setLogo] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // square crop
      quality: 0.7,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  // Upload logo to Cloudinary, then save to backend
  const uploadLogo = async () => {
    if (!logo) return;

    setUploading(true);
    try {
      const token = await getToken();

      // Upload to Cloudinary
      const data = new FormData();
      data.append("file", {
        uri: logo,
        type: "image/jpeg",
        name: "logo.jpg",
      });
      data.append("upload_preset", UPLOAD_PRESET); // replace with your Cloudinary preset

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const cloudinaryData = await cloudinaryRes.json();

      if (!cloudinaryData.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      // Save logo URL in backend
      await api.patch(
        "/profile/companyPicture",
        { companyPicture: cloudinaryData.secure_url },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert("Success", "Logo updated successfully!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to upload logo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="items-center justify-center flex-1 bg-white dark:bg-black">
      {/* Logo preview or placeholder */}
      <TouchableOpacity onPress={pickImage}>
        {logo ? (
          <Image source={{ uri: logo }} className="w-40 h-40 rounded-full" />
        ) : (
          <View className="items-center justify-center w-40 h-40 bg-gray-200 rounded-full">
            <Text className="text-gray-500">Pick a Logo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Save button */}
      <Button
        title={uploading ? "Uploading..." : "Save Logo"}
        onPress={uploadLogo}
        disabled={!logo || uploading}
        className="mt-6"
      />
    </View>
  );
};

export default UploadLogo;
