import { useEffect, useState } from "react";
import { tournamentsRequest } from "../api/tournaments";
import TournamentsList from "./TournamentsList";

const TournamentsListContainer = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function getTournaments() {
      try {
        const response = await tournamentsRequest();
        setTournaments(response.data.tournaments);
      } catch (error) {
        console.log(error);
      }
    }
    getTournaments();
  }, []);
  return (
    <div>
      <TournamentsList tournaments={tournaments} />
    </div>
  );
};

export default TournamentsListContainer;
