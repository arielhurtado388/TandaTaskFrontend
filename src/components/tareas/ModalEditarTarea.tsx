import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormularioTarea from "./FormularioTarea";
import { useForm } from "react-hook-form";
import type { Tarea, TareaFormData } from "@/types/index";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actualizarTarea } from "@/api/TareaAPI";
import { toast } from "react-toastify";

type ModalEditarTareaProps = {
  data: Tarea;
  idTarea: Tarea["_id"];
};

export default function ModalEditarTarea({
  data,
  idTarea,
}: ModalEditarTareaProps) {
  const navegacion = useNavigate();

  const params = useParams();
  const idProyecto = params.idProyecto!;

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<TareaFormData>({
    defaultValues: {
      nombre: data.nombre,
      descripcion: data.descripcion,
    },
  });

  const queryCliente = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: actualizarTarea,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryCliente.invalidateQueries({
        queryKey: ["editarProyecto", idProyecto],
      });
      toast.success(data);
      reset();
      navegacion(location.pathname, { replace: true });
    },
  });

  const handleEditarTarea = (datosFormulario: TareaFormData) => {
    const data = { datosFormulario, idProyecto, idTarea };
    mutate(data);
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navegacion(location.pathname, { replace: true })}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <Dialog.Title as="h3" className="font-black text-3xl  my-5">
                  Editar tarea
                </Dialog.Title>

                <p className="text-lg font-bold">
                  Realiza cambios a una tarea en {""}
                  <span className="text-fuchsia-600">este formulario</span>
                </p>

                <form
                  className="mt-10 space-y-3"
                  noValidate
                  onSubmit={handleSubmit(handleEditarTarea)}
                >
                  <FormularioTarea errors={errors} register={register} />

                  <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value="Guardar cambios"
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
