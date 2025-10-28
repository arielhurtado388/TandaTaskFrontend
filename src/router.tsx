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
import RequerirCodigoView from "./views/auth/RequerirCodigoView";
import OlvideContrasenaView from "./views/auth/OlvideContrasenaView";
import NuevaContrasenaView from "./views/auth/NuevaContrasenaView";
import EquipoProyectoView from "./views/proyectos/EquipoProyectoView";
import PerfilView from "./views/perfil/PerfilView";
import CambiarContrasenaView from "./views/perfil/CambiarContrasenaView";
import PerfilLayout from "./layouts/PerfilLayout";

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
          <Route
            path="/proyectos/:idProyecto/equipo"
            element={<EquipoProyectoView />}
          />

          <Route element={<PerfilLayout />}>
            <Route path="/perfil" element={<PerfilView />} />
            <Route
              path="/perfil/cambiar-contrasena"
              element={<CambiarContrasenaView />}
            />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/iniciar-sesion" element={<LoginView />} />
          <Route path="/auth/registro" element={<RegistroView />} />
          <Route
            path="/auth/confirmar-cuenta"
            element={<ConfirmarCuentaView />}
          />
          <Route path="/auth/nuevo-codigo" element={<RequerirCodigoView />} />
          <Route path="/auth/olvide" element={<OlvideContrasenaView />} />
          <Route
            path="/auth/nueva-contrasena"
            element={<NuevaContrasenaView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
