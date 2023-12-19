import { Form, Link } from '@remix-run/react';
import React from 'react';
import Logotomorrow from '../images/logo.png'
import { useLocation } from 'react-router-dom'; // Importa useLocation

const Navbar = () => {
  const location = useLocation(); // Obtiene la ubicación actual

  return (
    <nav className="bg-gray-800 bg-opacity-50 p-4 text-white">
      <div className="flex items-center justify-between">
        {/* Componente a la izquierda */}
        <div className="">
          <img src={Logotomorrow} alt="Logo" className="h-8 w-auto" /> {/* Añade tu logo aquí */}
        </div>

        {/* Componente en el centro */}
        <div className="">
          <span className="font-bold text-xl"></span>
        </div>

        {/* Componente a la derecha */}
        <div className="flex-shrink-0">
          {/* Muestra el botón de cierre de sesión solo si estás en la ruta '/' */}
          {location.pathname === '/' ? (
            <Form method="post">
              <button
                type="submit"
                name="action"
                value="logout"
                className="text-red-500 py-1 border px-3 text-sm rounded-md font-semibold"
              >
                Logout
              </button>
            </Form>
          ) : (
            <Link to="/signup" className="text-grey-500 py-1 border px-3 text-sm rounded-md font-semibold">
              Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
