import React, { useState, useEffect } from 'react';
import { Loader2, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const CUOTAS = [
  { id: 'mensual', title: 'Cuota mensual', price: 15000, description: 'Acceso a una disciplina' },
  { id: 'duo', title: 'Cuota doble (2 disciplinas)', price: 25000, description: 'Inscribite a dos cursos' },
  { id: 'ilimitada', title: 'Cuota ilimitada', price: 35000, description: 'Todas las disciplinas' },
];

export default function PagarCuota() {
  const { user, getAlumnoById } = useAuth();
  const [selected, setSelected] = useState('mensual');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role === 'student' && user?.id) {
      const alumno = getAlumnoById(user.id);
      if (alumno) {
        setEmail(alumno.email || '');
        setNombre(alumno.nombre || '');
      }
    }
  }, [user, getAlumnoById]);

  const item = CUOTAS.find((c) => c.id === selected);

  const handlePagar = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Ingresá tu email.');
      return;
    }
    setLoading(true);

    const baseUrl = `${window.location.origin}`;
    const preferenceBody = {
      items: [
        {
          id: item.id,
          title: item.title,
          description: item.description,
          quantity: 1,
          unit_price: item.price,
          currency_id: 'ARS',
        },
      ],
      payer: {
        email: email.trim(),
        name: nombre.trim() || undefined,
      },
      back_urls: {
        success: `${baseUrl}/#/pago-ok`,
        failure: `${baseUrl}/#/pagar-cuota`,
        pending: `${baseUrl}/#/pago-pendiente`,
      },
      external_reference: `cuota-studio-${item.id}-${Date.now()}`,
    };

    try {
      const res = await fetch(`${API_URL}/api/create-preference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferenceBody),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'No se pudo crear el pago.');
        setLoading(false);
        return;
      }

      const redirectUrl = data.init_point || data.sandbox_init_point;
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }
      setError('No se recibió el enlace de pago.');
    } catch (err) {
      setError('Error de conexión. ¿Está corriendo el servidor? (npm run server)');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Pagar cuota</h1>
          <p className="text-slate-400">Pago seguro con Mercado Pago</p>
        </div>
      </div>

      <form onSubmit={handlePagar} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Tipo de cuota</label>
          <div className="grid gap-3">
            {CUOTAS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelected(c.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selected === c.id
                    ? 'border-cyan-500 bg-cyan-500/10 text-white'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-sm text-slate-400 mt-0.5">{c.description}</p>
                  </div>
                  <span className="font-bold text-cyan-400">${c.price.toLocaleString('es-AR')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-1">
              Nombre (opcional)
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-xl">{error}</p>
        )}

        <div className="flex items-center justify-between pt-2">
          <p className="text-slate-400">
            Total: <span className="text-xl font-bold text-cyan-400">${item.price.toLocaleString('es-AR')}</span>
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-[#0a0f1a] font-semibold rounded-xl transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Redirigiendo a Mercado Pago...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Pagar con Mercado Pago
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
