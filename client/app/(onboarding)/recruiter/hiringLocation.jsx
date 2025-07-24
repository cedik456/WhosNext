import { View, Text, Alert, TextInput } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { useRouter } from "expo-router";
import { getToken } from "../../../utils/storage";
import api from "../../../utils/axiosInstance";
import DropDownPicker from "react-native-dropdown-picker";

const locations = [
  "Legazpi City",
  "Daraga",
  "Tabaco",
  "Guinobatan",
  "Ligao",
  "Polangui",
  "Oas",
  "Camalig",
  "Malilipot",
  "Tiwi",
  "Sto. Domingo",
  "Bacacay",
];

const HiringLocation = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [items, setItems] = useState(
    locations.map((loc) => ({ label: loc, value: loc }))
  );

  const handleSubmit = async () => {
    if (!location.trim()) {
      Alert.alert("Location required", "Please enter a valid location.");
      return;
    }

    try {
      const token = await getToken();

      const response = await api.patch(
        "/onboarding/hiringLocation/recruiter",
        { location: location.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;

      if (success) {
        router.replace("/complete");
      } else {
        Alert.alert("Recruiter location error:", error);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-1 mt-2 bg-gray-200 rounded-full">
        <View
          className="h-1 bg-black rounded-r-full "
          style={{ width: `${(6 / 6) * 100}%` }}
        />
      </View>
      <View className="justify-between flex-1 px-6 mt-14">
        <View className="gap-3">
          <Text className="text-3xl font-poppins-600">
            Where are you hiring?
          </Text>
          <Text className="text-base text-gray-600 font-poppins-500">
            Enter the city, region, or area you're looking{"\n"}to hire in.
          </Text>

          <View style={{ zIndex: 1000 }}>
            <DropDownPicker
              open={open}
              value={location}
              items={items}
              setOpen={setOpen}
              setValue={setLocation}
              setItems={setItems}
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              textStyle={{
                fontFamily: "Poppins-Regular",
                fontWeight: "500",
              }}
              placeholder="Select a location..."
              style={{ borderColor: "#D1D5DB", marginTop: 8 }}
              dropDownContainerStyle={{ borderColor: "#D1D5DB" }}
              placeholderStyle={{
                color: "#9CA3AF",
                fontFamily: "Poppins-Regular",
              }}
            />
          </View>

          <Text className="text-base text-blue-700 font-poppins">
            Learn about our privacy and policy
          </Text>
        </View>
        <Button
          title="Next"
          className="mb-10 rounded-full"
          textClassName="text-center"
          onPress={handleSubmit}
          disabled={location.trim() === ""}
        />
      </View>
    </SafeAreaView>
  );
};

export default HiringLocation;
