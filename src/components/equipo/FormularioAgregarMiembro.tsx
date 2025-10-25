import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { FormularioMiembroEquipo } from "@/types/index";
import MensajeError from "../MensajeError";
import { buscarMiembroPorCorreo } from "@/api/EquipoAPI";
import ResultadoBusqueda from "./ResultadoBusqueda";

export default function FormularioAgregarMiembro() {
  const valoresIniciales: FormularioMiembroEquipo = {
    correo: "",
  };
  const params = useParams();
  const idProyecto = params.idProyecto!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: valoresIniciales });

  const mutation = useMutation({
    mutationFn: buscarMiembroPorCorreo,
  });

  const handleSearchUser = async (datosFormulario: FormularioMiembroEquipo) => {
    const data = {
      datosFormulario,
      idProyecto,
    };
    mutation.mutate(data);
  };

  const resetearDatos = () => {
    reset();
    mutation.reset();
  };

  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label className="font-normal text-lg" htmlFor="correo">
            Correo del usuario
          </label>
          <input
            id="correo"
            type="email"
            placeholder=" Correo del usuario a agregar"
            className="w-full p-3  border-gray-300 border"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "El correo no es válido",
              },
            })}
          />
          {errors.correo && (
            <MensajeError>{errors.correo.message}</MensajeError>
          )}
        </div>

        <input
          type="submit"
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-lg cursor-pointer"
          value="Buscar usuario"
        />
      </form>

      <div className="mt-10">
        {mutation.isPending && <p className="text-center">Cargando...</p>}
        {mutation.error && (
          <p className="text-center">{mutation.error.message}</p>
        )}
        {mutation.data && (
          <ResultadoBusqueda
            usuario={mutation.data}
            resetearDatos={resetearDatos}
          />
        )}
      </div>
    </>
  );
}
