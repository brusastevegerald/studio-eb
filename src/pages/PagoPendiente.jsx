import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

export default function PagoPendiente() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
        <Clock className="w-12 h-12 text-amber-400" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Pago pendiente</h1>
      <p className="text-slate-400 mb-8">
        Tu pago está en proceso. Cuando se acredite te notificaremos por email.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] font-semibold rounded-xl transition-colors"
      >
        Volver al inicio
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
