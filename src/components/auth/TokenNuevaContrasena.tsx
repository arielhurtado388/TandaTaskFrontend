import { validarToken } from "@/api/AuthAPI";
import type { TokenConfirmacion } from "@/types/index";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type TokenNuevaContrasenaProps = {
  token: TokenConfirmacion["token"];
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setEsTokenValido: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TokenNuevaContrasena({
  token,
  setToken,
  setEsTokenValido,
}: TokenNuevaContrasenaProps) {
  const { mutate } = useMutation({
    mutationFn: validarToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      setEsTokenValido(true);
    },
  });

  const handleChange = (token: TokenConfirmacion["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: TokenConfirmacion["token"]) => {
    mutate({ token });
  };

  return (
    <>
      <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
        <label className="font-normal text-lg text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/olvide"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
