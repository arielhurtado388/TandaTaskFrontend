import { isAxiosError } from "axios";
import type {
  FormularioActualizarContrasena,
  FormularioPerfil,
} from "../types";
import api from "@/lib/axios";

export async function actualizarPerfil(datosFormulario: FormularioPerfil) {
  try {
    const { data } = await api.put<string>("/auth/perfil", datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function actualizarContrasena(
  datosFormulario: FormularioActualizarContrasena
) {
  try {
    const { data } = await api.post<string>(
      "/auth/cambiar-contrasena",
      datosFormulario
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
