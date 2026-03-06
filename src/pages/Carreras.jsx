import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Carreras() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Carreras</h1>
          <p className="text-slate-400">Formación profesional en danza</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-cyan-500/20">
          <h2 className="text-lg font-semibold text-white mb-2">Próximamente</h2>
          <p className="text-slate-400">
            Aquí encontrarás información sobre las carreras y formaciones que ofrece STUDIO EB.
          </p>
        </div>
      </div>
    </div>
  );
}
