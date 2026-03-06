import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, GraduationCap, Plus, Pencil, Trash2, LogOut } from 'lucide-react';
import { CURSOS, HORARIOS } from '../data/cursosYHorarios';

const DEFAULT_PASS_ALUMNO = 'studio2024';
const DEFAULT_PASS_PROFE = 'studio123';

export default function PanelAdmin() {
  const { user, logout, getProfesores, addProfesor, updateProfesor, deleteProfesor, getAlumnos, addAlumno, updateAlumno, deleteAlumno } = useAuth();
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [tab, setTab] = useState('profesores');
  const [modal, setModal] = useState(null);
  const [formProfe, setFormProfe] = useState({ nombre: '', email: '', password: DEFAULT_PASS_PROFE });
  const [formAlumno, setFormAlumno] = useState({ nombre: '', email: '', telefono: '', password: DEFAULT_PASS_ALUMNO, curso: '', horario: '', profesorId: '' });

  const load = () => {
    setProfesores(getProfesores());
    setAlumnos(getAlumnos());
  };

  useEffect(() => { load(); }, []);

  const openNewProfe = () => {
    setFormProfe({ nombre: '', email: '', password: DEFAULT_PASS_PROFE });
    setModal('newProfe');
  };
  const openEditProfe = (p) => {
    setFormProfe({ nombre: p.nombre, email: p.email, password: p.password || DEFAULT_PASS_PROFE });
    setModal({ type: 'editProfe', id: p.id });
  };
  const openNewAlumno = () => {
    setFormAlumno({ nombre: '', email: '', telefono: '', password: DEFAULT_PASS_ALUMNO, curso: '', horario: '', profesorId: '' });
    setModal('newAlumno');
  };
  const openEditAlumno = (a) => {
    setFormAlumno({ nombre: a.nombre, email: a.email, telefono: a.telefono || '', password: a.password || DEFAULT_PASS_ALUMNO, curso: a.curso || '', horario: a.horario || '', profesorId: a.profesorId || '' });
    setModal({ type: 'editAlumno', id: a.id });
  };
  const closeModal = () => setModal(null);

  const handleSubmitProfe = (e) => {
    e.preventDefault();
    if (!formProfe.nombre.trim() || !formProfe.email.trim()) return;
    if (modal === 'newProfe') addProfesor(formProfe);
    else if (modal?.type === 'editProfe') updateProfesor(modal.id, { nombre: formProfe.nombre.trim(), email: formProfe.email.trim().toLowerCase(), password: formProfe.password || DEFAULT_PASS_PROFE });
    load();
    closeModal();
  };

  const handleSubmitAlumno = (e) => {
    e.preventDefault();
    if (!formAlumno.nombre.trim() || !formAlumno.email.trim()) return;
    if (modal === 'newAlumno') addAlumno(formAlumno);
    else if (modal?.type === 'editAlumno') updateAlumno(modal.id, { nombre: formAlumno.nombre.trim(), email: formAlumno.email.trim().toLowerCase(), telefono: formAlumno.telefono.trim(), password: formAlumno.password || DEFAULT_PASS_ALUMNO, curso: formAlumno.curso, horario: formAlumno.horario, profesorId: formAlumno.profesorId });
    load();
    closeModal();
  };

  const handleDeleteProfe = (id) => {
    if (window.confirm('¿Eliminar este profesor?')) { deleteProfesor(id); load(); }
  };
  const handleDeleteAlumno = (id) => {
    if (window.confirm('¿Eliminar este alumno?')) { deleteAlumno(id); load(); }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <header className="border-b border-cyan-500/20 bg-[#0a0f1a]/95 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Panel Admin</h1>
              <p className="text-slate-400 text-sm">{user?.usuario || user?.nombre}</p>
            </div>
          </div>
          <Link to="/" onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white">
            <LogOut className="w-4 h-4" /> Salir
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setTab('profesores')}
            className={`px-4 py-2 rounded-xl font-medium ${tab === 'profesores' ? 'bg-cyan-500 text-[#0a0f1a]' : 'bg-white/5 text-slate-400 hover:text-white'}`}
          >
            Profesores
          </button>
          <button
            type="button"
            onClick={() => setTab('alumnos')}
            className={`px-4 py-2 rounded-xl font-medium ${tab === 'alumnos' ? 'bg-cyan-500 text-[#0a0f1a]' : 'bg-white/5 text-slate-400 hover:text-white'}`}
          >
            Alumnos
          </button>
        </div>

        {tab === 'profesores' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-300">Profesores</h2>
              <button type="button" onClick={openNewProfe} className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] font-medium rounded-xl">
                <Plus className="w-4 h-4" /> Registrar profesor
              </button>
            </div>
            <ul className="space-y-3">
              {profesores.map((p) => (
                <li key={p.id} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-cyan-500/20">
                  <div>
                    <p className="font-medium text-white">{p.nombre}</p>
                    <p className="text-sm text-cyan-400">{p.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => openEditProfe(p)} className="p-2 rounded-lg text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-400"><Pencil className="w-4 h-4" /></button>
                    <button type="button" onClick={() => handleDeleteProfe(p.id)} className="p-2 rounded-lg text-slate-300 hover:bg-red-500/20 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === 'alumnos' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-300">Alumnos</h2>
              <button type="button" onClick={openNewAlumno} className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] font-medium rounded-xl">
                <Plus className="w-4 h-4" /> Registrar alumno
              </button>
            </div>
            <ul className="space-y-3">
              {alumnos.map((a) => (
                <li key={a.id} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-cyan-500/20">
                  <div>
                    <p className="font-medium text-white">{a.nombre}</p>
                    <p className="text-sm text-cyan-400">{a.email}</p>
                    {a.telefono && <p className="text-sm text-slate-400">{a.telefono}</p>}
                    {(a.curso || a.horario || a.profesorId) && (
                      <p className="text-xs text-slate-500 mt-1">
                        {CURSOS.find((c) => c.id === a.curso)?.nombre || a.curso}
                        {a.horario && ` · ${a.horario}`}
                        {a.profesorId && ` · ${profesores.find((p) => p.id === a.profesorId)?.nombre || ''}`}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => openEditAlumno(a)} className="p-2 rounded-lg text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-400"><Pencil className="w-4 h-4" /></button>
                    <button type="button" onClick={() => handleDeleteAlumno(a.id)} className="p-2 rounded-lg text-slate-300 hover:bg-red-500/20 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>

      {modal && (modal === 'newProfe' || modal?.type === 'editProfe') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={closeModal}>
          <div className="w-full max-w-md rounded-2xl bg-[#0d1321] border border-cyan-500/20 p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">{modal === 'newProfe' ? 'Registrar profesor' : 'Editar profesor'}</h3>
            <form onSubmit={handleSubmitProfe} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Nombre *</label>
                <input type="text" value={formProfe.nombre} onChange={(e) => setFormProfe((f) => ({ ...f, nombre: e.target.value }))} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white" required />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email *</label>
                <input type="email" value={formProfe.email} onChange={(e) => setFormProfe((f) => ({ ...f, email: e.target.value }))} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white" required readOnly={modal?.type === 'editProfe'} />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Contraseña</label>
                <input type="text" value={formProfe.password} onChange={(e) => setFormProfe((f) => ({ ...f, password: e.target.value }))} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white" placeholder={DEFAULT_PASS_PROFE} />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-2 rounded-xl border border-slate-500 text-slate-400">Cancelar</button>
                <button type="submit" className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] font-medium">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modal && (modal === 'newAlumno' || modal?.type === 'editAlumno') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={closeModal}>
          <div className="w-full max-w-md rounded-2xl bg-[#0d1321] border border-cyan-500/20 p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">{modal === 'newAlumno' ? 'Registrar alumno' : 'Editar alumno'}</h3>
            <form onSubmit={handleSubmitAlumno} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Nombre y apellido *</label>
                <input type="text" value={formAlumno.nombre} onChange={(e) => setFormAlumno((f) => ({ ...f, nombre: e.target.value }))} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white" required />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email *</label>
                <input type="email" value={formAlumno.email} onChange={(e) => setFormAlumno((f) => ({ ...f, email: e.target.value }))} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white" required readOnly={modal?.type === 'editAlumno'} />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Teléfono</label>
                <input type="tel" value={formAlumno.telefono} onChange={(e) => setFormAlumno((f) => ({ ...f, telefono: e.target.value }))} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Tipo de curso</label>
                <select value={formAlumno.curso} onChange={(e) => setFormAlumno((f) => ({ ...f, curso: e.target.value }))} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white">
                  <option value="">Seleccionar...</option>
                  {CURSOS.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Horarios</label>
                <select value={formAlumno.horario} onChange={(e) => setFormAlumno((f) => ({ ...f, horario: e.target.value }))} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white">
                  <option value="">Seleccionar...</option>
                  {HORARIOS.map((h) => <option key={h.id} value={h.label}>{h.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Profesor asignado</label>
                <select value={formAlumno.profesorId} onChange={(e) => setFormAlumno((f) => ({ ...f, profesorId: e.target.value }))} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white">
                  <option value="">Seleccionar...</option>
                  {profesores.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Contraseña</label>
                <input type="text" value={formAlumno.password} onChange={(e) => setFormAlumno((f) => ({ ...f, password: e.target.value }))} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white" placeholder={DEFAULT_PASS_ALUMNO} />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-2 rounded-xl border border-slate-500 text-slate-400">Cancelar</button>
                <button type="submit" className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] font-medium">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
