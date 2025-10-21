import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardVista from "@/views/DashboardVista";
import CrearProyectoView from "./views/proyectos/CrearProyectoView";
import EditarProyectoView from "./views/proyectos/EditarProyectoView";
import DetalleProyectoView from "./views/proyectos/DetalleProyectoView";

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
      </Routes>
    </BrowserRouter>
  );
}
