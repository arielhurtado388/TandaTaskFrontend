import { z } from "zod";

// Proyectos
export const proyectoSchema = z.object({
  _id: z.string(),
  nombreProyecto: z.string(),
  nombreCliente: z.string(),
  descripcion: z.string(),
});

export const proyectoDashboardSchema = z.array(
  proyectoSchema.pick({
    _id: true,
    nombreProyecto: true,
    nombreCliente: true,
    descripcion: true,
  })
);

export type Proyecto = z.infer<typeof proyectoSchema>;
export type ProyectoFormData = Pick<
  Proyecto,
  "nombreProyecto" | "nombreCliente" | "descripcion"
>;
