import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, CreditCard, LogOut } from 'lucide-react';

export default function MiCuenta() {
  const { user, logout, getAlumnoById } = useAuth();
  const alumno = user?.role === 'student' && user?.id ? getAlumnoById(user.id) : null;

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <User className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Mi cuenta</h1>
            <p className="text-slate-400 text-sm">{user?.email}</p>
          </div>
        </div>
        <Link
          to="/"
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="w-4 h-4" />
          Salir
        </Link>
      </div>

      {alumno && (
        <div className="p-6 rounded-2xl bg-white/5 border border-cyan-500/20 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">Datos</h2>
          <p className="text-white font-medium">{alumno.nombre}</p>
          <p className="text-cyan-400">{alumno.email}</p>
          {alumno.telefono && <p className="text-slate-400 text-sm">{alumno.telefono}</p>}
        </div>
      )}

      <Link
        to="/pagar-cuota"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] font-semibold"
      >
        <CreditCard className="w-5 h-5" />
        Pagar mi cuota
      </Link>
    </div>
  );
}
