import type { MiembroEquipo, Proyecto } from "../types";

export const esPropietario = (
  idPropietario: Proyecto["propietario"],
  idUsuario: MiembroEquipo["_id"]
) => idPropietario === idUsuario;
