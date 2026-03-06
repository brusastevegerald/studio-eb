import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Ingresá tu email.');
      return;
    }
    if (!password) {
      setError('Ingresá tu contraseña.');
      return;
    }
    setLoading(true);
    const result = login(email.trim(), password);
    setLoading(false);
    if (result.ok) {
      if (result.role === 'teacher') navigate('/profesor', { replace: true });
      else navigate('/mi-cuenta', { replace: true });
    } else {
      setError(result.error || 'Error al ingresar.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <LogIn className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Ingresar</h1>
            <p className="text-slate-400 text-sm">Profesores y alumnos</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-white/5 border border-cyan-500/20">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-70 text-[#0a0f1a] font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-4">
          Alumnos: usá el email y contraseña que te dio el profesor.
        </p>
      </div>
    </div>
  );
}
