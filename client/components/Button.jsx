import { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";

const Button = ({
  onPress,
  disabled = false,
  title = "",
  className = "",
  textClassName = "",
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const baseStyles = "p-5";
  const enabledStyles = "bg-black";
  const disabledStyles = "bg-gray-300";

  const baseTextStyles = "font-poppins-600";
  const enabledTextStyles = "text-white";
  const disabledTextStyles = "text-gray-400";

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={`${baseStyles} ${
          disabled ? disabledStyles : enabledStyles
        } ${className}`}
      >
        <Text
          className={`${baseTextStyles} ${
            disabled ? disabledTextStyles : enabledTextStyles
          } ${textClassName}`}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Button;
