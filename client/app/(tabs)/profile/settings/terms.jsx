import { Pressable, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";

const Terms = () => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorScheme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <View className="relative flex-row items-center justify-center px-6 mt-5">
        <Pressable onPress={() => router.back()} className="absolute left-6">
          <FontAwesome6
            name="chevron-left"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </Pressable>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } text-2xl font-poppins-600`}
        >
          Terms and Conditions
        </Text>
      </View>

      <ScrollView
        className="px-6 mt-6"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
          } mb-4`}
        >
          Welcome to Who’s Next, a smart job-matching recruitment platform.
          Please read these Terms and Conditions carefully before using our
          services.
        </Text>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } font-poppins-600 text-lg mb-2`}
        >
          1. Acceptance of Terms
        </Text>
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
          } mb-4`}
        >
          By creating an account and using Who’s Next, you agree to comply with
          these Terms and Conditions. If you do not agree, please discontinue
          use of the platform.
        </Text>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } font-poppins-600 text-lg mb-2`}
        >
          2. Eligibility
        </Text>
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
          } mb-4`}
        >
          You must be at least 18 years old to create an account. Recruiters and
          job seekers must provide accurate information during registration and
          onboarding. Misrepresentation may result in account suspension or
          termination.
        </Text>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } font-poppins-600 text-lg mb-2`}
        >
          3. Use of the Platform
        </Text>
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
          } mb-4`}
        >
          The platform is intended solely for recruitment purposes. Users agree
          not to misuse features such as swiping, messaging, or profile
          reporting. We prohibit discriminatory behavior, spam, and fraudulent
          activity.
        </Text>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } font-poppins-600 text-lg mb-2`}
        >
          4. Profile Anonymity
        </Text>
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
          } mb-4`}
        >
          Initial job seeker and recruiter profiles may display anonymized
          information to reduce bias. Users may only reveal personal details
          after a mutual match has been established.
        </Text>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } font-poppins-600 text-lg mb-2`}
        >
          5. Matches and Messaging
        </Text>
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
          } mb-4`}
        >
          Messaging is enabled only after a mutual match. Users are responsible
          for the content of their communications. Harassment, inappropriate
          language, or solicitation will result in immediate removal from the
          platform.
        </Text>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } font-poppins-600 text-lg mb-2`}
        >
          6. Data Privacy
        </Text>
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
          } mb-4`}
        >
          We prioritize user privacy. Personal information is encrypted and only
          shared in accordance with our Privacy Policy. By using the app, you
          consent to our collection and processing of data as outlined in our
          Privacy Policy.
        </Text>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } font-poppins-600 text-lg mb-2`}
        >
          7. Account Termination
        </Text>
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
          } mb-4`}
        >
          We reserve the right to suspend or terminate accounts that violate
          these Terms, engage in misconduct, or misuse the platform.
        </Text>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } font-poppins-600 text-lg mb-2`}
        >
          8. Limitation of Liability
        </Text>
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
          } mb-4`}
        >
          Who’s Next acts only as a platform to connect recruiters and job
          seekers. We do not guarantee employment, hiring outcomes, or the
          accuracy of user-provided information.
        </Text>

        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } font-poppins-600 text-lg mb-2`}
        >
          9. Changes to Terms
        </Text>
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
          } mb-4`}
        >
          We may update these Terms and Conditions from time to time. Continued
          use of the platform after updates constitutes acceptance of the new
          terms.
        </Text>
      </ScrollView>

      <View className="items-center py-4 mt-auto">
        <Text className="text-3xl font-bold text-black dark:text-white">WN</Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">
          Beta version
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">
          Created with anger.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Terms;
