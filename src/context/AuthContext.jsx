import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_AUTH = 'studio_auth';
const STORAGE_ALUMNOS = 'studio_alumnos';
const STORAGE_PROFESORES = 'studio_profesores';

// Admin de prueba (solo él puede registrar profesores)
const ADMIN = { usuario: 'carlabrusa', password: '123', nombre: 'Admin' };

// Profesor inicial (el admin puede agregar más)
const PROFESOR_INICIAL = { id: 'p1', email: 'profesor@studio.com', password: 'studio123', nombre: 'Profesor', createdAt: new Date().toISOString() };

function getFromStorage(key, defaultVal = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function getAlumnosFromStorage() {
  return getFromStorage(STORAGE_ALUMNOS);
}

function getProfesoresFromStorage() {
  const data = getFromStorage(STORAGE_PROFESORES);
  if (data.length === 0) {
    setStorage(STORAGE_PROFESORES, [PROFESOR_INICIAL]);
    return [PROFESOR_INICIAL];
  }
  return data;
}

function setAlumnosStorage(alumnos) {
  setStorage(STORAGE_ALUMNOS, alumnos);
}

function setProfesoresStorage(profesores) {
  setStorage(STORAGE_PROFESORES, profesores);
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_AUTH);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        if (data?.role && (data?.email || data?.usuario)) setUser(data);
      } catch (_) {}
    }
  }, []);

  const login = (emailOrUser, password) => {
    const e = (emailOrUser || '').trim().toLowerCase();
    const p = password || '';

    // Admin (usuario: carlabrusa)
    if (e === ADMIN.usuario && p === ADMIN.password) {
      const u = { role: 'admin', usuario: ADMIN.usuario, nombre: ADMIN.nombre };
      setUser(u);
      localStorage.setItem(STORAGE_AUTH, JSON.stringify(u));
      return { ok: true, role: 'admin' };
    }

    // Profesor
    const profesores = getProfesoresFromStorage();
    const profe = profesores.find((t) => t.email.toLowerCase() === e && t.password === p);
    if (profe) {
      const u = { role: 'teacher', id: profe.id, email: profe.email, nombre: profe.nombre };
      setUser(u);
      localStorage.setItem(STORAGE_AUTH, JSON.stringify(u));
      return { ok: true, role: 'teacher' };
    }

    // Alumno
    const alumnos = getAlumnosFromStorage();
    const alumno = alumnos.find((a) => a.email.toLowerCase() === e && a.password === p);
    if (alumno) {
      const u = { role: 'student', id: alumno.id, email: alumno.email, nombre: alumno.nombre };
      setUser(u);
      localStorage.setItem(STORAGE_AUTH, JSON.stringify(u));
      return { ok: true, role: 'student' };
    }

    return { ok: false, error: 'Usuario, email o contraseña incorrectos.' };
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
      curso: alumno.curso || '',
      horario: alumno.horario || '',
      profesorId: alumno.profesorId || '',
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

  const getProfesores = () => getProfesoresFromStorage();
  const addProfesor = (profe) => {
    const list = getProfesoresFromStorage();
    const id = 'p' + Date.now();
    const nuevo = {
      id,
      nombre: (profe.nombre || '').trim(),
      email: (profe.email || '').trim().toLowerCase(),
      password: profe.password || 'studio123',
      createdAt: new Date().toISOString(),
    };
    list.push(nuevo);
    setProfesoresStorage(list);
    return nuevo;
  };
  const updateProfesor = (id, data) => {
    const list = getProfesoresFromStorage();
    const i = list.findIndex((p) => p.id === id);
    if (i === -1) return null;
    list[i] = { ...list[i], ...data, id: list[i].id };
    setProfesoresStorage(list);
    return list[i];
  };
  const deleteProfesor = (id) => {
    const list = getProfesoresFromStorage().filter((p) => p.id !== id);
    setProfesoresStorage(list);
  };

  const value = {
    user,
    login,
    logout,
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    getAlumnos,
    addAlumno,
    updateAlumno,
    deleteAlumno,
    getAlumnoById,
    getProfesores,
    addProfesor,
    updateProfesor,
    deleteProfesor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
