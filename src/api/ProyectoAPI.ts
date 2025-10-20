import api from "@/lib/axios";
import type { ProyectoFormData } from "../types";

export async function crearProyecto(datos: ProyectoFormData) {
  try {
    const { data } = await api.post("/proyectos", datos);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
