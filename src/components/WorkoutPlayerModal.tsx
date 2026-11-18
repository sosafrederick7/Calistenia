import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import { Routine, WorkoutLog } from '../types/calisthenics';
import { playTimerChime } from '../utils/sound';

interface WorkoutPlayerModalProps {
  routine: Routine;
  onClose: () => void;
  onCompleteWorkout: (payload: {
    routine: Routine;
    duracionRealMinutos: number;
    seriesCompletadas: number;
    esfuerzo: WorkoutLog['esfuerzo'];
  }) => void;
}

export function WorkoutPlayerModal({
  routine,
  onClose,
  onCompleteWorkout
}: WorkoutPlayerModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(1);
  const [completedSetsTotal, setCompletedSetsTotal] = useState(0);

  // Elapsed workout stopwatch
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Rest countdown state
  const [isResting, setIsResting] = useState(false);
  const [restRemaining, setRestRemaining] = useState(60);

  // Isometric hold countdown state
  const currentStep = routine.pasos[stepIndex];
  const currentExercise = useMemo(
    () => EXERCISES.find((e) => e.id === currentStep?.exerciseId),
    [currentStep]
  );

  const [holdRemaining, setHoldRemaining] = useState(currentStep?.objetivo || 30);
  const [holdRunning, setHoldRunning] = useState(false);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTechnique, setShowTechnique] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const [esfuerzo, setEsfuerzo] = useState<WorkoutLog['esfuerzo']>('Óptimo');

  // Sync hold timer whenever exercise step changes
  useEffect(() => {
    if (currentStep) {
      setHoldRemaining(currentStep.objetivo);
      setHoldRunning(false);
    }
  }, [stepIndex, setIndex, currentStep]);

  // Global elapsed timer
  useEffect(() => {
    if (isFinishing) return;
    const id = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isFinishing]);

  // Rest timer countdown
  useEffect(() => {
    if (!isResting) return;
    const id = window.setInterval(() => {
      setRestRemaining((prev) => {
        if (prev <= 1) {
          setIsResting(false);
          if (soundEnabled) playTimerChime('complete');
          return 0;
        }
        if (prev <= 4 && soundEnabled) playTimerChime('tick');
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [isResting, soundEnabled]);

  // Isometric hold timer countdown
  useEffect(() => {
    if (!holdRunning || isResting) return;
    const id = window.setInterval(() => {
      setHoldRemaining((prev) => {
        if (prev <= 1) {
          setHoldRunning(false);
          if (soundEnabled) playTimerChime('complete');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [holdRunning, isResting, soundEnabled]);

  const totalRoutineSets = routine.pasos.reduce((sum, s) => sum + s.series, 0);

  const formatMmSs = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleCompleteSet = () => {
    setHoldRunning(false);
    setCompletedSetsTotal((prev) => prev + 1);

    const isLastSetOfExercise = setIndex >= currentStep.series;
    const isLastExercise = stepIndex >= routine.pasos.length - 1;

    if (isLastSetOfExercise && isLastExercise) {
      if (soundEnabled) playTimerChime('complete');
      setIsFinishing(true);
      return;
    }

    if (isLastSetOfExercise) {
      setStepIndex((prev) => prev + 1);
      setSetIndex(1);
    } else {
      setSetIndex((prev) => prev + 1);
    }

    setRestRemaining(currentStep.descansoSegundos);
    setIsResting(true);
  };

  const handleSkipExercise = () => {
    setHoldRunning(false);
    setIsResting(false);
    if (stepIndex < routine.pasos.length - 1) {
      setStepIndex((prev) => prev + 1);
      setSetIndex(1);
    } else {
      setIsFinishing(true);
    }
  };

  const handleConfirmFinish = () => {
    onCompleteWorkout({
      routine,
      duracionRealMinutos: Math.max(1, Math.round(elapsedSeconds / 60)),
      seriesCompletadas: completedSetsTotal,
      esfuerzo
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="player-title"
    >
      <div className="bg-white sm:border sm:border-slate-200 sm:rounded-2xl w-full max-w-3xl h-full sm:h-auto sm:max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 tabular-nums">
              Sesión guiada · Tiempo transcurrido {formatMmSs(elapsedSeconds)}
            </p>
            <h2 id="player-title" className="font-display text-lg font-bold text-slate-900 truncate">
              {routine.nombre}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              aria-label={soundEnabled ? 'Silenciar avisos sonoros' : 'Activar avisos sonoros'}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar sesión guiada"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-slate-100 w-full">
          <div
            className="h-full bg-[#1D4ED8] transition-all duration-300"
            style={{
              width: `${Math.min(100, Math.round((completedSetsTotal / Math.max(1, totalRoutineSets)) * 100))}%`
            }}
          />
        </div>

        {/* Main Content */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {isFinishing ? (
            <div className="py-4 space-y-6 max-w-lg mx-auto text-center">
              <div>
                <p className="text-xs font-semibold text-emerald-700">Sesión completada</p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Buen trabajo en barra y suelo
                </h3>
                <p className="text-sm text-slate-600 mt-2 tabular-nums">
                  Completaste {completedSetsTotal} series en {Math.max(1, Math.round(elapsedSeconds / 60))} minutos.
                </p>
              </div>

              <div className="text-left space-y-2">
                <p className="text-xs font-semibold text-slate-700">
                  ¿Cómo sentiste el esfuerzo general de hoy?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(['Suave', 'Óptimo', 'Exigente'] as WorkoutLog['esfuerzo'][]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setEsfuerzo(opt)}
                      className={`py-3 min-h-[44px] text-sm font-semibold rounded-xl border transition-colors ${
                        esfuerzo === opt
                          ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Este dato calibra tus próximas recomendaciones de recuperación y volumen.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleConfirmFinish}
                  className="flex-1 py-3 min-h-[48px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Guardar entrenamiento en historial
                </button>
              </div>
            </div>
          ) : isResting ? (
            <div className="py-6 text-center space-y-6 max-w-md mx-auto">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Descanso activo entre series
                </p>
                <p className="font-mono text-6xl font-bold text-slate-900 tabular-nums mt-3">
                  {formatMmSs(restRemaining)}
                </p>
                <p className="text-sm text-slate-600 mt-3">
                  Siguiente: <span className="font-semibold text-slate-900">{currentExercise?.nombre}</span> · Serie {setIndex} de {currentStep.series}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setRestRemaining((prev) => Math.max(5, prev - 15))}
                  className="px-4 py-2.5 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-mono font-medium rounded-xl"
                >
                  -15s
                </button>
                <button
                  type="button"
                  onClick={() => setRestRemaining((prev) => prev + 15)}
                  className="px-4 py-2.5 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-mono font-medium rounded-xl"
                >
                  +15s
                </button>
                <button
                  type="button"
                  onClick={() => setIsResting(false)}
                  className="px-5 py-2.5 min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl"
                >
                  Saltar descanso
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 tabular-nums">
                    Ejercicio {stepIndex + 1} de {routine.pasos.length} · Serie {setIndex} de {currentStep.series}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    {currentExercise?.nombre}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {currentExercise?.enfoque} · {currentExercise?.equipamiento}
                    {currentStep.tempo ? ` · Tempo ${currentStep.tempo}` : ''}
                  </p>
                </div>

                <div className="bg-slate-100 rounded-xl px-4 py-3 text-left sm:text-right shrink-0">
                  <p className="text-xs text-slate-500">Objetivo de la serie</p>
                  <p className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                    {currentStep.objetivo}{' '}
                    <span className="text-sm font-sans font-medium text-slate-600">
                      {currentStep.tipo === 'tiempo' ? 'segundos' : 'reps'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Built-in Hold Timer for Isometric Exercises */}
              {currentStep.tipo === 'tiempo' && (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Cronómetro isométrico de serie
                    </p>
                    <p className="font-mono text-4xl font-bold text-slate-900 tabular-nums mt-1">
                      {formatMmSs(holdRemaining)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setHoldRunning((prev) => !prev)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl"
                    >
                      {holdRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{holdRunning ? 'Pausar' : 'Iniciar tiempo'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHoldRunning(false);
                        setHoldRemaining(currentStep.objetivo);
                      }}
                      aria-label="Reiniciar temporizador"
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Technique Cues Accordion */}
              {currentExercise && (
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowTechnique((prev) => !prev)}
                    className="w-full px-5 py-3.5 bg-slate-50 flex items-center justify-between text-left text-sm font-semibold text-slate-900"
                  >
                    <span>Puntos técnicos y respiración</span>
                    {showTechnique ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {showTechnique && (
                    <div className="p-5 space-y-3 text-sm text-slate-700 bg-white">
                      <ul className="list-disc pl-5 space-y-1.5">
                        {currentExercise.tecnicaClave.map((cue, idx) => (
                          <li key={idx}>{cue}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                        <span className="font-semibold text-slate-700">Respiración: </span>
                        {currentExercise.respiracion} ·{' '}
                        <span className="font-semibold text-slate-700">Si cuesta mucho: </span>
                        {currentExercise.regresion}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Action Bar */}
        {!isFinishing && !isResting && (
          <div className="px-5 sm:px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSkipExercise}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl"
              >
                <SkipForward className="w-4 h-4" />
                <span>Saltar ejercicio</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFinishing(true)}
                className="px-3 py-2.5 min-h-[44px] text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl"
              >
                Terminar antes
              </button>
            </div>

            <button
              type="button"
              onClick={handleCompleteSet}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>
                {setIndex >= currentStep.series && stepIndex >= routine.pasos.length - 1
                  ? 'Finalizar última serie'
                  : `Completar serie ${setIndex} de ${currentStep.series}`}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
