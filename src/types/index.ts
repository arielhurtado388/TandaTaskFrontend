import { z } from "zod";

// Auth
const authSchema = z.object({
  nombre: z.string(),
  correo: z.string().email(),
  contrasena_actual: z.string(),
  contrasena: z.string(),
  contrasena_confirmacion: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type FormularioUsuarioLogin = Pick<Auth, "correo" | "contrasena">;
export type FormularioUsuarioRegistro = Pick<
  Auth,
  "nombre" | "correo" | "contrasena" | "contrasena_confirmacion"
>;

export type TokenConfirmacion = Pick<Auth, "token">;
export type FormularioRequerirCodigo = Pick<Auth, "correo">;
export type FormularioOlvideContrasena = Pick<Auth, "correo">;
export type FormularioNuevaContrasena = Pick<
  Auth,
  "contrasena" | "contrasena_confirmacion"
>;

export type FormularioActualizarContrasena = Pick<
  Auth,
  "contrasena_actual" | "contrasena" | "contrasena_confirmacion"
>;

// Usuarios
export const usuarioSchema = authSchema
  .pick({
    nombre: true,
    correo: true,
  })
  .extend({
    _id: z.string(),
  });

export type Usuario = z.infer<typeof usuarioSchema>;
export type FormularioPerfil = Pick<Usuario, "nombre" | "correo">;

// Notas
const notaSchema = z.object({
  _id: z.string(),
  contenido: z.string(),
  creadoPor: usuarioSchema,
  tarea: z.string(),
  createdAt: z.string(),
});

export type Nota = z.infer<typeof notaSchema>;
export type FormularioNota = Pick<Nota, "contenido">;

// Tareas
export const estadosTareaSchema = z.enum([
  "pendiente",
  "enEspera",
  "enProgreso",
  "bajoRevision",
  "completa",
]);

export type TareaEstado = z.infer<typeof estadosTareaSchema>;

export const tareaSchema = z.object({
  _id: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
  proyecto: z.string(),
  estado: estadosTareaSchema,
  completadoPor: z.array(
    z.object({
      _id: z.string(),
      usuario: usuarioSchema,
      estado: estadosTareaSchema,
    })
  ),
  notas: z.array(
    notaSchema.extend({
      creadoPor: usuarioSchema,
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Tarea = z.infer<typeof tareaSchema>;
export type TareaFormData = Pick<Tarea, "nombre" | "descripcion">;

// Proyectos
export const proyectoSchema = z.object({
  _id: z.string(),
  nombreProyecto: z.string(),
  nombreCliente: z.string(),
  descripcion: z.string(),
  propietario: z.string(),
});

export const proyectoDashboardSchema = z.array(
  proyectoSchema.pick({
    _id: true,
    nombreProyecto: true,
    nombreCliente: true,
    descripcion: true,
    propietario: true,
  })
);

export type Proyecto = z.infer<typeof proyectoSchema>;
export type ProyectoFormData = Pick<
  Proyecto,
  "nombreProyecto" | "nombreCliente" | "descripcion"
>;

// Equipo
export const miembroEquipoSchema = usuarioSchema.pick({
  _id: true,
  nombre: true,
  correo: true,
});

export const miembrosEquipoSchema = z.array(miembroEquipoSchema);
export type MiembroEquipo = z.infer<typeof miembroEquipoSchema>;
export type FormularioMiembroEquipo = Pick<MiembroEquipo, "correo">;
