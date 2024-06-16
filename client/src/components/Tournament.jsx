/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { formatTournamentDate } from "./../utils/formatTournamentDate.js";
import { Link } from "react-router-dom";
import { TournamentsContext } from "../context/TournamentsContext.jsx";
import toast from "react-hot-toast";

const Tournament = ({ tournament }) => {
  const { user } = useContext(AuthContext);
  const { deleteTournamentById, setBaseUpdated } = useContext(TournamentsContext);
  const handleDelete = async () => {
    try {
      const response = await deleteTournamentById(tournament._id);
      if (response.status === 200) {
        toast.success("Torneo eliminado");
        setBaseUpdated(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {tournament ? (
        <tr
          className={`bg-white border-b ${
            user && user.role === "moderator" && user.email === tournament.owner ? "bg-indigo-100 font-semibold text-indigo-800" : "text-gray-900 font-medium"
          } hover:bg-gray-200`}
        >
          <th scope="row" className="px-6 py-4 truncate">
            {tournament.title}
          </th>
          <td className="px-6 py-4 truncate">{tournament.club}</td>
          <td className="px-6 py-4">{tournament.styleGame}</td>
          <td className="px-6 py-4">{tournament.rounds}</td>
          <td className="px-6 py-4">{formatTournamentDate(tournament.createdAt)}</td>
          <td className="px-6 py-4">{formatTournamentDate(tournament.updatedAt)}</td>
          <td className="px-6 py-4">
            <div className="flex flex-row gap-2 text-lg">
              {user && user.role === "moderator" && user.email === tournament.owner ? (
                <>
                  <Link to={`/tournaments/edit/${tournament._id}`}>
                    <FaEdit className="cursor-pointer text-yellow-600" />
                  </Link>
                  <FaTrashAlt className="cursor-pointer text-red-800" onClick={handleDelete} />
                </>
              ) : null}
              <Link to={`/tournaments/${tournament._id}`}>
                <FaChevronCircleRight className="cursor-pointer text-stone-800" />
              </Link>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default Tournament;
