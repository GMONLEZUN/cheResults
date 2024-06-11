import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { tournamentCreate } from "../api/tournaments";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { TournamentsContext } from "../context/TournamentsContext";

const CreateTournament = () => {
  const [values, setValues] = useState({ title: "", description: "", club: "", rounds: "", styleGame: "", country: "", province: "", city: "", arbiter: "" });
  const [error, setError] = useState(false);
  const [errCode, setErrCode] = useState(null);
  const { user } = useContext(AuthContext);
  const { updateTournament, getTournamentById, setBaseUpdated } = useContext(TournamentsContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await updateTournament(id, values.title, values.description, values.club, values.rounds, values.styleGame, values.country, values.province, values.city, values.arbiter);
        console.log({ response });
        if (response?.status === 201) {
          toast.success("Torneo editado!");
          setBaseUpdated(true);
          setValues({ title: "", description: "", club: "", rounds: "", styleGame: "", country: "", province: "", city: "", arbiter: "" });
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 3000);
        }
      } else {
        const response = await tournamentCreate(values.title, values.description, values.club, values.rounds, values.styleGame, values.country, values.province, values.city, values.arbiter, user);
        if (response?.status === 201) {
          toast.success("Torneo creado!");
          setBaseUpdated(true);
          setValues({ title: "", description: "", club: "", rounds: "", styleGame: "", country: "", province: "", city: "", arbiter: "" });
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 3000);
        }
      }
    } catch (error) {
      setError(true);
      setErrCode(error.response.status);
    }
  };
  useEffect(() => {
    async function loadTournament() {
      if (id) {
        const tournamentData = await getTournamentById(id);
        const tournamentRes = tournamentData.data.tournament;
        console.log(tournamentRes);
        setValues({
          title: tournamentRes.title,
          description: tournamentRes.description,
          club: tournamentRes.club,
          rounds: tournamentRes.rounds,
          styleGame: tournamentRes.styleGame,
          country: tournamentRes.country,
          province: tournamentRes.province,
          city: tournamentRes.city,
          arbiter: tournamentRes.arbiter,
        });
      }
    }
    loadTournament();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <div className="border-b-4 border-yellow-500 w-[800px] px-10 py-5 my-7 mx-auto bg-stone-400 rounded-xl flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-7 items-center pb-7 w-full">
          <h2 className="text-2xl font-bold leading-3 text-white self-start">Nuevo torneo</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <div>
              <label htmlFor="title" className="block mb-2 text-md font-medium text-white">
                Titulo
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="Escribe el nombre del torneo"
                required
                value={values.title}
                onChange={handleValues}
                name="title"
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-md font-medium text-white">
                Descripción
              </label>
              <input
                type="textarea"
                id="description"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="Escribe una breve descripción del torneo"
                required
                value={values.description}
                onChange={handleValues}
                name="description"
              />
            </div>
            <div>
              <label htmlFor="club" className="block mb-2 text-md font-medium text-white">
                Club
              </label>
              <input
                type="text"
                id="club"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="Escribe el nombre del club"
                required
                value={values.club}
                onChange={handleValues}
                name="club"
              />
            </div>
            <div>
              <label htmlFor="rounds" className="block mb-2 text-md font-medium text-white">
                Rondas
              </label>
              <input
                type="number"
                id="rounds"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="0"
                required
                value={values.rounds}
                onChange={handleValues}
                name="rounds"
              />
            </div>
            <div>
              <label htmlFor="styleGame" className="block mb-2 text-md font-medium text-white">
                Ritmo
              </label>
              <input
                type="text"
                id="styleGame"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder={`Ejemplo: 7'+ 3"`}
                required
                value={values.styleGame}
                onChange={handleValues}
                name="styleGame"
              />
            </div>
            <div>
              <label htmlFor="country" className="block mb-2 text-md font-medium text-white">
                País
              </label>
              <input
                type="text"
                id="country"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="Escribe el país"
                required
                value={values.country}
                onChange={handleValues}
                name="country"
              />
            </div>
            <div>
              <label htmlFor="province" className="block mb-2 text-md font-medium text-white">
                Provincia
              </label>
              <input
                type="text"
                id="province"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="Escribe la provincia"
                required
                value={values.province}
                onChange={handleValues}
                name="province"
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-2 text-md font-medium text-white">
                Ciudad
              </label>
              <input
                type="text"
                id="city"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="Escribe la ciudad"
                required
                value={values.city}
                onChange={handleValues}
                name="city"
              />
            </div>
            <div>
              <label htmlFor="arbiter" className="block mb-2 text-md font-medium text-white">
                Árbitro
              </label>
              <input
                type="text"
                id="arbiter"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="Escribe el árbitro"
                required
                value={values.arbiter}
                onChange={handleValues}
                name="arbiter"
              />
            </div>

            {error && errCode ? (
              errCode === 404 ? (
                <p>User not found</p>
              ) : errCode === 403 ? (
                <p>Invalid user or password</p>
              ) : (
                <p>Error: try again</p>
              )
            ) : errCode === 400 ? (
              <p>You must validate your account first, check your email</p>
            ) : null}
            <button
              type="submit"
              className="w-full mt-7 focus:outline-none text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:ring-stone-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800"
            >
              Publicar
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTournament;
