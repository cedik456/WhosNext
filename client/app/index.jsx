import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import { useEffect } from "react";

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, []);

  return null;
};

export default LandingPage;
