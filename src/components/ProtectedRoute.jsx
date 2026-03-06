import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin, requireTeacher, requireStudent }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/ingresar" state={{ from: location.pathname }} replace />;
  }
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  if (requireTeacher && user.role !== 'teacher') {
    return <Navigate to="/" replace />;
  }
  if (requireStudent && user.role !== 'student') {
    return <Navigate to="/" replace />;
  }
  return children;
}
