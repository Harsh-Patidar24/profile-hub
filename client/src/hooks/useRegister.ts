"use client";
import { useState } from "react";
import api from "../lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: Record<string, string>, profileImage: File | null) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (profileImage) formData.append("profileImage", profileImage);

      await api.post("/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push("/Components/login");
      toast.success(`User Registered Sucessfully`)
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Registration failed");
      toast.error(`Registeration Failed`)
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, setError };
};
