import api from "../utils/axiosInstance";
import { createContext, useState } from "react";
import { saveToken } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });

      const token = response.data.token;

      await saveToken(token);

      console.log(token);

      setUser({ email, token });

      return { success: true };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: error.response.data.message };
    }
  }

  async function register(email, password) {
    try {
      const response = await api.post("/auth/register", { email, password });

      const token = response.data.token;

      await saveToken(token);

      setUser({ email, token });

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: error.response.data.message };
    }
  }

  async function logout() {}

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
