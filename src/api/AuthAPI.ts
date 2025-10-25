import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  type FormularioOlvideContrasena,
  type FormularioRequerirCodigo,
  type FormularioUsuarioLogin,
  type FormularioUsuarioRegistro,
  type TokenConfirmacion,
  type FormularioNuevaContrasena,
  type Usuario,
  usuarioSchema,
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
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function recuperarContrasena(
  datosFormulario: FormularioOlvideContrasena
) {
  try {
    const url = "/auth/olvide";
    const { data } = await api.post<string>(url, datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function validarToken(datosFormulario: TokenConfirmacion) {
  try {
    const url = "/auth/validar-token";
    const { data } = await api.post<string>(url, datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function actualizarContrasenaConToken({
  datosFormulario,
  token,
}: {
  datosFormulario: FormularioNuevaContrasena;
  token: TokenConfirmacion["token"];
}) {
  try {
    const url = `/auth/actualizar-contrasena/${token}`;
    const { data } = await api.post<string>(url, datosFormulario);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function obtenerUsuario() {
  try {
    const { data } = await api("/auth/usuario");
    const respuesta = usuarioSchema.safeParse(data);
    if (respuesta.success) {
      return respuesta.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
