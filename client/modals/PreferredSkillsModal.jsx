import { AntDesign } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";

const skillsList = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express.js",
  "Python",
  "Django",
  "Flask",
  "PHP",
  "Laravel",
  "Ruby on Rails",
  "Java",
  "Spring Boot",
  "C#",
  ".NET",
  "Swift",
  "Kotlin",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "SQL",
  "MongoDB",
  "Firebase",
  "AWS",
  "Google Cloud",
  "DevOps",
  "Docker",
  "Kubernetes",
  "Git",
  "Agile Methodologies",
  "Scrum",
  "Project Management",
  "Product Management",
  "Sales",
  "Customer Service",
  "Other",
];

const PreferredSkillsModal = ({ isVisible, onClose, selected, onUpdate }) => {
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
        <View className="flex-row items-center mb-4">
          <Pressable onPress={onClose} className="mr-16">
            <AntDesign name="arrowleft" size={20} />
          </Pressable>
          <Text className="text-lg font-semibold">Select Preferred Skills</Text>
        </View>

        <FlatList
          data={skillsList}
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
                  className={`text-base font-poppins-500 ${
                    isSelected === item
                      ? "text-black font-semibold "
                      : "text-gray-600"
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
