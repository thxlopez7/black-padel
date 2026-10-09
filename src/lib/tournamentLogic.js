export const BRACKET_MAPS = {
  6: [ 'WA', 'BYE', 'WC', 'LB', 'WB', 'BYE', 'LC', 'LA' ],
  8: [ 'WA', 'LB', 'WC', 'LD', 'WB', 'LC', 'WD', 'LA' ],
  10: [ 'WA', 'BYE', 'WE', 'BYE', 'WC', 'BYE', 'LD', 'LB', 'WB', 'BYE', 'LE', 'LC', 'WD', 'BYE', 'LA', 'BYE' ],
  12: [ 'WA', 'BYE', 'WE', 'LF', 'WC', 'BYE', 'LD', 'LB', 'WB', 'BYE', 'WF', 'LC', 'WD', 'BYE', 'LE', 'LA' ],
  14: [ 'WA', 'BYE', 'WE', 'LF', 'WC', 'LD', 'WG', 'LB', 'WB', 'BYE', 'WF', 'LC', 'WD', 'LE', 'LG', 'LA' ],
  16: [ 'WA', 'LB', 'WE', 'LF', 'WC', 'LD', 'WG', 'LH', 'WB', 'LC', 'WF', 'LE', 'WD', 'LG', 'WH', 'LA' ],
  18: [ 'WA', 'BYE', 'LF', 'LH', 'WE', 'BYE', 'LB', 'BYE', 'WC', 'BYE', 'LD', 'BYE', 'WG', 'BYE', 'WI', 'BYE', 'WB', 'BYE', 'LI', 'LA', 'WF', 'BYE', 'LC', 'BYE', 'WD', 'BYE', 'LE', 'BYE', 'WH', 'BYE', 'LG', 'BYE' ],
  20: [ 'WA', 'BYE', 'LD', 'LF', 'WE', 'BYE', 'LB', 'BYE', 'WC', 'BYE', 'LH', 'LJ', 'WG', 'BYE', 'WI', 'BYE', 'WB', 'BYE', 'LE', 'LG', 'WF', 'BYE', 'LC', 'BYE', 'WD', 'BYE', 'LI', 'LA', 'WH', 'BYE', 'WJ', 'BYE' ],
  22: [ 'WA', 'BYE', 'LD', 'LF', 'WG', 'BYE', 'WK', 'LB', 'WC', 'BYE', 'LH', 'LJ', 'WE', 'BYE', 'WI', 'BYE', 'WB', 'BYE', 'LC', 'LE', 'WF', 'BYE', 'LG', 'LI', 'WD', 'BYE', 'LK', 'LA', 'WH', 'BYE', 'WJ', 'BYE' ],
  24: [ 'WA', 'BYE', 'LF', 'LH', 'WE', 'BYE', 'WI', 'LB', 'WC', 'BYE', 'LJ', 'LL', 'WG', 'BYE', 'WK', 'LD', 'WB', 'BYE', 'LG', 'LI', 'WF', 'BYE', 'WJ', 'LC', 'WD', 'BYE', 'LK', 'LA', 'WH', 'BYE', 'WL', 'LE' ],
  26: [ 'WA', 'BYE', 'LJ', 'LL', 'WE', 'BYE', 'WG', 'LB', 'WC', 'BYE', 'WI', 'LD', 'WK', 'LF', 'WM', 'LH', 'WB', 'BYE', 'LI', 'LK', 'WF', 'BYE', 'WH', 'LC', 'WD', 'BYE', 'LM', 'LA', 'WJ', 'LE', 'WL', 'LG' ],
  28: [ 'WA', 'BYE', 'LL', 'LN', 'WE', 'LB', 'WG', 'LD', 'WC', 'BYE', 'WI', 'LF', 'WK', 'LH', 'WM', 'LJ', 'WB', 'BYE', 'LM', 'LA', 'WF', 'LC', 'WH', 'LE', 'WD', 'BYE', 'WJ', 'LG', 'WL', 'LI', 'WN', 'LK' ],
  30: [ 'WA', 'BYE', 'LL', 'WE', 'WI', 'LH', 'LD', 'WM', 'WC', 'LN', 'LJ', 'WG', 'WK', 'LF', 'LB', 'WO', 'WB', 'BYE', 'LK', 'WF', 'WJ', 'LG', 'LC', 'WN', 'WD', 'LM', 'LI', 'WH', 'WL', 'LE', 'LA', 'LO' ],
  32: [ 'WA', 'LP', 'LL', 'WE', 'WI', 'LH', 'LD', 'WM', 'WC', 'LN', 'LJ', 'WG', 'WK', 'LF', 'LB', 'WO', 'WB', 'LO', 'LK', 'WF', 'WJ', 'LG', 'LC', 'WN', 'WD', 'LM', 'LI', 'WH', 'WL', 'LE', 'LA', 'WP' ]
};

