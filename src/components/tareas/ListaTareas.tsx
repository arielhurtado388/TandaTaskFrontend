import type { Tarea } from "@/types/index";
import TareaCard from "./TareaCard";
import { traduccionesEstado } from "@/locales/es";

type ListaTareasProps = {
  tareas: Tarea[];
  puedeEditar: boolean;
};

type GrupoTarea = {
  [key: string]: Tarea[];
};

const estadoInicialGrupos: GrupoTarea = {
  pendiente: [],
  enEspera: [],
  enProgreso: [],
  bajoRevision: [],
  completa: [],
};

const estilosEstado: { [key: string]: string } = {
  pendiente: "border-t-slate-500",
  enEspera: "border-t-red-500",
  enProgreso: "border-t-blue-500",
  bajoRevision: "border-t-amber-500",
  completa: "border-t-emerald-500",
};

export default function ListaTareas({ tareas, puedeEditar }: ListaTareasProps) {
  const tareasAgrupadas = tareas.reduce((acc, tarea) => {
    let grupoActual = acc[tarea.estado] ? [...acc[tarea.estado]] : [];
    grupoActual = [...grupoActual, tarea];
    return { ...acc, [tarea.estado]: grupoActual };
  }, estadoInicialGrupos);

  return (
    <>
      <h2 className="text-2xl font-black my-4 mt-8">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(tareasAgrupadas).map(([estado, tareas]) => (
          <div key={estado} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3
              className={`capitalize text-lg font-light border border-slate-300 bg-white p-3 border-t-8 ${estilosEstado[estado]}`}
            >
              {traduccionesEstado[estado]}
            </h3>

            <ul className="mt-5 space-y-5">
              {tareas.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No hay tareas
                </li>
              ) : (
                tareas.map((tarea) => (
                  <TareaCard
                    key={tarea._id}
                    tarea={tarea}
                    puedeEditar={puedeEditar}
                  />
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
