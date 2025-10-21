import { Link, useNavigate } from "react-router-dom";
import FormularioProyecto from "./FormularioProyecto";
import { useForm } from "react-hook-form";
import type { Proyecto, ProyectoFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actualizarProyecto } from "@/api/ProyectoAPI";
import { toast } from "react-toastify";

type FormularioEditarProyectoProps = {
  data: ProyectoFormData;
  idProyecto: Proyecto["_id"];
};

export default function FormularioEditarProyecto({
  data,
  idProyecto,
}: FormularioEditarProyectoProps) {
  const navegacion = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombreProyecto: data.nombreProyecto,
      nombreCliente: data.nombreCliente,
      descripcion: data.descripcion,
    },
  });

  const queryCliente = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: actualizarProyecto,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryCliente.invalidateQueries({ queryKey: ["proyectos"] });
      queryCliente.invalidateQueries({
        queryKey: ["editarProyecto", idProyecto],
      });
      toast.success(data);
      navegacion("/");
    },
  });

  const handleForm = (datosFormulario: ProyectoFormData) => {
    const data = {
      datosFormulario,
      idProyecto,
    };
    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black">Editar proyecto</h1>
        <p className="text-xl font-light text-gray-500 mt-5">
          Llena el formulario para editar un proyecto
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
            value="Guardar cambios"
          />
        </form>
      </div>
    </>
  );
}
