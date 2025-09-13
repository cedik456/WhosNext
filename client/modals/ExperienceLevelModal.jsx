import { AntDesign } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";

const experienceLevels = [
  "Entry-level",
  "Junior",
  "Mid-level",
  "Senior",
  "Lead",
  "Director",
  "Executive",
];

const ExperienceLevelModal = ({ isVisible, onClose, onSelect, selected }) => {
  const handleSelect = (role) => {
    onSelect(role);
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
        <View className="relative flex-row items-center mb-4 ">
          <Pressable onPress={onClose} className="absolute left-0">
            <AntDesign name="arrowleft" size={20} color="gray" />
          </Pressable>

          <View className="items-center flex-1">
            <Text className="text-lg font-semibold dark:text-white ">
              Select Experience Level
            </Text>
          </View>
        </View>

        <FlatList
          data={experienceLevels}
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

export default ExperienceLevelModal;
