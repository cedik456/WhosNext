import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Button = ({
  onPress,
  disabled = false,
  title = "",
  className = "",
  textClassName = "",
}) => {
  const baseStyles = "p-5 rounded-full mb-10";
  const enabledStyles = "bg-black";
  const disabledStyles = "bg-gray-300";

  const baseTextStyles = "font-poppins-600 text-center";
  const enabledTextStyles = "text-white";
  const disabledTextStyles = "text-gray-400";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
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
  );
};

export default Button;
