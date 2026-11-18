import { useEffect, useMemo, useState } from 'react';
import { DashboardView } from './components/DashboardView';
import { Header } from './components/Header';
import { ProgressionView } from './components/ProgressionView';
import { RoutinesView } from './components/RoutinesView';
import { ScheduleView } from './components/ScheduleView';
import { WorkoutPlayerModal } from './components/WorkoutPlayerModal';
import { ROUTINES, SCHEDULE_TEMPLATES } from './data/routines';
import {
  AppView,
  DayScheduleSlot,
  DiaSemana,
  Routine,
  UserProfile,
  WorkoutLog
} from './types/calisthenics';
import { generateRecommendations, getTodayDiaSemana } from './utils/recommendations';
import {
  loadInitialCustomRoutines,
  loadInitialLogs,
  loadInitialProfile,
  loadInitialSchedule,
  saveToStorage,
  STORAGE_KEYS
} from './utils/storage';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('resumen');
  const [profile, setProfile] = useState<UserProfile>(loadInitialProfile);
  const [schedule, setSchedule] = useState<DayScheduleSlot[]>(loadInitialSchedule);
  const [customRoutines, setCustomRoutines] = useState<Routine[]>(loadInitialCustomRoutines);
  const [logs, setLogs] = useState<WorkoutLog[]>(loadInitialLogs);
  const [activeWorkout, setActiveWorkout] = useState<Routine | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const todayDia = useMemo(() => getTodayDiaSemana(), []);

  const allRoutines = useMemo(
    () => [...customRoutines, ...ROUTINES],
    [customRoutines]
  );

  // Sync changes to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.profile, profile);
  }, [profile]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.schedule, schedule);
  }, [schedule]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.customRoutines, customRoutines);
  }, [customRoutines]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.logs, logs);
  }, [logs]);

  // Auto-hide toast feedback
  useEffect(() => {
    if (!toastMessage) return;
    const t = window.setTimeout(() => setToastMessage(null), 3500);
    return () => window.clearTimeout(t);
  }, [toastMessage]);

  const recommendations = useMemo(
    () =>
      generateRecommendations({
        profile,
        schedule,
        routines: allRoutines,
        logs,
        todayDia
      }),
    [profile, schedule, allRoutines, logs, todayDia]
  );

  const todaySlot = schedule.find((s) => s.dia === todayDia);
  const todayRoutine = todaySlot?.routineId
    ? allRoutines.find((r) => r.id === todaySlot.routineId)
    : undefined;

  const handleStartToday = () => {
    setActiveWorkout(todayRoutine || allRoutines[0]);
  };

  const handleToggleDayComplete = (dia: DiaSemana) => {
    setSchedule((prev) =>
      prev.map((slot) =>
        slot.dia === dia
          ? { ...slot, completadoEstaSemana: !slot.completadoEstaSemana }
          : slot
      )
    );
  };

  const handleUpdateSlot = (dia: DiaSemana, patch: Partial<DayScheduleSlot>) => {
    setSchedule((prev) =>
      prev.map((slot) => (slot.dia === dia ? { ...slot, ...patch } : slot))
    );
  };

  const handleApplyTemplate = (templateId: string) => {
    const tpl = SCHEDULE_TEMPLATES.find((t) => t.id === templateId);
    if (!tpl) return;
    setSchedule(
      tpl.slots.map((slot) => ({
        ...slot,
        completadoEstaSemana: false
      }))
    );
    setToastMessage(`Plantilla "${tpl.nombre}" aplicada a tu semana.`);
  };

  const handleResetWeekProgress = () => {
    setSchedule((prev) =>
      prev.map((slot) => ({ ...slot, completadoEstaSemana: false }))
    );
    setToastMessage('Marcas semanales reiniciadas.');
  };

  const handleCreateRoutine = (routine: Routine) => {
    setCustomRoutines((prev) => [routine, ...prev]);
    setToastMessage(`Rutina "${routine.nombre}" guardada en tu catálogo.`);
  };

  const handleDeleteCustomRoutine = (id: string) => {
    setCustomRoutines((prev) => prev.filter((r) => r.id !== id));
    setSchedule((prev) =>
      prev.map((slot) =>
        slot.routineId === id ? { ...slot, routineId: ROUTINES[0].id } : slot
      )
    );
    setToastMessage('Rutina personalizada eliminada.');
  };

  const handleUpdateProfile = (patch: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  };

  const handleToggleMastered = (exerciseId: string) => {
    setProfile((prev) => {
      const exists = prev.ejerciciosDominados.includes(exerciseId);
      const next = exists
        ? prev.ejerciciosDominados.filter((id) => id !== exerciseId)
        : [...prev.ejerciciosDominados, exerciseId];
      return { ...prev, ejerciciosDominados: next };
    });
  };

  const handleCompleteWorkout = (payload: {
    routine: Routine;
    duracionRealMinutos: number;
    seriesCompletadas: number;
    esfuerzo: WorkoutLog['esfuerzo'];
  }) => {
    const newLog: WorkoutLog = {
      id: `log-${Date.now()}`,
      fechaIso: new Date().toISOString(),
      diaSemana: todayDia,
      routineId: payload.routine.id,
      routineNombre: payload.routine.nombre,
      enfoque: payload.routine.enfoque,
      duracionRealMinutos: payload.duracionRealMinutos,
      seriesCompletadas: payload.seriesCompletadas,
      esfuerzo: payload.esfuerzo
    };

    setLogs((prev) => [newLog, ...prev]);
    setSchedule((prev) =>
      prev.map((slot) =>
        slot.dia === todayDia && !slot.esDescanso
          ? { ...slot, completadoEstaSemana: true }
          : slot
      )
    );
    setActiveWorkout(null);
    setToastMessage(`Sesión "${payload.routine.nombre}" registrada en tu historial.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] text-[#111827] pb-20 md:pb-0">
      <Header
        activeView={activeView}
        onChangeView={setActiveView}
        onStartToday={handleStartToday}
        todayButtonLabel={todayRoutine ? 'Iniciar sesión de hoy' : 'Entrenar ahora'}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeView === 'resumen' && (
          <DashboardView
            profile={profile}
            todayDia={todayDia}
            schedule={schedule}
            routines={allRoutines}
            logs={logs}
            recommendations={recommendations}
            onStartRoutine={setActiveWorkout}
            onNavigate={setActiveView}
            onToggleDayComplete={handleToggleDayComplete}
          />
        )}

        {activeView === 'rutinas' && (
          <RoutinesView
            routines={allRoutines}
            onStartRoutine={setActiveWorkout}
            onCreateRoutine={handleCreateRoutine}
            onDeleteCustomRoutine={handleDeleteCustomRoutine}
          />
        )}

        {activeView === 'horarios' && (
          <ScheduleView
            todayDia={todayDia}
            schedule={schedule}
            routines={allRoutines}
            onUpdateSlot={handleUpdateSlot}
            onApplyTemplate={handleApplyTemplate}
            onResetWeekProgress={handleResetWeekProgress}
            onStartRoutine={setActiveWorkout}
          />
        )}

        {activeView === 'progresion' && (
          <ProgressionView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onToggleMastered={handleToggleMastered}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-medium text-slate-700">
            Eje Calistenia — Entrenamiento corporal, horarios y progresión técnica
          </p>
          <p>
            Tus rutinas, horarios y progreso se guardan automáticamente en este navegador.
          </p>
        </div>
      </footer>

      {activeWorkout && (
        <WorkoutPlayerModal
          routine={activeWorkout}
          onClose={() => setActiveWorkout(null)}
          onCompleteWorkout={handleCompleteWorkout}
        />
      )}

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg max-w-sm"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
