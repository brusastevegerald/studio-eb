import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import StudioLayout from './components/StudioLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import PagarCuota from './pages/PagarCuota';
import Cursos from './pages/Cursos';
import Carreras from './pages/Carreras';
import Horarios from './pages/Horarios';
import Noticias from './pages/Noticias';
import Contactos from './pages/Contactos';
import Eventos from './pages/Eventos';
import Marketing from './pages/Marketing';
import PagoOk from './pages/PagoOk';
import PagoPendiente from './pages/PagoPendiente';
import PanelProfesor from './pages/PanelProfesor';
import MiCuenta from './pages/MiCuenta';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<StudioLayout />}>
            <Route index element={<Home />} />
            <Route path="ingresar" element={<Login />} />
            <Route path="pagar-cuota" element={<PagarCuota />} />
            <Route path="cursos" element={<Cursos />} />
            <Route path="carreras" element={<Carreras />} />
            <Route path="horarios" element={<Horarios />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="contactos" element={<Contactos />} />
            <Route path="eventos" element={<Eventos />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="pago-ok" element={<PagoOk />} />
            <Route path="pago-pendiente" element={<PagoPendiente />} />
            <Route path="mi-cuenta" element={<ProtectedRoute requireStudent><MiCuenta /></ProtectedRoute>} />
          </Route>
          <Route path="/profesor" element={<ProtectedRoute requireTeacher><PanelProfesor /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}
