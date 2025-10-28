import { Link } from "react-router-dom";

export default function NoEncontrado() {
  return (
    <>
      <h1 className="font-black text-3xl text-white text-center">
        Página no encontrada
      </h1>
      <p className="mt-10 text-center text-white">
        Tal vez quieras volver a{" "}
        <Link className="text-fuchsia-500" to={"/"}>
          proyectos
        </Link>
      </p>
    </>
  );
}
