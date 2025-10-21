import { obtenerProyectoPorId } from "@/api/ProyectoAPI";
import FormularioEditarProyecto from "@/components/proyectos/FormularioEditarProyecto";
import ListaTareas from "@/components/tareas/ListaTareas";
import ModalAgregarTarea from "@/components/tareas/ModalAgregarTarea";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function DetalleProyectoView() {
  const navegacion = useNavigate();
  const params = useParams();
  const idProyecto = params.idProyecto!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editarProyecto", idProyecto],
    queryFn: () => obtenerProyectoPorId(idProyecto),
    retry: false,
  });

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404/" />;

  if (data)
    return (
      <>
        <h1 className="text-3xl font-black">{data.nombreProyecto}</h1>
        <p className="text-lg font-light text-gray-500 mt-5">
          {data.descripcion}
        </p>

        <nav className="my-5 flex gap-3">
          <button
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-lg font-bold cursor-pointer transition-colors "
            type="button"
            onClick={() => navegacion(location.pathname + "?nuevaTarea=true")}
          >
            Agregar tarea
          </button>
        </nav>

        <ListaTareas tareas={data.tareas} />

        <ModalAgregarTarea />
      </>
    );
}