export function getRoundNames(numRounds) {
  if (numRounds === 3) return ['Cuartos', 'Semis', 'Final']; 
  if (numRounds === 4) return ['Octavos', 'Cuartos', 'Semis', 'Final']; 
  if (numRounds === 5) return ['16avos', 'Octavos', 'Cuartos', 'Semis', 'Final']; 
  return ['Ronda 1', 'Ronda 2', 'Ronda 3', 'Ronda 4', 'Ronda 5'];
}

export function createEmptyScore() {
  return { p1: ['','',''], p2: ['','',''] };
}

export function generateTournamentMatches(categoryId, numPairs, pairsList, isRandom) {
  let pairs = [...pairsList];
  const numZones = numPairs / 2;

  if (isRandom) {
    // 1. Separar parejas reales de los cupos libres (BYEs)
    const realPairs = pairsList.filter(p => p && p !== 'BYE' && p.trim() !== '');
    
    // Barajar aleatoriamente las parejas reales
    for (let i = realPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [realPairs[i], realPairs[j]] = [realPairs[j], realPairs[i]];
    }

    // 2. Distribuir equitativamente en las zonas para garantizar que cada zona tenga competencia
    let zoneP1 = Array(numZones).fill('BYE');
    let zoneP2 = Array(numZones).fill('BYE');
    
    let pIdx = 0;
    // Asignar primer slot de cada zona
    for (let z = 0; z < numZones && pIdx < realPairs.length; z++) {
      zoneP1[z] = realPairs[pIdx++];
    }
    // Asignar segundo slot de cada zona con las parejas restantes
    for (let z = 0; z < numZones && pIdx < realPairs.length; z++) {
      zoneP2[z] = realPairs[pIdx++];
    }

    // Reconstruir el listado ordenado por zona [Zona A p1, Zona A p2, Zona B p1, Zona B p2...]
    pairs = [];
    for (let z = 0; z < numZones; z++) {
      pairs.push(zoneP1[z], zoneP2[z]);
    }
  }

  let generatedMatches = [];
  
  // 1. ZONAS
  let pairIndex = 0;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for(let i=0; i < numZones; i++) {
    let p1 = pairs[pairIndex++];
    let p2 = pairs[pairIndex++];
    let autoWinner = null;
    let isComplete = false;
    
    if (p1 === 'BYE' && p2 !== 'BYE') { autoWinner = p2; isComplete = true; }
    else if (p2 === 'BYE' && p1 !== 'BYE') { autoWinner = p1; isComplete = true; }
    else if (p1 === 'BYE' && p2 === 'BYE') { autoWinner = 'BYE'; isComplete = true; }

    generatedMatches.push({
      category_id: categoryId,
      match_type: 'ZONE',
      round_name: 'ZONA ' + alphabet[i],
      round_index: 0,
      match_index: i,
      p1_name: p1,
      p2_name: p2,
      winner: autoWinner,
      is_wo: isComplete,
      is_bye: p1 === 'BYE' || p2 === 'BYE'
    });
  }

  // 2. BRACKET (First Round)
  let mapTemplate = BRACKET_MAPS[numPairs];
  let numRounds = Math.log2(mapTemplate.length);
  let rNames = getRoundNames(numRounds);
  
  for(let i=0; i<mapTemplate.length; i+=2) {
    let p1Code = mapTemplate[i];
    let p2Code = mapTemplate[i+1];
    let mIndex = i / 2;
    let matchLetter = String.fromCharCode(65 + mIndex);
    let matchId = rNames[0] + ' ' + matchLetter;

    let formatSource = (code) => {
      if (!code || code === 'BYE') return 'BYE';
      if (code.startsWith('W')) return `Zona ${code.substring(1)} 1º`;
      if (code.startsWith('L')) return `Zona ${code.substring(1)} 2º`;
      return code;
    };

    generatedMatches.push({
      category_id: categoryId,
      match_type: 'BRACKET',
      round_name: matchId,
      round_index: 1, // 1 represents the first bracket round
      match_index: mIndex,
      p1_name: formatSource(p1Code), // We store the source as the initial name so it displays "Zona A 1º"
      p2_name: formatSource(p2Code),
      is_bye: p1Code === 'BYE' || p2Code === 'BYE'
    });
  }

  // Bracket subsequent rounds can be generated dynamically or pre-generated empty
  // Let's pre-generate them empty for simplicity
  let currentRoundCount = mapTemplate.length / 2;
  let rIndex = 2;
  
  while(currentRoundCount > 1) {
    currentRoundCount = currentRoundCount / 2;
    for(let i=0; i<currentRoundCount; i++) {
      let matchLetter = String.fromCharCode(65 + i);
      let matchId = rNames[rIndex-1] + ' ' + matchLetter;
      generatedMatches.push({
        category_id: categoryId,
        match_type: 'BRACKET',
        round_name: matchId,
        round_index: rIndex,
        match_index: i,
        p1_name: null,
        p2_name: null,
        is_bye: false
      });
    }
    rIndex++;
  }

  return { pairs, generatedMatches };
}

