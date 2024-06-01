import { createContext, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth.js";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState("");

  const signup = async (user) => {
    try {
      const response = await registerRequest(user);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (user) => {
    const response = await loginRequest(user);
    return response;
  };

  return <AuthContext.Provider value={{ signup, login, user, setUser, setToken, token, loading, setLoading, path, setPath }}>{children}</AuthContext.Provider>;
};
