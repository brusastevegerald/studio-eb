import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, Plus, Pencil, Trash2, LogOut } from 'lucide-react';

const DEFAULT_PASSWORD = 'studio2024';

export default function PanelProfesor() {
  const { user, logout, getAlumnos, addAlumno, updateAlumno, deleteAlumno } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', password: DEFAULT_PASSWORD });

  const load = () => setAlumnos(getAlumnos());

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm({ nombre: '', email: '', telefono: '', password: DEFAULT_PASSWORD });
    setModal('new');
  };
  const openEdit = (a) => {
    setForm({ nombre: a.nombre, email: a.email, telefono: a.telefono || '', password: a.password || DEFAULT_PASSWORD });
    setModal({ type: 'edit', id: a.id });
  };
  const closeModal = () => setModal(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim()) return;
    if (modal === 'new') {
      addAlumno({ ...form });
    } else if (modal?.type === 'edit') {
      updateAlumno(modal.id, { nombre: form.nombre.trim(), email: form.email.trim().toLowerCase(), telefono: form.telefono.trim(), password: form.password || DEFAULT_PASSWORD });
    }
    load();
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este alumno?')) {
      deleteAlumno(id);
      load();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <header className="border-b border-cyan-500/20 bg-[#0a0f1a]/95 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Panel Profesor</h1>
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
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-300">Alumnos inscritos</h2>
          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] font-medium rounded-xl"
          >
            <Plus className="w-4 h-4" />
            Inscribir alumno
          </button>
        </div>

        {alumnos.length === 0 ? (
          <p className="text-slate-400 py-8 text-center">No hay alumnos. Inscribí el primero.</p>
        ) : (
          <ul className="space-y-3">
            {alumnos.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white/5 border border-cyan-500/20"
              >
                <div>
                  <p className="font-medium text-white">{a.nombre}</p>
                  <p className="text-sm text-cyan-400">{a.email}</p>
                  {a.telefono && <p className="text-sm text-slate-400">{a.telefono}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(a)}
                    className="p-2 rounded-lg text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(a.id)}
                    className="p-2 rounded-lg text-slate-300 hover:bg-red-500/20 hover:text-red-400"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={closeModal}>
          <div
            className="w-full max-w-md rounded-2xl bg-[#0d1321] border border-cyan-500/20 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {modal === 'new' ? 'Inscribir alumno' : 'Editar alumno'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Nombre y apellido *</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white"
                  required
                  readOnly={modal?.type === 'edit'}
                />
                {modal?.type === 'edit' && (
                  <p className="text-xs text-slate-500 mt-1">El email no se puede cambiar (es el usuario de acceso).</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Contraseña (para que el alumno ingrese)</label>
                <input
                  type="text"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white"
                  placeholder={DEFAULT_PASSWORD}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 rounded-xl border border-slate-500 text-slate-400 hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button type="submit" className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] font-medium">
                  {modal === 'new' ? 'Inscribir' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
