import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PlayersPage = () => {
  const { user, token } = useContext(AuthContext);
  return (
    <div>
      {user && token ? (
        <p>
          todo bien user: {user.email} token: {token}{" "}
        </p>
      ) : (
        <p>no cargó nada</p>
      )}
    </div>
  );
};

export default PlayersPage;
