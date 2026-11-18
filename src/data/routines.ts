import { Routine, ScheduleTemplate } from '../types/calisthenics';

export const ROUTINES: Routine[] = [
  {
    id: 'base-cuerpo-completo',
    nombre: 'Cuerpo Completo: Base Sin Equipo',
    resumen: 'Circuito equilibrado para construir técnica, control postural y fuerza general sin depender de barras ni accesorios.',
    nivel: 'Principiante',
    enfoque: 'Cuerpo completo',
    duracionMinutos: 30,
    equipamientoRequerido: ['Sin equipo'],
    imagenUrl: '/src/assets/images/hero_calisthenics_bars_1795014957243.jpg',
    calentamiento: [
      '2 min de rotaciones de muñecas, codos y hombros',
      '10 flexiones escapulares suaves en cuadrupedia',
      '10 sentadillas lentas buscando profundidad cómoda'
    ],
    pasos: [
      { exerciseId: 'movilidad-munecas-hombros', series: 2, objetivo: 45, tipo: 'tiempo', descansoSegundos: 30 },
      { exerciseId: 'flexiones-inclinadas', series: 3, objetivo: 12, tipo: 'reps', descansoSegundos: 60, tempo: '2-0-1-0' },
      { exerciseId: 'sentadilla-controlada', series: 3, objetivo: 15, tipo: 'reps', descansoSegundos: 60, tempo: '3-2-1-0' },
      { exerciseId: 'hollow-hold', series: 3, objetivo: 30, tipo: 'tiempo', descansoSegundos: 45 },
      { exerciseId: 'flexiones-estrictas', series: 2, objetivo: 8, tipo: 'reps', descansoSegundos: 75 }
    ]
  },
  {
    id: 'empuje-estructural',
    nombre: 'Empuje Estructural y Fondos',
    resumen: 'Enfocada en pectoral, deltoides y tríceps combinando empujes horizontales y verticales con control escapular.',
    nivel: 'Intermedio',
    enfoque: 'Empuje',
    duracionMinutos: 40,
    equipamientoRequerido: ['Sin equipo', 'Paralelas'],
    imagenUrl: '/src/assets/images/routine_push_strength_1795014957580.jpg',
    calentamiento: [
      '3 min de movilidad de muñecas y rotación externa de hombros',
      '2x15 s de soporte activo en paralelas con brazos bloqueados',
      '1x8 flexiones cómodas de activación'
    ],
    pasos: [
      { exerciseId: 'fondos-paralelas', series: 4, objetivo: 10, tipo: 'reps', descansoSegundos: 90, tempo: '2-1-1-0' },
      { exerciseId: 'flexiones-pica', series: 3, objetivo: 8, tipo: 'reps', descansoSegundos: 90 },
      { exerciseId: 'flexiones-diamante', series: 3, objetivo: 10, tipo: 'reps', descansoSegundos: 75 },
      { exerciseId: 'hollow-hold', series: 3, objetivo: 35, tipo: 'tiempo', descansoSegundos: 45 }
    ]
  },
  {
    id: 'traccion-barra-espalda',
    nombre: 'Tracción en Barra y Espalda Sólida',
    resumen: 'Desarrolla dorsales, agarre y tracción limpia mediante retracciones escapulares, dominadas estrictas y remo.',
    nivel: 'Intermedio',
    enfoque: 'Tracción',
    duracionMinutos: 40,
    equipamientoRequerido: ['Barra fija'],
    imagenUrl: '/src/assets/images/hero_calisthenics_bars_1795014957243.jpg',
    calentamiento: [
      '2x25 s de colgado pasivo en barra para descomprimir hombros',
      '2x10 retracciones escapulares suaves',
      '1x6 remos australianos ligeros'
    ],
    pasos: [
      { exerciseId: 'escapulares-barra', series: 3, objetivo: 10, tipo: 'reps', descansoSegundos: 60 },
      { exerciseId: 'dominadas-estrictas', series: 4, objetivo: 7, tipo: 'reps', descansoSegundos: 120, tempo: '2-0-1-1' },
      { exerciseId: 'remo-australiano', series: 4, objetivo: 12, tipo: 'reps', descansoSegundos: 75 },
      { exerciseId: 'elevaciones-piernas', series: 3, objetivo: 8, tipo: 'reps', descansoSegundos: 75 }
    ]
  },
  {
    id: 'pierna-unilateral-movilidad',
    nombre: 'Pierna Unilateral y Equilibrio',
    resumen: 'Potencia el tren inferior sin pesas trabajando fuerza a una pierna, estabilidad de cadera y rango de tobillo.',
    nivel: 'Intermedio',
    enfoque: 'Pierna',
    duracionMinutos: 35,
    equipamientoRequerido: ['Sin equipo'],
    imagenUrl: '/src/assets/images/routine_legs_mobility_1795014958931.jpg',
    calentamiento: [
      '2 min de dorsiflexión de tobillo en rodillas',
      '10 zancadas alternas sin prisa',
      '30 s de sentadilla profunda asistida'
    ],
    pasos: [
      { exerciseId: 'sentadilla-controlada', series: 3, objetivo: 15, tipo: 'reps', descansoSegundos: 60, tempo: '3-2-1-0' },
      { exerciseId: 'zancada-bulgara', series: 4, objetivo: 10, tipo: 'reps', descansoSegundos: 75 },
      { exerciseId: 'pistol-squat', series: 3, objetivo: 6, tipo: 'reps', descansoSegundos: 90 },
      { exerciseId: 'hollow-hold', series: 3, objetivo: 35, tipo: 'tiempo', descansoSegundos: 45 }
    ]
  },
  {
    id: 'core-isometria-anillas',
    nombre: 'Core Isométrico y Control L-Sit',
    resumen: 'Sesión concentrada en compresión abdominal, bloqueo escapular y control estático para habilidades en barra y suelo.',
    nivel: 'Intermedio',
    enfoque: 'Core',
    duracionMinutos: 30,
    equipamientoRequerido: ['Barra fija', 'Paralelas'],
    imagenUrl: '/src/assets/images/routine_core_rings_1795014958849.jpg',
    calentamiento: [
      '2 min de estiramiento de muñecas y flexores de cadera',
      '2x20 s de plancha con protracción escapular',
      '10 compresiones sentado para activar el psoas'
    ],
    pasos: [
      { exerciseId: 'hollow-hold', series: 4, objetivo: 40, tipo: 'tiempo', descansoSegundos: 60 },
      { exerciseId: 'elevaciones-piernas', series: 4, objetivo: 10, tipo: 'reps', descansoSegundos: 75 },
      { exerciseId: 'l-sit', series: 4, objetivo: 20, tipo: 'tiempo', descansoSegundos: 90 },
      { exerciseId: 'movilidad-munecas-hombros', series: 2, objetivo: 45, tipo: 'tiempo', descansoSegundos: 30 }
    ]
  },
  {
    id: 'habilidades-avanzadas',
    nombre: 'Habilidades: Pino, Arqueras y Explosividad',
    resumen: 'Sesión técnica de alta intensidad orientada a fuerza unilateral, equilibrio invertido y tracción explosiva.',
    nivel: 'Avanzado',
    enfoque: 'Cuerpo completo',
    duracionMinutos: 50,
    equipamientoRequerido: ['Barra fija', 'Paralelas', 'Sin equipo'],
    imagenUrl: '/src/assets/images/routine_core_rings_1795014958849.jpg',
    calentamiento: [
      '4 min de preparación específica de muñecas y línea de hombros',
      '2x10 retracciones escapulares en barra',
      '2x20 s de plancha hueca tensa'
    ],
    pasos: [
      { exerciseId: 'pino-pared', series: 4, objetivo: 30, tipo: 'tiempo', descansoSegundos: 90 },
      { exerciseId: 'dominadas-pecho', series: 4, objetivo: 5, tipo: 'reps', descansoSegundos: 150 },
      { exerciseId: 'flexiones-arqueras', series: 4, objetivo: 6, tipo: 'reps', descansoSegundos: 120 },
      { exerciseId: 'l-sit', series: 3, objetivo: 25, tipo: 'tiempo', descansoSegundos: 90 },
      { exerciseId: 'pistol-squat', series: 3, objetivo: 6, tipo: 'reps', descansoSegundos: 90 }
    ]
  }
];

