import { useForm } from "react-hook-form";
import MensajeError from "../MensajeError";
import type { FormularioPerfil, Usuario } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actualizarPerfil } from "@/api/PerfilAPI";
import { toast } from "react-toastify";

export default function FormularioPerfil({ data }: { data: Usuario }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormularioPerfil>({ defaultValues: data });

  const queryCliente = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: actualizarPerfil,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryCliente.invalidateQueries({ queryKey: ["usuario"] });
    },
  });

  const handleEditProfile = (datosFormulario: FormularioPerfil) => {
    mutate(datosFormulario);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-3xl font-black ">Mi perfil</h1>
        <p className="text-lg font-light text-gray-500 mt-5">
          Aquí puedes actualizar tu información
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l text-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="nombre">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              className="w-full p-3  border border-gray-200"
              {...register("nombre", {
                required: "El nombre es obligatorio",
              })}
            />
            {errors.nombre && (
              <MensajeError>{errors.nombre.message}</MensajeError>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="correo">
              Correo
            </label>
            <input
              id="correo"
              type="email"
              placeholder="Tu correo"
              className="w-full p-3  border border-gray-200"
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
            value="Guardar cambios"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
