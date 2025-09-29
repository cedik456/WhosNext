import { AntDesign } from "@expo/vector-icons";
import { View, Text, Pressable, TextInput } from "react-native";
import Modal from "react-native-modal";
import { useState, useEffect } from "react";

const SalaryModal = ({ isVisible, onClose, onChange, selected }) => {
  const [min, setMin] = useState(selected?.min?.toString() || "");
  const [max, setMax] = useState(selected?.max?.toString() || "");

  // Whenever inputs change → update parent state immediately
  useEffect(() => {
    if (onChange) {
      onChange({
        min: parseInt(min) || 0,
        max: parseInt(max) || 0,
      });
    }
  }, [min, max]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        className="p-6 bg-white rounded-t-3xl"
        style={{
          minHeight: "54%",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        {/* Header */}
        <View className="relative flex-row items-center mb-6">
          <Pressable onPress={onClose} className="absolute left-0">
            <AntDesign name="arrowleft" size={22} color="black" />
          </Pressable>
          <View className="items-center flex-1">
            <Text className="text-lg font-poppins-600">Set Salary Range</Text>
          </View>
        </View>

        {/* Inputs */}
        <View className="flex-row justify-between gap-4">
          <View className="flex-1">
            <Text className="mb-2 text-sm text-gray-600 font-poppins-500">
              Minimum Salary
            </Text>
            <TextInput
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl font-poppins"
              placeholder="₱0"
              keyboardType="numeric"
              value={min}
              onChangeText={setMin}
            />
          </View>

          <View className="flex-1">
            <Text className="mb-2 text-sm text-gray-600 font-poppins-500">
              Maximum Salary
            </Text>
            <TextInput
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl font-poppins"
              placeholder="₱0"
              keyboardType="numeric"
              value={max}
              onChangeText={setMax}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SalaryModal;
