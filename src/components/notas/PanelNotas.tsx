import type { Tarea } from "@/types/index";
import FormularioAgregarNota from "./FormularioAgregarNota";
import DetallesNota from "./DetallesNota";

type PanelNotasProps = {
  notas: Tarea["notas"];
};

export default function PanelNotas({ notas }: PanelNotasProps) {
  return (
    <>
      <FormularioAgregarNota />

      <div className="divide-y divide-gray-100 mt-10">
        {notas.length ? (
          <>
            <p className="font-bold text-lg text-slate-600 my-5">Notas</p>
            {notas.map((nota) => (
              <DetallesNota key={nota._id} nota={nota} />
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-center pt-3">No hay notas aún</p>
        )}
      </div>
    </>
  );
}
