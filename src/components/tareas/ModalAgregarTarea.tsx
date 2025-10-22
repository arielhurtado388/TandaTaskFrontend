import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormularioTarea from "./FormularioTarea";
import { useForm } from "react-hook-form";
import type { TareaFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearTarea } from "@/api/TareaAPI";
import { toast } from "react-toastify";

export default function ModalAgregarTarea() {
  // Leer si modal existe
  const navegacion = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTarea = queryParams.get("nuevaTarea");
  const show = modalTarea ? true : false;

  // Obtener idProyecto
  const params = useParams();
  const idProyecto = params.idProyecto!;

  const valoresIniciales: TareaFormData = {
    nombre: "",
    descripcion: "",
  };

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm({ defaultValues: valoresIniciales });

  const queryCliente = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: crearTarea,
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

  const handleCrearTarea = (datosFormulario: TareaFormData) => {
    const data = {
      datosFormulario,
      idProyecto,
    };
    mutate(data);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
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
                    Nueva tarea
                  </Dialog.Title>

                  <p className="text-lg font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                  <form
                    className="mt-10 space-y-3"
                    noValidate
                    onSubmit={handleSubmit(handleCrearTarea)}
                  >
                    <FormularioTarea errors={errors} register={register} />
                    <input
                      className=" bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                      type="submit"
                      value="Guardar tarea"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
