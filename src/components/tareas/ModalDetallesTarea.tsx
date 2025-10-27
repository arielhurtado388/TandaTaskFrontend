import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actualizarEstado, obtenerTareaPorId } from "@/api/TareaAPI";
import { toast } from "react-toastify";
import { formatearFecha } from "@/utils/utils";
import { traduccionesEstado } from "@/locales/es";
import type { TareaEstado } from "@/types/index";
import PanelNotas from "../notas/PanelNotas";

export default function ModalDetallesTarea() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idTarea = queryParams.get("verTarea")!;
  const show = idTarea ? true : false;

  const params = useParams();
  const idProyecto = params.idProyecto!;

  const navegacion = useNavigate();

  const { data, isError, error } = useQuery({
    queryKey: ["tarea", idTarea],
    queryFn: () => obtenerTareaPorId({ idProyecto, idTarea }),
    enabled: !!idTarea,
    retry: false,
  });

  const queryCliente = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: actualizarEstado,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryCliente.invalidateQueries({ queryKey: ["proyecto", idProyecto] });
      queryCliente.invalidateQueries({ queryKey: ["tarea", idTarea] });
      toast.success(data);
      navegacion(location.pathname, { replace: true });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const estado = e.target.value as TareaEstado;
    const data = {
      idProyecto,
      idTarea,
      estado,
    };
    mutate(data);
  };

  if (isError) {
    setTimeout(() => {
      toast.error(error.message, { toastId: "error" });
    }, 1000);
    return <Navigate to={`/proyectos/${idProyecto}`} />;
  }

  if (data)
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
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatearFecha(data.createdAt)}
                    </p>
                    <p className="text-sm text-slate-400 mt-2">
                      Última actualización: {formatearFecha(data.updatedAt)}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-3xl text-slate-600 my-5"
                    >
                      {data.nombre}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2">
                      Descripción: {data.descripcion}
                    </p>

                    {data.completadoPor.length ? (
                      <>
                        <p className="font-bold text-lg text-slate-600 my-5">
                          Historial de cambios
                        </p>

                        <ul className="list-decimal ml-4">
                          {data.completadoPor.map((logActividad) => (
                            <li key={logActividad._id}>
                              <span className="font-bold text-slate-600 capitalize">
                                {traduccionesEstado[logActividad.estado]} por:
                              </span>{" "}
                              {logActividad.usuario.nombre}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    <div className="my-5 space-y-3">
                      <label className="font-bold">Estado Actual:</label>
                      <select
                        className="w-full p-3 bg-white border border-gray-300 mt-3 capitalize"
                        name=""
                        id=""
                        defaultValue={data.estado}
                        onChange={handleChange}
                      >
                        {Object.entries(traduccionesEstado).map(
                          ([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <PanelNotas notas={data.notas} />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
