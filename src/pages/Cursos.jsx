import React, { useState } from 'react';
import { BookOpen, Mail, User, Phone, Send } from 'lucide-react';

const CURSOS = [
  { id: 'ballet', nombre: 'Ballet', edad: 'Desde 4 años', desc: 'Clásico y técnica' },
  { id: 'contemporaneo', nombre: 'Danza contemporánea', edad: 'Desde 8 años', desc: 'Expresión y movimiento' },
  { id: 'hiphop', nombre: 'Hip Hop', edad: 'Desde 10 años', desc: 'Urban y ritmo' },
  { id: 'jazz', nombre: 'Jazz', edad: 'Desde 6 años', desc: 'Energía y estilo' },
  { id: 'iniciales', nombre: 'Danza inicial (niños)', edad: '4 a 7 años', desc: 'Juego y ritmo' },
];

export default function Cursos() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    curso: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6">
          <Send className="w-10 h-10 text-cyan-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">¡Solicitud enviada!</h1>
        <p className="text-slate-400 mb-6">
          Recibimos tu interés. Te contactaremos a la brevedad para completar la inscripción.
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="text-cyan-400 hover:text-cyan-300 font-medium"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Inscribirme a cursos</h1>
          <p className="text-slate-400">Completá el formulario y te contactamos</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Disciplinas</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {CURSOS.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-white/5 border border-cyan-500/20"
            >
              <p className="font-semibold text-white">{c.nombre}</p>
              <p className="text-sm text-cyan-400">{c.edad}</p>
              <p className="text-sm text-slate-400 mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-1">
            Nombre y apellido *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Tu nombre"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="tu@email.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-slate-300 mb-1">
            Teléfono
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={form.telefono}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="11 1234-5678"
            />
          </div>
        </div>
        <div>
          <label htmlFor="curso" className="block text-sm font-medium text-slate-300 mb-1">
            Curso de interés
          </label>
          <select
            id="curso"
            name="curso"
            value={form.curso}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="">Seleccionar...</option>
            {CURSOS.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-slate-300 mb-1">
            Mensaje (opcional)
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
            placeholder="Consultas o comentarios..."
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] font-semibold rounded-xl flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Enviar solicitud
        </button>
      </form>
    </div>
  );
}
