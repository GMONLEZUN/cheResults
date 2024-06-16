import { useEffect, useState } from "react";
import { addPlayerToTournament } from "../api/tournaments";
import toast from "react-hot-toast";
import { formatTournamentDate, formatTournamentDateTime } from "../utils/formatTournamentDate";

/* eslint-disable react/prop-types */
const TournamentDetail = ({ tournament, setHasChanges }) => {
  const [values, setValues] = useState({ federation: "", name: "", lastname: "", nat_rating: "" });
  const [tournamentPlayers, setTournamentPlayers] = useState([]);
  console.log(tournament?.players);
  console.log({ tournamentPlayers });
  const handleAddPlayers = async (e) => {
    e.preventDefault();
    try {
      const response = await addPlayerToTournament(tournament._id, values);
      if (response.status === 200) {
        setValues({ federation: "", name: "", lastname: "", nat_rating: "" });
        setHasChanges(true);
        toast.success("Jugador agregado!");
      }
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (tournament?.players && tournament?.players.length > 0) {
      setTournamentPlayers(
        tournament.players
          .map((player) => {
            return {
              lastname: player.player.lastname.split("").map((e, idx) => (idx === 0 ? e.toUpperCase() : e)),
              name: player.player.name.split("").map((e, idx) => (idx === 0 ? e.toUpperCase() : e)),
              federation: player.player.federation,
              nat_rating: player.player.nat_rating,
            };
          })
          .sort((a, b) => Number(b.nat_rating) - Number(a.nat_rating))
      );
    }
  }, [tournament]);
  return (
    <div className="px-32 pt-20">
      {tournament ? (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center justify-between mb-4">
            <h1 className=" font-bold text-3xl text-stone-800">{tournament.title}</h1>
            <div className="flex flex-col items-start justify-start gap-5">
              <span>Creado: {formatTournamentDate(tournament.createdAt)}</span>
              <span>Actualizado: {formatTournamentDateTime(tournament.updatedAt)}</span>
            </div>
          </div>
          <p className="text-xl font-semibold text-stone-800">{tournament.club}</p>
          <p className="">Árbitro: {tournament.arbiter}</p>
          <p>Detalle del torneo: {tournament.description}</p>
          <p>Rondas: {tournament.rounds}</p>
          <div className="my-5 w-full">
            <form onSubmit={(e) => handleAddPlayers(e)} className=" bg-slate-200 px-7 py-3 rounded-md w-auto flex flex-row justify-between">
              <div className="flex flex-row gap-6">
                <input className="pl-2 py-1 rounded-md" type="text" name="federation" value={values.federation} onChange={handleValues} placeholder="Federación" />
                <input className="pl-2 py-1 rounded-md" type="text" name="name" value={values.name} onChange={handleValues} placeholder="Nombre" />
                <input className="pl-2 py-1 rounded-md" type="text" name="lastname" value={values.lastname} onChange={handleValues} placeholder="Apellido" />
                <input className="pl-2 py-1 rounded-md" type="text" name="nat_rating" value={values.nat_rating} onChange={handleValues} placeholder="Ranking" />
              </div>
              <button type="submit" className="focus:outline-none text-white bg-slate-700 hover:bg-slate-800 font-medium rounded-lg text-sm px-5 py-2.5">
                Agregar jugador
              </button>
            </form>
          </div>
          <h3 className="text-2xl font-semibold mb-3">Jugadores</h3>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-50 mb-24">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Apellido
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Federación
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ranking
                  </th>
                </tr>
              </thead>
              <tbody>
                {tournamentPlayers && tournamentPlayers.length > 0
                  ? tournamentPlayers.map((player, idx) => {
                      return (
                        <tr key={player._id} className="bg-white border-b">
                          <th scope="row" className="px-6 py-4 text-gray-700">
                            {idx + 1}
                          </th>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{player.lastname}</td>
                          <td className="px-6 py-4 text-gray-700">{player.name}</td>
                          <td className="px-6 py-4 text-gray-700">{player.federation}</td>
                          <td className="px-6 py-4 text-gray-700">{player.nat_rating}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TournamentDetail;
