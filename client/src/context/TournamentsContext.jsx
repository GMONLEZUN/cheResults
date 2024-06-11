import { createContext, useEffect, useState } from "react";
import { deleteTournament, getTournament, tournamentUpdate, tournamentsRequest } from "../api/tournaments";

export const TournamentsContext = createContext();

// eslint-disable-next-line react/prop-types
export const TournamentsProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState([]);
  const [baseUpdated, setBaseUpdated] = useState(false);
  const updateTournament = async (title, description, club, rounds, styleGame, country, province, city, arbiter, user, id) => {
    try {
      const response = await tournamentUpdate(title, description, club, rounds, styleGame, country, province, city, arbiter, user, id);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTournamentById = async (id) => {
    try {
      const response = await getTournament(id);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTournamentById = async (id) => {
    try {
      const response = await deleteTournament(id);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const callTournaments = async () => {
      const response = await tournamentsRequest();
      const sortResp = [...response.data.tournaments].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setTournaments(sortResp);
    };
    if (baseUpdated) {
      callTournaments();
      setBaseUpdated(false);
    }
  }, [baseUpdated]);

  useEffect(() => {
    const callTournaments = async () => {
      const response = await tournamentsRequest();
      const sortResp = [...response.data.tournaments].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setTournaments(sortResp);
    };
    callTournaments();
  }, []);
  return <TournamentsContext.Provider value={{ tournaments, updateTournament, getTournamentById, baseUpdated, setBaseUpdated, deleteTournamentById }}>{children}</TournamentsContext.Provider>;
};
