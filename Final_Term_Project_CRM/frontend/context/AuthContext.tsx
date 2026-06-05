"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("crm_user");
    const token = localStorage.getItem("crm_token");
    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user: userData } = res.data;
    localStorage.setItem("crm_token", token);
    localStorage.setItem("crm_user", JSON.stringify(userData));
    setUser(userData);
    toast.success(`Welcome back, ${userData.name}! 👋`);
    router.push("/dashboard");
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    const res = await api.post("/auth/register", { name, email, password });
    const { token, user: userData } = res.data;
    localStorage.setItem("crm_token", token);
    localStorage.setItem("crm_user", JSON.stringify(userData));
    setUser(userData);
    toast.success(`Account created! Welcome, ${userData.name}! 🎉`);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("crm_token");
    localStorage.removeItem("crm_user");
    setUser(null);
    toast.success("Logged out successfully.");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
