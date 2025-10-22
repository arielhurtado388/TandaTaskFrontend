import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { Proyecto, Tarea, TareaFormData } from "../types";

type TareaAPI = {
  datosFormulario: TareaFormData;
  idProyecto: Proyecto["_id"];
  idTarea: Tarea["_id"];
};

export async function crearTarea({
  datosFormulario,
  idProyecto,
}: Pick<TareaAPI, "datosFormulario" | "idProyecto">) {
  try {
    const url = `/proyectos/${idProyecto}/tareas`;
    const { data } = await api.post<string>(url, datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function obtenerTareaPorId({
  idProyecto,
  idTarea,
}: Pick<TareaAPI, "idProyecto" | "idTarea">) {
  try {
    const url = `/proyectos/${idProyecto}/tareas/${idTarea}`;
    const { data } = await api(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function actualizarTarea({
  datosFormulario,
  idProyecto,
  idTarea,
}: Pick<TareaAPI, "datosFormulario" | "idProyecto" | "idTarea">) {
  try {
    const url = `/proyectos/${idProyecto}/tareas/${idTarea}`;
    const { data } = await api.put<string>(url, datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function eliminarTarea({
  idProyecto,
  idTarea,
}: Pick<TareaAPI, "idProyecto" | "idTarea">) {
  try {
    const url = `/proyectos/${idProyecto}/tareas/${idTarea}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
