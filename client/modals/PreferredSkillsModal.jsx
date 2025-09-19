import { AntDesign } from "@expo/vector-icons";
import { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import { SKILLS_BY_INDUSTRY } from "../constants/skillsByIndustry";

const PreferredSkillsModal = ({
  isVisible,
  onClose,
  selected,
  onUpdate,
  industry = "General",
}) => {
  const options =
    SKILLS_BY_INDUSTRY[industry] || SKILLS_BY_INDUSTRY["General"] || [];

  const toggleSkill = (skill) => {
    if (selected.includes(skill)) {
      onUpdate(selected.filter((s) => s !== skill));
    } else {
      onUpdate([...selected, skill]);
    }
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
        <View className="relative flex-row items-center mb-4">
          <Pressable onPress={onClose} className="absolute left-0">
            <AntDesign name="arrowleft" size={20} color="gray" />
          </Pressable>
          <View className="items-center flex-1">
            <Text className="text-lg font-semibold dark:text-white">
              Select Preferred Skills
            </Text>
          </View>
        </View>

        <FlatList
          data={options}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isSelected = selected.includes(item);

            return (
              <Pressable
                onPress={() => toggleSkill(item)}
                className="flex-row items-center justify-between px-2 py-3 "
              >
                <Text
                  className={`text-base font-poppins-500  ${
                    isSelected ? "text-black font-semibold " : "text-gray-600"
                  }`}
                >
                  {item}
                </Text>
                {isSelected && <AntDesign name="check" size={18} />}
              </Pressable>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default PreferredSkillsModal;
