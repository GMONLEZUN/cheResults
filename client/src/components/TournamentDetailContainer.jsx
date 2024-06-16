/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTournament } from "../api/tournaments";
import TournamentDetail from "./TournamentDetail";

const TournamentDetailContainer = () => {
  const [tournament, setTournament] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const { id } = useParams();
  const getTournamentById = async () => {
    try {
      if (id) {
        const res = await getTournament(id);
        console.log(res);
        setTournament(res.data.tournament);
        return res;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTournamentById(id);
  }, [id]);

  useEffect(() => {
    if (hasChanges) {
      getTournamentById(id);
      setHasChanges(false);
    }
  }, [hasChanges]);
  return (
    <div>
      <TournamentDetail tournament={tournament} setHasChanges={setHasChanges} />
    </div>
  );
};

export default TournamentDetailContainer;
