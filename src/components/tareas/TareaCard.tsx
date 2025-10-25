import { eliminarTarea } from "@/api/TareaAPI";
import type { Tarea } from "@/types/index";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";

type TareaCardProps = {
  tarea: Tarea;
  puedeEditar: boolean;
};

export default function TareaCard({ tarea, puedeEditar }: TareaCardProps) {
  const navegacion = useNavigate();

  const params = useParams();
  const idProyecto = params.idProyecto!;

  const queryCliente = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: eliminarTarea,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryCliente.invalidateQueries({
        queryKey: ["proyecto", idProyecto],
      });
      toast.success(data);
    },
  });

  return (
    <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
      <div className="min-w-0 flex flex-col gap-y-4">
        <button
          className="font-bold text-slate-600 text-left"
          type="button"
          onClick={() =>
            navegacion(location.pathname + `?verTarea=${tarea._id}`)
          }
        >
          {tarea.nombre}
        </button>
        <p className="text-slate-500 text-xs">{tarea.descripcion}</p>
      </div>

      <div className="flex shrink-0  gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                <button
                  type="button"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900"
                  onClick={() =>
                    navegacion(location.pathname + `?verTarea=${tarea._id}`)
                  }
                >
                  Ver
                </button>
              </Menu.Item>

              {puedeEditar && (
                <>
                  <Menu.Item>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-gray-900"
                      onClick={() =>
                        navegacion(
                          location.pathname + `?editarTarea=${tarea._id}`
                        )
                      }
                    >
                      Editar
                    </button>
                  </Menu.Item>

                  <Menu.Item>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-red-500"
                      onClick={() => mutate({ idProyecto, idTarea: tarea._id })}
                    >
                      Eliminar
                    </button>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}
