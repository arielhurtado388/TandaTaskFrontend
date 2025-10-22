import { obtenerTareaPorId } from "@/api/TareaAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import ModalEditarTarea from "./ModalEditarTarea";

export default function DatosEditarTarea() {
  const params = useParams();
  const idProyecto = params.idProyecto!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idTarea = queryParams.get("editarTarea")!;

  const { data, isError } = useQuery({
    queryKey: ["tarea", idTarea],
    queryFn: () => obtenerTareaPorId({ idProyecto, idTarea }),
    enabled: !!idTarea,
    retry: false,
  });

  if (isError) return <Navigate to="/404" />;

  if (data) return <ModalEditarTarea data={data} idTarea={idTarea} />;
}
