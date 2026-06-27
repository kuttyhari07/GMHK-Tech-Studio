import React, { createContext, useContext, useMemo, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("gmhkAdminToken"));
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("gmhkAdmin");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("gmhkAdminToken", data.token);
    localStorage.setItem("gmhkAdmin", JSON.stringify(data.admin));
    setToken(data.token);
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("gmhkAdminToken");
    localStorage.removeItem("gmhkAdmin");
    setToken(null);
    setAdmin(null);
  };

  const value = useMemo(
    () => ({ admin, token, isAuthenticated: Boolean(token), login, logout, setAdmin }),
    [admin, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
