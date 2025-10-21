import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { type TareaFormData } from "@/types/index";
import MensajeError from "../MensajeError";

type FormularioTareaProps = {
  errors: FieldErrors<TareaFormData>;
  register: UseFormRegister<TareaFormData>;
};

export default function FormularioTarea({
  errors,
  register,
}: FormularioTareaProps) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="nombre">
          Nombre de la tarea
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Nombre de la tarea"
          className="w-full p-3  border-gray-300 border"
          {...register("nombre", {
            required: "El nombre de la tarea es obligatorio",
          })}
        />
        {errors.nombre && <MensajeError>{errors.nombre.message}</MensajeError>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="descripcion">
          Descripción de la tarea
        </label>
        <textarea
          id="descripcion"
          placeholder="Descripción de la tarea"
          className="w-full p-3  border-gray-300 border"
          {...register("descripcion", {
            required: "La descripción de la tarea es obligatoria",
          })}
        />
        {errors.descripcion && (
          <MensajeError>{errors.descripcion.message}</MensajeError>
        )}
      </div>
    </>
  );
}
