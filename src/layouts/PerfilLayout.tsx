import Tabs from "@/components/perfil/Tabs";
import { Outlet } from "react-router-dom";

export default function PerfilLayout() {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
}
