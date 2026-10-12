export const BRACKET_MAPS = {
  4: [ 'WA', 'LB', 'WB', 'LA' ],
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
  if (numRounds === 2) return ['Semis', 'Final'];
  if (numRounds === 3) return ['Cuartos', 'Semis', 'Final']; 
  if (numRounds === 4) return ['Octavos', 'Cuartos', 'Semis', 'Final']; 
  if (numRounds === 5) return ['16avos', 'Octavos', 'Cuartos', 'Semis', 'Final']; 
  return ['Ronda 1', 'Ronda 2', 'Ronda 3', 'Ronda 4', 'Ronda 5'];
}

export function createEmptyScore() {
  return { p1: ['','',''], p2: ['','',''] };
}

export function generateTournamentMatches(categoryId, numPairs = 14, pairsList = [], isRandom = false) {
  const safeNumPairs = Number(numPairs) || 14;
  let pairs = Array.isArray(pairsList) ? [...pairsList] : [];
  while (pairs.length < safeNumPairs) {
    pairs.push('');
  }
  const numZones = safeNumPairs / 2;

  if (isRandom) {
    // 1. Separar parejas reales de los cupos libres
    const realPairs = pairs.filter(p => p && p !== 'BYE' && String(p).trim() !== '');
    
    // Barajar aleatoriamente las parejas reales
    for (let i = realPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [realPairs[i], realPairs[j]] = [realPairs[j], realPairs[i]];
    }

    // 2. Distribuir equitativamente en las zonas manteniendo los cupos vacantes como null
    let zoneP1 = Array(numZones).fill(null);
    let zoneP2 = Array(numZones).fill(null);
    
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
    const rawP1 = pairs[pairIndex++];
    const rawP2 = pairs[pairIndex++];

    const cleanSlot = (val) => {
      if (!val || String(val).trim() === '') return null;
      if (String(val).trim().toUpperCase() === 'BYE') return 'BYE';
      return String(val).trim();
    };

    const p1 = cleanSlot(rawP1);
    const p2 = cleanSlot(rawP2);

    let autoWinner = null;
    let isComplete = false;
    let isBye = false;
    
    // Solo se autodefine por BYE si explícitamente se configuró como 'BYE'
    if (p1 === 'BYE' && p2 && p2 !== 'BYE') { 
      autoWinner = p2; 
      isComplete = true; 
      isBye = true;
    } else if (p2 === 'BYE' && p1 && p1 !== 'BYE') { 
      autoWinner = p1; 
      isComplete = true; 
      isBye = true;
    } else if (p1 === 'BYE' && p2 === 'BYE') { 
      autoWinner = 'BYE'; 
      isComplete = true; 
      isBye = true;
    }

    generatedMatches.push({
      category_id: categoryId,
      match_type: 'ZONE',
      round_name: 'ZONA ' + (alphabet[i] || `${i + 1}`),
      round_index: 0,
      match_index: i,
      p1_name: p1,
      p2_name: p2,
      winner: autoWinner,
      is_wo: isComplete,
      is_bye: isBye
    });
  }

  // 2. BRACKET (First Round)
  let mapTemplate = BRACKET_MAPS[safeNumPairs] || BRACKET_MAPS[14];
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

export function createDefault14TournamentMatches(categoryId) {
  return generateTournamentMatches(categoryId, 14, Array(14).fill(''), false).generatedMatches;
}

export function determineWinnerFromScores(p1Name, p2Name, p1Score, p2Score) {
  if (!p1Name || !p2Name) return null;
  if (!Array.isArray(p1Score) || !Array.isArray(p2Score)) return null;

  let p1SetsWon = 0;
  let p2SetsWon = 0;
  let setsPlayed = 0;

  for (let i = 0; i < 3; i++) {
    const raw1 = p1Score[i];
    const raw2 = p2Score[i];

    if (raw1 !== undefined && raw1 !== null && String(raw1).trim() !== '' &&
        raw2 !== undefined && raw2 !== null && String(raw2).trim() !== '') {
      const n1 = parseInt(String(raw1).trim(), 10);
      const n2 = parseInt(String(raw2).trim(), 10);

      if (!isNaN(n1) && !isNaN(n2)) {
        setsPlayed++;
        if (n1 > n2) p1SetsWon++;
        else if (n2 > n1) p2SetsWon++;
      }
    }
  }

  if (setsPlayed === 0) return null;

  // Formato estándar al mejor de 3 sets (quien llega a 2 sets gana)
  if (p1SetsWon >= 2) return p1Name;
  if (p2SetsWon >= 2) return p2Name;

  // Formato de 1 set (si solo se cargó 1 set y hay diferencia)
  if (setsPlayed === 1) {
    if (p1SetsWon > p2SetsWon) return p1Name;
    if (p2SetsWon > p1SetsWon) return p2Name;
  }

  // Si se jugaron 2 o 3 sets y uno tiene más sets ganados que el otro
  if (setsPlayed >= 2 && p1SetsWon !== p2SetsWon) {
    return p1SetsWon > p2SetsWon ? p1Name : p2Name;
  }

  return null;
}

export function advanceWinner(matchesList, updatedMatch) {
  if (!updatedMatch || !matchesList) return [];
  let updatesArray = [];

  // Determinar ganador efectivo: por winner explícito, o calculado por puntajes
  let winnerName = (updatedMatch.winner && updatedMatch.winner !== 'null') ? updatedMatch.winner : null;
  if (!winnerName && updatedMatch.p1_name && updatedMatch.p2_name && !updatedMatch.is_wo) {
    winnerName = determineWinnerFromScores(
      updatedMatch.p1_name,
      updatedMatch.p2_name,
      updatedMatch.p1_score,
      updatedMatch.p2_score
    );
  }

  // 1. SI SE ACTUALIZÓ UNA ZONA
  if (updatedMatch.match_type === 'ZONE') {
    const zoneLetter = (updatedMatch.round_name || '').replace(/ZONA\s*/i, '').trim().toUpperCase();
    if (!zoneLetter) return [];

    const winnerCode = `W${zoneLetter}`;
    const loserCode = `L${zoneLetter}`;
    const winnerLabel = `Zona ${zoneLetter} 1º`;
    const loserLabel = `Zona ${zoneLetter} 2º`;

    let loserName = null;
    if (winnerName) {
      if (winnerName === updatedMatch.p1_name) loserName = updatedMatch.p2_name;
      else if (winnerName === updatedMatch.p2_name) loserName = updatedMatch.p1_name;
    }

    // Obtener todos los partidos de zona de esta categoría para calcular número de parejas
    const categoryZoneMatches = matchesList.filter(m => 
      m.match_type === 'ZONE' && String(m.category_id) === String(updatedMatch.category_id)
    );
    const numPairs = categoryZoneMatches.length * 2;
    const mapTemplate = BRACKET_MAPS[numPairs] || [];

    // Partidos de Ronda 1 del Bracket de la misma categoría
    const round1Matches = matchesList.filter(m => 
      m.match_type === 'BRACKET' && 
      m.round_index === 1 && 
      String(m.category_id) === String(updatedMatch.category_id)
    );

    round1Matches.forEach(m => {
      let matchUpdates = {};
      let needsUpdate = false;

      // Código de slot según la plantilla del torneo
      const code1 = mapTemplate[2 * m.match_index];
      const code2 = mapTemplate[2 * m.match_index + 1];

      // Verificar Slot 1 (p1)
      const isSlot1Winner = (code1 && code1 === winnerCode) || m.p1_name === winnerLabel;
      const isSlot1Loser = (code1 && code1 === loserCode) || m.p1_name === loserLabel;

      if (isSlot1Winner) {
        const targetValue = winnerName || winnerLabel;
        if (m.p1_name !== targetValue) {
          matchUpdates.p1_name = targetValue;
          needsUpdate = true;
        }
      } else if (isSlot1Loser) {
        const targetValue = loserName || loserLabel;
        if (m.p1_name !== targetValue) {
          matchUpdates.p1_name = targetValue;
          needsUpdate = true;
        }
      }

      // Verificar Slot 2 (p2)
      const isSlot2Winner = (code2 && code2 === winnerCode) || m.p2_name === winnerLabel;
      const isSlot2Loser = (code2 && code2 === loserCode) || m.p2_name === loserLabel;

      if (isSlot2Winner) {
        const targetValue = winnerName || winnerLabel;
        if (m.p2_name !== targetValue) {
          matchUpdates.p2_name = targetValue;
          needsUpdate = true;
        }
      } else if (isSlot2Loser) {
        const targetValue = loserName || loserLabel;
        if (m.p2_name !== targetValue) {
          matchUpdates.p2_name = targetValue;
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        const newP1 = matchUpdates.p1_name !== undefined ? matchUpdates.p1_name : m.p1_name;
        const newP2 = matchUpdates.p2_name !== undefined ? matchUpdates.p2_name : m.p2_name;

        const isP1Real = newP1 && newP1 !== 'BYE' && !newP1.startsWith('Zona ');
        const isP2Real = newP2 && newP2 !== 'BYE' && !newP2.startsWith('Zona ');

        // Auto-BYE: si un clasificado real enfrenta a un BYE, avanza automáticamente
        if (isP1Real && newP2 === 'BYE') {
          matchUpdates.winner = newP1;
          matchUpdates.is_wo = true;
          matchUpdates.is_bye = true;
        } else if (isP2Real && newP1 === 'BYE') {
          matchUpdates.winner = newP2;
          matchUpdates.is_wo = true;
          matchUpdates.is_bye = true;
        } else {
          // Si el partido tenía un resultado previo y uno de los clasificados cambió o se borró el ganador de la zona:
          if (m.winner || (m.p1_score && m.p1_score.some(s => s))) {
            matchUpdates.winner = null;
            matchUpdates.is_wo = false;
            matchUpdates.p1_score = ['', '', ''];
            matchUpdates.p2_score = ['', '', ''];
          }
        }

        updatesArray.push({ matchId: m.id, updates: matchUpdates });
      }
    });

    return updatesArray;
  }

  // 2. SI SE ACTUALIZÓ UN PARTIDO DEL BRACKET
  if (updatedMatch.match_type === 'BRACKET') {
    const nextRoundIndex = updatedMatch.round_index + 1;
    const nextMatchIndex = Math.floor(updatedMatch.match_index / 2);
    const isTop = updatedMatch.match_index % 2 === 0;

    // Buscar el siguiente partido en la llave dentro de la misma categoría
    const nextMatch = matchesList.find(m => 
      String(m.category_id) === String(updatedMatch.category_id) && 
      m.match_type === 'BRACKET' && 
      m.round_index === nextRoundIndex && 
      m.match_index === nextMatchIndex
    );
    
    if (!nextMatch) return []; // Llegó a la Final

    const currentSlot = isTop ? nextMatch.p1_name : nextMatch.p2_name;

    // Si el ganador no cambió, no propagar
    if (winnerName === currentSlot && !(currentSlot && !winnerName)) {
      return [];
    }

    let matchUpdates = {};
    if (isTop) {
      matchUpdates.p1_name = winnerName;
    } else {
      matchUpdates.p2_name = winnerName;
    }

    const finalP1 = isTop ? winnerName : nextMatch.p1_name;
    const finalP2 = isTop ? nextMatch.p2_name : winnerName;

    // Si se quitó o cambió el participante y el siguiente partido tenía un resultado previo, resetearlo:
    if (nextMatch.winner || (nextMatch.p1_score && nextMatch.p1_score.some(s => s))) {
      matchUpdates.winner = null;
      matchUpdates.is_wo = false;
      matchUpdates.p1_score = ['', '', ''];
      matchUpdates.p2_score = ['', '', ''];
    }

    // Auto-BYE en el siguiente partido
    const isP1Real = finalP1 && finalP1 !== 'BYE' && !finalP1.startsWith('Zona ');
    const isP2Real = finalP2 && finalP2 !== 'BYE' && !finalP2.startsWith('Zona ');

    if (isP1Real && finalP2 === 'BYE') {
      matchUpdates.winner = finalP1;
      matchUpdates.is_wo = true;
      matchUpdates.is_bye = true;
    } else if (isP2Real && finalP1 === 'BYE') {
      matchUpdates.winner = finalP2;
      matchUpdates.is_wo = true;
      matchUpdates.is_bye = true;
    }

    updatesArray.push({ matchId: nextMatch.id, updates: matchUpdates });
    return updatesArray;
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


