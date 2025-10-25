import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type {
  FormularioMiembroEquipo,
  MiembroEquipo,
  Proyecto,
} from "../types";
import { miembroEquipoSchema, miembrosEquipoSchema } from "../types";

export async function buscarMiembroPorCorreo({
  datosFormulario,
  idProyecto,
}: {
  datosFormulario: FormularioMiembroEquipo;
  idProyecto: Proyecto["_id"];
}) {
  try {
    const url = `/proyectos/${idProyecto}/equipo/buscar`;
    const { data } = await api.post(url, datosFormulario);

    const respuesta = miembroEquipoSchema.safeParse(data);

    if (respuesta.success) {
      return respuesta.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function agregarMiembroAlProyecto({
  id,
  idProyecto,
}: {
  id: MiembroEquipo["_id"];
  idProyecto: Proyecto["_id"];
}) {
  try {
    const url = `/proyectos/${idProyecto}/equipo`;
    const { data } = await api.post<string>(url, { id });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function obtenerMiembrosProyecto(idProyecto: Proyecto["_id"]) {
  try {
    const url = `/proyectos/${idProyecto}/equipo`;
    const { data } = await api(url);
    const respuesta = miembrosEquipoSchema.safeParse(data);

    if (respuesta.success) {
      return respuesta.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function eliminarMiembro({
  idUsuario,
  idProyecto,
}: {
  idUsuario: MiembroEquipo["_id"];
  idProyecto: Proyecto["_id"];
}) {
  try {
    const url = `/proyectos/${idProyecto}/equipo/${idUsuario}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
