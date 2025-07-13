// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { User } from "@/types";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const refreshToken = async () => {
    try {
      const res = await api.post("/auth/refresh");
      localStorage.setItem("token", res.data.token);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) loadUser();
  }, []);

  return { user, logout, refreshToken };
};

export default useAuth;
