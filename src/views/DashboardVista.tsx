import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { obtenerProyectos } from "@/api/ProyectoAPI";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { esPropietario } from "@/utils/policies";
import ModalEliminarProyecto from "@/components/proyectos/ModalEliminarProyecto";

export default function DashboardVista() {
  const { data: usuario, isLoading: authLoading } = useAuth();

  const location = useLocation();
  const navegacion = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["proyectos"],
    queryFn: obtenerProyectos,
  });

  if (isLoading && authLoading) return "Cargando...";
  if (data && usuario)
    return (
      <>
        <h1 className="text-3xl font-black">Mis proyectos</h1>
        <p className="text-lg font-light text-gray-500 mt-5">
          Maneja y administra tus proyectos
        </p>

        <nav className="my-8">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-lg font-bold cursor-pointer transition-colors"
            to="/proyectos/crear"
          >
            Nuevo proyecto
          </Link>
        </nav>

        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data.map((proyecto) => (
              <li
                key={proyecto._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <div className="mb-2">
                      {esPropietario(proyecto.propietario, usuario._id) ? (
                        <p className="font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5">
                          Propietario
                        </p>
                      ) : (
                        <p className="font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5">
                          Colaborador
                        </p>
                      )}
                    </div>

                    <Link
                      to={`/proyectos/${proyecto._id}`}
                      className="text-gray-600 cursor-pointer hover:underline text-2xl font-bold"
                    >
                      {proyecto.nombreProyecto}
                    </Link>
                    <p className="text-sm text-gray-400 mt-2">
                      Cliente: {proyecto.nombreCliente}
                    </p>
                    <p className="text-sm text-gray-400">
                      {proyecto.descripcion}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
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
                          <Link
                            to={`/proyectos/${proyecto._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Ver
                          </Link>
                        </Menu.Item>

                        {esPropietario(proyecto.propietario, usuario._id) && (
                          <>
                            <Menu.Item>
                              <Link
                                to={`/proyectos/${proyecto._id}/editar`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Editar
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                type="button"
                                className="block px-3 py-1 text-sm leading-6 text-red-500"
                                onClick={() =>
                                  navegacion(
                                    location.pathname +
                                      `?eliminarProyecto=${proyecto._id}`
                                  )
                                }
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
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            No hay proyectos aún,{" "}
            <Link className="text-fuchsia-500 font-bold" to="/proyectos/crear">
              crear proyecto
            </Link>
          </p>
        )}

        <ModalEliminarProyecto />
      </>
    );
}
