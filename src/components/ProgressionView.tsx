import { useMemo, useState } from 'react';
import { Check, ChevronRight, Search, X } from 'lucide-react';
import { EXERCISES, SKILL_CHAINS } from '../data/exercises';
import {
  Equipamiento,
  Exercise,
  Nivel,
  ObjetivoUsuario,
  UserProfile
} from '../types/calisthenics';

interface ProgressionViewProps {
  profile: UserProfile;
  onUpdateProfile: (patch: Partial<UserProfile>) => void;
  onToggleMastered: (exerciseId: string) => void;
}

const EQUIP_OPTIONS: Equipamiento[] = ['Sin equipo', 'Barra fija', 'Paralelas', 'Anillas'];
const OBJETIVO_OPTIONS: ObjetivoUsuario[] = [
  'Fuerza e hipertrofia',
  'Habilidades estáticas',
  'Resistencia y energía',
  'Movilidad y base'
];

export function ProgressionView({
  profile,
  onUpdateProfile,
  onToggleMastered
}: ProgressionViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [enfoqueFilter, setEnfoqueFilter] = useState<string>('Todos');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return EXERCISES.filter((ex) => {
      if (enfoqueFilter !== 'Todos' && ex.enfoque !== enfoqueFilter) return false;
      if (q) {
        return (
          ex.nombre.toLowerCase().includes(q) ||
          ex.musculos.some((m) => m.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [searchQuery, enfoqueFilter]);

  const toggleEquipment = (eq: Equipamiento) => {
    const exists = profile.equipamiento.includes(eq);
    let next = exists
      ? profile.equipamiento.filter((item) => item !== eq)
      : [...profile.equipamiento, eq];
    if (next.length === 0) next = ['Sin equipo'];
    onUpdateProfile({ equipamiento: next });
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">
          Progresión y biblioteca técnica
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Configura tu perfil de entrenamiento, desbloquea peldaños de fuerza y consulta la técnica exacta de cada movimiento.
        </p>
      </div>

      {/* Training Profile Configurator */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Tu perfil y parámetros de recomendación
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Los cambios actualizan al instante las recomendaciones de hoy y la selección de ejercicios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Nivel actual
            </label>
            <div className="inline-flex p-1 bg-slate-100 rounded-xl w-full">
              {(['Principiante', 'Intermedio', 'Avanzado'] as Nivel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => onUpdateProfile({ nivel: lvl })}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    profile.nivel === lvl
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Objetivo prioritario
            </label>
            <select
              value={profile.objetivo}
              onChange={(e) =>
                onUpdateProfile({ objetivo: e.target.value as ObjetivoUsuario })
              }
              className="w-full px-3 py-2.5 min-h-[42px] text-sm border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
            >
              {OBJETIVO_OPTIONS.map((obj) => (
                <option key={obj} value={obj}>
                  {obj}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Equipamiento disponible
            </label>
            <div className="flex flex-wrap gap-2">
              {EQUIP_OPTIONS.map((eq) => {
                const active = profile.equipamiento.includes(eq);
                return (
                  <button
                    key={eq}
                    type="button"
                    onClick={() => toggleEquipment(eq)}
                    className={`px-3 py-2 min-h-[38px] text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {eq}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Skill Progression Chains */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Rutas de progresión corporal
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Pulsa sobre cualquier movimiento para ver su técnica o marcarlo como dominado.
          </p>
        </div>

        <div className="space-y-4">
          {SKILL_CHAINS.map((chain) => {
            const masteredInChain = chain.ejerciciosIds.filter((id) =>
              profile.ejerciciosDominados.includes(id)
            ).length;

            return (
              <div
                key={chain.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {chain.nombre}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">{chain.descripcion}</p>
                  </div>
                  <span className="text-xs font-mono tabular-nums font-medium text-slate-600 shrink-0">
                    {masteredInChain} / {chain.ejerciciosIds.length} dominados
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {chain.ejerciciosIds.map((exId, idx) => {
                    const ex = EXERCISES.find((e) => e.id === exId);
                    if (!ex) return null;
                    const mastered = profile.ejerciciosDominados.includes(ex.id);

                    return (
                      <div
                        key={ex.id}
                        className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-colors ${
                          mastered
                            ? 'bg-emerald-50/60 border-emerald-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedExercise(ex)}
                          className="text-left group"
                        >
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="font-mono tabular-nums">Nivel {idx + 1}</span>
                            <span>{ex.valorSugerido}</span>
                          </div>
                          <p className="font-display text-sm font-bold text-slate-900 group-hover:text-[#1D4ED8] mt-1 transition-colors">
                            {ex.nombre}
                          </p>
                        </button>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/70">
                          <button
                            type="button"
                            onClick={() => onToggleMastered(ex.id)}
                            className={`inline-flex items-center gap-1 text-xs font-semibold ${
                              mastered
                                ? 'text-emerald-800'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{mastered ? 'Dominado' : 'Marcar dominado'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedExercise(ex)}
                            aria-label={`Ver técnica de ${ex.nombre}`}
                            className="text-xs font-medium text-[#1D4ED8] hover:text-[#1E40AF] inline-flex items-center"
                          >
                            <span>Técnica</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full Searchable Exercise Library */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Catálogo técnico de ejercicios
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={enfoqueFilter}
              onChange={(e) => setEnfoqueFilter(e.target.value)}
              aria-label="Filtrar ejercicios por patrón"
              className="px-3 py-2 min-h-[40px] text-sm border border-slate-200 rounded-xl bg-white text-slate-800"
            >
              <option value="Todos">Todos los patrones</option>
              <option value="Empuje">Empuje</option>
              <option value="Tracción">Tracción</option>
              <option value="Pierna">Pierna</option>
              <option value="Core">Core</option>
              <option value="Movilidad">Movilidad</option>
            </select>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar ejercicio o músculo..."
                className="w-full pl-9 pr-3 py-2 min-h-[40px] text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 bg-slate-50/70">
                  <th className="py-3.5 px-5">Movimiento</th>
                  <th className="py-3.5 px-4">Patrón</th>
                  <th className="py-3.5 px-4">Nivel</th>
                  <th className="py-3.5 px-4">Equipo</th>
                  <th className="py-3.5 px-4 text-right">Rango guía</th>
                  <th className="py-3.5 px-5 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredExercises.map((ex) => {
                  const mastered = profile.ejerciciosDominados.includes(ex.id);
                  return (
                    <tr
                      key={ex.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <button
                          type="button"
                          onClick={() => setSelectedExercise(ex)}
                          className="font-semibold text-slate-900 hover:text-[#1D4ED8] text-left"
                        >
                          {ex.nombre}
                        </button>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {ex.musculos.slice(0, 3).join(', ')}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                        {ex.enfoque}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                        {ex.nivel}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {ex.equipamiento}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-700 whitespace-nowrap">
                        {ex.valorSugerido}
                      </td>
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onToggleMastered(ex.id)}
                          className={`px-3 py-1.5 min-h-[34px] text-xs font-medium rounded-lg border transition-colors ${
                            mastered
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {mastered ? 'Dominado' : 'En práctica'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Exercise Technique Drawer / Modal */}
      {selectedExercise && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ex-modal-title"
        >
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500">
                  {selectedExercise.enfoque} · {selectedExercise.nivel} · {selectedExercise.equipamiento}
                </p>
                <h3 id="ex-modal-title" className="font-display text-xl font-bold text-slate-900 mt-0.5">
                  {selectedExercise.nombre}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExercise(null)}
                aria-label="Cerrar ficha técnica"
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Ejecución técnica paso a paso
                </h4>
                <ul className="space-y-2 text-slate-700 list-disc pl-5">
                  {selectedExercise.tecnicaClave.map((cue, idx) => (
                    <li key={idx}>{cue}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Errores frecuentes a evitar
                </h4>
                <ul className="space-y-2 text-slate-700 list-disc pl-5">
                  {selectedExercise.erroresComunes.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <p>
                  <span className="font-semibold text-slate-900">Respiración: </span>
                  <span className="text-slate-700">{selectedExercise.respiracion}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Versión más fácil (regresión): </span>
                  <span className="text-slate-700">{selectedExercise.regresion}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Siguiente progresión: </span>
                  <span className="text-slate-700">{selectedExercise.progresionSiguiente}</span>
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onToggleMastered(selectedExercise.id)}
                className={`px-4 py-2.5 min-h-[44px] text-sm font-semibold rounded-xl border transition-colors ${
                  profile.ejerciciosDominados.includes(selectedExercise.id)
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-[#1D4ED8] border-[#1D4ED8] text-white hover:bg-[#1E40AF]'
                }`}
              >
                {profile.ejerciciosDominados.includes(selectedExercise.id)
                  ? 'Dominado (pulsar para quitar)'
                  : 'Marcar como dominado'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedExercise(null)}
                className="px-4 py-2.5 min-h-[44px] text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
