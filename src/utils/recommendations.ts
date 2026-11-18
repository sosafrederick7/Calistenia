import { EXERCISES, SKILL_CHAINS } from '../data/exercises';
import {
  DayScheduleSlot,
  DiaSemana,
  RecommendationItem,
  Routine,
  UserProfile,
  WorkoutLog
} from '../types/calisthenics';

export const DIAS_ORDEN: DiaSemana[] = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];

export function getTodayDiaSemana(): DiaSemana {
  const jsDay = new Date().getDay(); // 0 = Domingo ... 6 = Sábado
  const map: Record<number, DiaSemana> = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado'
  };
  return map[jsDay];
}

export function detectScheduleConflicts(
  schedule: DayScheduleSlot[],
  routines: Routine[]
): string[] {
  const alerts: string[] = [];
  for (let i = 0; i < schedule.length - 1; i++) {
    const today = schedule[i];
    const next = schedule[i + 1];
    if (today.esDescanso || next.esDescanso || !today.routineId || !next.routineId) continue;

    const r1 = routines.find((r) => r.id === today.routineId);
    const r2 = routines.find((r) => r.id === next.routineId);
    if (!r1 || !r2) continue;

    if (r1.enfoque === r2.enfoque && r1.enfoque !== 'Movilidad') {
      alerts.push(
        `${today.dia} y ${next.dia} repiten enfoque de ${r1.enfoque}. Conviene separar grupos musculares al menos 48 h para optimizar la recuperación.`
      );
    } else if (
      (r1.enfoque === 'Cuerpo completo' && r2.enfoque === 'Cuerpo completo')
    ) {
      alerts.push(
        `${today.dia} y ${next.dia} programan Cuerpo completo seguido. Inserta un día de descanso o movilidad entre ambos.`
      );
    }
  }
  return alerts;
}

