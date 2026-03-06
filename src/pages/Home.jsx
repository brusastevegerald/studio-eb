import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, BookOpen, Calendar, Megaphone, Clock, Newspaper, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ALL_SECTIONS = [
  {
    to: '/pagar-cuota',
    title: 'Pagar cuota',
    description: 'Aboná tu cuota mensual de forma segura con Mercado Pago.',
    icon: CreditCard,
    cta: 'Pagar ahora',
  },
  {
    to: '/cursos',
    title: 'Inscribirme a cursos',
    description: 'Conocé nuestras disciplinas e inscribite a ballet, hip-hop, contemporáneo y más.',
    icon: BookOpen,
    cta: 'Ver cursos',
  },
  {
    to: '/horarios',
    title: 'Horarios',
    description: 'Días y horarios de cada disciplina.',
    icon: Clock,
    cta: 'Ver horarios',
  },
  {
    to: '/noticias',
    title: 'Noticias',
    description: 'Novedades, avisos y comunicados del estudio.',
    icon: Newspaper,
    cta: 'Ver noticias',
  },
  {
    to: '/eventos',
    title: 'Eventos próximos',
    description: 'Recitales, muestras y fechas importantes del estudio.',
    icon: Calendar,
    cta: 'Ver eventos',
  },
  {
    to: '/marketing',
    title: 'Galería y marketing',
    description: 'Fotos de nuestras clases, eventos y comunidad.',
    icon: Megaphone,
    cta: 'Ver galería',
  },
];

const GALLERY_PREVIEW = [
  '/galeria/1.jpg',
  '/galeria/2.jpg',
  '/galeria/3.jpg',
  '/galeria/4.jpg',
];

export default function Home() {
  const { isStudent } = useAuth();
  const sections = ALL_SECTIONS.filter((s) => s.to !== '/pagar-cuota' || isStudent);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.15),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            STUDIO <span className="text-cyan-400">EB</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Formación en danza para todas las edades. Ballet, contemporáneo, hip-hop y más.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/cursos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] font-semibold rounded-xl transition-colors"
            >
              Inscribirme a cursos
              <ArrowRight className="w-4 h-4" />
            </Link>
            {isStudent && (
              <Link
                to="/pagar-cuota"
                className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 rounded-xl font-medium transition-colors"
              >
                Pagar cuota
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">¿Qué querés hacer?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sections.map(({ to, title, description, icon: Icon, cta }) => (
            <Link
              key={to}
              to={to}
              className="group block p-6 rounded-2xl bg-white/5 border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-white/10 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <Icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-slate-400 text-sm mb-4">{description}</p>
              <span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
                {cta}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Nuestra comunidad</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY_PREVIEW.map((src, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-cyan-500/20"
            >
              <img
                src={src}
                alt={`Galería ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop';
                }}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/marketing"
            className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300"
          >
            Ver más en la galería
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
