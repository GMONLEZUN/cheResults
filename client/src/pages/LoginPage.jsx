import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./css/LoginPage.css";
import chessLogo from "./../../public/logo-cheajedrez.png";
import { FaGithub } from "react-icons/fa";

const LoginPage = () => {
  const [values, setValues] = useState({ password: "", email: "" });
  const [error, setError] = useState(false);
  const [errCode, setErrCode] = useState(null);
  const { login, setUser, setToken, path } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(values);
      if (response?.status === 200) {
        if (!response?.data?.data?.user?.validated) {
          setError(true);
          setError(400);
          setUser(null);
          return;
        }
        setUser(response.data.data.user);
        setToken(response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        if (path === null || path === "" || path === "/login") {
          navigate("/players");
        } else {
          navigate(path);
        }
      }
    } catch (error) {
      setError(true);
      setErrCode(error.response.status);
    }
  };
  return (
    <div className="bg-stone-300 w-screen h-screen flex justify-center items-center">
      <div className="border-b-4 border-yellow-500 w-[500px] px-10 py-5 bg-stone-400 rounded-xl flex flex-col items-center justify-center gap-4">
        <div className="image h-fit w-[100%] mb-2">
          <img src={chessLogo} className="" />
        </div>
        <div className="flex flex-col gap-7 items-center pb-7 w-full">
          <h2 className="text-2xl font-bold leading-3 text-white self-start">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <div>
              <label htmlFor="email" className="block mb-2 text-md font-medium text-white">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="juan@ejemplo.com"
                required
                value={values.email}
                onChange={handleValues}
                name="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-md font-medium text-white">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="Contraseña"
                required
                value={values.password}
                onChange={handleValues}
                name="passowrd"
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
              Login
            </button>
          </form>
          <div className="mb-3">
            <span className="text-white text-md font-semibold mr-3">No tenés cuenta?</span>
            <Link to={"/register"}>
              <span className="text-md font-bold underline font text-blue-800">Registrate acá</span>
            </Link>
          </div>
          <div className="w-full flex flex-row justify-center items-center">
            <div className="w-full h-[2px] bg-gray-300 rounded-full"></div>
            <div className="w-full translate-y-[-2px] text-white mx-3">O inicia sesión con</div>
            <div className="w-full h-[2px] bg-gray-300 rounded-full"></div>
          </div>

          <button className="w-full flex flex-row justify-center items-center gap-3 bg-white py-1 rounded-lg mt-2">
            <FaGithub className="text-2xl" />
            <span className="text-stone-800 text-md">Inicia sesión con GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
