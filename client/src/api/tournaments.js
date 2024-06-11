import axios from "./axiosConfig.js";

export const tournamentsRequest = () => axios.get("/api/tournaments");
export const tournamentCreate = (title, description, club, rounds, styleGame, country, province, city, arbiter, user) =>
  axios.post("/api/tournaments", { title, description, club, rounds, styleGame, country, province, city, arbiter, user });
export const tournamentUpdate = (title, description, club, rounds, styleGame, country, province, city, arbiter, user, id) =>
  axios.put(`/api/tournaments/:${id}`, { title, description, club, rounds, styleGame, country, province, city, arbiter, user, id });
export const getTournament = (id) => axios.get(`/api/tournaments/${id}`);
export const deleteTournament = (id) => axios.delete(`/api/tournaments/${id}`);
