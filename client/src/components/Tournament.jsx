/* eslint-disable react/prop-types */

const Tournament = ({ tournament }) => {
  return (
    <>
      {tournament ? (
        <>
          <div>Last update: {tournament.updatedAt}</div>
          <span>{tournament.createdAt}</span>
          <h2>{tournament.title}</h2>
          <h3>{tournament.club}</h3>
          <h4>{tournament.arbiter}</h4>
          <p>{tournament.styleGame}</p>
          <p>{tournament.rounds}</p>
          <p>
            Lugar de juego: {tournament.location.city}, {tournament.location.country}{" "}
          </p>
          <p>Players:</p>
        </>
      ) : null}
    </>
  );
};

export default Tournament;
