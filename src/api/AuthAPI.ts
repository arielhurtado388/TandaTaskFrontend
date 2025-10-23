import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  type FormularioUsuarioRegistro,
  type TokenConfirmacion,
} from "../types";

export async function crearCuenta(datosFormulario: FormularioUsuarioRegistro) {
  try {
    const url = "/auth/crear-cuenta";
    const { data } = await api.post<string>(url, datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function confirmarCuenta(datosFormulario: TokenConfirmacion) {
  try {
    const url = "/auth/confirmar-cuenta";
    const { data } = await api.post<string>(url, datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