export function generateRecommendations(params: {
  profile: UserProfile;
  schedule: DayScheduleSlot[];
  routines: Routine[];
  logs: WorkoutLog[];
  todayDia: DiaSemana;
}): RecommendationItem[] {
  const { profile, schedule, routines, logs, todayDia } = params;
  const recommendations: RecommendationItem[] = [];

  const todaySlot = schedule.find((s) => s.dia === todayDia);
  const todayRoutine = todaySlot?.routineId
    ? routines.find((r) => r.id === todaySlot.routineId)
    : undefined;

  // 1. Recomendación contextual para la sesión de hoy
  if (todaySlot && !todaySlot.esDescanso && todayRoutine) {
    const missingEquipment = todayRoutine.equipamientoRequerido.filter(
      (eq) => eq !== 'Sin equipo' && !profile.equipamiento.includes(eq)
    );

    if (missingEquipment.length > 0) {
      const fallbackRoutine =
        routines.find((r) =>
          r.equipamientoRequerido.every(
            (eq) => eq === 'Sin equipo' || profile.equipamiento.includes(eq)
          ) && r.nivel === profile.nivel
        ) || routines[0];

      recommendations.push({
        id: 'rec-equipo-hoy',
        categoria: 'Sesión de hoy',
        titulo: `Alternativa sin ${missingEquipment.join(' ni ')} para hoy`,
        detalle: `Tu horario marca "${todayRoutine.nombre}", pero requiere ${missingEquipment.join(', ')}. Puedes cambiar a "${fallbackRoutine.nombre}" (${fallbackRoutine.duracionMinutos} min) sin perder ritmo.`,
        accionLabel: 'Iniciar alternativa',
        accionTipo: 'iniciar-rutina',
        routineId: fallbackRoutine.id,
        prioridad: 'alta'
      });
    } else {
      recommendations.push({
        id: 'rec-sesion-hoy',
        categoria: 'Sesión de hoy',
        titulo: `Listo para "${todayRoutine.nombre}" a las ${todaySlot.horaPreferida}`,
        detalle: `Duración estimada de ${todayRoutine.duracionMinutos} min (${todayRoutine.nivel}). Mantén los descansos cronometrados para cuidar la calidad técnica de cada serie.`,
        accionLabel: 'Iniciar sesión',
        accionTipo: 'iniciar-rutina',
        routineId: todayRoutine.id,
        prioridad: 'alta'
      });
    }
  } else {
    recommendations.push({
      id: 'rec-descanso-hoy',
      categoria: 'Sesión de hoy',
      titulo: 'Día de descanso activo en tu horario',
      detalle:
        'Hoy no tienes carga intensa asignada. Dedica 10 minutos a movilidad de muñecas, cadera y caminata suave para llegar fresco a tu siguiente entrenamiento.',
      accionLabel: 'Ajustar horario',
      accionTipo: 'ir-horarios',
      prioridad: 'media'
    });
  }

  // 2. Análisis de recuperación / esfuerzo reciente
  const lastLog = logs[0];
  const conflicts = detectScheduleConflicts(schedule, routines);

  if (conflicts.length > 0) {
    recommendations.push({
      id: 'rec-conflicto-horario',
      categoria: 'Recuperación',
      titulo: 'Solapamiento muscular detectado en tu semana',
      detalle: conflicts[0],
      accionLabel: 'Revisar horarios',
      accionTipo: 'ir-horarios',
      prioridad: 'alta'
    });
  } else if (lastLog && lastLog.esfuerzo === 'Exigente') {
    recommendations.push({
      id: 'rec-recuperacion-esfuerzo',
      categoria: 'Recuperación',
      titulo: `Tras tu sesión exigente de ${lastLog.enfoque}`,
      detalle:
        'Tu último registro tuvo esfuerzo alto. Prioriza hidratación, 7–8 horas de sueño y evita llegar al fallo muscular en la primera serie de hoy.',
      prioridad: 'media'
    });
  } else {
    const goalTips: Record<UserProfile['objetivo'], string> = {
      'Fuerza e hipertrofia':
        'Mantén entre 6 y 10 repeticiones controladas (tempo 2-1-1-0) con 90–120 s de pausa entre series principales.',
      'Habilidades estáticas':
        'Entrena pino y L-Sit siempre al principio de la sesión mientras el sistema nervioso y las muñecas están frescos.',
      'Resistencia y energía':
        'Reduce descansos a 45–60 s y busca fluidez continua sin perder la alineación del core en las últimas repeticiones.',
      'Movilidad y base':
        'Prioriza el rango completo de movimiento y pausas de 2 segundos en la parte baja de cada sentadilla y remo.'
    };

    recommendations.push({
      id: 'rec-recuperacion-objetivo',
      categoria: 'Recuperación',
      titulo: `Enfoque óptimo para ${profile.objetivo.toLowerCase()}`,
      detalle: goalTips[profile.objetivo],
      prioridad: 'informativa'
    });
  }

  // 3. Siguiente paso de progresión técnica basado en ejercicios dominados
  let nextExerciseSuggestion: { chainName: string; current: string; next: string } | null = null;

  for (const chain of SKILL_CHAINS) {
    for (let i = 0; i < chain.ejerciciosIds.length - 1; i++) {
      const currId = chain.ejerciciosIds[i];
      const nextId = chain.ejerciciosIds[i + 1];
      if (
        profile.ejerciciosDominados.includes(currId) &&
        !profile.ejerciciosDominados.includes(nextId)
      ) {
        const currEx = EXERCISES.find((e) => e.id === currId);
        const nextEx = EXERCISES.find((e) => e.id === nextId);
        if (currEx && nextEx) {
          nextExerciseSuggestion = {
            chainName: chain.nombre,
            current: currEx.nombre,
            next: nextEx.nombre
          };
          break;
        }
      }
    }
    if (nextExerciseSuggestion) break;
  }

  if (nextExerciseSuggestion) {
    recommendations.push({
      id: 'rec-progresion',
      categoria: 'Progresión técnica',
      titulo: `Desbloquea: ${nextExerciseSuggestion.next}`,
      detalle: `Ya dominas "${nextExerciseSuggestion.current}" en la ruta de ${nextExerciseSuggestion.chainName}. Introduce 2 series iniciales del siguiente peldaño esta semana.`,
      accionLabel: 'Ver ruta técnica',
      accionTipo: 'ir-progresion',
      prioridad: 'media'
    });
  } else {
    recommendations.push({
      id: 'rec-progresion-inicio',
      categoria: 'Progresión técnica',
      titulo: 'Marca tus ejercicios dominados para calibrar progresiones',
      detalle:
        'Registra qué movimientos base ya realizas con técnica limpia en la sección de Progresión para recibir el siguiente paso exacto de cada cadena.',
      accionLabel: 'Abrir progresión',
      accionTipo: 'ir-progresion',
      prioridad: 'informativa'
    });
  }

  // 4. Preparación articular específica
  recommendations.push({
    id: 'rec-articular',
    categoria: 'Preparación articular',
    titulo: 'Protocolo previo de 4 minutos: muñecas y escápulas',
    detalle:
      'Antes de tocar barras o suelo en frío, realiza círculos de muñeca en cuadrupedia y 10 retracciones escapulares. Previene sobrecargas en antebrazos y hombros.',
    prioridad: 'informativa'
  });

  return recommendations;
}
