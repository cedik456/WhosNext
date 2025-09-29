import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Dimensions,
} from "react-native";
import { useEffect, useRef } from "react";

const { height } = Dimensions.get("window");

export default function ActionSheet({ visible, onClose, options }) {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="justify-end flex-1">
        <TouchableOpacity
          className="absolute inset-0 bg-black/30"
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
          className="p-5 bg-white shadow-lg rounded-t-3xl"
        >
          {options.map(({ icon, label, onPress, textClassName }, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={onPress}
              className="py-3"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                {icon && <View className="mr-3">{icon}</View>}
                <Text className={`text-lg ${textClassName || ""}`}>{label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
}
