import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const EVENTOS = [
  { id: 1, titulo: 'Muestra anual de danza', fecha: '15 de Abril 2026', hora: '18:00', lugar: 'Teatro Municipal', imagen: '/galeria/1.jpg' },
  { id: 2, titulo: 'Recital de fin de curso', fecha: '20 de Junio 2026', hora: '19:00', lugar: 'Salón STUDIO EB', imagen: '/galeria/2.jpg' },
  { id: 3, titulo: 'Clase abierta padres', fecha: '10 de Mayo 2026', hora: '10:00', lugar: 'Estudio principal', imagen: '/galeria/3.jpg' },
];

export default function Eventos() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Eventos próximos</h1>
          <p className="text-slate-400">Recitales, muestras y fechas importantes</p>
        </div>
      </div>

      <div className="space-y-6">
        {EVENTOS.map((e) => (
          <article
            key={e.id}
            className="rounded-2xl overflow-hidden bg-white/5 border border-cyan-500/20 flex flex-col sm:flex-row"
          >
            <div className="sm:w-64 shrink-0 aspect-video sm:aspect-square bg-white/5">
              <img
                src={e.imagen}
                alt={e.titulo}
                className="w-full h-full object-cover"
                onError={(ev) => {
                  ev.target.src = 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop';
                }}
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-white mb-2">{e.titulo}</h2>
              <div className="flex flex-wrap gap-4 text-slate-400 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  {e.fecha}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  {e.hora}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  {e.lugar}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
