import TokenNuevaContrasena from "@/components/auth/TokenNuevaContrasena";
import FormularioNuevaContrasena from "@/components/auth/FormularioNuevaContrasena";
import { useState } from "react";
import type { TokenConfirmacion } from "@/types/index";

export default function NuevaContrasenaView() {
  const [token, setToken] = useState<TokenConfirmacion["token"]>("");
  const [esTokenValido, setEsTokenValido] = useState(false);
  return (
    <>
      <h1 className="text-3xl font-black text-white">
        Reestablecer contraseña
      </h1>
      <p className="text-lg font-light text-white mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por correo</span>
      </p>

      {!esTokenValido ? (
        <TokenNuevaContrasena
          token={token}
          setToken={setToken}
          setEsTokenValido={setEsTokenValido}
        />
      ) : (
        <FormularioNuevaContrasena token={token} />
      )}
    </>
  );
}
