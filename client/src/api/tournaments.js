import axios from "./axiosConfig.js";

export const tournamentsRequest = (user) => axios.get("/api/tournaments", user);
