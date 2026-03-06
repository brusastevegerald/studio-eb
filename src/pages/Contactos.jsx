import React from 'react';
import { Phone, Mail, User, Building2, GraduationCap, Users } from 'lucide-react';

const CONTACTOS = [
  {
    area: 'Administración',
    nombre: 'Carla Brusa',
    telefono: '+54 9 11 1234-5678',
    email: 'administracion@studio.com',
    icon: Building2,
    descripcion: 'Consultas generales, inscripciones y trámites.',
  },
  {
    area: 'Alumnos',
    nombre: 'Joan Perez',
    telefono: '+54 9 11 2345-6789',
    email: 'alumnos@studio.com',
    icon: Users,
    descripcion: 'Consultas de alumnos, cuotas y clases.',
  },
  {
    area: 'Profesores',
    nombre: 'Joan Perez',
    telefono: '+54 9 11 3456-7890',
    email: 'profesores@studio.com',
    icon: GraduationCap,
    descripcion: 'Coordinación docente y horarios.',
  },
];

export default function Contactos() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Phone className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Contactos</h1>
          <p className="text-slate-400">Comunicate con administración, alumnos o profesores</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {CONTACTOS.map((c) => {
          const Icon = c.icon;
          return (
            <article
              key={c.area}
              className="p-6 rounded-2xl bg-white/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">{c.area}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-white">{c.nombre}</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">{c.descripcion}</p>
              <a
                href={`tel:${c.telefono.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 text-sm mb-2"
              >
                <Phone className="w-4 h-4 shrink-0" />
                {c.telefono}
              </a>
              <a
                href={`mailto:${c.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 text-sm break-all"
              >
                <Mail className="w-4 h-4 shrink-0" />
                {c.email}
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
