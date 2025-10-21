import api from "@/lib/axios";
import {
  proyectoDashboardSchema,
  type Proyecto,
  type ProyectoFormData,
} from "../types";
import { isAxiosError } from "axios";

export async function crearProyecto(datos: ProyectoFormData) {
  try {
    const { data } = await api.post("/proyectos", datos);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function obtenerProyectos() {
  try {
    const { data } = await api("/proyectos");
    const respuesta = proyectoDashboardSchema.safeParse(data);
    if (respuesta.success) {
      return respuesta.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function obtenerProyectoPorId(id: Proyecto["_id"]) {
  try {
    const { data } = await api(`/proyectos/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
