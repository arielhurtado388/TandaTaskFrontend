import { obtenerProyectoPorId } from "@/api/ProyectoAPI";
import FormularioEditarProyecto from "@/components/proyectos/FormularioEditarProyecto";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function EditarProyectoView() {
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
    return <FormularioEditarProyecto data={data} idProyecto={idProyecto} />;
}
