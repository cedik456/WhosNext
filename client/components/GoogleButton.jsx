import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { AntDesign } from "@expo/vector-icons";
import AuthButton from "./AuthButton";
import api from "../utils/axiosInstance";
import Constants from "expo-constants";

const { EXPO_PUBLIC_GOOGLE_CLIENT_ID } = Constants.expoConfig.extra;

WebBrowser.maybeCompleteAuthSession();

const GoogleButton = ({ onLoginSuccess }) => {
  // 👇 Force using Expo proxy (https://auth.expo.io/@user/slug)
  const redirectUri = "https://auth.expo.io/@cedricnano/client";

  console.log("Google OAuth redirectUri:", redirectUri);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: EXPO_PUBLIC_GOOGLE_CLIENT_ID,
      scopes: ["openid", "profile", "email"],
    },
    { redirectUri }
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === "success") {
        setLoading(true);
        try {
          const idToken = response.authentication?.idToken;
          if (idToken) {
            const res = await api.post("/auth/google", { idToken });
            onLoginSuccess(res.data);
          }
        } catch (err) {
          console.error(
            "Google login error:",
            err.response?.data || err.message
          );
        } finally {
          setLoading(false);
        }
      }
    };

    handleGoogleResponse();
  }, [response]);

  return (
    <AuthButton
      label={loading ? "Signing in..." : "Sign in with Google"}
      onPress={() => promptAsync({ useProxy: true })} // 👈 use proxy here too
      disabled={!request || loading}
      icon={<AntDesign name="google" size={24} color="white" />}
    />
  );
};

export default GoogleButton;
