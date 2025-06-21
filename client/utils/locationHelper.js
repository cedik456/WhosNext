import * as Location from "expo-location";
import { Alert } from "react-native";

export const getReadableLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need location access to help match you better"
      );
      return null;
    }

    const coords = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: coords.coords.latitude,
      longitude: coords.coords.longitude,
    });

    if (address.length > 0) {
      const { city, region } = address[0];
      return `${city}, ${region}`;
    }

    return "Unknown Location";
  } catch (error) {
    console.error("Location error:", error);
    return null;
  }
};
