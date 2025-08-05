import { Pressable, View } from "react-native";

const CustomSwitch = ({ value, onValueChange }) => (
  <Pressable
    onPress={() => onValueChange(!value)}
    className={`relative w-[32px] h-[22px] border rounded-full overflow-hidden
      border-black dark:border-[#363636] ${
        value
          ? "bg-black dark:bg-white"
          : "bg-white dark:bg-black"
      }`}
  >
    <View
      className={`absolute w-[20px] h-[20px] rounded-full ${
        value
          ? "bg-white dark:bg-black right-[0px]"
          : "bg-black dark:bg-white left-[0px]"
      }`}
    />
  </Pressable>
);

export default CustomSwitch;