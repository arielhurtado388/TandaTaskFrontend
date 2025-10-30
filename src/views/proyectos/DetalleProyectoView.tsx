import { obtenerProyectoCompleto } from "@/api/ProyectoAPI";
import DatosEditarTarea from "@/components/tareas/DatosEditarTarea";
import ListaTareas from "@/components/tareas/ListaTareas";
import ModalAgregarTarea from "@/components/tareas/ModalAgregarTarea";
import ModalDetallesTarea from "@/components/tareas/ModalDetallesTarea";
import { useAuth } from "@/hooks/useAuth";
import { esPropietario } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function DetalleProyectoView() {
  const { data: usuario, isLoading: authLoading } = useAuth();

  const navegacion = useNavigate();
  const params = useParams();
  const idProyecto = params.idProyecto!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["proyecto", idProyecto],
    queryFn: () => obtenerProyectoCompleto(idProyecto),
    retry: false,
  });

  const puedeEditar = useMemo(
    () => data?.propietario === usuario?._id,
    [data, usuario]
  );

  if (isLoading && authLoading) return "Cargando...";
  if (isError) return <Navigate to="/404/" />;

  if (data && usuario)
    return (
      <>
        <h1 className="text-3xl font-black">{data.nombreProyecto}</h1>
        <p className="text-lg font-light text-gray-500 mt-5">
          {data.descripcion}
        </p>

        {esPropietario(data.propietario, usuario._id) && (
          <nav className="my-5 flex text-center flex-col md:flex-row gap-3">
            <button
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-lg font-bold cursor-pointer transition-colors "
              type="button"
              onClick={() => navegacion(location.pathname + "?nuevaTarea=true")}
            >
              Agregar tarea
            </button>

            <Link
              className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-lg font-bold cursor-pointer transition-colors "
              to="equipo"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <ListaTareas tareas={data.tareas} puedeEditar={puedeEditar} />

        <ModalAgregarTarea />
        <DatosEditarTarea />
        <ModalDetallesTarea />
      </>
    );
}
