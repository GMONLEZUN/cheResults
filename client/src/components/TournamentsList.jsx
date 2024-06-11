/* eslint-disable react/prop-types */
import Tournament from "./Tournament";

const TournamentsList = ({ tournaments }) => {
  return (
    <>
      <>
        <div className="relative overflow-x-auto mb-28">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Torneo
                </th>
                <th scope="col" className="px-6 py-3">
                  Club
                </th>
                <th scope="col" className="px-6 py-3">
                  Ritmo
                </th>
                <th scope="col" className="px-6 py-3">
                  Rondas
                </th>
                <th scope="col" className="px-6 py-3">
                  Inicio
                </th>
                <th scope="col" className="px-6 py-3">
                  Actualización
                </th>
              </tr>
            </thead>
            <tbody>
              {tournaments && tournaments.length > 0 ? (
                tournaments.map((tournament) => {
                  return <Tournament tournament={tournament} key={tournament._id} />;
                })
              ) : (
                <p>No tournaments avaliable</p>
              )}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
};

export default TournamentsList;
