import { Link } from "react-router-dom";

export default function DashboardVista() {
  return (
    <>
      <h1 className="text-4xl font-black">Mis proyectos</h1>
      <p className="text-xl font-light text-gray-500 mt-5">
        Maneja y administra tus proyectos
      </p>

      <nav className="my-8">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to="/proyectos/crear"
        >
          Nuevo proyecto
        </Link>
      </nav>
    </>
  );
}