export const SCHEDULE_TEMPLATES: ScheduleTemplate[] = [
  {
    id: 'plantilla-3-dias',
    nombre: '3 Días · Base Cuerpo Completo (L-X-V)',
    descripcion: 'Ideal para comenzar o mantener constancia con 48 h de recuperación entre sesiones.',
    diasActivos: 3,
    slots: [
      { dia: 'Lunes', esDescanso: false, routineId: 'base-cuerpo-completo', horaPreferida: '18:30', nota: 'Priorizar técnica limpia en flexiones' },
      { dia: 'Martes', esDescanso: true, routineId: null, horaPreferida: '08:00', nota: 'Caminata suave y movilidad de 10 min' },
      { dia: 'Miércoles', esDescanso: false, routineId: 'base-cuerpo-completo', horaPreferida: '18:30', nota: 'Controlar pausa abajo en sentadilla' },
      { dia: 'Jueves', esDescanso: true, routineId: null, horaPreferida: '08:00', nota: 'Descanso articular' },
      { dia: 'Viernes', esDescanso: false, routineId: 'pierna-unilateral-movilidad', horaPreferida: '18:00', nota: 'Cerrar semana con pierna y core' },
      { dia: 'Sábado', esDescanso: true, routineId: null, horaPreferida: '10:00', nota: 'Actividad recreativa ligera' },
      { dia: 'Domingo', esDescanso: true, routineId: null, horaPreferida: '10:00', nota: 'Descanso total' }
    ]
  },
  {
    id: 'plantilla-4-dias',
    nombre: '4 Días · Empuje / Tracción / Pierna / Core',
    descripcion: 'Reparto equilibrado para progresar en dominadas y fondos sin fatigar articulaciones.',
    diasActivos: 4,
    slots: [
      { dia: 'Lunes', esDescanso: false, routineId: 'empuje-estructural', horaPreferida: '07:30', nota: 'Enfoque en fondos profundos' },
      { dia: 'Martes', esDescanso: false, routineId: 'traccion-barra-espalda', horaPreferida: '07:30', nota: 'Dominadas estrictas sin balanceo' },
      { dia: 'Miércoles', esDescanso: true, routineId: null, horaPreferida: '08:00', nota: 'Descanso activo y estiramiento de muñecas' },
      { dia: 'Jueves', esDescanso: false, routineId: 'pierna-unilateral-movilidad', horaPreferida: '18:30', nota: 'Equilibrio y rango de tobillo' },
      { dia: 'Viernes', esDescanso: true, routineId: null, horaPreferida: '18:30', nota: 'Recuperación de agarre' },
      { dia: 'Sábado', esDescanso: false, routineId: 'core-isometria-anillas', horaPreferida: '10:00', nota: 'Trabajo limpio de L-Sit y hollow' },
      { dia: 'Domingo', esDescanso: true, routineId: null, horaPreferida: '10:00', nota: 'Descanso total' }
    ]
  },
  {
    id: 'plantilla-5-dias',
    nombre: '5 Días · Alto Rendimiento y Habilidades',
    descripcion: 'Frecuencia alta alternando patrones musculares y técnica de pino/isométricos.',
    diasActivos: 5,
    slots: [
      { dia: 'Lunes', esDescanso: false, routineId: 'empuje-estructural', horaPreferida: '18:00', nota: 'Empuje y bloqueo de codos' },
      { dia: 'Martes', esDescanso: false, routineId: 'traccion-barra-espalda', horaPreferida: '18:00', nota: 'Tirón vertical y remo' },
      { dia: 'Miércoles', esDescanso: false, routineId: 'pierna-unilateral-movilidad', horaPreferida: '18:00', nota: 'Pierna mientras descansa el tren superior' },
      { dia: 'Jueves', esDescanso: true, routineId: null, horaPreferida: '08:00', nota: 'Descanso y descarga de muñecas' },
      { dia: 'Viernes', esDescanso: false, routineId: 'habilidades-avanzadas', horaPreferida: '18:00', nota: 'Pino y trabajo explosivo fresco' },
      { dia: 'Sábado', esDescanso: false, routineId: 'core-isometria-anillas', horaPreferida: '10:30', nota: 'Compresión y estabilidad' },
      { dia: 'Domingo', esDescanso: true, routineId: null, horaPreferida: '10:00', nota: 'Descanso total' }
    ]
  }
];
