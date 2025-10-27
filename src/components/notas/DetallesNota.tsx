import { eliminarNota } from "@/api/NotaAPI";
import { useAuth } from "@/hooks/useAuth";
import type { Nota } from "@/types/index";
import { formatearFecha } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type DetallesNotaProps = {
  nota: Nota;
};
export default function DetallesNota({ nota }: DetallesNotaProps) {
  const location = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(location.search);

  const idProyecto = params.idProyecto!;
  const idTarea = queryParams.get("verTarea")!;
  const idNota = nota._id;

  const { data, isLoading } = useAuth();

  const puedeEliminar = useMemo(() => data?._id === nota.creadoPor._id, [data]);
  const queryCliente = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: eliminarNota,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryCliente.invalidateQueries({ queryKey: ["tarea", idTarea] });
    },
  });

  if (isLoading) return "Cargando...";

  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {nota.contenido} por:{" "}
          <span className="font-bold">{nota.creadoPor.nombre}</span>
        </p>
        <p className="text-slate-500 text-xs">
          {formatearFecha(nota.createdAt)}
        </p>
      </div>
      {puedeEliminar && (
        <button
          className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
          type="button"
          onClick={() =>
            mutate({
              idProyecto,
              idTarea,
              idNota,
            })
          }
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
