import { Exercise } from '../types/calisthenics';

export const EXERCISES: Exercise[] = [
  {
    id: 'flexiones-inclinadas',
    nombre: 'Flexiones inclinadas',
    enfoque: 'Empuje',
    nivel: 'Principiante',
    equipamiento: 'Sin equipo',
    tipoMedida: 'reps',
    valorSugerido: '10–15 reps',
    musculos: ['Pectoral mayor', 'Tríceps', 'Deltoides anterior', 'Core'],
    tecnicaClave: [
      'Apoya las manos en un banco o superficie estable más alta que los pies.',
      'Mantén una línea recta desde los talones hasta la coronilla activando glúteos y abdomen.',
      'Desciende llevando los codos a 45° respecto al torso hasta acercar el pecho al apoyo.'
    ],
    erroresComunes: [
      'Dejar caer la cadera hacia el suelo durante el descenso.',
      'Abrir los codos en 90° formando una T con los hombros.'
    ],
    respiracion: 'Inhala al bajar de forma controlada (2 s) y exhala al empujar.',
    regresion: 'Flexiones contra pared',
    progresionSiguiente: 'Flexiones estrictas en suelo',
    cadenaHabilidad: 'Empuje horizontal',
    ordenCadena: 1
  },
  {
    id: 'flexiones-estrictas',
    nombre: 'Flexiones estrictas en suelo',
    enfoque: 'Empuje',
    nivel: 'Principiante',
    equipamiento: 'Sin equipo',
    tipoMedida: 'reps',
    valorSugerido: '8–15 reps',
    musculos: ['Pectoral', 'Tríceps', 'Serrato anterior', 'Core'],
    tecnicaClave: [
      'Manos separadas ligeramente más allá del ancho de hombros, dedos abiertos.',
      'Protracción escapular al final de cada subida empujando el suelo con firmeza.',
      'Roza el suelo con el pecho sin perder tensión abdominal.'
    ],
    erroresComunes: [
      'Acortar el recorrido sin bajar el pecho completo.',
      'Adelantar el cuello buscando el suelo antes que el torso.'
    ],
    respiracion: 'Inhala en el descenso y exhala en el último tercio del empuje.',
    regresion: 'Flexiones inclinadas',
    progresionSiguiente: 'Flexiones diamante',
    cadenaHabilidad: 'Empuje horizontal',
    ordenCadena: 2
  },
  {
    id: 'flexiones-diamante',
    nombre: 'Flexiones diamante',
    enfoque: 'Empuje',
    nivel: 'Intermedio',
    equipamiento: 'Sin equipo',
    tipoMedida: 'reps',
    valorSugerido: '6–12 reps',
    musculos: ['Tríceps', 'Pectoral interno', 'Deltoides anterior'],
    tecnicaClave: [
      'Coloca índices y pulgares cerca formando un triángulo debajo del esternón.',
      'Mantén los codos pegados a los costados al descender.',
      'Extiende completamente los codos arriba sin bloquear de golpe.'
    ],
    erroresComunes: [
      'Rotar las muñecas hacia adentro generando molestia articular.',
      'Arquear la zona lumbar por falta de tensión en el core.'
    ],
    respiracion: 'Inhala profundo antes de bajar, exhala al completar la extensión.',
    regresion: 'Flexiones con manos al ancho de hombros',
    progresionSiguiente: 'Flexiones arqueras',
    cadenaHabilidad: 'Empuje horizontal',
    ordenCadena: 3
  },
  {
    id: 'flexiones-arqueras',
    nombre: 'Flexiones arqueras',
    enfoque: 'Empuje',
    nivel: 'Avanzado',
    equipamiento: 'Sin equipo',
    tipoMedida: 'reps',
    valorSugerido: '5–8 reps por lado',
    musculos: ['Pectoral unilateral', 'Tríceps', 'Hombro estabilizador'],
    tecnicaClave: [
      'Separa las manos al doble del ancho de hombros con dedos apuntando a 45° hacia afuera.',
      'Desplaza el peso hacia un brazo flexionando ese codo mientras el brazo opuesto queda extendido.',
      'Regresa al centro con control antes de alternar de lado.'
    ],
    erroresComunes: [
      'Flexionar el brazo de asistencia reduciendo el estímulo unilateral.',
      'Girar la cadera para compensar falta de fuerza.'
    ],
    respiracion: 'Inhala desplazando el cuerpo al lado activo, exhala al volver al centro.',
    regresion: 'Flexiones asimétricas con una mano elevada',
    progresionSiguiente: 'Flexiones a una mano',
    cadenaHabilidad: 'Empuje horizontal',
    ordenCadena: 4
  },
  {
    id: 'flexiones-pica',
    nombre: 'Flexiones en pica (Pike Push-up)',
    enfoque: 'Empuje',
    nivel: 'Intermedio',
    equipamiento: 'Sin equipo',
    tipoMedida: 'reps',
    valorSugerido: '6–10 reps',
    musculos: ['Deltoides anterior y medio', 'Trapecio superior', 'Tríceps'],
    tecnicaClave: [
      'Forma una V invertida elevando la cadera y manteniendo piernas lo más rectas posible.',
      'Lleva la cabeza hacia adelante formando un triángulo con las manos al bajar.',
      'Empuja hacia arriba y atrás recuperando la línea de hombros.'
    ],
    erroresComunes: [
      'Bajar la cabeza en línea recta entre las manos en vez de adelantarla.',
      'Doblar en exceso las rodillas quitando carga a los hombros.'
    ],
    respiracion: 'Inhala al adelantar la frente hacia el suelo, exhala empujando fuerte.',
    regresion: 'Flexiones en pica con rodillas semiflexionadas',
    progresionSiguiente: 'Flexiones de pino asistidas en pared',
    cadenaHabilidad: 'Empuje vertical',
    ordenCadena: 1
  },
  {
    id: 'fondos-paralelas',
    nombre: 'Fondos en paralelas',
    enfoque: 'Empuje',
    nivel: 'Intermedio',
    equipamiento: 'Paralelas',
    tipoMedida: 'reps',
    valorSugerido: '6–12 reps',
    musculos: ['Pectoral inferior', 'Tríceps', 'Deltoides anterior'],
    tecnicaClave: [
      'Inicia con brazos bloqueados y hombros deprimidos lejos de las orejas.',
      'Desciende hasta que el hombro quede ligeramente por debajo del codo.',
      'Inclina ligeramente el torso hacia adelante manteniendo piernas firmes.'
    ],
    erroresComunes: [
      'Encoger los hombros hacia el cuello en la parte baja.',
      'Balancear las piernas para impulsarse en las últimas repeticiones.'
    ],
    respiracion: 'Inhala en el descenso lento y exhala en la subida continua.',
    regresion: 'Fondos negativos lentos (4 s) o fondos en banco',
    progresionSiguiente: 'Fondos en anillas con giro externo',
    cadenaHabilidad: 'Empuje vertical',
    ordenCadena: 2
  },
  {
    id: 'pino-pared',
    nombre: 'Pino pecho a pared (Wall Handstand)',
    enfoque: 'Empuje',
    nivel: 'Avanzado',
    equipamiento: 'Sin equipo',
    tipoMedida: 'tiempo',
    valorSugerido: '20–45 seg',
    musculos: ['Deltoides', 'Trapecio', 'Core', 'Estabilizadores de muñeca'],
    tecnicaClave: [
      'Sube caminando por la pared hasta alinear muñecas, hombros, cadera y tobillos.',
      'Empuja el suelo elevando las escápulas y evita arquear la espalda baja.',
      'Presiona con las yemas de los dedos para equilibrar pequeñas oscilaciones.'
    ],
    erroresComunes: [
      'Mirar al frente comprimiendo las cervicales en lugar de mirar entre las manos.',
      'Relajar el abdomen dejando caer la zona lumbar en forma de banana.'
    ],
    respiracion: 'Respiración nasal corta y constante manteniendo presión abdominal.',
    regresion: 'Pino en escuadra con pies sobre cajón',
    progresionSiguiente: 'Pino libre y flexiones de pino en pared',
    cadenaHabilidad: 'Empuje vertical',
    ordenCadena: 3
  },
  {
    id: 'remo-australiano',
    nombre: 'Remo australiano en barra baja',
    enfoque: 'Tracción',
    nivel: 'Principiante',
    equipamiento: 'Barra fija',
    tipoMedida: 'reps',
    valorSugerido: '8–15 reps',
    musculos: ['Dorsal ancho', 'Romboides', 'Trapecio medio', 'Bíceps'],
    tecnicaClave: [
      'Cuerpo rígido como una tabla debajo de una barra a la altura de la cadera.',
      'Tira llevando el pecho hacia la barra y juntando las escápulas atrás.',
      'Mantén una pausa de 1 segundo arriba antes de bajar con control.'
    ],
    erroresComunes: [
      'Elevar primero la cadera o dejarla colgada.',
      'Tirar solo con los brazos sin retraer los omóplatos.'
    ],
    respiracion: 'Exhala al llevar el pecho a la barra, inhala en la extensión.',
    regresion: 'Remo australiano con cuerpo más vertical y rodillas dobladas',
    progresionSiguiente: 'Dominadas negativas lentas',
    cadenaHabilidad: 'Tracción vertical',
    ordenCadena: 1
  },
  {
    id: 'escapulares-barra',
    nombre: 'Retracciones escapulares colgado',
    enfoque: 'Tracción',
    nivel: 'Principiante',
    equipamiento: 'Barra fija',
    tipoMedida: 'reps',
    valorSugerido: '10–12 reps',
    musculos: ['Trapecio inferior', 'Dorsal ancho', 'Antebrazos'],
    tecnicaClave: [
      'Cuélgate con brazos completamente estirados al ancho de hombros.',
      'Sin doblar los codos, baja los hombros y eleva el pecho hacia arriba.',
      'Sostén 1–2 segundos arriba sintiendo el trabajo entre los omóplatos.'
    ],
    erroresComunes: [
      'Doblar los codos convirtiendo el ejercicio en media dominada.',
      'Balancear las piernas al iniciar cada repetición.'
    ],
    respiracion: 'Inhala abajo, exhala al deprimir escápulas.',
    regresion: 'Colgado pasivo en barra (Dead Hang 30 s)',
    progresionSiguiente: 'Dominadas negativas (5 s de bajada)',
    cadenaHabilidad: 'Tracción vertical',
    ordenCadena: 2
  },
  {
    id: 'dominadas-estrictas',
    nombre: 'Dominadas estrictas (Pull-ups)',
    enfoque: 'Tracción',
    nivel: 'Intermedio',
    equipamiento: 'Barra fija',
    tipoMedida: 'reps',
    valorSugerido: '5–10 reps',
    musculos: ['Dorsal ancho', 'Bíceps', 'Braquiorradial', 'Core'],
    tecnicaClave: [
      'Agarre prono al ancho de hombros, piernas juntas ligeramente adelantadas (hollow).',
      'Inicia deprimiendo escápulas y dirige los codos hacia las costillas.',
      'Sube hasta pasar la barbilla por encima de la barra sin patear.'
    ],
    erroresComunes: [
      'Usar impulso de piernas (kipping) en series de fuerza estricta.',
      'Cortar el recorrido sin extender brazos abajo.'
    ],
    respiracion: 'Exhala al superar la barra, inhala en el descenso controlado.',
    regresion: 'Dominadas negativas de 5 segundos o con banda elástica',
    progresionSiguiente: 'Dominadas al pecho y dominadas arqueras',
    cadenaHabilidad: 'Tracción vertical',
    ordenCadena: 3
  },
  {
    id: 'dominadas-pecho',
    nombre: 'Dominadas explosivas al pecho',
    enfoque: 'Tracción',
    nivel: 'Avanzado',
    equipamiento: 'Barra fija',
    tipoMedida: 'reps',
    valorSugerido: '4–7 reps',
    musculos: ['Dorsal ancho', 'Trapecio', 'Bíceps', 'Antebrazos'],
    tecnicaClave: [
      'Arranca desde extensión total con máxima velocidad concéntrica.',
      'Tira los codos hacia atrás para llevar el esternón a tocar la barra.',
      'Desciende controlado manteniendo la postura tensa.'
    ],
    erroresComunes: [
      'Perder la alineación del torso arqueando en exceso la espalda.',
      'Realizar repeticiones fatigadas sin altura suficiente.'
    ],
    respiracion: 'Exhalación explosiva durante el tirón inicial.',
    regresion: 'Dominadas estrictas con pausa arriba',
    progresionSiguiente: 'Muscle-up estricto en barra',
    cadenaHabilidad: 'Tracción vertical',
    ordenCadena: 4
  },
  {
    id: 'sentadilla-controlada',
    nombre: 'Sentadilla profunda con pausa',
    enfoque: 'Pierna',
    nivel: 'Principiante',
    equipamiento: 'Sin equipo',
    tipoMedida: 'reps',
    valorSugerido: '12–20 reps',
    musculos: ['Cuádriceps', 'Glúteo mayor', 'Aductores', 'Pantorrillas'],
    tecnicaClave: [
      'Pies al ancho de hombros, puntas ligeramente hacia afuera.',
      'Baja manteniendo toda la planta apoyada y rodillas alineadas con los dedos.',
      'Haz una pausa de 2 segundos abajo con el pecho erguido antes de subir.'
    ],
    erroresComunes: [
      'Levantar los talones por rigidez en el tobillo.',
      'Dejar que las rodillas colapsen hacia el centro.'
    ],
    respiracion: 'Inhala al descender, aguanta en la pausa, exhala subiendo.',
    regresion: 'Sentadilla asistida sujetando un marco o poste',
    progresionSiguiente: 'Zancada búlgara unilateral',
    cadenaHabilidad: 'Pierna unilateral',
    ordenCadena: 1
  },
  {
    id: 'zancada-bulgara',
    nombre: 'Zancada búlgara',
    enfoque: 'Pierna',
    nivel: 'Intermedio',
    equipamiento: 'Sin equipo',
    tipoMedida: 'reps',
    valorSugerido: '8–12 reps por pierna',
    musculos: ['Cuádriceps', 'Glúteo medio y mayor', 'Isquiotibiales'],
    tecnicaClave: [
      'Apoya el empeine trasero en un banco o escalón estable.',
      'Desciende verticalmente llevando la rodilla trasera cerca del suelo.',
      'Empuja a través del talón delantero manteniendo el torso estable.'
    ],
    erroresComunes: [
      'Colocar ambos pies en una misma línea perdiendo equilibrio.',
      'Inclinar demasiado la espalda redondeando la columna.'
    ],
    respiracion: 'Inhala al bajar en 2 segundos, exhala fuerte en la subida.',
    regresion: 'Zancada estática en el suelo',
    progresionSiguiente: 'Pistol Squat asistida o camarón (Shrimp Squat)',
    cadenaHabilidad: 'Pierna unilateral',
    ordenCadena: 2
  },
  {
    id: 'pistol-squat',
    nombre: 'Pistol Squat (Sentadilla a una pierna)',
    enfoque: 'Pierna',
    nivel: 'Avanzado',
    equipamiento: 'Sin equipo',
    tipoMedida: 'reps',
    valorSugerido: '4–8 reps por pierna',
    musculos: ['Cuádriceps', 'Glúteos', 'Flexores de cadera', 'Tobillo'],
    tecnicaClave: [
      'Extiende una pierna recta al frente manteniendo brazos adelantados para contrapeso.',
      'Controla la bajada hasta apoyar el isquiotibial sobre el gemelo.',
      'Sube sin rebotar manteniendo el pie de apoyo firme en el suelo.'
    ],
    erroresComunes: [
      'Dejar caer el peso sin control en los últimos centímetros.',
      'Despegar el talón del pie de apoyo.'
    ],
    respiracion: 'Inhala profundo arriba, exhala tras superar el punto más bajo.',
    regresion: 'Pistol Squat sobre banco o sujetando anillas/poste',
    progresionSiguiente: 'Dragon Squat o Pistol con pausa inferior',
    cadenaHabilidad: 'Pierna unilateral',
    ordenCadena: 3
  },
  {
    id: 'hollow-hold',
    nombre: 'Hollow Body Hold (Plancha hueca)',
    enfoque: 'Core',
    nivel: 'Principiante',
    equipamiento: 'Sin equipo',
    tipoMedida: 'tiempo',
    valorSugerido: '25–45 seg',
    musculos: ['Recto abdominal', 'Transverso', 'Flexores de cadera'],
    tecnicaClave: [
      'Acostado boca arriba, pega completamente la zona lumbar contra el suelo.',
      'Eleva escápulas y piernas rectas a unos centímetros del piso formando un arco suave.',
      'Brazos extendidos atrás en línea con las orejas o al frente si necesitas escala.'
    ],
    erroresComunes: [
      'Despegar la espalda baja creando un hueco debajo de la cintura.',
      'Contener la respiración en exceso generando tensión cervical.'
    ],
    respiracion: 'Respiración corta diafragmática sin soltar la presión abdominal.',
    regresion: 'Hollow tuck con rodillas flexionadas al pecho',
    progresionSiguiente: 'Elevaciones de piernas colgado a la barra',
    cadenaHabilidad: 'Control de core',
    ordenCadena: 1
  },
  {
    id: 'elevaciones-piernas',
    nombre: 'Elevaciones de piernas en barra',
    enfoque: 'Core',
    nivel: 'Intermedio',
    equipamiento: 'Barra fija',
    tipoMedida: 'reps',
    valorSugerido: '6–12 reps',
    musculos: ['Abdominales inferiores', 'Flexores de cadera', 'Dorsal'],
    tecnicaClave: [
      'Colgado en barra con hombros activos (escápulas deprimidas).',
      'Sube las piernas rectas sin balanceo hasta tocar la barra con los empeines.',
      'Desciende despacio frenando la inercia en todo momento.'
    ],
    erroresComunes: [
      'Balancear el cuerpo atrás para tomar impulso.',
      'Flexionar rodillas antes de superar la horizontal.'
    ],
    respiracion: 'Exhala al elevar las piernas, inhala durante el descenso.',
    regresion: 'Elevaciones de rodillas al pecho colgado',
    progresionSiguiente: 'L-Sit en paralelas o suelo',
    cadenaHabilidad: 'Control de core',
    ordenCadena: 2
  },
  {
    id: 'l-sit',
    nombre: 'L-Sit en paralelas o suelo',
    enfoque: 'Core',
    nivel: 'Avanzado',
    equipamiento: 'Paralelas',
    tipoMedida: 'tiempo',
    valorSugerido: '15–30 seg',
    musculos: ['Abdomen completo', 'Psoas', 'Tríceps', 'Depresores escapulares'],
    tecnicaClave: [
      'Empuja con fuerza hacia abajo manteniendo brazos totalmente rectos.',
      'Eleva ambas piernas juntas y extendidas hasta formar 90° con el torso.',
      'Mantén las puntas de los pies estiradas y hombros hacia abajo.'
    ],
    erroresComunes: [
      'Hundir el cuello entre los hombros perdiendo depresión escapular.',
      'Flexionar ligeramente las rodillas por tensión en isquiotibiales.'
    ],
    respiracion: 'Respiración controlada manteniendo el abdomen bloqueado.',
    regresion: 'Tuck L-Sit (rodillas recogidas) o una pierna extendida',
    progresionSiguiente: 'V-Sit o transiciones a pino',
    cadenaHabilidad: 'Control de core',
    ordenCadena: 3
  },
  {
    id: 'movilidad-munecas-hombros',
    nombre: 'Flujo articular: muñecas, escápulas y cadera',
    enfoque: 'Movilidad',
    nivel: 'Principiante',
    equipamiento: 'Sin equipo',
    tipoMedida: 'tiempo',
    valorSugerido: '45–60 seg',
    musculos: ['Antebrazos', 'Manguito rotador', 'Flexores de cadera'],
    tecnicaClave: [
      'Realiza círculos suaves de muñeca en cuadrupedia repartiendo peso adelante y atrás.',
      'Ejecuta flexiones escapulares lentas en plancha alta sin doblar codos.',
      'Finaliza con rotaciones torácicas y sentadilla profunda sostenida.'
    ],
    erroresComunes: [
      'Forzar rangos dolorosos en muñecas frías desde el primer segundo.',
      'Hacer los movimientos rápido sin control articular.'
    ],
    respiracion: 'Respiración nasal lenta y profunda en cada transición.',
    regresion: 'Reducir el ángulo de carga sobre las manos',
    progresionSiguiente: 'Puente torácico y dislocaciones de hombro',
    cadenaHabilidad: 'Movilidad articular',
    ordenCadena: 1
  }
];

