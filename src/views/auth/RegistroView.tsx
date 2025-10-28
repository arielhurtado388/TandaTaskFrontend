import { useForm } from "react-hook-form";
import { type FormularioUsuarioRegistro } from "@/types/index";
import MensajeError from "@/components/MensajeError";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { crearCuenta } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegistroView() {
  const valoresIniciales: FormularioUsuarioRegistro = {
    nombre: "",
    correo: "",
    contrasena: "",
    contrasena_confirmacion: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormularioUsuarioRegistro>({ defaultValues: valoresIniciales });

  const { mutate } = useMutation({
    mutationFn: crearCuenta,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const contrasena = watch("contrasena");

  const handleRegister = (datosFormulario: FormularioUsuarioRegistro) =>
    mutate(datosFormulario);

  return (
    <>
      <h1 className="text-3xl font-black text-white">Crear cuenta</h1>
      <p className="text-lg font-light text-white mt-5">
        Llena el formulario para {""}
        <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
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

        <div className="flex flex-col gap-5">
          <label className="font-normal text-lg" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de registro"
            className="w-full p-3  border-gray-300 border"
            {...register("nombre", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.nombre && (
            <MensajeError>{errors.nombre.message}</MensajeError>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-lg" htmlFor="contrasena">
            Contraseña
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
            placeholder="Repite la contraseña de registro"
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
          value="Registrarme"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-lg cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          className="text-center text-gray-300 font-normal"
          to={"/auth/iniciar-sesion"}
        >
          ¿Ya tienes una cuenta? Iniciar sesión
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
