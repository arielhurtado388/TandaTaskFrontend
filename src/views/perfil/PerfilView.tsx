import FormularioPerfil from "@/components/perfil/FormularioPerfil";
import { useAuth } from "@/hooks/useAuth";

export default function PerfilView() {
  const { data, isLoading } = useAuth();

  if (isLoading) return "Cargando...";

  if (data) return <FormularioPerfil data={data} />;
}
