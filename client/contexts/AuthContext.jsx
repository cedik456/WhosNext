import api from "../utils/axiosInstance";
import { createContext, useState } from "react";
import { removeToken, saveToken } from "../utils/storage";
import { removeUserRole, saveUserRole } from "../utils/secureUser";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });

      const { token, user } = response.data;

      await saveToken(token);
      await saveUserRole(user.role);

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

      const { token, user } = response.data;

      console.log("Registered successfully!");

      await saveToken(token);
      await saveUserRole(user.role);

      setUser({ token, ...user });

      return { success: true, isOnboarded: user.isOnboarded };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, message: error?.response?.data?.message };
    }
  }

  async function logout() {
    await removeToken();
    await removeUserRole();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
