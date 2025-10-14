"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/axios";
import { IUser } from "../types/user";
import { useAuthStore } from "../app/store/useAuthStore"; 

export const useAuth = () => {
  const router = useRouter();
  const { loginS, logoutS } = useAuthStore(); // ✅ use store actions
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      loginS(parsedUser, storedToken); // ✅ Sync Zustand state with persisted data
    }
    setLoading(false);
  }, [loginS]);

  // ✅ Login method updates both Zustand & localStorage
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { token, user } = res.data;

      // Save in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update Zustand store
      loginS(user, token);

      setUser(user);
      return { user, token };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logoutS(); // ✅ clear Zustand state
    setUser(null);
    router.push("/Components/login");
  };

  return {
    user,
    login,
    logout,
    loading,
    setLoading,
    isLoggedIn: !!user,
  };
};
