import { useState } from 'react';
import { ArrowRight, Check, Clock, Play } from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import {
  AppView,
  DayScheduleSlot,
  DiaSemana,
  RecommendationItem,
  Routine,
  UserProfile,
  WorkoutLog
} from '../types/calisthenics';
import { ResilientImage } from './ResilientImage';

interface DashboardViewProps {
  profile: UserProfile;
  todayDia: DiaSemana;
  schedule: DayScheduleSlot[];
  routines: Routine[];
  logs: WorkoutLog[];
  recommendations: RecommendationItem[];
  onStartRoutine: (routine: Routine) => void;
  onNavigate: (view: AppView) => void;
  onToggleDayComplete: (dia: DiaSemana) => void;
}

const WARMUP_CHECKLIST = [
  { id: 'w1', texto: 'Círculos y flexión de muñecas en cuadrupedia', duracion: '60 s' },
  { id: 'w2', texto: 'Retracciones escapulares suaves en barra o suelo', duracion: '10 reps' },
  { id: 'w3', texto: 'Rotación torácica y apertura de cadera profunda', duracion: '90 s' },
  { id: 'w4', texto: 'Activación de core en plancha hueca (Hollow)', duracion: '25 s' }
];

export function DashboardView({
  profile,
  todayDia,
  schedule,
  routines,
  logs,
  recommendations,
  onStartRoutine,
  onNavigate,
  onToggleDayComplete
}: DashboardViewProps) {
  const [checkedWarmups, setCheckedWarmups] = useState<string[]>([]);

  const todaySlot = schedule.find((s) => s.dia === todayDia) || schedule[0];
  const todayRoutine = todaySlot?.routineId
    ? routines.find((r) => r.id === todaySlot.routineId)
    : undefined;
  const fallbackRoutine = routines[0];
  const heroRoutine = todayRoutine || fallbackRoutine;

  const completedDaysCount = schedule.filter((s) => !s.esDescanso && s.completadoEstaSemana).length;
  const plannedDaysCount = schedule.filter((s) => !s.esDescanso).length;
  const totalMinutesLogged = logs.reduce((acc, log) => acc + log.duracionRealMinutos, 0);

  const nextScheduledSlot = schedule.find((s) => !s.esDescanso && !s.completadoEstaSemana);
  const nextScheduledRoutine = nextScheduledSlot?.routineId
    ? routines.find((r) => r.id === nextScheduledSlot.routineId)
    : undefined;

  const toggleWarmup = (id: string) => {
    setCheckedWarmups((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-10">
      {/* Hero Split Section (2-column balanced stretch) */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-3">
                {todayDia} · {todaySlot?.esDescanso ? 'Descanso programado' : `Sesión programada a las ${todaySlot?.horaPreferida}`} · Nivel {profile.nivel}
              </p>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.12] [text-wrap:balance] max-w-2xl">
                {todayRoutine
                  ? todayRoutine.nombre
                  : 'Recuperación activa y movilidad articular'}
              </h1>

              <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-xl">
                {todayRoutine
                  ? todayRoutine.resumen
                  : 'Hoy figura como descanso en tu horario semanal. Si decides entrenar igualmente, tienes lista tu rutina base de calistenia.'}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                <span className="font-medium text-slate-900">{heroRoutine.enfoque}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="tabular-nums">{heroRoutine.duracionMinutos} min</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="tabular-nums">{heroRoutine.pasos.length} ejercicios</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{heroRoutine.equipamientoRequerido.join(', ')}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onStartRoutine(heroRoutine)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D4ED8]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{todayRoutine ? 'Comenzar sesión de hoy' : 'Entrenar rutina base'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('horarios')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-medium rounded-xl transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
              >
                <span>Ver horario semanal</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-100">
            <ResilientImage
              src={heroRoutine.imagenUrl}
              alt={`Entrenamiento de calistenia: ${heroRoutine.nombre}`}
              className="w-full h-full lg:h-full object-cover"
              fallbackLabel={heroRoutine.nombre}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-xs font-medium text-slate-200">
                Primer bloque de la sesión
              </p>
              <p className="font-display text-lg font-semibold mt-0.5 truncate">
                {EXERCISES.find((e) => e.id === heroRoutine.pasos[0]?.exerciseId)?.nombre || 'Calentamiento articular'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Metric Strip */}
      <section aria-label="Indicadores de entrenamiento">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-slate-200 rounded-2xl divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium text-slate-500">Cumplimiento semanal</p>
            <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
              {completedDaysCount} / {plannedDaysCount}
            </p>
            <p className="mt-1 text-xs text-slate-600">Sesiones completadas</p>
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium text-slate-500">Tiempo acumulado</p>
            <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
              {totalMinutesLogged} min
            </p>
            <p className="mt-1 text-xs text-slate-600 tabular-nums">{logs.length} entrenamientos registrados</p>
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium text-slate-500">Ejercicios dominados</p>
            <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
              {profile.ejerciciosDominados.length} / {EXERCISES.length}
            </p>
            <p className="mt-1 text-xs text-slate-600">En rutas de progresión</p>
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium text-slate-500">Próxima sesión</p>
            <p className="mt-2 font-display text-xl sm:text-2xl font-bold text-slate-900 truncate">
              {nextScheduledSlot ? `${nextScheduledSlot.dia} ${nextScheduledSlot.horaPreferida}` : 'Semana completa'}
            </p>
            <p className="mt-1 text-xs text-slate-600 truncate">
              {nextScheduledRoutine ? nextScheduledRoutine.nombre : 'Buen cierre semanal'}
            </p>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section aria-labelledby="rec-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 id="rec-heading" className="font-display text-2xl font-bold text-slate-900">
              Recomendaciones para tu práctica
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Ajustadas según tu objetivo ({profile.objetivo.toLowerCase()}), equipo disponible y carga semanal.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('progresion')}
            className="text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF] inline-flex items-center gap-1 whitespace-nowrap self-start sm:self-auto"
          >
            <span>Ajustar preferencias</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => {
            const handleAction = () => {
              if (rec.accionTipo === 'iniciar-rutina' && rec.routineId) {
                const target = routines.find((r) => r.id === rec.routineId);
                if (target) onStartRoutine(target);
              } else if (rec.accionTipo === 'ir-horarios') {
                onNavigate('horarios');
              } else if (rec.accionTipo === 'ir-progresion') {
                onNavigate('progresion');
              }
            };

            return (
              <article
                key={rec.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{rec.categoria}</span>
                    {rec.prioridad === 'alta' && (
                      <span className="font-medium text-[#1D4ED8]">Prioridad hoy</span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-900 mt-2">
                    {rec.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    {rec.detalle}
                  </p>
                </div>

                {rec.accionLabel && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleAction}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                    >
                      <span>{rec.accionLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Two-Column Lower Section: Quick Weekly Schedule + Pre-Session Warmup Checklist */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Agenda de esta semana
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Marca tus días cumplidos o edita tus horas en Horarios
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('horarios')}
              className="text-xs font-semibold text-[#1D4ED8] hover:text-[#1E40AF] whitespace-nowrap"
            >
              Editar semana
            </button>
          </div>

          <ul className="divide-y divide-slate-100 mt-2">
            {schedule.map((slot) => {
              const routine = slot.routineId
                ? routines.find((r) => r.id === slot.routineId)
                : undefined;
              const isToday = slot.dia === todayDia;

              return (
                <li
                  key={slot.dia}
                  className="py-3 flex items-center justify-between gap-4 min-h-[52px]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`font-semibold ${
                          isToday ? 'text-[#1D4ED8]' : 'text-slate-900'
                        }`}
                      >
                        {slot.dia}
                      </span>
                      {isToday && (
                        <span className="text-xs font-medium text-[#1D4ED8]">· Hoy</span>
                      )}
                      {!slot.esDescanso && (
                        <span className="text-xs font-mono tabular-nums text-slate-500">
                          · {slot.horaPreferida}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 truncate mt-0.5">
                      {slot.esDescanso
                        ? `Descanso activo — ${slot.nota || 'Recuperación'}`
                        : routine?.nombre || 'Rutina por asignar'}
                    </p>
                  </div>

                  {!slot.esDescanso ? (
                    <button
                      type="button"
                      onClick={() => onToggleDayComplete(slot.dia)}
                      aria-label={`Marcar ${slot.dia} como ${
                        slot.completadoEstaSemana ? 'pendiente' : 'completado'
                      }`}
                      className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        slot.completadoEstaSemana
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {slot.completadoEstaSemana && <Check className="w-3.5 h-3.5" />}
                      <span>{slot.completadoEstaSemana ? 'Completado' : 'Pendiente'}</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 shrink-0">Pausa</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-200">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Activación articular previa
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Lista rápida de 4 minutos antes de empezar cualquier rutina
              </p>
            </div>

            <ul className="divide-y divide-slate-100 mt-2">
              {WARMUP_CHECKLIST.map((item) => {
                const checked = checkedWarmups.includes(item.id);
                return (
                  <li key={item.id} className="py-3">
                    <button
                      type="button"
                      onClick={() => toggleWarmup(item.id)}
                      className="w-full flex items-start justify-between gap-3 text-left group min-h-[44px]"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            checked
                              ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                              : 'border-slate-300 group-hover:border-slate-400 bg-white'
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" />}
                        </span>
                        <span
                          className={`text-sm leading-snug ${
                            checked ? 'line-through text-slate-400' : 'text-slate-700'
                          }`}
                        >
                          {item.texto}
                        </span>
                      </div>
                      <span className="text-xs font-mono tabular-nums text-slate-500 shrink-0 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {item.duracion}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="tabular-nums">
              {checkedWarmups.length} de {WARMUP_CHECKLIST.length} bloques listos
            </span>
            {checkedWarmups.length > 0 && (
              <button
                type="button"
                onClick={() => setCheckedWarmups([])}
                className="font-medium text-slate-600 hover:text-slate-900"
              >
                Reiniciar lista
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
