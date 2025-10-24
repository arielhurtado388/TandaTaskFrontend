import type { FormularioNuevaContrasena, TokenConfirmacion } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import MensajeError from "../MensajeError";
import { useMutation } from "@tanstack/react-query";
import { actualizarContrasenaConToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";

type FormularioNuevaContrasenaProps = {
  token: TokenConfirmacion["token"];
};

export default function FormularioNuevaContrasena({
  token,
}: FormularioNuevaContrasenaProps) {
  const navegacion = useNavigate();
  const valoresIniciales: FormularioNuevaContrasena = {
    contrasena: "",
    contrasena_confirmacion: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: valoresIniciales });

  const { mutate } = useMutation({
    mutationFn: actualizarContrasenaConToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navegacion("/auth/iniciar-sesion");
    },
  });

  const handleNewPassword = (datosFormulario: FormularioNuevaContrasena) => {
    const data = {
      datosFormulario,
      token,
    };
    mutate(data);
  };

  const contrasena = watch("contrasena");

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-lg" htmlFor="contrasena">
            Nueva contraseña
          </label>

          <input
            id="contrasena"
            type="password"
            placeholder="Contraseña de registro"
            className="w-full p-3  border-gray-300 border"
            {...register("contrasena", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.contrasena && (
            <MensajeError>{errors.contrasena.message}</MensajeError>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-lg"
            htmlFor="contrasena_confirmacion"
          >
            Repetir contraseña
          </label>

          <input
            id="contrasena_confirmacion"
            type="password"
            placeholder="Repite la nueva contraseña de registro"
            className="w-full p-3  border-gray-300 border"
            {...register("contrasena_confirmacion", {
              required: "Repetir la contraseña es obligatorio",
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
          value="Reestablecer contraseña"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-lg cursor-pointer"
        />
      </form>
    </>
  );
}
