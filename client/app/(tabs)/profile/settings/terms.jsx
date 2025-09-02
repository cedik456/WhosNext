import { Pressable, Text, View, ScrollView, Image } from "react-native";
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
        <Pressable
          onPress={() => router.replace("profile/settingsScreen")}
          className="absolute left-6"
        >
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
        <Text className="mt-4 text-base leading-6 text-gray-800 font-poppins">
          Welcome to the app (the “Service”). These Terms &amp; Conditions
          (“Terms”) form a binding agreement between you and the operator of the
          Service (“we”, “us”, or “our”). By creating an account, choosing a
          role (e.g., Seeker or Recruiter/Provider), verifying your email, or by
          accessing or using any part of the Service, you agree to these Terms.
          If you do not agree, do not use the Service.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          1) Eligibility &amp; Account
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          You must be at least 18 years old (or the age of majority in your
          jurisdiction) to use the Service. You are responsible for maintaining
          the confidentiality of your login credentials and for all activity
          under your account. You agree to provide accurate, current, and
          complete information during registration and to keep your profile and
          contact details up to date.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          2) Verification Codes &amp; Security
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          We may require email verification. Codes we send (e.g., one-time
          codes) are time-limited (typically 10 minutes) and for your personal
          use only. Don’t share codes or passwords with anyone. If you suspect
          unauthorized use, change your password and notify us immediately. You
          agree to receive essential security communications (e.g.,
          verification, device alerts).
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          3) Sign-In Options
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          We may offer sign-in via email/password and third-party providers
          (e.g., Apple, Google, Facebook). Use of third-party sign-in is subject
          to those providers’ terms and privacy practices. We are not affiliated
          with those providers. If you use a “Remember me” or device trust
          feature, you authorize us to store and use tokens on that device for
          the sole purpose of keeping you signed in.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          4) Roles &amp; Use of the Service
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          The Service connects people with each other (“matches”). Depending on
          your selected role (for example, Seeker vs. Recruiter/Provider),
          features and visibility may differ. You agree to use the Service only
          for lawful purposes and in accordance with these Terms. You are solely
          responsible for your interactions with other users; we do not conduct
          comprehensive background checks and do not guarantee the conduct,
          identity, or suitability of users or matches.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          5) Acceptable Use &amp; Prohibited Conduct
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          You agree not to: (a) harass, threaten, defraud, or impersonate
          others; (b) post or transmit content that is illegal, harmful,
          discriminatory, infringing, misleading, or otherwise objectionable;
          (c) use bots, scraping, data mining, or reverse engineering; (d)
          interfere with or disrupt the Service; (e) circumvent access controls,
          rate limits, or security features; (f) collect or disclose personal
          data of others without consent; (g) use the Service for spam,
          multi-level marketing, or any commercial solicitation not expressly
          permitted.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          6) Your Content &amp; License
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          You retain ownership of content you provide (e.g., profile details,
          photos, messages) but grant us a worldwide, non-exclusive,
          royalty-free license to host, store, reproduce, and display such
          content as necessary to operate and improve the Service. You represent
          that you have all rights needed to post the content and that it does
          not violate others’ rights. We may remove or edit content that
          violates these Terms or applicable law.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          7) Feedback
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          If you submit ideas, suggestions, or feedback, you grant us a
          perpetual, irrevocable, worldwide, royalty-free license to use them
          without obligation to you.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          8) Privacy
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          Our handling of your information is described in our Privacy Policy.
          By using the Service, you consent to the collection and use of your
          information as described there, including sending you essential
          transactional communications. Where required, we will seek consent for
          marketing communications and you may opt out at any time.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          9) In-App Communications
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          Messaging or other communication features are provided for
          convenience. We may, but have no obligation to, monitor communications
          for safety, moderation, and compliance with these Terms. Do not share
          sensitive information with other users. You are solely responsible for
          your conversations and arrangements made through the Service.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          10) Safety
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          Always exercise caution when meeting or transacting with others.
          Verify identities independently, meet in public locations when
          possible, and tell someone you trust about your plans. We are not a
          party to and do not control user-to-user interactions; we are not
          responsible for the acts or omissions of users.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          11) Payments &amp; Third-Party Services
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          If certain features of the Service involve payments or third-party
          services, those may be subject to separate terms. We are not
          responsible for third-party products or services, websites, or content
          even if linked or integrated with the Service.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          12) Intellectual Property
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          The Service, including text, graphics, logos, software, and other
          materials, is protected by intellectual property laws. Except for your
          content and rights expressly granted to you, all rights are reserved.
          You may not copy, modify, distribute, or create derivative works
          without our prior written consent.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          13) Changes &amp; Updates
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          We may modify these Terms from time to time. We will post the updated
          Terms and indicate the effective date. Your continued use of the
          Service after changes become effective constitutes acceptance of the
          updated Terms. If you do not agree, discontinue use of the Service.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          14) Suspension &amp; Termination
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          We may suspend or terminate your access for any violation of these
          Terms, suspected fraud or abuse, legal or regulatory reasons, or to
          protect the Service or its users. You may stop using the Service at
          any time. Some provisions (e.g., intellectual property, disclaimers,
          limitation of liability) survive termination.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          15) Disclaimers
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          The Service is provided “as is” and “as available.” To the fullest
          extent permitted by law, we disclaim all warranties, express or
          implied, including merchantability, fitness for a particular purpose,
          and non-infringement. We do not warrant that the Service will be
          uninterrupted, error-free, secure, or free of harmful components, or
          that matches will meet your expectations or objectives.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          16) Limitation of Liability
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          To the fullest extent permitted by law, we and our affiliates will not
          be liable for indirect, incidental, special, consequential, exemplary,
          or punitive damages, or any loss of profits, data, use, goodwill, or
          other intangible losses, arising out of or related to your use of (or
          inability to use) the Service, even if we have been advised of the
          possibility of such damages. Our aggregate liability to you for all
          claims relating to the Service will not exceed the greater of (a) the
          amounts you paid to us in the 12 months preceding the event giving
          rise to the claim, or (b) USD 100.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          17) Indemnification
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          You agree to defend, indemnify, and hold harmless us and our
          affiliates, and our respective officers, directors, employees, and
          agents, from and against any claims, liabilities, damages, losses, and
          expenses (including reasonable legal and accounting fees) arising out
          of or in any way connected with your access to or use of the Service,
          your content, or your violation of these Terms.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          18) Communications &amp; Notices
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          By using the Service, you consent to receive administrative emails and
          messages (e.g., verification codes, security alerts). Where
          applicable, you may manage marketing communication preferences via
          in-app settings or unsubscribe links. Notices to you may be delivered
          via the Service, email, or other contact information you provide.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          19) International Use
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          Access to the Service may not be legal by certain persons or in
          certain countries. You access the Service at your own initiative and
          are responsible for compliance with local laws. Some features may not
          be available in all regions.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          20) Governing Law &amp; Dispute Resolution
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          These Terms are governed by the laws of the Philippines, without
          regard to its conflict of laws principles. You agree to submit to the
          exclusive jurisdiction of the courts located in Metro Manila for the
          resolution of any dispute arising from or relating to these Terms or
          the Service, except where applicable law provides otherwise.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          21) Severability &amp; Assignment
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          If any provision of these Terms is found unenforceable, the remaining
          provisions will remain in full force and effect. You may not assign or
          transfer your rights or obligations under these Terms without our
          prior written consent. We may assign these Terms in connection with a
          merger, acquisition, or sale of assets, or by operation of law.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          22) Entire Agreement
        </Text>
        <Text className="mt-2 text-base leading-6 text-gray-800 font-poppins">
          These Terms, together with any policies referenced herein (including
          our Privacy Policy), constitute the entire agreement between you and
          us regarding the Service and supersede all prior or contemporaneous
          agreements on the subject matter.
        </Text>

        <Text className="mt-4 text-lg text-gray-900 font-poppins-600">
          23) Contact
        </Text>
        <Text className="mt-2 mb-4 text-base leading-6 text-gray-800 font-poppins">
          Questions about these Terms or the Service? Contact us via the in-app
          help option or at support@example.com. For security issues, please use
          the phrase “Security Concern” in your subject line.
        </Text>

        <Text className="mt-2 text-xs text-gray-500 font-poppins">
          Legal note: This text is a general template based on your app’s
          features (email verification, roles, matching, and social sign-in). It
          is not legal advice. Please have licensed counsel review and tailor it
          to your specific product, policies, and jurisdiction before
          publishing.
        </Text>
      </ScrollView>

      <View className="items-center py-4 mt-auto">
        <Image
          source={require("../../../../assets/logown.png")}
          className="w-16 h-16"
        />
        <Text className="text-base text-gray-600 dark:text-gray-400">
          Beta version
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">
          Created with the hybridevs
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Terms;
