import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { type FormularioRequerirCodigo } from "../../types";
import MensajeError from "@/components/MensajeError";
import { useMutation } from "@tanstack/react-query";
import { requerirCodigo } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RequerirCodigoView() {
  const valoreIniciales: FormularioRequerirCodigo = {
    correo: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: valoreIniciales });

  const { mutate } = useMutation({
    mutationFn: requerirCodigo,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleRequestCode = (datosFormulario: FormularioRequerirCodigo) => {
    mutate(datosFormulario);
  };

  return (
    <>
      <h1 className="px-8 text-3xl font-black text-white">
        Solicitar nuevo código
      </h1>
      <p className="px-8 text-lg font-light text-white mt-5">
        Coloca tu correo para recibir {""}
        <span className=" text-fuchsia-500 font-bold">el código</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-10 rounded-lg bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="correo">
            Correo
          </label>
          <input
            id="correo"
            type="email"
            placeholder="Correo de registro"
            className="w-full p-3 rounded-lg border-gray-300 border"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "EL correo no es válido",
              },
            })}
          />
          {errors.correo && (
            <MensajeError>{errors.correo.message}</MensajeError>
          )}
        </div>

        <input
          type="submit"
          value="Enviar código"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 rounded-lg text-white font-black  text-lg cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/iniciar-sesion"
          className="text-center text-gray-300 font-normal"
        >
          ¿Ya tienes una cuenta? Iniciar sesión
        </Link>
        <Link
          to="/auth/olvide"
          className="text-center text-gray-300 font-normal"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