export function advanceWinner(matchesList, updatedMatch) {
  let updatesArray = [];

  // SI SE ACTUALIZÓ UNA ZONA
  if (updatedMatch.match_type === 'ZONE') {
    // Para una zona (ej. "ZONA A"), extraemos la letra "A"
    const zoneLetter = updatedMatch.round_name.replace('ZONA ', '').trim();
    const winnerLabel = `Zona ${zoneLetter} 1º`;
    const loserLabel = `Zona ${zoneLetter} 2º`;

    const winnerName = updatedMatch.winner;
    const loserName = updatedMatch.winner === updatedMatch.p1_name ? updatedMatch.p2_name : 
                      updatedMatch.winner === updatedMatch.p2_name ? updatedMatch.p1_name : null;

    if (!winnerName || !loserName) return [];

    // Buscar si hay partidos en el bracket que estén esperando a este ganador o perdedor
    // FILTRADO ESTRICTO POR CATEGORÍA: Solo avanza a partidos de la misma categoría
    matchesList.forEach(m => {
      if (m.match_type === 'BRACKET' && String(m.category_id) === String(updatedMatch.category_id)) {
        let matchUpdates = {};
        let needsUpdate = false;

        // Reemplazar Winner
        if (m.p1_name === winnerLabel) { matchUpdates.p1_name = winnerName; needsUpdate = true; }
        if (m.p2_name === winnerLabel) { matchUpdates.p2_name = winnerName; needsUpdate = true; }
        
        // Reemplazar Loser
        if (m.p1_name === loserLabel) { matchUpdates.p1_name = loserName; needsUpdate = true; }
        if (m.p2_name === loserLabel) { matchUpdates.p2_name = loserName; needsUpdate = true; }

        if (needsUpdate) {
          // Chequeo de Auto-BYE
          if (matchUpdates.p1_name && m.p2_name === 'BYE') matchUpdates.winner = matchUpdates.p1_name;
          if (matchUpdates.p2_name && m.p1_name === 'BYE') matchUpdates.winner = matchUpdates.p2_name;
          
          updatesArray.push({ matchId: m.id, updates: matchUpdates });
        }
      }
    });

    return updatesArray;
  }

  // SI SE ACTUALIZÓ EL BRACKET
  if (updatedMatch.match_type === 'BRACKET') {
    const nextRoundIndex = updatedMatch.round_index + 1;
    const nextMatchIndex = Math.floor(updatedMatch.match_index / 2);
    const isTop = updatedMatch.match_index % 2 === 0;

    // FILTRADO ESTRICTO POR CATEGORÍA: Solo avanza dentro de su propia categoría
    const nextMatch = matchesList.find(m => 
      String(m.category_id) === String(updatedMatch.category_id) && 
      m.match_type === 'BRACKET' && 
      m.round_index === nextRoundIndex && 
      m.match_index === nextMatchIndex
    );
    
    if (!nextMatch) return []; // No hay siguiente partido (ej. Final)

    const effectiveWinner = (updatedMatch.winner && updatedMatch.winner !== 'null') ? updatedMatch.winner : null;
    const currentSlot = isTop ? nextMatch.p1_name : nextMatch.p2_name;

    // Si no hay ganador y el slot del siguiente partido ya estaba vacío, no propagar
    if (!effectiveWinner && !currentSlot) {
      return [];
    }

    // Si el ganador no cambió, no propagar
    if (effectiveWinner === currentSlot) {
      return [];
    }

    let matchUpdates = {};
    if (isTop) {
      matchUpdates.p1_name = effectiveWinner;
    } else {
      matchUpdates.p2_name = effectiveWinner;
    }

    // Auto-BYE
    if (matchUpdates.p1_name && nextMatch.p2_name === 'BYE') matchUpdates.winner = matchUpdates.p1_name;
    if (matchUpdates.p2_name && nextMatch.p1_name === 'BYE') matchUpdates.winner = matchUpdates.p2_name;

    return [{ matchId: nextMatch.id, updates: matchUpdates }];
  }

  return [];
}

/**
 * Algoritmo de Asignación Global de Horarios (Master Scheduler)
 * 
 * Organiza todos los partidos del torneo garantizando:
 * 1. Orden cronológico de las rondas (Zonas -> 16avos -> 8vos, etc.)
 * 2. Horarios comerciales (ej. 09:00 a 22:00).
 * 3. Prioridad por categoría: Las categorías más fuertes (ej. "1ra") juegan en los horarios 
 *    más tardíos (Prime Time) del bloque de turnos.
 */
