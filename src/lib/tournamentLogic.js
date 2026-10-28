export const POINTS_PER_WIN = 3;

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

function getRoundNames(numRounds) {
  if (numRounds === 3) return ['Cuartos', 'Semis', 'Final']; 
  if (numRounds === 4) return ['Octavos', 'Cuartos', 'Semis', 'Final']; 
  if (numRounds === 5) return ['16avos', 'Octavos', 'Cuartos', 'Semis', 'Final']; 
  return ['Ronda 1', 'Ronda 2', 'Ronda 3', 'Ronda 4', 'Ronda 5'];
}

export function generateTournamentMatches(categoryId, numPairs, pairsList, isRandom) {
  if (!BRACKET_MAPS[numPairs]) {
    throw new Error(`No existe un cuadro definido para ${numPairs} parejas.`);
  }
  let pairs = [...pairsList];

  if (isRandom) {
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
  }

  let generatedMatches = [];
  
  // 1. ZONAS
  let pairIndex = 0;
  const numZones = numPairs / 2;

  for(let i=0; i < numZones; i++) {
    let p1 = pairs[pairIndex++];
    let p2 = pairs[pairIndex++];
    let autoWinner = null;
    if (p1 === 'BYE' && p2 !== 'BYE') autoWinner = p2;
    else if (p2 === 'BYE' && p1 !== 'BYE') autoWinner = p1;
    else if (p1 === 'BYE' && p2 === 'BYE') autoWinner = 'BYE';

    generatedMatches.push({
      category_id: categoryId,
      match_type: 'ZONE',
      round_name: 'ZONA ' + ALPHABET[i],
      round_index: 0,
      match_index: i,
      p1_name: p1,
      p2_name: p2,
      winner: autoWinner,
      is_wo: false,
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

  return { pairs, generatedMatches: resolveGenerated(generatedMatches) };
}

/**
 * Generador de Fixture para Torneo Americano (Todos vs Todos / Round Robin)
 * Ideal para pocas parejas (3, 4, 5, 6, 7, 8, etc.).
 * Utiliza el algoritmo Circle/Berger garantizando que todas las parejas
 * jueguen entre sí distribuidas equitativamente en Fechas.
 */
export function generateAmericanoMatches(categoryId, numPairs, pairsList, isRandom, options = {}) {
  let pairs = [...pairsList].filter(p => p && p.trim() !== '' && p !== 'BYE');

  if (isRandom) {
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
  }

  // Si la cantidad de parejas es impar, agregamos un 'BYE' virtual para descanso por fecha
  let pool = [...pairs];
  if (pool.length % 2 !== 0) {
    pool.push('BYE');
  }

  const n = pool.length;
  const totalRounds = n - 1;
  const matchesPerRound = n / 2;
  const generatedMatches = [];
  let matchCounter = 0;

  let current = [...pool];

  for (let r = 0; r < totalRounds; r++) {
    for (let m = 0; m < matchesPerRound; m++) {
      const p1 = current[m];
      const p2 = current[n - 1 - m];

      // Si uno es BYE, la otra pareja descansa en esta fecha (no se genera partido innecesario)
      if (p1 === 'BYE' || p2 === 'BYE') {
        continue;
      }

      generatedMatches.push({
        category_id: categoryId,
        match_type: 'AMERICANO',
        round_name: `Fecha ${r + 1}`,
        round_index: r,
        match_index: matchCounter++,
        p1_name: p1,
        p2_name: p2,
        winner: null,
        is_wo: false,
        is_bye: false,
        p1_score: ['', '', ''],
        p2_score: ['', '', '']
      });
    }

    // Rotación Circle/Berger: fijar el primer elemento, rotar los restantes
    const fixed = current[0];
    const rest = current.slice(1);
    const last = rest.pop();
    current = [fixed, last, ...rest];
  }

  // Si se solicita Gran Final entre 1º y 2º de la tabla
  // La Gran Final entre el 1º y el 2º forma parte del formato (puede desactivarse con withFinal: false)
  if (options.withFinal !== false) {
    generatedMatches.push({
      category_id: categoryId,
      match_type: 'AMERICANO_FINAL',
      round_name: 'Gran Final (1º vs 2º)',
      round_index: totalRounds,
      match_index: matchCounter++,
      p1_name: '1º Tabla Americano',
      p2_name: '2º Tabla Americano',
      winner: null,
      is_wo: false,
      is_bye: false,
      p1_score: ['', '', ''],
      p2_score: ['', '', '']
    });
  }

  return { pairs, generatedMatches };
}

/**
 * Calcula la Tabla de Posiciones en vivo para una categoría de Torneo Americano.
 * Suma partidos jugados, ganados, perdidos, games a favor, en contra, diferencia y puntos.
 * Criterios de desempate:
 * 1. Puntos totales (PTS)
 * 2. Diferencia de Games/Puntos (DIF)
 * 3. Games a favor (GF)
 * 4. Enfrentamiento directo entre parejas empatadas
 */
export function calculateAmericanoStandings(pairsList, matches) {
  const standingsMap = {};

  [...pairsList].sort().forEach(p => {
    if (!p || p === 'BYE' || p.includes('Tabla Americano')) return;
    standingsMap[p] = {
      name: p,
      pj: 0,
      pg: 0,
      pp: 0,
      sf: 0,
      sc: 0,
      gf: 0,
      gc: 0,
      diff: 0,
      pts: 0
    };
  });

  const catMatches = matches.filter(m => m.match_type === 'AMERICANO' && !m.is_bye);

  catMatches.forEach(m => {
    const p1 = m.p1_name;
    const p2 = m.p2_name;
    if (!p1 || !p2 || !standingsMap[p1] || !standingsMap[p2]) return;

    // Solo cuentan los partidos finalizados (con ganador)
    if (m.winner !== p1 && m.winner !== p2) return;
    const loser = m.winner === p1 ? p2 : p1;

    standingsMap[p1].pj += 1;
    standingsMap[p2].pj += 1;
    standingsMap[m.winner].pg += 1;
    standingsMap[m.winner].pts += POINTS_PER_WIN;
    standingsMap[loser].pp += 1;

    // W.O.: se computa como 6-0 6-0 para el ganador
    if (m.is_wo) {
      standingsMap[m.winner].gf += 12;
      standingsMap[m.winner].sf += 2;
      standingsMap[loser].gc += 12;
      standingsMap[loser].sc += 2;
      return;
    }

    // Sumar games y sets
    const s1 = m.p1_score || ['', '', ''];
    const s2 = m.p2_score || ['', '', ''];

    for (let i = 0; i < 3; i++) {
      const g1 = parseInt(s1[i]);
      const g2 = parseInt(s2[i]);
      if (!isNaN(g1) || !isNaN(g2)) {
        const val1 = isNaN(g1) ? 0 : g1;
        const val2 = isNaN(g2) ? 0 : g2;
        standingsMap[p1].gf += val1;
        standingsMap[p1].gc += val2;
        standingsMap[p2].gf += val2;
        standingsMap[p2].gc += val1;

        if (val1 > val2) {
          standingsMap[p1].sf += 1;
          standingsMap[p2].sc += 1;
        } else if (val2 > val1) {
          standingsMap[p2].sf += 1;
          standingsMap[p1].sc += 1;
        }
      }
    }

  });

  const list = Object.values(standingsMap).map(item => ({
    ...item,
    setDiff: item.sf - item.sc,
    diff: item.gf - item.gc
  }));

  const headToHead = (a, b) => {
    const direct = catMatches.find(m =>
      (m.p1_name === a.name && m.p2_name === b.name) || (m.p1_name === b.name && m.p2_name === a.name)
    );
    if (direct?.winner === a.name) return -1;
    if (direct?.winner === b.name) return 1;
    return 0;
  };

  // Criterios habituales de reglamento: puntos, resultado entre sí (empate entre dos parejas),
  // diferencia de sets, diferencia de games y games a favor.
  list.sort((a, b) => b.pts - a.pts);
  const sorted = [];
  for (let i = 0; i < list.length;) {
    let j = i;
    while (j < list.length && list[j].pts === list[i].pts) j++;
    const group = list.slice(i, j);
    group.sort((a, b) =>
      (group.length === 2 ? headToHead(a, b) : 0) ||
      b.setDiff - a.setDiff ||
      b.diff - a.diff ||
      b.gf - a.gf ||
      (group.length > 2 ? headToHead(a, b) : 0) ||
      a.name.localeCompare(b.name)
    );
    sorted.push(...group);
    i = j;
  }
  list.splice(0, list.length, ...sorted);

  return list.map((item, index) => ({
    ...item,
    rank: index + 1
  }));
}

const isPlaceholder = (name) => !name || name === 'BYE' || /^Zona [A-Z]+ [12]º$/.test(name) || name.includes('Tabla Americano');

/**
 * Determina el ganador de un partido a partir del marcador por sets.
 * Devuelve { winner, error }. Sin sets cargados devuelve winner null y sin error.
 */
export function winnerFromScore(p1Name, p2Name, p1Score, p2Score) {
  let sets1 = 0, sets2 = 0, played = 0;
  for (let i = 0; i < 3; i++) {
    const raw1 = p1Score?.[i], raw2 = p2Score?.[i];
    const empty1 = raw1 === '' || raw1 === null || raw1 === undefined;
    const empty2 = raw2 === '' || raw2 === null || raw2 === undefined;
    if (empty1 && empty2) continue;
    if (empty1 || empty2) return { winner: null, error: `Falta completar el set ${i + 1}.` };
    const g1 = Number(raw1), g2 = Number(raw2);
    if (!Number.isInteger(g1) || !Number.isInteger(g2) || g1 < 0 || g2 < 0) {
      return { winner: null, error: `El set ${i + 1} tiene un valor inválido.` };
    }
    if (g1 === g2) return { winner: null, error: `El set ${i + 1} no puede terminar empatado.` };
    played++;
    if (g1 > g2) sets1++; else sets2++;
  }
  if (played === 0) return { winner: null, error: null };
  // Se admite cualquier formato (1 set, pro-set o 2 de 3): gana quien suma más sets
  if (sets1 === sets2) return { winner: null, error: 'El marcador está empatado en sets: falta el set definitorio.' };
  return { winner: sets1 > sets2 ? p1Name : p2Name, error: null };
}

const EMPTY_RESULT = { winner: null, is_wo: false, p1_score: ['', '', ''], p2_score: ['', '', ''] };

/**
 * Recalcula de forma determinística los cruces derivados de una categoría:
 * - Tradicional: nombres del cuadro a partir de las zonas y rondas previas, BYE automáticos.
 * - Americano: finalistas de la Gran Final una vez disputada toda la fase de grupos.
 * Si los participantes de un partido cambian, su resultado anterior se invalida.
 * Devuelve la lista de { matchId, updates } con los cambios necesarios.
 */
export function resolveCategoryMatches(catMatches) {
  const byId = new Map(catMatches.map(m => [m.id, { ...m }]));
  const updates = new Map();
  const setFields = (m, fields) => {
    const changed = {};
    for (const [k, v] of Object.entries(fields)) {
      if (JSON.stringify(m[k] ?? null) !== JSON.stringify(v ?? null)) changed[k] = v;
    }
    if (Object.keys(changed).length === 0) return;
    Object.assign(m, changed);
    updates.set(m.id, { ...(updates.get(m.id) || {}), ...changed });
  };
  const assignPair = (m, p1, p2) => {
    const participantsChanged = m.p1_name !== p1 || m.p2_name !== p2;
    setFields(m, { p1_name: p1, p2_name: p2 });
    let winner = m.winner;
    if (p1 === 'BYE' && p2 === 'BYE') winner = 'BYE';
    else if (p2 === 'BYE' && !isPlaceholder(p1)) winner = p1;
    else if (p1 === 'BYE' && !isPlaceholder(p2)) winner = p2;
    else if (participantsChanged || (winner && winner !== p1 && winner !== p2)) {
      setFields(m, EMPTY_RESULT);
      return;
    }
    if (winner !== m.winner) setFields(m, { winner });
  };

  const all = [...byId.values()];

  // --- Americano: Gran Final ---
  const finalMatch = all.find(m => m.match_type === 'AMERICANO_FINAL');
  if (finalMatch) {
    const regular = all.filter(m => m.match_type === 'AMERICANO' && !m.is_bye);
    const allPlayed = regular.length > 0 && regular.every(m => m.winner);
    let p1 = '1º Tabla Americano', p2 = '2º Tabla Americano';
    if (allPlayed) {
      const names = [...new Set(regular.flatMap(m => [m.p1_name, m.p2_name]))];
      const standings = calculateAmericanoStandings(names, regular);
      if (standings.length >= 2) { p1 = standings[0].name; p2 = standings[1].name; }
    }
    assignPair(finalMatch, p1, p2);
  }

  // --- Tradicional: Zonas -> Cuadro ---
  const zones = all.filter(m => m.match_type === 'ZONE').sort((a, b) => a.match_index - b.match_index);
  const bracket = all.filter(m => m.match_type === 'BRACKET');
  const template = BRACKET_MAPS[zones.length * 2];
  if (zones.length > 0 && bracket.length > 0 && template) {
    const zoneResult = {};
    zones.forEach((z, i) => {
      const letter = ALPHABET[i];
      if (z.winner) {
        const loser = z.winner === z.p1_name ? z.p2_name : z.p1_name;
        zoneResult[`W${letter}`] = z.winner;
        zoneResult[`L${letter}`] = z.winner === 'BYE' ? 'BYE' : loser;
      } else {
        zoneResult[`W${letter}`] = `Zona ${letter} 1º`;
        zoneResult[`L${letter}`] = `Zona ${letter} 2º`;
      }
    });
    const fromCode = (code) => (code === 'BYE' ? 'BYE' : zoneResult[code]);

    const maxRound = Math.max(...bracket.map(m => m.round_index));
    for (let r = 1; r <= maxRound; r++) {
      const roundMatches = bracket.filter(m => m.round_index === r).sort((a, b) => a.match_index - b.match_index);
      const prev = bracket.filter(m => m.round_index === r - 1);
      roundMatches.forEach(m => {
        if (r === 1) {
          assignPair(m, fromCode(template[m.match_index * 2]), fromCode(template[m.match_index * 2 + 1]));
        } else {
          const src1 = prev.find(x => x.match_index === m.match_index * 2);
          const src2 = prev.find(x => x.match_index === m.match_index * 2 + 1);
          assignPair(m, src1?.winner || null, src2?.winner || null);
        }
      });
    }
  }

  return [...updates.entries()].map(([matchId, u]) => ({ matchId, updates: u }));
}

/**
 * Aplica resolveCategoryMatches sobre partidos recién generados (aún sin id en la base).
 */
function resolveGenerated(matches) {
  const withIds = matches.map((m, i) => ({ ...m, id: `tmp-${i}` }));
  const changes = resolveCategoryMatches(withIds);
  changes.forEach(({ matchId, updates }) => Object.assign(withIds.find(m => m.id === matchId), updates));
  return withIds.map(({ id: _id, ...rest }) => rest);
}

const toMinutes = (time) => {
  const [h, m] = String(time).split(':').map(Number);
  return h * 60 + m;
};
const slotStart = (date, time) => new Date(`${date}T${String(time).slice(0, 5)}:00`).getTime();

// Jugadores individuales de una pareja ("Ana & Bea" -> ["ana", "bea"]); los marcadores de posición no cuentan
const playersOf = (pairName) =>
  isPlaceholder(pairName) ? [] : pairName.split('&').map(n => n.trim().toLowerCase()).filter(Boolean);

/**
 * Programador de horarios.
 *
 * Asigna fecha, hora y cancha a los partidos de las categorías seleccionadas (config.categoryIds):
 * - No modifica otras categorías y respeta los turnos que ya ocupan.
 * - Los partidos ya jugados conservan su horario.
 * - Un jugador nunca tiene dos partidos superpuestos, aunque esté inscripto en varias categorías,
 *   y entre sus partidos se respeta el descanso mínimo (config.restMin).
 * - Tradicional: cada ronda empieza cuando terminó la anterior (zonas -> cuadro -> final).
 * - Americano: las fechas se ordenan cronológicamente y la Gran Final va después de todas.
 * - Las categorías más fuertes (número menor en el nombre) quedan en los horarios más tardíos.
 * - Los días marcados como "semis" o "finales" se reservan para esas instancias.
 *
 * Devuelve { matches, unscheduled, summary } con los partidos reprogramados de esas categorías.
 */
export function generateGlobalSchedule(allMatches, categories, config) {
  const { daysConfig = [], matchDurationMin, courts = [], categoryIds, restMin = 0 } = config;
  const duration = Number(matchDurationMin);
  const durationMs = duration * 60000;
  const gapMs = durationMs + Number(restMin) * 60000;
  const selected = new Set(categoryIds || categories.map(c => c.id));

  const getCatStrength = (catId) => {
    const num = categories.find(c => c.id === catId)?.name.match(/(\d+)/);
    return num ? parseInt(num[1]) : 99;
  };

  const hasSchedule = (m) => m.match_date && m.match_time && m.court_id;
  const isFixed = (m) => hasSchedule(m) && (!selected.has(m.category_id) || (m.winner && !m.is_bye));

  // Turnos de cancha y agenda de cada jugador ya comprometidos
  const fixed = allMatches.filter(isFixed);
  const occupied = fixed.map(m => ({ courtId: m.court_id, start: slotStart(m.match_date, m.match_time) }));
  const busy = new Map();
  const addBusy = (m, start) => [m.p1_name, m.p2_name].flatMap(playersOf).forEach(p => busy.set(p, [...(busy.get(p) || []), start]));
  fixed.forEach(m => addBusy(m, slotStart(m.match_date, m.match_time)));
  const isPlayerFree = (players, start) => players.every(p => (busy.get(p) || []).every(t => Math.abs(t - start) >= gapMs));

  const pools = { grupos: [], semis: [], finals: [] };
  for (const day of daysConfig) {
    for (let t = toMinutes(day.startTime); t + duration <= toMinutes(day.endTime); t += duration) {
      const time = `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
      for (const court of courts) {
        const start = slotStart(day.date, time);
        if (occupied.some(o => o.courtId === court.id && Math.abs(o.start - start) < durationMs)) continue;
        (pools[day.phase] || pools.grupos).push({ date: day.date, time, courtId: court.id, start });
      }
    }
  }
  Object.values(pools).forEach(pool => pool.sort((a, b) => a.start - b.start));

  const toSchedule = allMatches
    .filter(m => selected.has(m.category_id) && !m.is_bye && !isFixed(m))
    .map(m => ({ ...m }));

  const catMaxRound = {};
  allMatches.forEach(m => {
    if (m.match_type === 'BRACKET') catMaxRound[m.category_id] = Math.max(catMaxRound[m.category_id] || 0, m.round_index);
  });
  const getPhase = (m) => {
    if (m.match_type === 'AMERICANO_FINAL') return 'finals';
    if (m.match_type !== 'BRACKET') return 'grupos';
    const max = catMaxRound[m.category_id];
    if (m.round_index === max) return 'finals';
    if (m.round_index === max - 1 && max > 1) return 'semis';
    return 'grupos';
  };

  // Fin de cada ronda por categoría (incluye partidos ya jugados) para encadenar el cuadro y la final
  const roundEnd = new Map();
  const markRoundEnd = (m, start) => {
    const key = `${m.category_id}::${m.round_index || 0}`;
    roundEnd.set(key, Math.max(roundEnd.get(key) || 0, start + durationMs));
  };
  fixed.filter(m => selected.has(m.category_id)).forEach(m => markRoundEnd(m, slotStart(m.match_date, m.match_time)));
  const earliestStart = (m) => {
    if (m.match_type !== 'BRACKET' && m.match_type !== 'AMERICANO_FINAL') return 0;
    let min = 0;
    for (const [key, end] of roundEnd) {
      const [catId, round] = key.split('::');
      if (catId === m.category_id && Number(round) < m.round_index) min = Math.max(min, end);
    }
    return min;
  };

  const ordered = [...toSchedule].sort((a, b) =>
    (a.round_index || 0) - (b.round_index || 0) ||
    getCatStrength(b.category_id) - getCatStrength(a.category_id) ||
    (a.match_index || 0) - (b.match_index || 0)
  );

  const summary = {};
  for (const m of ordered) {
    const info = (summary[m.category_id] ??= { scheduled: 0, unscheduled: 0, first: null, last: null });
    const phase = getPhase(m);
    const pool = pools[phase].length > 0 ? pools[phase] : pools.grupos;
    const minStart = earliestStart(m);
    const players = [m.p1_name, m.p2_name].flatMap(playersOf);
    const idx = pool.findIndex(s => s.start >= minStart && isPlayerFree(players, s.start));

    if (idx === -1) {
      Object.assign(m, { match_date: null, match_time: null, court_id: null });
      info.unscheduled++;
      continue;
    }
    const [slot] = pool.splice(idx, 1);
    Object.assign(m, { match_date: slot.date, match_time: slot.time, court_id: slot.courtId });
    addBusy(m, slot.start);
    markRoundEnd(m, slot.start);
    info.scheduled++;
    if (!info.first || slot.start < info.first.start) info.first = slot;
    if (!info.last || slot.start > info.last.start) info.last = slot;
  }

  const unscheduled = Object.values(summary).reduce((n, i) => n + i.unscheduled, 0);
  return { matches: ordered, unscheduled, summary };
}

/**
 * Revisa un cambio manual de cruce u horario antes de guardarlo.
 * - errors: impiden guardar (misma pareja de ambos lados, cruce repetido en el americano).
 * - warnings: se pueden confirmar (pareja que ya juega en esa fecha, cancha ocupada,
 *   jugador con otro partido a la misma hora en cualquier categoría).
 */
export function checkMatchEdit(match, edit, allMatches, durationMin = 60) {
  const next = { ...match, ...edit };
  const errors = [];
  const warnings = [];
  const others = allMatches.filter(m => m.id !== match.id && !m.is_bye);

  if (next.p1_name && next.p1_name === next.p2_name) errors.push('Una pareja no puede jugar contra sí misma.');

  if (next.match_type === 'AMERICANO' && next.p1_name && next.p2_name) {
    const key = [next.p1_name, next.p2_name].sort().join('|');
    const sameCategory = others.filter(m => m.category_id === next.category_id && m.match_type === 'AMERICANO');
    if (sameCategory.some(m => [m.p1_name, m.p2_name].sort().join('|') === key)) {
      errors.push('Ese cruce ya existe en el fixture de la categoría.');
    }
    const sameRound = sameCategory.filter(m => m.round_index === next.round_index);
    [next.p1_name, next.p2_name].forEach(p => {
      if (sameRound.some(m => m.p1_name === p || m.p2_name === p)) warnings.push(`${p} ya juega otro partido en ${next.round_name}.`);
    });
  }

  if (next.match_date && next.match_time) {
    const start = slotStart(next.match_date, next.match_time);
    const overlaps = (m) => m.match_date && m.match_time && Math.abs(slotStart(m.match_date, m.match_time) - start) < durationMin * 60000;
    if (next.court_id && others.some(m => m.court_id === next.court_id && overlaps(m))) {
      warnings.push('La cancha ya tiene otro partido en ese horario.');
    }
    const players = [next.p1_name, next.p2_name].flatMap(playersOf);
    const clash = others.find(m => overlaps(m) && [m.p1_name, m.p2_name].flatMap(playersOf).some(p => players.includes(p)));
    if (clash) warnings.push(`Un jugador ya tiene otro partido a esa hora (${clash.round_name}: ${clash.p1_name} contra ${clash.p2_name}).`);
  }

  return { errors, warnings };
}
