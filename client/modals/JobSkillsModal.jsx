import { AntDesign } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import { SKILLS } from "../constants/allSkills"; // flat list of skills (no industry filter)

const JobSkillsModal = ({ isVisible, onClose, selected, onUpdate }) => {
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
        <View className="relative flex-row items-center mb-4">
          <Pressable onPress={onClose} className="absolute left-0">
            <AntDesign name="arrowleft" size={20} color="gray" />
          </Pressable>

          <View className="items-center flex-1">
            <Text className="text-lg font-semibold dark:text-white">
              Select Required Skills
            </Text>
          </View>
        </View>

        <FlatList
          data={SKILLS}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = selected.includes(item);

            return (
              <Pressable
                onPress={() => toggleSkill(item)}
                className="flex-row items-center justify-between px-2 py-3"
              >
                <Text
                  className={`text-base font-poppins-500 ${
                    isSelected
                      ? "text-black font-semibold"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {item}
                </Text>
                {isSelected && (
                  <AntDesign name="check" size={18} color="#000" />
                )}
              </Pressable>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default JobSkillsModal;
