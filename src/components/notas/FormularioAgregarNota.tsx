import type { FormularioNota } from "@/types/index";
import { useForm } from "react-hook-form";
import MensajeError from "../MensajeError";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearNota } from "@/api/NotaAPI";
import { toast } from "react-toastify";

export default function FormularioAgregarNota() {
  const location = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(location.search);

  const idProyecto = params.idProyecto!;
  const idTarea = queryParams.get("verTarea")!;

  const valoresIniciales: FormularioNota = {
    contenido: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: valoresIniciales });

  const queryCliente = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: crearNota,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      queryCliente.invalidateQueries({ queryKey: ["tarea", idTarea] });
    },
  });

  const handleAgregarNota = (datosFormulario: FormularioNota) => {
    const data = {
      datosFormulario,
      idProyecto,
      idTarea,
    };
    mutate(data);
  };

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit(handleAgregarNota)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="contenido">
          Crear nota
        </label>
        <input
          className="w-full p-3 border border-gray-300"
          id="contenido"
          type="text"
          placeholder="Contenido de la nota"
          {...register("contenido", {
            required: "El contenido de la nota es obligatorio",
          })}
        />
        {errors.contenido && (
          <MensajeError>{errors.contenido.message}</MensajeError>
        )}
      </div>

      <input
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white font-black p-2 cursor-pointer"
        type="submit"
        value="Crear nota"
      />
    </form>
  );
}
