import { useForm } from "react-hook-form";
import { type FormularioUsuarioLogin } from "@/types/index";
import MensajeError from "@/components/MensajeError";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { iniciarSesion } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const valoresIniciales: FormularioUsuarioLogin = {
    correo: "",
    contrasena: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: valoresIniciales });

  const { mutate } = useMutation({
    mutationFn: iniciarSesion,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Iniciando sesión...");
    },
  });

  const handleLogin = (datosFormulario: FormularioUsuarioLogin) =>
    mutate(datosFormulario);

  return (
    <>
      <h1 className="text-3xl font-black text-white">Iniciar sesión</h1>
      <p className="text-lg font-light text-white mt-5">
        Comienza a planear tus proyectos {""}
        <span className=" text-fuchsia-500 font-bold">
          {" "}
          colocando tu correo y contraseña
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white"
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
                message: "EL correo no es válido",
              },
            })}
          />
          {errors.correo && (
            <MensajeError>{errors.correo.message}</MensajeError>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-lg" htmlFor="contrasena">
            Contraseña
          </label>

          <input
            type="password"
            id="contrasena"
            placeholder="Contraseña de registro"
            className="w-full p-3  border-gray-300 border"
            {...register("contrasena", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.contrasena && (
            <MensajeError>{errors.contrasena.message}</MensajeError>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-lg cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          className="text-center text-gray-300 font-normal"
          to={"/auth/registro"}
        >
          ¿No tienes una cuenta? Crear una
        </Link>

        <Link
          className="text-center text-gray-300 font-normal"
          to={"/auth/olvide"}
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
