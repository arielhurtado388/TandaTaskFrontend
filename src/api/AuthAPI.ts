import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  type FormularioRequerirCodigo,
  type FormularioUsuarioLogin,
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

export async function requerirCodigo(
  datosFormulario: FormularioRequerirCodigo
) {
  try {
    const url = "/auth/requerir-codigo";
    const { data } = await api.post<string>(url, datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function iniciarSesion(datosFormulario: FormularioUsuarioLogin) {
  try {
    const url = "/auth/iniciar-sesion";
    const { data } = await api.post<string>(url, datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
