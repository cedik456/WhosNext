import { AntDesign } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";

const jobTitles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Mobile Developer",
  "iOS Developer",
  "Android Developer",
  "Web Developer",
  "React Developer",
  "Node.js Developer",
  "DevOps Engineer",
  "QA Engineer",
  "Software Engineer",
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "Cloud Engineer",
  "AI Engineer",
  "Cybersecurity Analyst",
  "Technical Support Specialist",
  "Product Manager",
  "Project Manager",
  "Scrum Master",
  "Business Analyst",
  "Solutions Architect",
  "Database Administrator",
  "Systems Engineer",
  "IT Specialist",
  "Technical Writer",
  "Other",
];

const PreferredJobTitleModal = ({ isVisible, onClose, onSelect, selected }) => {
  const handleSelect = (title) => {
    onSelect(title);
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
            Select Preferred Job Title
          </Text>
        </View>

        <FlatList
          data={jobTitles}
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

export default PreferredJobTitleModal;
