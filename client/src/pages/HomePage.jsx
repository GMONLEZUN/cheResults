import { useContext } from "react";
import TournamentsListContainer from "../components/TournamentsListContainer";
import Layout from "../components/Layout";
import { TournamentsContext } from "../context/TournamentsContext";

const HomePage = () => {
  const { tournaments } = useContext(TournamentsContext);

  return (
    <Layout>
      <div className="px-32">
        <h2 className="pt-24 pb-5 font-bold text-2xl">Últimas actualizaciones</h2>
        <TournamentsListContainer tournaments={tournaments} />
      </div>
    </Layout>
  );
};

export default HomePage;
