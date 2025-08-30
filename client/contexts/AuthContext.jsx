import api from "../utils/axiosInstance";
import { createContext, useEffect, useState } from "react";
import { getToken, removeToken, saveToken } from "../utils/storage";
import { removeUserRole, saveUserRole } from "../utils/secureUser";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const me = res?.data?.data;
        if (me?._id) setUser({ token, ...me });
      } catch (e) {
        console.log("[Auth] hydrate failed:", e?.message);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  async function login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });

      const { token, user } = response.data;

      await saveToken(token);

      if (user.role) {
        await saveUserRole(
          typeof user.role === "string"
            ? user.role
            : user.role?.name || String(user.role)
        );
      }

      setUser({ token, ...user });

      return { success: true, user, token };
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

      if (user.role) {
        await saveUserRole(
          typeof user.role === "string"
            ? user.role
            : user.role?.name || String(user.role)
        );
      }

      setUser({ token, ...user });

      return { success: true, user, token };
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
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout, initializing }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
