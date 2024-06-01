import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import chessLogo from "./../../public/logo-cheajedrez.png";

const RegisterPage = () => {
  const [values, setValues] = useState({ password: "", email: "", name: "", age: "" });
  const [error, setError] = useState(false);
  const [errCode, setErrCode] = useState(null);
  const { signup } = useContext(AuthContext);
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
      const response = await signup(values);
      if (response?.status === 201) {
        navigate("/login");
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
          <h2 className="text-2xl font-bold leading-3 text-white self-start">Registrate</h2>
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
              <label htmlFor="name" className="block mb-2 text-md font-medium text-white">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5"
                placeholder="Juan Perez"
                required
                value={values.name}
                onChange={handleValues}
                name="name"
              />
            </div>
            <div>
              <label htmlFor="age" className="block mb-2 text-md font-medium text-white">
                Edad
              </label>
              <input
                type="number"
                id="age"
                className="bg-gray-50 border border-gray-300 text-stone-900 text-md rounded-lg focus:ring-2 focus:ring-stone-600 focus:outline-none block w-full p-2.5 remove-arrow"
                placeholder="0"
                required
                value={values.age}
                onChange={handleValues}
                name="age"
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
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
