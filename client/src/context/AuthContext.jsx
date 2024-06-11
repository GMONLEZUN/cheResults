import { createContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth.js";
import { checkToken } from "../api/auth";

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [credentialsFound, setCredentialsFound] = useState(false);
  async function setCredentials() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      setToken(token);
      let user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      setCredentialsFound(true);
      console.log({ message: `setting credentials`, token, user });
    }
  }

  useEffect(() => {
    setPath(window.location.pathname);
    setCredentials();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      async function tokenCall() {
        setLoading(true);
        if (!tokenChecked && user && token) {
          try {
            const response = await checkToken(user, token);
            console.log({ token: response });
            if (response.status === 200) {
              setIsAuthenticated(true);
              setTokenChecked(true);
            }
          } catch (error) {
            console.log(error.message);
            setIsAuthenticated(false);
            setTokenChecked(false);
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          } finally {
            setLoading(false);
          }
        }
      }
      tokenCall();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [credentialsFound]
  );

  return <AuthContext.Provider value={{ signup, login, user, setUser, setToken, token, loading, setLoading, path, setPath, isAuthenticated }}>{children}</AuthContext.Provider>;
};
