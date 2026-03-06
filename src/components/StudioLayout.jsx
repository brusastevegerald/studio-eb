import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, CreditCard, BookOpen, GraduationCap, Calendar, Megaphone, Clock, Newspaper, Phone, LogIn, LayoutDashboard, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/pagar-cuota', label: 'Pagar cuota', icon: CreditCard },
  { to: '/cursos', label: 'Cursos', icon: BookOpen },
  { to: '/carreras', label: 'Carreras', icon: GraduationCap },
  { to: '/horarios', label: 'Horarios', icon: Clock },
  { to: '/noticias', label: 'Noticias', icon: Newspaper },
  { to: '/eventos', label: 'Eventos', icon: Calendar },
  { to: '/marketing', label: 'Galería', icon: Megaphone },
  { to: '/contactos', label: 'Contactos', icon: Phone },
];

export default function StudioLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isTeacher, isStudent } = useAuth();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white flex flex-col">
      <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#0a0f1a]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[4rem] sm:min-h-[4.5rem] py-2">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/galeria/logo.jpg"
              alt=""
              className="h-11 sm:h-12 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg sm:text-xl text-white">STUDIO EB</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 flex-wrap justify-end max-w-3xl">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {Icon && <Icon className="w-4 h-4 shrink-0" />}
                {label}
              </NavLink>
            ))}
            <span className="w-px h-6 bg-cyan-500/30 mx-1" aria-hidden />
            {user ? (
              <>
                {isTeacher && (
                  <Link
                    to="/profesor"
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white whitespace-nowrap"
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    Panel
                  </Link>
                )}
                {isStudent && (
                  <Link
                    to="/mi-cuenta"
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white whitespace-nowrap"
                  >
                    <User className="w-4 h-4 shrink-0" />
                    Mi cuota
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white whitespace-nowrap"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Salir
                </button>
              </>
            ) : (
              <Link
                to="/ingresar"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium text-cyan-400 hover:bg-cyan-500/10 whitespace-nowrap"
              >
                <LogIn className="w-4 h-4 shrink-0" />
                Ingresar
              </Link>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden p-2.5 rounded-lg text-slate-300 hover:bg-white/10"
            aria-label="Menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-cyan-500/20 bg-[#0d1321] px-4 py-4 flex flex-col gap-1">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300'
                  }`
                }
              >
                {Icon && <Icon className="w-4 h-4 shrink-0" />}
                {label}
              </NavLink>
            ))}
            <div className="border-t border-cyan-500/20 my-2" />
            {user ? (
              <>
                {isTeacher && <Link to="/profesor" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-slate-300">Panel</Link>}
                {isStudent && <Link to="/mi-cuenta" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-slate-300">Mi cuota</Link>}
                <button type="button" onClick={handleLogout} className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-slate-300 text-left w-full">Salir</button>
              </>
            ) : (
              <Link to="/ingresar" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-cyan-400">Ingresar</Link>
            )}
          </div>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="border-t border-cyan-500/20 bg-[#070b12] py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/galeria/logo.jpg" alt="" className="h-10 w-auto object-contain" onError={(e) => (e.target.style.display = 'none')} />
            <span className="font-semibold text-cyan-400">STUDIO EB</span>
          </div>
          <nav className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-1 text-sm text-slate-400">
            <Link to="/pagar-cuota" className="hover:text-cyan-400 transition-colors">Pagar cuota</Link>
            <Link to="/cursos" className="hover:text-cyan-400 transition-colors">Cursos</Link>
            <Link to="/carreras" className="hover:text-cyan-400 transition-colors">Carreras</Link>
            <Link to="/horarios" className="hover:text-cyan-400 transition-colors">Horarios</Link>
            <Link to="/noticias" className="hover:text-cyan-400 transition-colors">Noticias</Link>
            <Link to="/eventos" className="hover:text-cyan-400 transition-colors">Eventos</Link>
            <Link to="/contactos" className="hover:text-cyan-400 transition-colors">Contactos</Link>
          </nav>
        </div>
        <p className="text-center text-slate-500 text-xs mt-8">© STUDIO EB. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