export const SKILL_CHAINS = [
  {
    id: 'empuje-horizontal',
    nombre: 'Empuje horizontal',
    descripcion: 'Construye fuerza sólida de pectoral, tríceps y estabilidad escapular desde cero.',
    ejerciciosIds: ['flexiones-inclinadas', 'flexiones-estrictas', 'flexiones-diamante', 'flexiones-arqueras']
  },
  {
    id: 'empuje-vertical',
    nombre: 'Empuje vertical y pino',
    descripcion: 'Desarrolla hombros fuertes, control invertido y equilibrio corporal.',
    ejerciciosIds: ['flexiones-pica', 'fondos-paralelas', 'pino-pared']
  },
  {
    id: 'traccion-vertical',
    nombre: 'Tracción y espalda',
    descripcion: 'Progresión limpia desde el remo horizontal hasta la dominada explosiva al pecho.',
    ejerciciosIds: ['remo-australiano', 'escapulares-barra', 'dominadas-estrictas', 'dominadas-pecho']
  },
  {
    id: 'control-core',
    nombre: 'Control de core e isometría',
    descripcion: 'Tensión abdominal real para transferir fuerza en barra y paralelas.',
    ejerciciosIds: ['hollow-hold', 'elevaciones-piernas', 'l-sit']
  },
  {
    id: 'pierna-unilateral',
    nombre: 'Pierna y potencia unilateral',
    descripcion: 'Fuerza, equilibrio y movilidad de tobillo y cadera sin cargas externas.',
    ejerciciosIds: ['sentadilla-controlada', 'zancada-bulgara', 'pistol-squat']
  }
];
