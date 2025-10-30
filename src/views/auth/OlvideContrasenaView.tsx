import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { type FormularioOlvideContrasena } from "../../types";
import MensajeError from "@/components/MensajeError";
import { useMutation } from "@tanstack/react-query";
import { recuperarContrasena } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function OlvideContrasenaView() {
  const valoresIniciales: FormularioOlvideContrasena = {
    correo: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: valoresIniciales });

  const { mutate } = useMutation({
    mutationFn: recuperarContrasena,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleForgotPassword = (datosFormulario: FormularioOlvideContrasena) =>
    mutate(datosFormulario);

  return (
    <>
      <h1 className="px-8 text-3xl font-black text-white">
        Reestablecer contraseña
      </h1>
      <p className="px-8 text-lg font-light text-white mt-5">
        Coloca tu correo{""}
        <span className=" text-fuchsia-500 font-bold">
          {" "}
          y reestablece tu contraseña
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 mt-10  bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-lg" htmlFor="correo">
            Correo
          </label>
          <input
            id="correo"
            type="email"
            placeholder="Correo de registro"
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
          value="Enviar instrucciones"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-lg cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/iniciar-sesion"
          className="text-center text-gray-300 font-normal"
        >
          ¿Ya tienes una cuenta? Iniciar Sesión
        </Link>

        <Link
          to="/auth/registro"
          className="text-center text-gray-300 font-normal"
        >
          ¿No tienes una cuenta? Crear una
        </Link>
      </nav>
    </>
  );
}
