/* eslint-disable react/prop-types */

import TournamentsList from "./TournamentsList";

const TournamentsListContainer = ({ tournaments }) => {
  return <>{tournaments && tournaments.length > 0 ? <TournamentsList tournaments={tournaments} /> : null}</>;
};

export default TournamentsListContainer;
