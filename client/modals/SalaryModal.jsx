import { AntDesign } from "@expo/vector-icons";
import { View, Text, Pressable, TextInput } from "react-native";
import Modal from "react-native-modal";
import { useState } from "react";

const SalaryModal = ({ isVisible, onClose, onSave, selected }) => {
  const [min, setMin] = useState(selected?.min?.toString() || "");
  const [max, setMax] = useState(selected?.max?.toString() || "");

  const handleSave = () => {
    const minVal = parseInt(min) || 0;
    const maxVal = parseInt(max) || 0;
    onSave({ min: minVal, max: maxVal });
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View className="p-5 bg-white rounded-t-3xl" style={{ height: "40%" }}>
        {/* Header */}
        <View className="relative flex-row items-center mb-4">
          <Pressable onPress={onClose} className="absolute left-0">
            <AntDesign name="arrowleft" size={20} />
          </Pressable>
          <View className="items-center flex-1">
            <Text className="text-lg font-semibold">Set Salary Range</Text>
          </View>
        </View>

        {/* Min/Max Inputs */}
        <View className="flex-row justify-between gap-4">
          <View className="flex-1">
            <Text className="mb-2">Min Salary</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded-lg"
              keyboardType="numeric"
              value={min}
              onChangeText={setMin}
              placeholder="0"
            />
          </View>
          <View className="flex-1">
            <Text className="mb-2">Max Salary</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded-lg"
              keyboardType="numeric"
              value={max}
              onChangeText={setMax}
              placeholder="0"
            />
          </View>
        </View>

        {/* Save Button */}
        <Pressable
          onPress={handleSave}
          className="p-3 mt-6 bg-blue-600 rounded-xl"
        >
          <Text className="font-semibold text-center text-white">Save</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default SalaryModal;
