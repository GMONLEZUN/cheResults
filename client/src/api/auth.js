import axios from "./axiosConfig.js";

export const registerRequest = (user) => axios.post("/api/auth/register", user);
export const loginRequest = (user) => axios.post("/api/auth/login", user);
export const checkToken = (user, token) =>
  axios.post("/api/auth/checkToken", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
