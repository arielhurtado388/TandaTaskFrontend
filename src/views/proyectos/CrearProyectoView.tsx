import FormularioProyecto from "@/components/proyectos/FormularioProyecto";
import { crearProyecto } from "@/api/ProyectoAPI";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import type { ProyectoFormData } from "@/types/index";

export default function CrearProyectoView() {
  const navegacion = useNavigate();
  const valoresIniciales: ProyectoFormData = {
    nombreProyecto: "",
    nombreCliente: "",
    descripcion: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: valoresIniciales });

  const { mutate } = useMutation({
    mutationFn: crearProyecto,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navegacion("/");
    },
  });

  const handleForm = (datos: ProyectoFormData) => mutate(datos);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black">Crear proyecto</h1>
        <p className="text-xl font-light text-gray-500 mt-5">
          Llena el formulario para crear un proyecto
        </p>
        <nav className="my-8">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/"
          >
            Volver a proyectos
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <FormularioProyecto register={register} errors={errors} />
          <input
            className=" bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
            type="submit"
            value="Crear proyecto"
          />
        </form>
      </div>
    </>
  );
}
