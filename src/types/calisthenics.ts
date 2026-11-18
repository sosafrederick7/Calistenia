export type Nivel = 'Principiante' | 'Intermedio' | 'Avanzado';

export type Enfoque = 'Empuje' | 'Tracción' | 'Pierna' | 'Core' | 'Cuerpo completo' | 'Movilidad';

export type Equipamiento = 'Sin equipo' | 'Barra fija' | 'Paralelas' | 'Anillas';

export type ObjetivoUsuario =
  | 'Fuerza e hipertrofia'
  | 'Habilidades estáticas'
  | 'Resistencia y energía'
  | 'Movilidad y base';

export type DiaSemana =
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado'
  | 'Domingo';

export type AppView = 'resumen' | 'rutinas' | 'horarios' | 'progresion';

export interface Exercise {
  id: string;
  nombre: string;
  enfoque: Exclude<Enfoque, 'Cuerpo completo'>;
  nivel: Nivel;
  equipamiento: Equipamiento;
  tipoMedida: 'reps' | 'tiempo';
  valorSugerido: string;
  musculos: string[];
  tecnicaClave: string[];
  erroresComunes: string[];
  respiracion: string;
  regresion: string;
  progresionSiguiente: string;
  cadenaHabilidad?: string;
  ordenCadena?: number;
}

export interface RoutineStep {
  exerciseId: string;
  series: number;
  objetivo: number; // reps o segundos
  tipo: 'reps' | 'tiempo';
  descansoSegundos: number;
  tempo?: string;
}

export interface Routine {
  id: string;
  nombre: string;
  resumen: string;
  nivel: Nivel;
  enfoque: Enfoque;
  duracionMinutos: number;
  equipamientoRequerido: Equipamiento[];
  imagenUrl: string;
  calentamiento: string[];
  pasos: RoutineStep[];
  esPersonalizada?: boolean;
}

export interface DayScheduleSlot {
  dia: DiaSemana;
  esDescanso: boolean;
  routineId: string | null;
  horaPreferida: string; // HH:mm
  nota: string;
  completadoEstaSemana: boolean;
}

export interface ScheduleTemplate {
  id: string;
  nombre: string;
  descripcion: string;
  diasActivos: number;
  slots: Omit<DayScheduleSlot, 'completadoEstaSemana'>[];
}

export interface WorkoutLog {
  id: string;
  fechaIso: string;
  diaSemana: DiaSemana;
  routineId: string;
  routineNombre: string;
  enfoque: Enfoque;
  duracionRealMinutos: number;
  seriesCompletadas: number;
  esfuerzo: 'Suave' | 'Óptimo' | 'Exigente';
}

export interface UserProfile {
  nombre: string;
  nivel: Nivel;
  objetivo: ObjetivoUsuario;
  equipamiento: Equipamiento[];
  horarioHabitual: string;
  ejerciciosDominados: string[];
}

export interface RecommendationItem {
  id: string;
  categoria: 'Sesión de hoy' | 'Recuperación' | 'Progresión técnica' | 'Preparación articular';
  titulo: string;
  detalle: string;
  accionLabel?: string;
  accionTipo?: 'iniciar-rutina' | 'ir-horarios' | 'ir-progresion';
  routineId?: string;
  prioridad: 'alta' | 'media' | 'informativa';
}
