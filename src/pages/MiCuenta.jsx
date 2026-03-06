import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, CreditCard, LogOut, BookOpen, Calendar, UserCircle } from 'lucide-react';
import { CURSOS } from '../data/cursosYHorarios';

export default function MiCuenta() {
  const { user, logout, getAlumnoById, getProfesores } = useAuth();
  const alumno = user?.role === 'student' && user?.id ? getAlumnoById(user.id) : null;
  const profesores = getProfesores?.() || [];
  const [tab, setTab] = useState('datos');

  const profesorNombre = alumno?.profesorId ? (profesores.find((p) => p.id === alumno.profesorId)?.nombre || '-') : '-';
  const cursoNombre = alumno?.curso ? (CURSOS.find((c) => c.id === alumno.curso)?.nombre || alumno.curso) : '-';

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

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setTab('datos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${tab === 'datos' ? 'bg-cyan-500 text-[#0a0f1a]' : 'bg-white/5 text-slate-400 hover:text-white'}`}
        >
          <UserCircle className="w-4 h-4" />
          Datos
        </button>
        <button
          type="button"
          onClick={() => setTab('cursos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${tab === 'cursos' ? 'bg-cyan-500 text-[#0a0f1a]' : 'bg-white/5 text-slate-400 hover:text-white'}`}
        >
          <BookOpen className="w-4 h-4" />
          Mis Cursos
        </button>
      </div>

      {tab === 'datos' && alumno && (
        <div className="p-6 rounded-2xl bg-white/5 border border-cyan-500/20 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">Datos personales</h2>
          <p className="text-white font-medium">{alumno.nombre}</p>
          <p className="text-cyan-400">{alumno.email}</p>
          {alumno.telefono && <p className="text-slate-400 text-sm">{alumno.telefono}</p>}
        </div>
      )}

      {tab === 'cursos' && alumno && (
        <div className="p-6 rounded-2xl bg-white/5 border border-cyan-500/20 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Mis Cursos / Carreras</h2>
          {alumno.curso || alumno.horario || alumno.profesorId ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-cyan-500/20">
                <BookOpen className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">{cursoNombre}</p>
                  {alumno.horario && (
                    <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      {alumno.horario}
                    </div>
                  )}
                  {alumno.profesorId && (
                    <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
                      <UserCircle className="w-4 h-4 text-cyan-400" />
                      Profesor: {profesorNombre}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-400">Aún no tenés cursos asignados. Consultá con el profesor o administración.</p>
          )}
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
