import { obtenerProyectoPorId } from "@/api/ProyectoAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditarProyectoView() {
  const params = useParams();
  const idProyecto = params.idProyecto!;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["editarProyecto", idProyecto],
    queryFn: () => obtenerProyectoPorId(idProyecto),
    retry: false,
  });

  console.log(data);

  return <div>EditarProyectoView</div>;
}
