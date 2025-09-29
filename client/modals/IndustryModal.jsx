import { AntDesign } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import { INDUSTRIES } from "../constants/industries"; // your predefined list

const IndustryModal = ({ isVisible, onClose, onSelect, selected }) => {
  const handleSelect = (industry) => {
    onSelect(industry);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        className="p-5 bg-white dark:bg-neutral-900"
        style={{
          height: "50%",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        {/* Header */}
        <View className="relative flex-row items-center mb-4">
          <Pressable onPress={onClose} className="absolute left-0">
            <AntDesign name="arrowleft" size={20} color="gray" />
          </Pressable>
          <View className="items-center flex-1">
            <Text className="text-lg font-semibold dark:text-white">
              Select Industry
            </Text>
          </View>
        </View>

        {/* Industries List */}
        <FlatList
          data={INDUSTRIES}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelect(item)}
              className="flex-row items-center justify-between px-2 py-3"
            >
              <Text
                className={`text-base font-poppins-500 ${
                  selected === item
                    ? "text-black dark:text-white"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {item}
              </Text>
              {selected === item && (
                <AntDesign name="check" size={18} color="black" />
              )}
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
};

export default IndustryModal;
