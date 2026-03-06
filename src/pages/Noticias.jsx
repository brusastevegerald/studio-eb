import React from 'react';
import { Newspaper, Calendar } from 'lucide-react';

const NOTICIAS = [
  { id: 1, titulo: 'Inscripciones abiertas 2026', fecha: '5 de marzo 2026', texto: 'Ya podés inscribirte a todas las disciplinas. Consultá horarios y vení a una clase de prueba sin cargo.' },
  { id: 2, titulo: 'Muestra anual - Fecha confirmada', fecha: '1 de marzo 2026', texto: 'La muestra anual de fin de año se realizará el 15 de diciembre. Próximamente más detalles sobre ensayos y entradas.' },
  { id: 3, titulo: 'Nueva clase de Hip Hop para adultos', fecha: '20 de febrero 2026', texto: 'Sumamos un nuevo horario de Hip Hop los viernes a las 20:00. Nivel inicial, no hace falta experiencia previa.' },
  { id: 4, titulo: 'Recordatorio: pago de cuotas', fecha: '10 de febrero 2026', texto: 'Recordamos que las cuotas se abonan por Mercado Pago desde la web o en el estudio en horario de atención.' },
];

export default function Noticias() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Newspaper className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Noticias</h1>
          <p className="text-slate-400">Novedades y comunicados del estudio</p>
        </div>
      </div>

      <div className="space-y-4">
        {NOTICIAS.map((n) => (
          <article
            key={n.id}
            className="p-6 rounded-2xl bg-white/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
          >
            <div className="flex items-center gap-2 text-cyan-400 text-sm mb-2">
              <Calendar className="w-4 h-4" />
              <time>{n.fecha}</time>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">{n.titulo}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{n.texto}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
