import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardVista from "@/views/DashboardVista";
import CrearProyectoView from "./views/proyectos/CrearProyectoView";
import EditarProyectoView from "./views/proyectos/EditarProyectoView";
import DetalleProyectoView from "./views/proyectos/DetalleProyectoView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegistroView from "./views/auth/RegistroView";
import ConfirmarCuentaView from "./views/auth/ConfirmarCuentaView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardVista />} index />
          <Route path="/proyectos/crear" element={<CrearProyectoView />} />
          <Route
            path="/proyectos/:idProyecto/editar"
            element={<EditarProyectoView />}
          />

          <Route
            path="/proyectos/:idProyecto"
            element={<DetalleProyectoView />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/iniciar-sesion" element={<LoginView />} />
          <Route path="/auth/registro" element={<RegistroView />} />
          <Route
            path="/auth/confirmar-cuenta"
            element={<ConfirmarCuentaView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
