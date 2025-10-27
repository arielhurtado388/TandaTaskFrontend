import { isAxiosError } from "axios";
import type { FormularioNota, Nota, Proyecto, Tarea } from "../types";
import api from "@/lib/axios";

type NotaAPIType = {
  datosFormulario: FormularioNota;
  idProyecto: Proyecto["_id"];
  idTarea: Tarea["_id"];
  idNota: Nota["_id"];
};

export async function crearNota({
  datosFormulario,
  idProyecto,
  idTarea,
}: Pick<NotaAPIType, "datosFormulario" | "idProyecto" | "idTarea">) {
  try {
    const url = `/proyectos/${idProyecto}/tareas/${idTarea}/notas`;
    const { data } = await api.post<string>(url, datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function eliminarNota({
  idProyecto,
  idTarea,
  idNota,
}: Pick<NotaAPIType, "idProyecto" | "idTarea" | "idNota">) {
  try {
    const url = `/proyectos/${idProyecto}/tareas/${idTarea}/notas/${idNota}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
