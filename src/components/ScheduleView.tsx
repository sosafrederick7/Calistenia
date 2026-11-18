import { AlertTriangle, Check, Play, RotateCcw } from 'lucide-react';
import { SCHEDULE_TEMPLATES } from '../data/routines';
import { DayScheduleSlot, DiaSemana, Routine } from '../types/calisthenics';
import { detectScheduleConflicts } from '../utils/recommendations';

interface ScheduleViewProps {
  todayDia: DiaSemana;
  schedule: DayScheduleSlot[];
  routines: Routine[];
  onUpdateSlot: (dia: DiaSemana, patch: Partial<DayScheduleSlot>) => void;
  onApplyTemplate: (templateId: string) => void;
  onResetWeekProgress: () => void;
  onStartRoutine: (routine: Routine) => void;
}

export function ScheduleView({
  todayDia,
  schedule,
  routines,
  onUpdateSlot,
  onApplyTemplate,
  onResetWeekProgress,
  onStartRoutine
}: ScheduleViewProps) {
  const conflicts = detectScheduleConflicts(schedule, routines);

  const activeSlots = schedule.filter((s) => !s.esDescanso);
  const completedCount = activeSlots.filter((s) => s.completadoEstaSemana).length;
  const totalWeeklyMinutes = activeSlots.reduce((sum, s) => {
    const r = routines.find((item) => item.id === s.routineId);
    return sum + (r ? r.duracionMinutos : 0);
  }, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Horarios y planificación semanal
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Organiza tus días de entrenamiento, fija horarios reales y equilibra la recuperación muscular.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetWeekProgress}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Nueva semana (limpiar marcas)</span>
        </button>
      </div>

      {/* Weekly Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 bg-white border border-slate-200 rounded-2xl divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
        <div className="p-5">
          <p className="text-xs font-medium text-slate-500">Frecuencia semanal</p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {activeSlots.length} días activos
          </p>
          <p className="text-xs text-slate-600 mt-0.5 tabular-nums">
            {7 - activeSlots.length} días de descanso programado
          </p>
        </div>
        <div className="p-5">
          <p className="text-xs font-medium text-slate-500">Volumen semanal estimado</p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {totalWeeklyMinutes} min
          </p>
          <p className="text-xs text-slate-600 mt-0.5">
            Distribución según tus rutinas asignadas
          </p>
        </div>
        <div className="p-5">
          <p className="text-xs font-medium text-slate-500">Avance de la semana</p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {completedCount} de {activeSlots.length}
          </p>
          <p className="text-xs text-slate-600 mt-0.5">Sesiones marcadas como completadas</p>
        </div>
      </div>

      {/* Schedule Recovery Conflict Alert (if any) */}
      {conflicts.length > 0 && (
        <div
          role="alert"
          className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-amber-900">
              Recomendación de recuperación en tu horario
            </h2>
            {conflicts.map((msg, i) => (
              <p key={i} className="text-sm text-amber-800">
                {msg}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Pre-built Weekly Templates */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-slate-900">
          Plantillas rápidas de horario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCHEDULE_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4"
            >
              <div>
                <p className="text-xs font-medium text-slate-500 tabular-nums">
                  {tpl.diasActivos} sesiones por semana
                </p>
                <h3 className="font-display text-base font-bold text-slate-900 mt-1">
                  {tpl.nombre}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  {tpl.descripcion}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onApplyTemplate(tpl.id)}
                className="w-full py-2 min-h-[40px] bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold rounded-xl transition-colors"
              >
                Aplicar esta plantilla
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7-Day Editable Schedule */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-slate-900">
          Configuración día por día
        </h2>

        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-200">
          {schedule.map((slot) => {
            const isToday = slot.dia === todayDia;
            const assignedRoutine = slot.routineId
              ? routines.find((r) => r.id === slot.routineId)
              : undefined;

            return (
              <div
                key={slot.dia}
                className={`p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center ${
                  isToday ? 'bg-blue-50/40' : ''
                }`}
              >
                {/* Day and status */}
                <div className="lg:col-span-3 flex items-center justify-between lg:block">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-slate-900">
                        {slot.dia}
                      </span>
                      {isToday && (
                        <span className="text-xs font-semibold text-[#1D4ED8]">· Hoy</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {slot.esDescanso
                        ? 'Descanso / Movilidad'
                        : assignedRoutine
                        ? `${assignedRoutine.enfoque} · ${assignedRoutine.duracionMinutos} min`
                        : 'Sin rutina elegida'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 lg:mt-3">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateSlot(slot.dia, {
                          esDescanso: !slot.esDescanso,
                          routineId: !slot.esDescanso
                            ? null
                            : slot.routineId || routines[0]?.id || null
                        })
                      }
                      className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-lg border transition-colors ${
                        slot.esDescanso
                          ? 'bg-slate-100 border-slate-200 text-slate-700'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      {slot.esDescanso ? 'Cambiar a entreno' : 'Marcar descanso'}
                    </button>
                  </div>
                </div>

                {/* Routine & Hour selectors */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {!slot.esDescanso ? (
                    <>
                      <div className="sm:col-span-8">
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">
                          Rutina asignada
                        </label>
                        <select
                          value={slot.routineId || ''}
                          onChange={(e) =>
                            onUpdateSlot(slot.dia, { routineId: e.target.value || null })
                          }
                          className="w-full px-3 py-2 min-h-[40px] text-sm border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                        >
                          {routines.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.nombre} ({r.duracionMinutos} min)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">
                          Hora habitual
                        </label>
                        <input
                          type="time"
                          value={slot.horaPreferida}
                          onChange={(e) =>
                            onUpdateSlot(slot.dia, { horaPreferida: e.target.value })
                          }
                          className="w-full px-3 py-2 min-h-[40px] text-sm font-mono tabular-nums border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="sm:col-span-12">
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Recordatorio de recuperación
                      </label>
                      <input
                        type="text"
                        value={slot.nota}
                        onChange={(e) => onUpdateSlot(slot.dia, { nota: e.target.value })}
                        placeholder="Ej. Caminata 30 min y estiramiento de muñecas"
                        className="w-full px-3 py-2 min-h-[40px] text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:bg-white"
                      />
                    </div>
                  )}

                  {!slot.esDescanso && (
                    <div className="sm:col-span-12">
                      <input
                        type="text"
                        value={slot.nota}
                        onChange={(e) => onUpdateSlot(slot.dia, { nota: e.target.value })}
                        placeholder="Nota personal para este día (ej. priorizar técnica limpia)"
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:bg-white"
                      />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="lg:col-span-3 flex items-center justify-end gap-2">
                  {!slot.esDescanso && assignedRoutine && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateSlot(slot.dia, {
                            completadoEstaSemana: !slot.completadoEstaSemana
                          })
                        }
                        className={`px-3 py-2 min-h-[40px] text-xs font-medium rounded-xl border inline-flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                          slot.completadoEstaSemana
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{slot.completadoEstaSemana ? 'Hecho' : 'Completar'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onStartRoutine(assignedRoutine)}
                        aria-label={`Entrenar rutina de ${slot.dia}`}
                        className="px-3 py-2 min-h-[40px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Entrenar</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
