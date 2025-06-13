import { Text } from "react-native";
import React from "react";

const CustomText = ({ children, weight = "400", style, ...props }) => {
  const fontMap = {
    400: "Poppins_400Regular",
    700: "Poppins_700Bold",
  };

  return (
    <Text style={[{ fontFamily: fontMap[weight] }, style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
