import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { checkToken } from "../api/auth";

const ProtectedRoute = () => {
  const { user, token, setToken, setUser, setPath } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [credentialsOK, setCredentialsOK] = useState(false);
  const navigate = useNavigate();
  async function setCredentials() {
    if (!localStorage.getItem("token")) {
      console.log("No encontré el token en localStorage");
      navigate("/login");
    } else {
      let token = localStorage.getItem("token");
      setToken(token);
      let user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      setCredentialsOK(true);
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
            if (response.status === 200) {
              setIsAuthenticated(true);
              setTokenChecked(true);
              setLoading(false);
            }
          } catch (error) {
            // return <Navigate to={"/login"} replace />;
            navigate("/login");
          }
        }
      }
      tokenCall();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [credentialsOK]
  );

  if (!isAuthenticated && !loading) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
