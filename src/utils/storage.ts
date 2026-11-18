import { SCHEDULE_TEMPLATES } from '../data/routines';
import { DayScheduleSlot, Routine, UserProfile, WorkoutLog } from '../types/calisthenics';

const KEYS = {
  profile: 'eje_calistenia_profile_v1',
  schedule: 'eje_calistenia_schedule_v1',
  customRoutines: 'eje_calistenia_custom_routines_v1',
  logs: 'eje_calistenia_logs_v1'
};

export const DEFAULT_PROFILE: UserProfile = {
  nombre: 'Atleta',
  nivel: 'Intermedio',
  objetivo: 'Fuerza e hipertrofia',
  equipamiento: ['Sin equipo', 'Barra fija', 'Paralelas'],
  horarioHabitual: '18:30',
  ejerciciosDominados: [
    'flexiones-inclinadas',
    'flexiones-estrictas',
    'remo-australiano',
    'escapulares-barra',
    'sentadilla-controlada',
    'hollow-hold',
    'movilidad-munecas-hombros'
  ]
};

export function getDefaultSchedule(): DayScheduleSlot[] {
  return SCHEDULE_TEMPLATES[1].slots.map((slot, idx) => ({
    ...slot,
    completadoEstaSemana: idx === 0
  }));
}

export const DEFAULT_LOGS: WorkoutLog[] = [
  {
    id: 'log-seed-1',
    fechaIso: new Date(Date.now() - 86400000 * 2).toISOString(),
    diaSemana: 'Lunes',
    routineId: 'empuje-estructural',
    routineNombre: 'Empuje Estructural y Fondos',
    enfoque: 'Empuje',
    duracionRealMinutos: 38,
    seriesCompletadas: 13,
    esfuerzo: 'Óptimo'
  },
  {
    id: 'log-seed-2',
    fechaIso: new Date(Date.now() - 86400000 * 4).toISOString(),
    diaSemana: 'Sábado',
    routineId: 'core-isometria-anillas',
    routineNombre: 'Core Isométrico y Control L-Sit',
    enfoque: 'Core',
    duracionRealMinutos: 29,
    seriesCompletadas: 14,
    esfuerzo: 'Óptimo'
  }
];

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota issues
  }
}

export const STORAGE_KEYS = KEYS;

export function loadInitialProfile(): UserProfile {
  return loadFromStorage<UserProfile>(KEYS.profile, DEFAULT_PROFILE);
}

export function loadInitialSchedule(): DayScheduleSlot[] {
  return loadFromStorage<DayScheduleSlot[]>(KEYS.schedule, getDefaultSchedule());
}

export function loadInitialCustomRoutines(): Routine[] {
  return loadFromStorage<Routine[]>(KEYS.customRoutines, []);
}

export function loadInitialLogs(): WorkoutLog[] {
  return loadFromStorage<WorkoutLog[]>(KEYS.logs, DEFAULT_LOGS);
}
