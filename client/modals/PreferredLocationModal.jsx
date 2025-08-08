import { AntDesign } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import { LOCATIONS } from "../constants/locations";

const PreferredLocationModal = ({ isVisible, onClose, onSelect, selected }) => {
  const handleSelect = (location) => {
    onSelect(location);
    onClose();
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
    >
      <View
        className="p-5 bg-white rounded-t-3xl"
        style={{
          height: "40%",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <View className="flex-row items-center mb-4">
          <Pressable onPress={onClose} className="mr-16">
            <AntDesign name="arrowleft" size={20} />
          </Pressable>
          <Text className="text-lg font-semibold">
            Select Preferred Location
          </Text>
        </View>

        <FlatList
          data={LOCATIONS}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelect(item)}
              className="flex-row items-center justify-between px-2 py-3 "
            >
              <Text
                className={`text-base font-poppins-500 ${
                  selected === item ? "text-black " : "text-gray-600"
                }`}
              >
                {item}
              </Text>
              {selected === item && <AntDesign name="check" size={18} />}
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
};

export default PreferredLocationModal;
