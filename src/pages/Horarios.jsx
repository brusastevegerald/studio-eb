import React from 'react';
import { Clock } from 'lucide-react';

const HORARIOS = [
  { disciplina: 'Ballet niños', dias: 'Lunes y Miércoles', hora: '17:00 - 18:00' },
  { disciplina: 'Ballet jóvenes', dias: 'Martes y Jueves', hora: '18:30 - 19:30' },
  { disciplina: 'Danza contemporánea', dias: 'Lunes y Viernes', hora: '19:00 - 20:00' },
  { disciplina: 'Hip Hop', dias: 'Miércoles y Viernes', hora: '18:00 - 19:00' },
  { disciplina: 'Jazz', dias: 'Martes', hora: '17:30 - 18:30' },
  { disciplina: 'Danza inicial (4 a 7 años)', dias: 'Sábados', hora: '10:00 - 11:00' },
];

export default function Horarios() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Clock className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Horarios</h1>
          <p className="text-slate-400">Días y horarios de cada disciplina</p>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-cyan-500/20 text-sm font-semibold text-cyan-300">
          <div className="p-4 bg-[#0a0f1a]">Disciplina</div>
          <div className="p-4 bg-[#0a0f1a]">Días</div>
          <div className="p-4 bg-[#0a0f1a]">Horario</div>
        </div>
        {HORARIOS.map((h, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-cyan-500/10"
          >
            <div className="p-4 bg-[#0d1321] text-white font-medium">{h.disciplina}</div>
            <div className="p-4 bg-[#0d1321] text-slate-300">{h.dias}</div>
            <div className="p-4 bg-[#0d1321] text-slate-300">{h.hora}</div>
          </div>
        ))}
      </div>
      <p className="text-slate-500 text-sm mt-4 text-center">
        Los horarios pueden sufrir modificaciones. Consultá en el estudio.
      </p>
    </div>
  );
}
