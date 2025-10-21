import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { Proyecto, TareaFormData } from "../types";

type TareaAPI = {
  datosFormulario: TareaFormData;
  idProyecto: Proyecto["_id"];
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
