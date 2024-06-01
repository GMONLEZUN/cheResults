/* eslint-disable react/prop-types */
import Tournament from "./Tournament";

const TournamentsList = ({ tournaments }) => {
  return (
    <>
      {tournaments && tournaments.length > 0 ? (
        tournaments.map((tournament) => {
          return <Tournament tournament={tournament} key={tournament._id} />;
        })
      ) : (
        <p>No tournaments avaliable</p>
      )}
    </>
  );
};

export default TournamentsList;