export function generateGlobalSchedule(allMatches, categories, config) {
  const { daysConfig, matchDurationMin, courts } = config;
  
  // 1. Determinar nivel de categoría. Buscamos el número en el nombre ("1ra" -> 1, "8va" -> 8).
  // Mientras menor sea el número, MÁS fuerte es la categoría y MÁS tarde debe jugar.
  const getCatStrength = (catId) => {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return 99; // Si no tiene, se asume débil
    const match = cat.name.match(/(\d+)/);
    return match ? parseInt(match[1]) : 99;
  };

  // 2. Generar "Pools" de slots disponibles basados en las fases configuradas
  let regularSlots = [];
  let semiSlots = [];
  let finalSlots = [];
  
  if (daysConfig && daysConfig.length > 0) {
    for (let day of daysConfig) {
      let [startH, startM] = day.startTime.split(':').map(Number);
      let [endH, endM] = day.endTime.split(':').map(Number);
      
      let currentSlotTime = startH * 60 + startM;
      const endSlotTime = endH * 60 + endM;
      const duration = Number(matchDurationMin);
      
      while (currentSlotTime + duration <= endSlotTime) {
        for (let court of courts) {
          let h = Math.floor(currentSlotTime / 60);
          let m = currentSlotTime % 60;
          let timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
          
          let slot = {
            date: day.date,
            time: timeStr,
            courtId: court.id,
            datetime: new Date(`${day.date}T${timeStr}:00`)
          };

          if (day.phase === 'semis') semiSlots.push(slot);
          else if (day.phase === 'finals') finalSlots.push(slot);
          else regularSlots.push(slot); // grupos y eliminatorias previas
        }
        currentSlotTime += duration;
      }
    }
  }

  // Ordenar slots globalmente de manera cronológica
  regularSlots.sort((a, b) => a.datetime - b.datetime);
  semiSlots.sort((a, b) => a.datetime - b.datetime);
  finalSlots.sort((a, b) => a.datetime - b.datetime);

  let scheduledMatches = [];
  const matchesToSchedule = allMatches.filter(m => !m.is_bye);
  
  // Función para obtener la última ronda de una categoría
  const getCatMaxRound = (catId) => {
    const catMatches = matchesToSchedule.filter(m => m.category_id === catId);
    if (catMatches.length === 0) return 0;
    return Math.max(...catMatches.map(m => m.round_index || 0));
  };

  // 3. Asignar slots respetando Rondas y Prioridades
  const globalMaxRound = Math.max(...matchesToSchedule.map(m => m.round_index || 0));
  
  for (let r = 0; r <= globalMaxRound; r++) {
    // Filtramos partidos de esta ronda particular (para respetar dependencia deportiva)
    let roundMatches = matchesToSchedule.filter(m => m.round_index === r);
    if (roundMatches.length === 0) continue;

    // EL TRUCO DE PRIORIDAD: Ordenar partidos.
    // Categorías débiles (números grandes, ej. 8) van primero en el array.
    // Categorías fuertes (números chicos, ej. 1) van al final.
    roundMatches.sort((a, b) => {
       return getCatStrength(b.category_id) - getCatStrength(a.category_id);
    });

    for (let i = 0; i < roundMatches.length; i++) {
       let m = roundMatches[i];
       let catMaxRound = getCatMaxRound(m.category_id);
       
       // Determinar qué fase es este partido para esta categoría en particular
       let phase = 'grupos';
       if (m.round_index === catMaxRound && catMaxRound > 0) phase = 'finals';
       else if (m.round_index === catMaxRound - 1 && catMaxRound > 1) phase = 'semis';
       
       // Elegir el pool correspondiente
       let targetPool = phase === 'finals' ? finalSlots : phase === 'semis' ? semiSlots : regularSlots;
       
       // Fallback: si el usuario no configuró bloques específicos para semis o finales,
       // usamos el bloque regular por defecto.
       if (targetPool.length === 0 && phase !== 'grupos') {
         targetPool = regularSlots;
       }
       
       let s = targetPool.shift();
       
       if (s) {
         m.match_date = s.date;
         m.match_time = s.time;
         m.court_id = s.courtId;
       } else {
         // Si nos quedamos sin slots (días/horas insuficientes), quedan sin horario
         m.match_date = null;
         m.match_time = null;
         m.court_id = null;
       }
       
       scheduledMatches.push(m);
    }
  }

  // Devolvemos la lista modificada y los que eran BYE (que no necesitan slot)
  const byeMatches = allMatches.filter(m => m.is_bye);
  return [...scheduledMatches, ...byeMatches];
}


