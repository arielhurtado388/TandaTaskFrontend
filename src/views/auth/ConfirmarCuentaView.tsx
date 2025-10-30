import { Link, useNavigate, useNavigation } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import type { TokenConfirmacion } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmarCuenta } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmarCuentaView() {
  const [token, setToken] = useState<TokenConfirmacion["token"]>("");
  const navegacion = useNavigate();

  const { mutate } = useMutation({
    mutationFn: confirmarCuenta,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navegacion("/auth/iniciar-sesion");
    },
  });

  const handleChange = (token: TokenConfirmacion["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: TokenConfirmacion["token"]) =>
    mutate({ token });

  return (
    <>
      <h1 className="px-8 text-3xl font-black text-white">
        Confirma tu cuenta
      </h1>
      <p className="px-8 text-lg font-light text-white mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por correo</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-lg text-center block">
          Código de 6 dígitos
        </label>

        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/nuevo-codigo"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo código
        </Link>
      </nav>
    </>
  );
}
