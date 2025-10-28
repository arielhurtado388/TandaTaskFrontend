import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import MensajeError from "../MensajeError";
import type { VerificarContrasena } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verificarContrasena } from "@/api/AuthAPI";
import { eliminarProyecto } from "@/api/ProyectoAPI";
import { toast } from "react-toastify";

export default function ModalEliminarProyecto() {
  const valoresIniciales: VerificarContrasena = {
    contrasena: "",
  };
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const idEliminarProyecto = queryParams.get("eliminarProyecto")!;
  const show = idEliminarProyecto ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: valoresIniciales });

  const queryCliente = useQueryClient();

  const verificarContrasenaUsuario = useMutation({
    mutationFn: verificarContrasena,
    onError: (error) => toast.error(error.message),
  });

  const eliminarProyectoMutation = useMutation({
    mutationFn: eliminarProyecto,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate(location.pathname, { replace: true });
      queryCliente.invalidateQueries({ queryKey: ["proyectos"] });
    },
  });

  const handleForm = async (datosFormulario: VerificarContrasena) => {
    await verificarContrasenaUsuario.mutateAsync(datosFormulario);
    await eliminarProyectoMutation.mutateAsync(idEliminarProyecto);
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navigate(location.pathname, { replace: true })}
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
                  Eliminar{" "}
                </Dialog.Title>

                <p className="text-lg font-bold">
                  Confirma la eliminación del proyecto {""}
                  <span className="text-fuchsia-600">
                    colocando tu contraseña
                  </span>
                </p>

                <form
                  className="mt-10 space-y-5"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
                >
                  <div className="flex flex-col gap-3">
                    <label className="font-normal text-lg" htmlFor="contrasena">
                      Contraseña
                    </label>
                    <input
                      id="contrasena"
                      type="password"
                      placeholder="Tu contraseña"
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
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-lg cursor-pointer"
                    value="Eliminar"
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
