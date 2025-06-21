import api from "../utils/axiosInstance";
import { createContext, useState } from "react";
import { removeToken, saveToken } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });

      const { token, user } = response.data;

      await saveToken(token);

      console.log(token);

      setUser({ token, ...user });

      return { success: true, isOnboarded: user.isOnboarded };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error?.response?.data?.message };
    }
  }

  async function register(email, password) {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
      });

      console.log("Register Response:", response.data);

      const { token, user } = response.data;

      await saveToken(token);

      setUser({ token, ...user });

      return { success: true, isOnboarded: user.isOnboarded };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: error?.response?.data?.message };
    }
  }

  async function logout() {
    await removeToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
