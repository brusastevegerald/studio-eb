import React, { useState } from 'react';
import { Megaphone, X } from 'lucide-react';

const IMAGENES = [
  { src: '/galeria/1.jpg', alt: 'Evento en escenario' },
  { src: '/galeria/2.jpg', alt: 'Grupo en presentación' },
  { src: '/galeria/3.jpg', alt: 'Comunidad en estudio' },
  { src: '/galeria/4.jpg', alt: 'Recital' },
  { src: '/galeria/5.jpg', alt: 'Clase y certificados' },
  { src: '/galeria/6.jpg', alt: 'Actividad al aire libre' },
  { src: '/galeria/7.jpg', alt: 'Graduación STUDIO EB' },
];

const FALLBACK = 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&h=600&fit=crop';

export default function Marketing() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Megaphone className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Galería y marketing</h1>
          <p className="text-slate-400">Fotos de clases, eventos y nuestra comunidad</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {IMAGENES.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(img)}
            className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = FALLBACK; }}
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Ver imagen"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { e.target.src = FALLBACK; }}
          />
        </div>
      )}
    </div>
  );
}
