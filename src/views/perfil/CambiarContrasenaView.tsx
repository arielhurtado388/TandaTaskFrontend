import { actualizarContrasena } from "@/api/PerfilAPI";
import MensajeError from "@/components/MensajeError";
import type { FormularioActualizarContrasena } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CambiarContrasenaView() {
  const valoresIniciales: FormularioActualizarContrasena = {
    contrasena_actual: "",
    contrasena: "",
    contrasena_confirmacion: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: valoresIniciales });

  const { mutate } = useMutation({
    mutationFn: actualizarContrasena,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data),
  });

  const contrasena = watch("contrasena");

  const handleChangePassword = (
    datosFormulario: FormularioActualizarContrasena
  ) => mutate(datosFormulario);

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-black ">Cambiar contraseña</h1>
        <p className="text-lg font-light text-gray-500 mt-5">
          Utiliza este formulario para cambiar tu contraseña
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="contrasena_actual"
            >
              Contraseña actual
            </label>
            <input
              id="contrasena_actual"
              type="password"
              placeholder="Contraseña actual"
              className="w-full p-3  border border-gray-200"
              {...register("contrasena_actual", {
                required: "La contraseña actual es obligatoria",
              })}
            />
            {errors.contrasena_actual && (
              <MensajeError>{errors.contrasena_actual.message}</MensajeError>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="contrasena">
              Nueva contraseña
            </label>
            <input
              id="contrasena"
              type="password"
              placeholder="Nueva contraseña"
              className="w-full p-3  border border-gray-200"
              {...register("contrasena", {
                required: "La nueva contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener la menos 8 caracteres",
                },
              })}
            />
            {errors.contrasena && (
              <MensajeError>{errors.contrasena.message}</MensajeError>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="contrasena_confirmacion"
              className="text-sm uppercase font-bold"
            >
              Repetir contraseña
            </label>

            <input
              id="contrasena_confirmacion"
              type="password"
              placeholder="Repetir contraseña"
              className="w-full p-3  border border-gray-200"
              {...register("contrasena_confirmacion", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  value === contrasena || "Las contraseñas no son iguales",
              })}
            />
            {errors.contrasena_confirmacion && (
              <MensajeError>
                {errors.contrasena_confirmacion.message}
              </MensajeError>
            )}
          </div>

          <input
            type="submit"
            value="Cambiar contraseña"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
