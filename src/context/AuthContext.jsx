import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_AUTH = 'studio_auth';
const STORAGE_ALUMNOS = 'studio_alumnos';

// Credenciales de profesores (en producción usar backend)
const PROFESORES = [
  { email: 'profesor@studio.com', password: 'studio123', nombre: 'Profesor' },
];

function getAlumnosFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_ALUMNOS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setAlumnosStorage(alumnos) {
  localStorage.setItem(STORAGE_ALUMNOS, JSON.stringify(alumnos));
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_AUTH);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        if (data?.role && data?.email) setUser(data);
      } catch (_) {}
    }
  }, []);

  const login = (email, password) => {
    const e = (email || '').trim().toLowerCase();
    const p = password || '';

    const profe = PROFESORES.find((t) => t.email === e && t.password === p);
    if (profe) {
      const u = { role: 'teacher', email: profe.email, nombre: profe.nombre };
      setUser(u);
      localStorage.setItem(STORAGE_AUTH, JSON.stringify(u));
      return { ok: true, role: 'teacher' };
    }

    const alumnos = getAlumnosFromStorage();
    const alumno = alumnos.find((a) => a.email.toLowerCase() === e && a.password === p);
    if (alumno) {
      const u = { role: 'student', id: alumno.id, email: alumno.email, nombre: alumno.nombre };
      setUser(u);
      localStorage.setItem(STORAGE_AUTH, JSON.stringify(u));
      return { ok: true, role: 'student' };
    }

    return { ok: false, error: 'Email o contraseña incorrectos.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_AUTH);
  };

  const getAlumnos = () => getAlumnosFromStorage();
  const addAlumno = (alumno) => {
    const list = getAlumnosFromStorage();
    const id = String(Date.now());
    const nuevo = {
      id,
      nombre: (alumno.nombre || '').trim(),
      email: (alumno.email || '').trim().toLowerCase(),
      telefono: (alumno.telefono || '').trim(),
      password: alumno.password || 'studio2024',
      createdAt: new Date().toISOString(),
    };
    list.push(nuevo);
    setAlumnosStorage(list);
    return nuevo;
  };
  const updateAlumno = (id, data) => {
    const list = getAlumnosFromStorage();
    const i = list.findIndex((a) => a.id === id);
    if (i === -1) return null;
    list[i] = { ...list[i], ...data, id: list[i].id };
    setAlumnosStorage(list);
    return list[i];
  };
  const deleteAlumno = (id) => {
    const list = getAlumnosFromStorage().filter((a) => a.id !== id);
    setAlumnosStorage(list);
  };
  const getAlumnoById = (id) => getAlumnosFromStorage().find((a) => a.id === id);

  const value = {
    user,
    login,
    logout,
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    getAlumnos,
    addAlumno,
    updateAlumno,
    deleteAlumno,
    getAlumnoById,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
