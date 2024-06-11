import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [dropdownDisplay, setDropdownDisplay] = useState(false);
  const handleDropDown = () => {
    setTimeout(() => {
      setDropdownDisplay((prev) => !prev);
    }, 200);
  };
  return (
    <nav className="sticky w-full px-32 pt-3 bg-gray-100 flex flex-row justify-between items-center border-b-2 border-slate-800/35">
      <Link to={"/"}>
        <img src="/logo-cheajedrez.png" className="w-[200px] translate-y-2 " alt="logo site" />
      </Link>
      <ul className="flex flex-row items-center justify-center gap-5 font-bold text-stone-900 text-md">
        {user && user?.role === "moderator" ? (
          <Link to={"/new-tournament"}>
            <li className="bg-green-700 text-white px-2 py-2 rounded-md hover:bg-green-900 hover:text-white transition-all duration-200 cursor-pointer">Nuevo Torneo</li>
          </Link>
        ) : null}
        <li className="px-2 py-2 rounded-md hover:bg-stone-700 hover:text-white transition-all duration-200 cursor-pointer">Lugares</li>
        <li className="px-2 py-2 rounded-md hover:bg-stone-700 hover:text-white transition-all duration-200 cursor-pointer">Nosotros</li>
        {user ? (
          <div className="relative ">
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-indigo-900 px-2 py-2 rounded-md hover:bg-stone-700 hover:text-white transition-all duration-200 flex flex-row justify-center items-center"
              type="button"
              onClick={handleDropDown}
            >
              {user.email.split("@")[0]} {dropdownDisplay ? <FaChevronDown className="ml-2" /> : <FaChevronRight className="ml-2" />}
            </button>

            {/* <!-- Dropdown menu --> */}
            <div id="dropdownHover" className={`z-10 ${!dropdownDisplay ? "hidden" : "absolute"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2 right-0`}>
              <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownHoverButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Perfil
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Configuración
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Favoritos
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <Link to={"/login"}>
              <li className="px-2 py-2 rounded-md hover:bg-stone-700 hover:text-white transition-all duration-200 cursor-pointer">Ingresar</li>
            </Link>
            <Link to={"/register"}>
              <li className="px-2 py-2 rounded-md hover:bg-stone-700 hover:text-white transition-all duration-200 cursor-pointer">Registro</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
