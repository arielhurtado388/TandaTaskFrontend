import api from "@/lib/axios";
import {
  proyectoDashboardSchema,
  type Proyecto,
  type ProyectoFormData,
} from "../types";
import { isAxiosError } from "axios";
import { data } from "react-router-dom";

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

type ProyectoAPIType = {
  datosFormulario: ProyectoFormData;
  idProyecto: Proyecto["_id"];
};

export async function actualizarProyecto({
  datosFormulario,
  idProyecto,
}: ProyectoAPIType) {
  try {
    const { data } = await api.put<string>(
      `/proyectos/${idProyecto}`,
      datosFormulario
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function eliminarProyecto(id: Proyecto["_id"]) {
  try {
    const { data } = await api.delete<string>(`/proyectos/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
