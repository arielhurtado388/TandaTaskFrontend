import { agregarMiembroAlProyecto } from "@/api/EquipoAPI";
import type { MiembroEquipo } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type ResultadoBusquedaProps = {
  usuario: MiembroEquipo;
  resetearDatos: () => void;
};

export default function ResultadoBusqueda({
  usuario,
  resetearDatos,
}: ResultadoBusquedaProps) {
  const navegacion = useNavigate();
  const params = useParams();
  const idProyecto = params.idProyecto!;
  const id = usuario._id;

  const queryCliente = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: agregarMiembroAlProyecto,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      resetearDatos();
      navegacion(location.pathname, { replace: true });
      queryCliente.invalidateQueries({
        queryKey: ["equipoProyecto", idProyecto],
      });
    },
  });

  const handleAgregarMiembro = () => {
    const data = {
      id,
      idProyecto,
    };
    mutate(data);
  };

  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado</p>
      <div className="flex justify-between items-center">
        <p>{usuario.nombre}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 py-3 px-10 font-bold cursor-pointer"
          onClick={handleAgregarMiembro}
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  );
}
