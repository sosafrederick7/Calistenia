import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Play, Plus, Search, Trash2, X } from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import { Enfoque, Equipamiento, Nivel, Routine, RoutineStep } from '../types/calisthenics';
import { ResilientImage } from './ResilientImage';

interface RoutinesViewProps {
  routines: Routine[];
  onStartRoutine: (routine: Routine) => void;
  onCreateRoutine: (routine: Routine) => void;
  onDeleteCustomRoutine: (id: string) => void;
}

const NIVEL_FILTERS: ('Todos' | Nivel)[] = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
const ENFOQUE_FILTERS: ('Todos' | Enfoque)[] = [
  'Todos',
  'Cuerpo completo',
  'Empuje',
  'Tracción',
  'Pierna',
  'Core'
];

export function RoutinesView({
  routines,
  onStartRoutine,
  onCreateRoutine,
  onDeleteCustomRoutine
}: RoutinesViewProps) {
  const [nivelFilter, setNivelFilter] = useState<'Todos' | Nivel>('Todos');
  const [enfoqueFilter, setEnfoqueFilter] = useState<'Todos' | Enfoque>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);

  // Builder state
  const [customName, setCustomName] = useState('');
  const [customSummary, setCustomSummary] = useState('');
  const [customNivel, setCustomNivel] = useState<Nivel>('Intermedio');
  const [customEnfoque, setCustomEnfoque] = useState<Enfoque>('Cuerpo completo');
  const [customSteps, setCustomSteps] = useState<RoutineStep[]>([
    { exerciseId: 'flexiones-estrictas', series: 3, objetivo: 10, tipo: 'reps', descansoSegundos: 60 },
    { exerciseId: 'sentadilla-controlada', series: 3, objetivo: 15, tipo: 'reps', descansoSegundos: 60 }
  ]);

  const filteredRoutines = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return routines.filter((r) => {
      if (nivelFilter !== 'Todos' && r.nivel !== nivelFilter) return false;
      if (enfoqueFilter !== 'Todos' && r.enfoque !== enfoqueFilter) return false;
      if (q) {
        const matchName = r.nombre.toLowerCase().includes(q);
        const matchSummary = r.resumen.toLowerCase().includes(q);
        const matchEx = r.pasos.some((p) => {
          const ex = EXERCISES.find((e) => e.id === p.exerciseId);
          return ex?.nombre.toLowerCase().includes(q);
        });
        return matchName || matchSummary || matchEx;
      }
      return true;
    });
  }, [routines, nivelFilter, enfoqueFilter, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddStep = () => {
    const first = EXERCISES[0];
    setCustomSteps((prev) => [
      ...prev,
      {
        exerciseId: first.id,
        series: 3,
        objetivo: first.tipoMedida === 'tiempo' ? 30 : 10,
        tipo: first.tipoMedida,
        descansoSegundos: 60
      }
    ]);
  };

  const handleStepExerciseChange = (index: number, exerciseId: string) => {
    const ex = EXERCISES.find((e) => e.id === exerciseId);
    if (!ex) return;
    setCustomSteps((prev) =>
      prev.map((step, i) =>
        i === index
          ? {
              ...step,
              exerciseId,
              tipo: ex.tipoMedida,
              objetivo: ex.tipoMedida === 'tiempo' ? 30 : 10
            }
          : step
      )
    );
  };

  const handleSaveCustomRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || customSteps.length === 0) return;

    const eqSet = new Set<Equipamiento>();
    customSteps.forEach((step) => {
      const ex = EXERCISES.find((item) => item.id === step.exerciseId);
      if (ex) eqSet.add(ex.equipamiento);
    });
    if (eqSet.size === 0) eqSet.add('Sin equipo');

    const totalSec = customSteps.reduce(
      (sum, s) => sum + s.series * (s.tipo === 'tiempo' ? s.objetivo + s.descansoSegundos : 35 + s.descansoSegundos),
      300
    );

    const newRoutine: Routine = {
      id: `custom-${Date.now()}`,
      nombre: customName.trim(),
      resumen:
        customSummary.trim() ||
        'Rutina personalizada diseñada según tus objetivos y capacidad actual.',
      nivel: customNivel,
      enfoque: customEnfoque,
      duracionMinutos: Math.max(15, Math.round(totalSec / 60)),
      equipamientoRequerido: Array.from(eqSet),
      imagenUrl: '/src/assets/images/routine_push_strength_1795014957580.jpg',
      calentamiento: [
        '2 min de movilidad articular de muñecas, hombros y cadera',
        '1 serie ligera del primer ejercicio de la sesión'
      ],
      pasos: customSteps,
      esPersonalizada: true
    };

    onCreateRoutine(newRoutine);
    setCustomName('');
    setCustomSummary('');
    setShowBuilder(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Rutinas de calistenia
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Explora sesiones por nivel y patrón de movimiento o crea tu propia rutina guiada.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowBuilder(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Crear rutina</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 mr-1">Nivel:</span>
            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {NIVEL_FILTERS.map((nivel) => (
                <button
                  key={nivel}
                  type="button"
                  onClick={() => setNivelFilter(nivel)}
                  className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    nivelFilter === nivel
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {nivel}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar rutina o ejercicio..."
              className="w-full pl-9 pr-3 py-2 min-h-[40px] text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:bg-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-medium text-slate-500 mr-2">Enfoque:</span>
          {ENFOQUE_FILTERS.map((enfoque) => (
            <button
              key={enfoque}
              type="button"
              onClick={() => setEnfoqueFilter(enfoque)}
              className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                enfoqueFilter === enfoque
                  ? 'bg-[#1D4ED8] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {enfoque}
            </button>
          ))}
        </div>
      </div>

      {/* Routines Grid */}
      {filteredRoutines.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <p className="font-display text-lg font-semibold text-slate-900">
            No encontramos rutinas con esos filtros
          </p>
          <p className="text-sm text-slate-600 mt-1">
            Prueba limpiar los filtros de nivel o enfoque para ver el catálogo completo.
          </p>
          <button
            type="button"
            onClick={() => {
              setNivelFilter('Todos');
              setEnfoqueFilter('Todos');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 min-h-[40px] bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutines.map((routine) => {
            const isExpanded = expandedIds.includes(routine.id);

            return (
              <article
                key={routine.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                    <ResilientImage
                      src={routine.imagenUrl}
                      alt={routine.nombre}
                      className="w-full h-full object-cover"
                      fallbackLabel={routine.nombre}
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-medium text-slate-700">{routine.nivel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{routine.enfoque}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{routine.duracionMinutos} min</span>
                      </div>
                      {routine.esPersonalizada && (
                        <span className="text-[#1D4ED8] font-medium shrink-0">Personalizada</span>
                      )}
                    </div>

                    <h2 className="font-display text-xl font-bold text-slate-900 mt-2">
                      {routine.nombre}
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {routine.resumen}
                    </p>

                    <p className="text-xs text-slate-500 mt-3">
                      Equipo: <span className="text-slate-700">{routine.equipamientoRequerido.join(', ')}</span>
                    </p>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                        <p className="text-xs font-semibold text-slate-700">
                          Estructura de ejercicios ({routine.pasos.length})
                        </p>
                        <ul className="divide-y divide-slate-100">
                          {routine.pasos.map((step, idx) => {
                            const ex = EXERCISES.find((e) => e.id === step.exerciseId);
                            return (
                              <li
                                key={`${step.exerciseId}-${idx}`}
                                className="py-2 flex items-center justify-between gap-2 text-xs"
                              >
                                <span className="text-slate-800 font-medium truncate">
                                  {idx + 1}. {ex?.nombre || step.exerciseId}
                                </span>
                                <span className="font-mono tabular-nums text-slate-500 shrink-0">
                                  {step.series}×{step.objetivo}
                                  {step.tipo === 'tiempo' ? 's' : ''}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onStartRoutine(routine)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Comenzar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleExpand(routine.id)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2.5 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition-colors whitespace-nowrap"
                  >
                    <span>{isExpanded ? 'Ocultar' : 'Ejercicios'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {routine.esPersonalizada && (
                    <button
                      type="button"
                      onClick={() => onDeleteCustomRoutine(routine.id)}
                      aria-label={`Eliminar rutina ${routine.nombre}`}
                      className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Custom Routine Builder Modal */}
      {showBuilder && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="builder-title"
        >
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <h2 id="builder-title" className="font-display text-xl font-bold text-slate-900">
                Crear rutina personalizada
              </h2>
              <button
                type="button"
                onClick={() => setShowBuilder(false)}
                aria-label="Cerrar creador de rutina"
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomRoutine} className="p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nombre de la rutina
                  </label>
                  <input
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Ej. Empuje matutino en parque"
                    className="w-full px-3 py-2.5 min-h-[44px] text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nivel
                  </label>
                  <select
                    value={customNivel}
                    onChange={(e) => setCustomNivel(e.target.value as Nivel)}
                    className="w-full px-3 py-2.5 min-h-[44px] text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Enfoque principal
                  </label>
                  <select
                    value={customEnfoque}
                    onChange={(e) => setCustomEnfoque(e.target.value as Enfoque)}
                    className="w-full px-3 py-2.5 min-h-[44px] text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  >
                    <option value="Cuerpo completo">Cuerpo completo</option>
                    <option value="Empuje">Empuje</option>
                    <option value="Tracción">Tracción</option>
                    <option value="Pierna">Pierna</option>
                    <option value="Core">Core</option>
                    <option value="Movilidad">Movilidad</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Descripción breve (opcional)
                  </label>
                  <input
                    type="text"
                    value={customSummary}
                    onChange={(e) => setCustomSummary(e.target.value)}
                    placeholder="Objetivo o enfoque técnico de esta sesión"
                    className="w-full px-3 py-2.5 min-h-[44px] text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">
                    Ejercicios de la rutina
                  </span>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] hover:text-[#1E40AF]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar ejercicio</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {customSteps.map((step, index) => (
                    <div
                      key={index}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end"
                    >
                      <div className="sm:col-span-5">
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">
                          Ejercicio {index + 1}
                        </label>
                        <select
                          value={step.exerciseId}
                          onChange={(e) => handleStepExerciseChange(index, e.target.value)}
                          className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        >
                          {EXERCISES.map((ex) => (
                            <option key={ex.id} value={ex.id}>
                              {ex.nombre} ({ex.enfoque})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">
                          Series
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={step.series}
                          onChange={(e) =>
                            setCustomSteps((prev) =>
                              prev.map((s, i) =>
                                i === index ? { ...s, series: Number(e.target.value) || 1 } : s
                              )
                            )
                          }
                          className="w-full px-2.5 py-2 text-xs font-mono tabular-nums border border-slate-200 rounded-lg bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">
                          {step.tipo === 'tiempo' ? 'Segundos' : 'Reps'}
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={180}
                          value={step.objetivo}
                          onChange={(e) =>
                            setCustomSteps((prev) =>
                              prev.map((s, i) =>
                                i === index ? { ...s, objetivo: Number(e.target.value) || 1 } : s
                              )
                            )
                          }
                          className="w-full px-2.5 py-2 text-xs font-mono tabular-nums border border-slate-200 rounded-lg bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">
                          Descanso (s)
                        </label>
                        <input
                          type="number"
                          min={15}
                          max={240}
                          step={15}
                          value={step.descansoSegundos}
                          onChange={(e) =>
                            setCustomSteps((prev) =>
                              prev.map((s, i) =>
                                i === index
                                  ? { ...s, descansoSegundos: Number(e.target.value) || 30 }
                                  : s
                              )
                            )
                          }
                          className="w-full px-2.5 py-2 text-xs font-mono tabular-nums border border-slate-200 rounded-lg bg-white"
                        />
                      </div>

                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          disabled={customSteps.length <= 1}
                          onClick={() =>
                            setCustomSteps((prev) => prev.filter((_, i) => i !== index))
                          }
                          aria-label="Quitar ejercicio"
                          className="p-2 text-slate-400 hover:text-red-600 disabled:opacity-30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowBuilder(false)}
                  className="px-4 py-2.5 min-h-[44px] text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 min-h-[44px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold rounded-xl"
                >
                  Guardar rutina
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
