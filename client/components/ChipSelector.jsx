import { Pressable, Text, View } from "react-native";

// Chip Selector Component
const ChipSelector = ({ options, selected, onSelect }) => (
  <View className="flex-row flex-wrap gap-2">
    {options.map((opt) => (
      <Pressable
        key={opt}
        onPress={() => onSelect(opt)}
        className={`px-4 py-2 rounded-lg border ${
          selected === opt
            ? "bg-black"
            : "bg-gray-100 border-gray-300 dark:bg-neutral-800"
        }`}
      >
        <Text
          className={`font-poppins-500 ${
            selected === opt ? "text-white" : "text-gray-800 dark:text-white"
          }`}
        >
          {opt}
        </Text>
      </Pressable>
    ))}
  </View>
);

export default ChipSelector;
