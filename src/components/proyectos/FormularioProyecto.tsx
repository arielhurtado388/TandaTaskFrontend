import type { FieldErrors, UseFormRegister } from "react-hook-form";
import MensajeError from "../MensajeError";
import type { ProyectoFormData } from "types";

type FormularioProyectoProps = {
  register: UseFormRegister<ProyectoFormData>;
  errors: FieldErrors<ProyectoFormData>;
};

export default function FormularioProyecto({
  register,
  errors,
}: FormularioProyectoProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="nombreProyecto" className="text-sm uppercase font-bold">
          Nombre del proyecto
        </label>
        <input
          id="nombreProyecto"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del proyecto"
          {...register("nombreProyecto", {
            required: "El nombre del proyecto es obligatorio",
          })}
        />

        {errors.nombreProyecto && (
          <MensajeError>{errors.nombreProyecto.message}</MensajeError>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="nombreCliente" className="text-sm uppercase font-bold">
          Nombre del cliente
        </label>
        <input
          id="nombreCliente"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del cliente"
          {...register("nombreCliente", {
            required: "El nombre del cliente es obligatorio",
          })}
        />

        {errors.nombreCliente && (
          <MensajeError>{errors.nombreCliente.message}</MensajeError>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="descripcion" className="text-sm uppercase font-bold">
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="w-full p-3  border border-gray-200"
          placeholder="Descripción del proyecto"
          {...register("descripcion", {
            required: "La descripción del proyecto es obligatoria",
          })}
        />

        {errors.descripcion && (
          <MensajeError>{errors.descripcion.message}</MensajeError>
        )}
      </div>
    </>
  );
}
