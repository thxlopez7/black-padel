export const POINTS_PER_WIN = 3;

// Semifinales del americano: 1º contra 4º y 2º contra 3º de la tabla
export const AMERICANO_SEMIS = [
  { name: 'Semifinal 1', seeds: [1, 4] },
  { name: 'Semifinal 2', seeds: [2, 3] }
];
const AMERICANO_PLAYOFF = ['AMERICANO_SEMI', 'AMERICANO_FINAL'];

// Nombre de pareja canónico: espacios simples y " & " entre jugadores ("ana&  bea" -> "ana & bea")
export const normalizePairName = (name) =>
  String(name || '').replace(/\s*&\s*/g, ' & ').replace(/\s+/g, ' ').trim();
export const samePair = (a, b) => normalizePairName(a).toLowerCase() === normalizePairName(b).toLowerCase();

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

function getRoundNamesFor(numRounds) {
  if (numRounds === 1) return ['Final'];
  if (numRounds === 2) return ['Semis', 'Final'];
  return getRoundNames(numRounds);
}

// Tamaño del cuadro (potencia de 2) que admite a todas las parejas
export const bracketSizeFor = (count) => {
  let size = 2;
  while (size < count) size *= 2;
  return size;
};

// Orden de cabezas de serie en el cuadro (1 y 2 solo se cruzan en la final): 8 -> [1, 8, 4, 5, 2, 7, 3, 6]
export function seedPositions(size) {
  let order = [1];
  while (order.length < size) {
    const n = order.length * 2;
    order = order.flatMap(s => [s, n + 1 - s]);
  }
  return order;
}
const seedLabel = (n) => `${n}º Clasificado`;

/**
 * Cuadro tradicional con dos partidos de zona:
 * - 1º partido (ZONE): las parejas se enfrentan de a dos. Con cantidad impar, una pareja tiene BYE.
 * - 2º partido (CROSS): ganador de una zona contra perdedor de otra. La pareja que tuvo BYE juega
 *   sí o sí este partido; con cantidad impar sobra un ganador, que tiene BYE en esta ronda.
 * - Cuadro (BRACKET): pasa el ganador de cada 2º partido (una pareja por cruce); quien lo pierde queda
 *   afuera aunque haya ganado el 1º. Se ordenan por partidos ganados (un BYE cuenta como ganado) y,
 *   con los mismos ganados, por sorteo; los primeros reciben los pases directos del cuadro.
 * - options.cross === false: formato anterior (un partido de zona y pasan las dos parejas).
 */
export function generateTournamentMatches(categoryId, numPairs, pairsList, isRandom, options = {}) {
  if (options.cross === false) return generateLegacyMatches(categoryId, numPairs, pairsList, isRandom);
  let pairs = pairsList.filter(p => p && p !== 'BYE');
  if (pairs.length < 4) throw new Error('El formato tradicional necesita al menos 4 parejas.');
  if (isRandom) {
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
  }
  const numZones = Math.ceil(pairs.length / 2);
  const generatedMatches = [];
  for (let i = 0; i < numZones; i++) {
    const p1 = pairs[i * 2];
    const p2 = pairs[i * 2 + 1] ?? 'BYE';
    generatedMatches.push({
      category_id: categoryId, match_type: 'ZONE', round_name: 'ZONA ' + ALPHABET[i], round_index: 0, match_index: i,
      p1_name: p1, p2_name: p2, winner: null, is_wo: false, is_bye: p2 === 'BYE'
    });
  }
  for (let i = 0; i < numZones; i++) {
    generatedMatches.push({
      category_id: categoryId, match_type: 'CROSS', round_name: 'CRUCE ' + (i + 1), round_index: 1, match_index: i,
      p1_name: null, p2_name: null, is_bye: false
    });
  }
  generatedMatches.push(...bracketRows(categoryId, bracketSizeFor(numZones)));
  return { pairs, generatedMatches: resolveGenerated(generatedMatches) };
}

// Filas vacías del cuadro para "size" lugares, desde la ronda 2 (después de zona y cruce)
function bracketRows(categoryId, size) {
  const numRounds = Math.log2(size);
  const names = getRoundNamesFor(numRounds);
  const rows = [];
  for (let r = 0, count = size / 2; count >= 1; r++, count /= 2) {
    for (let i = 0; i < count; i++) {
      rows.push({
        category_id: categoryId, match_type: 'BRACKET', round_name: `${names[r]}${count > 1 ? ' ' + ALPHABET[i] : ''}`,
        round_index: r + 2, match_index: i, p1_name: null, p2_name: null, is_bye: false
      });
    }
  }
  return rows;
}

/**
 * Cruces del 2º partido a partir de las zonas (lista de [p1, p2] en el orden de los partidos CROSS).
 * Primero cada pareja que tuvo BYE contra un perdedor; después ganador de la zona q-1 contra perdedor
 * de la zona q (nunca la misma zona); los ganadores que sobran tienen BYE.
 */
function crossPairings(zones) {
  const label = (z, i, place) => {
    if (!z.winner) return `Zona ${ALPHABET[i]} ${place}º`;
    if (place === 1) return z.winner;
    return z.winner === z.p1_name ? z.p2_name : z.p1_name;
  };
  const real = [], byeWinners = [];
  zones.forEach((z, i) => {
    const hasBye = z.p1_name === 'BYE' || z.p2_name === 'BYE';
    if (!hasBye) real.push({ w: label(z, i, 1), l: label(z, i, 2) });
    else if (z.p1_name !== 'BYE' || z.p2_name !== 'BYE') byeWinners.push(z.p1_name === 'BYE' ? z.p2_name : z.p1_name);
  });
  const m = real.length;
  const pairings = [];
  const usedWinners = new Set();
  byeWinners.forEach((b, j) => pairings.push([b, j < m ? real[j].l : 'BYE']));
  for (let q = byeWinners.length; q < m; q++) {
    const wi = (q - 1 + m) % m;
    usedWinners.add(wi);
    pairings.push([real[wi].w, real[q].l]);
  }
  real.forEach((r, i) => { if (!usedWinners.has(i)) pairings.push([r.w, 'BYE']); });
  return pairings;
}

// Número fijo por pareja para el sorteo de desempate: siempre da lo mismo para la misma pareja y categoría,
// así el cuadro no cambia cada vez que se recalcula
function drawNumber(text) {
  let h = 2166136261;
  for (const ch of text) h = Math.imul(h ^ ch.codePointAt(0), 16777619);
  return h >>> 0;
}

/**
 * Clasificados al cuadro: el ganador de cada 2º partido, ordenados solo por partidos ganados en zona
 * (2 antes que 1; un BYE cuenta como ganado). Entre parejas con los mismos ganados decide un sorteo fijo.
 * Los primeros reciben los pases directos del cuadro.
 */
export function crossQualifiers(zones, crosses) {
  const wins = new Map();
  [...zones, ...crosses].forEach(m => {
    if (m.winner && m.winner !== 'BYE') wins.set(m.winner, (wins.get(m.winner) || 0) + 1);
  });
  const salt = crosses[0]?.category_id || '';
  return [...new Set(crosses.map(c => c.winner).filter(w => w && w !== 'BYE'))]
    .map(name => ({ name, wins: wins.get(name) || 0, draw: drawNumber(`${salt}|${normalizePairName(name).toLowerCase()}`) }))
    .sort((a, b) => b.wins - a.wins || a.draw - b.draw);
}

function generateLegacyMatches(categoryId, numPairs, pairsList, isRandom) {
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

  // Fase final: con 4 o más parejas, semifinales 1º vs 4º y 2º vs 3º y final entre los ganadores;
  // con 3 parejas, final directa 1º vs 2º (puede desactivarse con withFinal: false)
  if (options.withFinal !== false) {
    const playoff = (type, round, name, p1, p2) => generatedMatches.push({
      category_id: categoryId, match_type: type, round_name: name, round_index: round,
      match_index: matchCounter++, p1_name: p1, p2_name: p2, winner: null, is_wo: false, is_bye: false,
      p1_score: ['', '', ''], p2_score: ['', '', '']
    });
    if (pairs.length >= 4) {
      AMERICANO_SEMIS.forEach(({ name, seeds }) => playoff('AMERICANO_SEMI', totalRounds, name, `${seeds[0]}º Tabla Americano`, `${seeds[1]}º Tabla Americano`));
      playoff('AMERICANO_FINAL', totalRounds + 1, 'Final', `Ganador ${AMERICANO_SEMIS[0].name}`, `Ganador ${AMERICANO_SEMIS[1].name}`);
    } else {
      playoff('AMERICANO_FINAL', totalRounds, 'Final', '1º Tabla Americano', '2º Tabla Americano');
    }
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

export const isPlaceholder = (name) => !name || name === 'BYE' || /^Zona [A-Z]+ [12]º$/.test(name) || /^\d+º Clasificado$/.test(name) || name.includes('Tabla Americano') || name.startsWith('Ganador ');

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
 * - Americano: semifinalistas (1º-4º y 2º-3º) al terminar las fechas y finalistas al cerrarse las semis.
 * Si los participantes de un partido cambian, su resultado anterior se invalida.
 * Devuelve la lista de { matchId, updates } con los cambios necesarios.
 */
export function resolveCategoryMatches(catMatches) {
  // Cada categoría se resuelve por separado: nunca se mezclan cruces entre categorías
  const categoryIds = [...new Set(catMatches.map(m => m.category_id))];
  if (categoryIds.length > 1) {
    return categoryIds.flatMap(id => resolveCategoryMatches(catMatches.filter(m => m.category_id === id)));
  }
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
  // Pase libre: si un lado es BYE, avanza el otro (cuando ya se conoce) sin resultado cargado
  const applyBye = (m, p1, p2) => {
    const hasBye = p1 === 'BYE' || p2 === 'BYE';
    if (Boolean(m.is_bye) !== hasBye) setFields(m, { is_bye: hasBye });
    if (!hasBye) return false;
    const other = p1 === 'BYE' ? p2 : p1;
    const winner = other === 'BYE' ? 'BYE' : isPlaceholder(other) ? null : other;
    setFields(m, { ...EMPTY_RESULT, winner });
    return true;
  };
  const assignPair = (m, p1, p2) => {
    // Parejas fijadas a mano por el organizador: la cascada no las reemplaza
    if (m.manual_pairs) [p1, p2] = [m.p1_name, m.p2_name];
    const participantsChanged = m.p1_name !== p1 || m.p2_name !== p2;
    setFields(m, { p1_name: p1, p2_name: p2 });
    if (applyBye(m, p1, p2)) return;
    if (participantsChanged || (m.winner && m.winner !== p1 && m.winner !== p2)) setFields(m, EMPTY_RESULT);
  };

  const all = [...byId.values()];

  // --- Americano: semifinales y final ---
  const finalMatch = all.find(m => m.match_type === 'AMERICANO_FINAL');
  if (finalMatch) {
    const regular = all.filter(m => m.match_type === 'AMERICANO' && !m.is_bye);
    const allPlayed = regular.length > 0 && regular.every(m => m.winner);
    const standings = allPlayed ? calculateAmericanoStandings([...new Set(regular.flatMap(m => [m.p1_name, m.p2_name]))], regular) : [];
    const seed = (pos) => standings[pos - 1]?.name || `${pos}º Tabla Americano`;
    const semis = all.filter(m => m.match_type === 'AMERICANO_SEMI');
    if (semis.length > 0) {
      AMERICANO_SEMIS.forEach(({ name, seeds }) => {
        const semi = semis.find(m => m.round_name === name);
        if (semi) assignPair(semi, seed(seeds[0]), seed(seeds[1]));
      });
      const winnerOf = (name) => semis.find(m => m.round_name === name)?.winner || `Ganador ${name}`;
      assignPair(finalMatch, winnerOf(AMERICANO_SEMIS[0].name), winnerOf(AMERICANO_SEMIS[1].name));
    } else {
      assignPair(finalMatch, seed(1), seed(2));
    }
  }

  // --- Tradicional: Zonas -> Cuadro ---
  const zones = all.filter(m => m.match_type === 'ZONE').sort((a, b) => a.match_index - b.match_index);
  zones.forEach(z => {
    if (!applyBye(z, z.p1_name, z.p2_name) && z.winner && z.winner !== z.p1_name && z.winner !== z.p2_name) setFields(z, EMPTY_RESULT);
  });
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

  const bracket = all.filter(m => m.match_type === 'BRACKET');
  const firstRound = bracket.length > 0 ? Math.min(...bracket.map(m => m.round_index)) : 0;
  const crosses = all.filter(m => m.match_type === 'CROSS').sort((a, b) => a.match_index - b.match_index);
  let firstRoundPair = null;

  if (crosses.length > 0) {
    // --- 2º partido: cruces ganador/perdedor y clasificados al cuadro ---
    crossPairings(zones).forEach(([p1, p2], i) => crosses[i] && assignPair(crosses[i], p1, p2));
    const decided = crosses.every(c => c.winner);
    const seeds = decided ? crossQualifiers(zones, crosses).map(s => s.name) : [];
    const size = bracket.filter(m => m.round_index === firstRound).length * 2;
    const order = seedPositions(size);
    // Antes de terminar los cruces, los lugares muestran "Nº Clasificado"; los que sobran son pases libres
    const maxSeeds = decided ? seeds.length : crosses.length;
    const slot = (pos) => (pos > maxSeeds ? 'BYE' : decided ? seeds[pos - 1] : seedLabel(pos));
    firstRoundPair = (m) => [slot(order[m.match_index * 2]), slot(order[m.match_index * 2 + 1])];
  } else {
    // --- Formato anterior: Zonas -> Cuadro con plantilla fija ---
    const template = BRACKET_MAPS[zones.length * 2];
    if (template) {
      const fromCode = (code) => (code === 'BYE' ? 'BYE' : zoneResult[code]);
      firstRoundPair = (m) => [fromCode(template[m.match_index * 2]), fromCode(template[m.match_index * 2 + 1])];
    }
  }

  // Quién sale de un partido del cuadro. Con dos partidos de zona, mientras no hay ganador:
  // si el rival es BYE, el lugar pasa directo ("1º Clasificado"); si se juega, "Ganador Cuartos B"
  const advancing = (src) => {
    if (!src) return null;
    if (src.winner || crosses.length === 0) return src.winner || null;
    if (src.p2_name === 'BYE' && src.p1_name !== 'BYE') return src.p1_name || null;
    if (src.p1_name === 'BYE' && src.p2_name !== 'BYE') return src.p2_name || null;
    return src.p1_name === 'BYE' ? 'BYE' : `Ganador ${src.round_name}`;
  };

  if (zones.length > 0 && bracket.length > 0 && firstRoundPair) {
    const maxRound = Math.max(...bracket.map(m => m.round_index));
    for (let r = firstRound; r <= maxRound; r++) {
      const roundMatches = bracket.filter(m => m.round_index === r).sort((a, b) => a.match_index - b.match_index);
      const prev = bracket.filter(m => m.round_index === r - 1);
      roundMatches.forEach(m => {
        if (r === firstRound) {
          assignPair(m, ...firstRoundPair(m));
        } else {
          const src1 = prev.find(x => x.match_index === m.match_index * 2);
          const src2 = prev.find(x => x.match_index === m.match_index * 2 + 1);
          assignPair(m, advancing(src1), advancing(src2));
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
  // Todas las filas con las mismas columnas: en una inserción múltiple, las faltantes quedarían en null
  return withIds.map(({ id: _id, ...rest }) => ({ ...EMPTY_RESULT, is_bye: false, ...rest }));
}

const toMinutes = (time) => {
  const [h, m] = String(time).split(':').map(Number);
  return h * 60 + m;
};
const slotStart = (date, time) => new Date(`${date}T${String(time).slice(0, 5)}:00`).getTime();
const pad2 = (n) => String(n).padStart(2, '0');
const nextDate = (date) => {
  const [y, m, d] = date.split('-').map(Number);
  const dt = new Date(y, m - 1, d + 1);
  return `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}`;
};

// Jugadores individuales de una pareja ("Ana & Bea" -> ["ana", "bea"]); los marcadores de posición no cuentan
const playersOf = (pairName) =>
  isPlaceholder(pairName) ? [] : pairName.split('&').map(n => n.trim().toLowerCase()).filter(Boolean);

// Instancias que admite cada tipo de jornada
export const DAY_PHASES = {
  todas: ['grupos', 'semis', 'finals'],
  grupos: ['grupos'],
  playoffs: ['semis', 'finals'],
  semis: ['semis'],
  finals: ['finals']
};

const isSchedulable = (m) => !m.is_bye && m.p1_name !== 'BYE' && m.p2_name !== 'BYE';

/**
 * Nivel de una categoría para ordenar horarios: menor es mejor (juega más tarde).
 * - "Suma 9": la suma de categorías de la pareja (9).
 * - Categoría individual ("7ma", "5ta", "3ra"): se compara como una pareja de esa categoría (7ma → 14),
 *   así queda por debajo de una Suma 11 y por encima de una Suma 15.
 * - Sin número ("Mix Black Padel"): la más baja.
 */
export function categoryLevel(name = '') {
  const suma = name.match(/suma\s*(\d+)/i);
  if (suma) return Number(suma[1]);
  const single = name.match(/(\d+)\s*(ra|da|ta|ma|va|na|a|ª|º|°)\b/i) || name.match(/(\d+)/);
  return single ? Number(single[1]) * 2 : 99;
}

/**
 * Programador de horarios.
 *
 * Asigna fecha, hora y cancha a los partidos de las categorías seleccionadas (config.categoryIds):
 * - No modifica otras categorías y respeta los turnos que ya ocupan.
 * - Los partidos ya jugados conservan su horario.
 * - Un jugador nunca tiene dos partidos superpuestos, aunque esté inscripto en varias categorías,
 *   y entre sus partidos se respeta el descanso mínimo (config.restMin).
 * - Tradicional: cada ronda empieza cuando terminó la anterior (zonas -> cuadro -> final).
 * - Americano: las fechas se ordenan cronológicamente y las semifinales y la final van después de todas.
 * - Las categorías más fuertes (ver categoryLevel) quedan en los horarios más tardíos.
 * - Cada jornada admite ciertas instancias (day.phase, ver DAY_PHASES) y puede tener un tope
 *   de partidos (day.maxMatches) para no cargar de más un día.
 *   Si una instancia no entra en sus jornadas, usa el primer turno libre de otra (summary.outOfPhase).
 * - Un cierre menor o igual al inicio (ej. 19:00 a 00:00) termina al día siguiente.
 * - config.pinnedIds: partidos con horario pedido por el organizador; se respetan y el resto se acomoda
 *   alrededor (las rondas siguientes de su categoría van después).
 * - config.keepExisting: conserva los horarios ya asignados que siguen siendo válidos y solo
 *   mueve lo necesario (partidos nuevos y los que quedan antes de la ronda previa: cascada).
 *
 * Devuelve { matches, changed, unscheduled, summary }.
 */
export function generateGlobalSchedule(allMatches, categories, config) {
  const { daysConfig = [], matchDurationMin, courts = [], categoryIds, restMin = 0, keepExisting = false, pinnedIds = [] } = config;
  const pinned = new Set(pinnedIds);
  const duration = Number(matchDurationMin);
  const durationMs = duration * 60000;
  const restMs = Number(restMin) * 60000;
  const gapMs = durationMs + restMs;
  const selected = new Set(categoryIds || categories.map(c => c.id));
  const courtIndex = (id) => courts.findIndex(c => c.id === id);

  const getCatStrength = (catId) => categoryLevel(categories.find(c => c.id === catId)?.name);

  const hasSchedule = (m) => m.match_date && m.match_time && m.court_id;
  const isFixed = (m) => hasSchedule(m) && (!selected.has(m.category_id) || (m.winner && isSchedulable(m)) || pinned.has(m.id));

  // Turnos de cancha y agenda de cada jugador ya comprometidos (owner = id del partido)
  const taken = [];
  const busy = new Map();
  // Un lugar todavía sin definir ("Ganador Semis A", "1º Tabla Americano") puede terminar ocupándolo cualquier
  // jugador de la categoría: se reservan todos frente a las otras categorías, así nadie que juega en dos queda
  // con partidos a la vez. Dentro de la misma categoría el orden de las rondas ya los separa.
  const categoryPlayers = new Map();
  allMatches.filter(m => m.match_type === 'ZONE' || m.match_type === 'AMERICANO').forEach(m => {
    const set = categoryPlayers.get(m.category_id) || new Set();
    [m.p1_name, m.p2_name].flatMap(playersOf).forEach(p => set.add(p));
    categoryPlayers.set(m.category_id, set);
  });
  const players = (m) => {
    const sides = [m.p1_name, m.p2_name];
    const known = sides.flatMap(playersOf);
    const open = sides.some(n => n !== 'BYE' && isPlaceholder(n));
    const all = open ? [...new Set([...known, ...(categoryPlayers.get(m.category_id) || [])])] : known;
    return all.map(p => ({ p, maybe: !known.includes(p), cat: m.category_id }));
  };
  const claim = (m, courtId, start) => {
    taken.push({ id: m.id, courtId, start });
    players(m).forEach(({ p, maybe, cat }) => busy.set(p, [...(busy.get(p) || []), { id: m.id, start, maybe, cat }]));
  };
  const release = (m) => {
    for (let i = taken.length - 1; i >= 0; i--) if (taken[i].id === m.id) taken.splice(i, 1);
    players(m).forEach(({ p }) => busy.set(p, (busy.get(p) || []).filter(b => b.id !== m.id)));
  };
  const courtFree = (courtId, start) => !taken.some(o => o.courtId === courtId && Math.abs(o.start - start) < durationMs);
  const playersFree = (list, start) => list.every(({ p, maybe, cat }) => (busy.get(p) || []).every(b =>
    Math.abs(b.start - start) >= gapMs || (b.cat === cat && (b.maybe || maybe))));

  // Turnos disponibles por jornada
  const windows = daysConfig.map((day, i) => {
    const from = toMinutes(day.startTime);
    let to = toMinutes(day.endTime);
    if (to <= from) to += 1440;
    return { i, start: slotStart(day.date, day.startTime), end: slotStart(day.date, day.startTime) + (to - from) * 60000, from, to, day };
  });
  const dayOf = (start) => windows.find(w => start >= w.start && start < w.end)?.i ?? -1;
  const dayCount = new Map();
  const countDay = (start, delta) => {
    const i = dayOf(start);
    if (i !== -1) dayCount.set(i, (dayCount.get(i) || 0) + delta);
  };

  const slots = [];
  for (const w of windows) {
    for (let t = w.from; t + duration <= w.to; t += duration) {
      const date = t >= 1440 ? nextDate(w.day.date) : w.day.date;
      const time = `${pad2(Math.floor((t % 1440) / 60))}:${pad2(t % 60)}`;
      for (const court of courts) {
        slots.push({ date, time, courtId: court.id, start: slotStart(date, time), dayIdx: w.i, phases: DAY_PHASES[w.day.phase] || DAY_PHASES.todas });
      }
    }
  }
  slots.sort((a, b) => a.start - b.start || courtIndex(a.courtId) - courtIndex(b.courtId));

  const fixed = allMatches.filter(isFixed);
  fixed.forEach(m => {
    const start = slotStart(m.match_date, m.match_time);
    claim(m, m.court_id, start);
    countDay(start, 1);
  });

  // Un partido que ya tiene resultado pero no horario (se jugó antes de programar) no ocupa turno
  const toSchedule = allMatches
    .filter(m => selected.has(m.category_id) && isSchedulable(m) && !isFixed(m) && !(m.winner && !hasSchedule(m)))
    .map(m => ({ ...m }));

  // Modo cascada: los horarios vigentes quedan reservados mientras se revisan
  if (keepExisting) {
    toSchedule.filter(hasSchedule).forEach(m => {
      const start = slotStart(m.match_date, m.match_time);
      claim(m, m.court_id, start);
      countDay(start, 1);
    });
  }

  const catMaxRound = {};
  allMatches.forEach(m => {
    if (m.match_type === 'BRACKET') catMaxRound[m.category_id] = Math.max(catMaxRound[m.category_id] || 0, m.round_index);
  });
  const getPhase = (m) => {
    if (m.match_type === 'AMERICANO_FINAL') return 'finals';
    if (m.match_type === 'AMERICANO_SEMI') return 'semis';
    if (m.match_type !== 'BRACKET') return 'grupos';
    const max = catMaxRound[m.category_id];
    if (m.round_index === max) return 'finals';
    if (m.round_index === max - 1 && max > 1) return 'semis';
    return 'grupos';
  };
  const phaseHasDays = (phase) => slots.some(s => s.phases.includes(phase));

  // Fin de cada ronda por categoría (incluye partidos ya jugados) para encadenar el cuadro y la final
  const roundEnd = new Map();
  const markRoundEnd = (m, start) => {
    const key = `${m.category_id}::${m.round_index || 0}`;
    roundEnd.set(key, Math.max(roundEnd.get(key) || 0, start + durationMs));
  };
  fixed.filter(m => selected.has(m.category_id)).forEach(m => markRoundEnd(m, slotStart(m.match_date, m.match_time)));
  const earliestStart = (m) => {
    if (m.match_type !== 'BRACKET' && m.match_type !== 'CROSS' && !AMERICANO_PLAYOFF.includes(m.match_type)) return 0;
    let min = 0;
    for (const [key, end] of roundEnd) {
      const [catId, round] = key.split('::');
      if (catId === m.category_id && Number(round) < m.round_index) min = Math.max(min, end + restMs);
    }
    return min;
  };

  // Por instancia (grupos, semis, finales) y, dentro de cada una, de la categoría más baja a la mejor:
  // las mejores categorías ocupan los horarios más tardíos. Dentro de una categoría se respeta el orden de rondas.
  // En una jornada dedicada solo a semis o solo a finales se llena de atrás hacia adelante empezando por la
  // mejor categoría: así la mejor juega el último turno y las demás quedan escalonadas antes.
  const PHASE_ORDER = { grupos: 0, semis: 1, finals: 2 };
  const dedicated = (s, phase) => s.phases.length === 1 && s.phases[0] === phase;
  const latestFirst = (phase) => phase !== 'grupos' && slots.some(s => dedicated(s, phase));
  const strengthOrder = (a, b) => (latestFirst(getPhase(a)) ? 1 : -1) * (getCatStrength(a.category_id) - getCatStrength(b.category_id));
  const ordered = [...toSchedule].sort((a, b) =>
    PHASE_ORDER[getPhase(a)] - PHASE_ORDER[getPhase(b)] ||
    strengthOrder(a, b) ||
    (a.round_index || 0) - (b.round_index || 0) ||
    (a.match_index || 0) - (b.match_index || 0)
  );

  const summary = {};
  const changed = [];
  const phaseHours = {};
  const notePhaseHour = (m, start) => {
    if (!latestFirst(getPhase(m))) return;
    const hours = (phaseHours[getPhase(m)] ??= new Map());
    hours.set(m.category_id, Math.min(hours.get(m.category_id) ?? Infinity, start));
  };
  // Las categorías que no se reprograman también marcan su horario en semis y finales
  fixed.forEach(m => notePhaseHour(m, slotStart(m.match_date, m.match_time)));
  const track = (info, slot) => {
    if (!info.first || slot.start < info.first.start) info.first = slot;
    if (!info.last || slot.start > info.last.start) info.last = slot;
  };
  for (const m of ordered) {
    const info = (summary[m.category_id] ??= { scheduled: 0, unscheduled: 0, moved: 0, outOfPhase: 0, first: null, last: null });
    const minStart = earliestStart(m);
    const list = players(m);
    const before = hasSchedule(m) ? `${m.match_date}|${String(m.match_time).slice(0, 5)}|${m.court_id}` : null;

    if (keepExisting && hasSchedule(m)) {
      const start = slotStart(m.match_date, m.match_time);
      release(m);
      if (start >= minStart && courtFree(m.court_id, start) && playersFree(list, start)) {
        claim(m, m.court_id, start);
        markRoundEnd(m, start);
        notePhaseHour(m, start);
        info.scheduled++;
        track(info, { date: m.match_date, time: String(m.match_time).slice(0, 5), start });
        continue;
      }
      countDay(start, -1);
    }

    const phase = getPhase(m);
    const strictPhase = phaseHasDays(phase);
    const fits = (s, anyPhase) =>
      s.start >= minStart &&
      (anyPhase || !strictPhase || s.phases.includes(phase)) &&
      (!(Number(daysConfig[s.dayIdx].maxMatches) > 0) || (dayCount.get(s.dayIdx) || 0) < Number(daysConfig[s.dayIdx].maxMatches)) &&
      courtFree(s.courtId, s.start) &&
      playersFree(list, s.start);
    // Si en las jornadas de su instancia no hay lugar, se usa el primer turno libre de cualquier jornada
    // Cada categoría toma un horario anterior al de las mejores ya ubicadas en esa instancia
    const strongerAt = Math.min(Infinity, ...[...(phaseHours[phase] || new Map())].filter(([cat]) => cat !== m.category_id).map(([, start]) => start));
    let slot = latestFirst(phase)
      ? [...slots].reverse().find(s => dedicated(s, phase) && s.start < strongerAt && fits(s, false))
      : null;
    if (slot) notePhaseHour(m, slot.start);
    slot ??= slots.find(s => fits(s, false));
    if (!slot && strictPhase) {
      slot = slots.find(s => fits(s, true));
      if (slot) info.outOfPhase++;
    }

    if (!slot) {
      Object.assign(m, { match_date: null, match_time: null, court_id: null });
      info.unscheduled++;
      if (before) changed.push(m);
      continue;
    }
    Object.assign(m, { match_date: slot.date, match_time: slot.time, court_id: slot.courtId });
    claim(m, slot.courtId, slot.start);
    countDay(slot.start, 1);
    markRoundEnd(m, slot.start);
    info.scheduled++;
    if (before) info.moved++;
    track(info, slot);
    if (before !== `${slot.date}|${slot.time}|${slot.courtId}`) changed.push(m);
  }

  const unscheduled = Object.values(summary).reduce((n, i) => n + i.unscheduled, 0);
  // Si conservar los horarios deja partidos afuera, se reprograma la categoría completa cuando eso entra mejor
  if (keepExisting && unscheduled > 0) {
    const full = generateGlobalSchedule(allMatches, categories, { ...config, keepExisting: false });
    if (full.unscheduled < unscheduled) return full;
  }
  return { matches: ordered, changed, unscheduled, summary };
}

/**
 * Incorpora una pareja de último momento a un torneo ya generado, sin rehacer lo jugado.
 * - Americano: se agregan sus cruces contra todas las parejas, usando primero las fechas en las
 *   que una pareja descansa; la fase final se corre detrás.
 * - Tradicional: ocupa una zona con pase libre (BYE). Si no hay, se agrega una zona y el cuadro
 *   se reconstruye al tamaño siguiente conservando zonas y resultados.
 * Devuelve { inserts, updates, deleteIds, numPairs, notes } o { error }.
 */
export function addLatePair(catMatches, pairName) {
  const name = normalizePairName(pairName);
  if (!name) return { error: 'La pareja no tiene nombre.' };
  if (catMatches.length === 0) return { error: 'La categoría todavía no tiene torneo generado.' };
  const categoryId = catMatches[0].category_id;
  catMatches = catMatches.filter(m => m.category_id === categoryId);
  const already = catMatches.some(m => [m.p1_name, m.p2_name].some(p => p && samePair(p, name)));
  if (already) return { error: `${name} ya forma parte del torneo.` };

  const isAmericano = catMatches.some(m => m.match_type === 'AMERICANO');
  return isAmericano ? addToAmericano(catMatches, name, categoryId) : addToTraditional(catMatches, name, categoryId);
}

function addToAmericano(catMatches, name, categoryId) {
  const regular = catMatches.filter(m => m.match_type === 'AMERICANO');
  const playoff = catMatches.filter(m => AMERICANO_PLAYOFF.includes(m.match_type));
  const pairs = [...new Set(regular.flatMap(m => [m.p1_name, m.p2_name]))];
  const rounds = new Map();
  regular.forEach(m => {
    if (!rounds.has(m.round_index)) rounds.set(m.round_index, new Set());
    rounds.get(m.round_index).add(m.p1_name).add(m.p2_name);
  });
  let maxRound = Math.max(...regular.map(m => m.round_index));
  let matchIndex = Math.max(...catMatches.map(m => m.match_index || 0)) + 1;
  const newRoundBusy = new Map();
  const inserts = [];

  // Fechas ordenadas: primero aquellas en las que la pareja rival descansa
  for (const rival of pairs) {
    let round = [...rounds.keys()].sort((a, b) => a - b)
      .find(r => !rounds.get(r).has(rival) && !rounds.get(r).has(name));
    if (round === undefined) {
      round = [...newRoundBusy.keys()].find(r => !newRoundBusy.get(r).has(rival));
      if (round === undefined) {
        round = ++maxRound;
        newRoundBusy.set(round, new Set());
      }
      newRoundBusy.get(round).add(rival);
    } else {
      rounds.get(round).add(rival).add(name);
    }
    inserts.push({
      category_id: categoryId,
      match_type: 'AMERICANO',
      round_name: `Fecha ${round + 1}`,
      round_index: round,
      match_index: matchIndex++,
      p1_name: rival,
      p2_name: name,
      winner: null,
      is_wo: false,
      is_bye: false,
      p1_score: ['', '', ''],
      p2_score: ['', '', '']
    });
  }

  const notes = [`Juega ${inserts.length} partidos nuevos.`];
  // La fase final se corre detrás de las fechas nuevas y vuelve a esperar la tabla completa
  const firstPlayoffRound = Math.min(...playoff.map(m => m.round_index));
  const after = [...catMatches.filter(m => m.match_type === 'AMERICANO'), ...inserts];
  const next = catMatches.map(m => (AMERICANO_PLAYOFF.includes(m.match_type) ? { ...m, round_index: maxRound + 1 + (m.round_index - firstPlayoffRound) } : m));
  const shifted = next.filter(m => AMERICANO_PLAYOFF.includes(m.match_type));
  const cascade = resolveCategoryMatches([...shifted, ...after.map((m, i) => ({ ...m, id: m.id || `new-${i}` }))]);
  const updates = shifted.map(m => {
    const original = catMatches.find(x => x.id === m.id);
    const u = { ...(cascade.find(c => c.matchId === m.id)?.updates || {}) };
    if (m.round_index !== original.round_index) u.round_index = m.round_index;
    return { matchId: m.id, updates: u };
  }).filter(u => Object.keys(u.updates).length > 0);
  if (playoff.some(m => m.winner)) notes.push('Semis y final vuelven a quedar pendientes.');
  return { inserts, updates, deleteIds: [], numPairs: pairs.length + 1, notes };
}

function addToTraditional(catMatches, name, categoryId) {
  const zones = catMatches.filter(m => m.match_type === 'ZONE').sort((a, b) => a.match_index - b.match_index);
  const oldBracket = catMatches.filter(m => m.match_type === 'BRACKET');
  const realPairs = zones.flatMap(z => [z.p1_name, z.p2_name]).filter(p => p && p !== 'BYE').length;

  // 1) Zona con pase libre disponible
  const byeZone = zones.find(z => (z.p1_name === 'BYE') !== (z.p2_name === 'BYE')) || zones.find(z => z.p1_name === 'BYE' && z.p2_name === 'BYE');
  if (byeZone) {
    const zoneUpdate = byeZone.p1_name === 'BYE' && byeZone.p2_name === 'BYE'
      ? { p1_name: name, winner: name, is_bye: true }
      : { [byeZone.p1_name === 'BYE' ? 'p1_name' : 'p2_name']: name, ...EMPTY_RESULT, is_bye: false };
    const next = catMatches.map(m => (m.id === byeZone.id ? { ...m, ...zoneUpdate } : m));
    const cascade = resolveCategoryMatches(next);
    const invalidated = cascade.filter(c => {
      const m = catMatches.find(x => x.id === c.matchId);
      return m.winner && !m.is_bye && m.p1_name !== 'BYE' && m.p2_name !== 'BYE' && 'winner' in c.updates && !c.updates.winner;
    }).length;
    return {
      inserts: [],
      updates: [{ matchId: byeZone.id, updates: zoneUpdate }, ...cascade],
      deleteIds: [],
      numPairs: catMatches.some(m => m.match_type === 'CROSS') ? realPairs + 1 : zones.length * 2,
      notes: [
        `Entra en la ${byeZone.round_name}.`,
        ...(invalidated ? [`Se borran ${invalidated} resultados del cuadro.`] : [])
      ]
    };
  }

  // 2) Cuadro completo: se agrega una zona y se reconstruye el cuadro al tamaño siguiente.
  // Con cruce, las zonas tienen que ser pares y el armado cambia entero: hay que volver a sortear.
  if (catMatches.some(m => m.match_type === 'CROSS')) return addZoneWithCross(catMatches, zones, oldBracket, name, categoryId, realPairs);
  const newSize = zones.length * 2 + 2;
  if (!BRACKET_MAPS[newSize]) return { error: `No existe un cuadro para ${newSize} parejas.` };
  const pairList = [...zones.flatMap(z => [z.p1_name, z.p2_name]), name, 'BYE'];
  const fresh = generateTournamentMatches(categoryId, newSize, pairList, false, { cross: false }).generatedMatches;
  const newZone = fresh.find(m => m.match_type === 'ZONE' && m.match_index === zones.length);
  const newBracket = fresh.filter(m => m.match_type === 'BRACKET').map((m, i) => ({ ...m, id: `new-${i}`, match_date: null, match_time: null, court_id: null }));

  // Se conservan los resultados del cuadro anterior cuando el cruce no cambia
  const working = [...zones, { ...newZone, id: 'new-zone' }, ...newBracket];
  let carried = 0;
  for (let pass = 0; pass < 8; pass++) {
    resolveCategoryMatches(working).forEach(({ matchId, updates }) => Object.assign(working.find(m => m.id === matchId), updates));
    let progress = false;
    working.filter(m => m.match_type === 'BRACKET' && !m.winner && !isPlaceholder(m.p1_name) && !isPlaceholder(m.p2_name)).forEach(m => {
      const old = oldBracket.find(o => o.winner && [o.p1_name, o.p2_name].sort().join('|') === [m.p1_name, m.p2_name].sort().join('|'));
      if (!old) return;
      const swap = old.p1_name !== m.p1_name;
      Object.assign(m, {
        winner: old.winner,
        is_wo: old.is_wo,
        p1_score: swap ? old.p2_score : old.p1_score,
        p2_score: swap ? old.p1_score : old.p2_score,
        match_date: old.match_date, match_time: old.match_time, court_id: old.court_id
      });
      carried++;
      progress = true;
    });
    if (!progress) break;
  }
  const lost = oldBracket.filter(o => o.winner && !o.is_bye && o.p1_name !== 'BYE' && o.p2_name !== 'BYE').length - carried;
  const zoneUpdates = resolveCategoryMatches(zones);
  const strip = ({ id: _id, ...rest }) => rest;
  return {
    inserts: working.filter(m => String(m.id).startsWith('new')).map(strip),
    updates: zoneUpdates,
    deleteIds: oldBracket.map(m => m.id),
    numPairs: newSize,
    notes: [
      `Nueva ${newZone.round_name}. El cuadro pasa a ${realPairs + 1} parejas.`,
      ...(lost > 0 ? [`Se borran ${lost} resultados del cuadro.`] : [])
    ]
  };
}

// Formato con cruce y cantidad par: la pareja nueva entra en una zona nueva con BYE (y su cruce).
// Si el cuadro queda chico se rehace al tamaño siguiente, siempre que todavía no tenga resultados.
function addZoneWithCross(catMatches, zones, oldBracket, name, categoryId, realPairs) {
  const crosses = catMatches.filter(m => m.match_type === 'CROSS');
  const size = oldBracket.filter(m => m.round_index === Math.min(...oldBracket.map(b => b.round_index))).length * 2;
  const newSize = bracketSizeFor(zones.length + 1);
  const rebuild = newSize > size;
  if (rebuild && oldBracket.some(m => m.winner && !m.is_bye)) {
    return { error: 'El cuadro ya tiene resultados y no tiene lugar para otra pareja.' };
  }
  const i = zones.length;
  const inserts = [
    { category_id: categoryId, match_type: 'ZONE', round_name: 'ZONA ' + ALPHABET[i], round_index: 0, match_index: i, p1_name: name, p2_name: 'BYE', is_bye: true },
    { category_id: categoryId, match_type: 'CROSS', round_name: 'CRUCE ' + (crosses.length + 1), round_index: 1, match_index: crosses.length, p1_name: null, p2_name: null, is_bye: false },
    ...(rebuild ? bracketRows(categoryId, newSize) : [])
  ].map((m, k) => ({ ...EMPTY_RESULT, ...m, id: `new-${k}` }));
  const working = [...catMatches.filter(m => !(rebuild && m.match_type === 'BRACKET')).map(m => ({ ...m })), ...inserts];
  const changes = resolveCategoryMatches(working);
  changes.forEach(({ matchId, updates }) => Object.assign(working.find(m => m.id === matchId), updates));
  const strip = ({ id: _id, ...rest }) => rest;
  const invalidated = changes.filter(c => {
    const m = catMatches.find(x => x.id === c.matchId);
    return m?.winner && !m.is_bye && 'winner' in c.updates && !c.updates.winner;
  }).length;
  return {
    inserts: working.filter(m => String(m.id).startsWith('new-')).map(strip),
    updates: changes.filter(c => !String(c.matchId).startsWith('new-')),
    deleteIds: rebuild ? oldBracket.map(m => m.id) : [],
    numPairs: realPairs + 1,
    notes: [
      `Nueva ZONA ${ALPHABET[i]} (con BYE).`,
      ...(rebuild ? [`El cuadro pasa a ${newSize} lugares.`] : []),
      ...(invalidated ? [`Se borran ${invalidated} resultados de cruces.`] : [])
    ]
  };
}

/**
 * Cambio de parejas en una zona del cuadro tradicional. Si una pareja elegida estaba en otra zona,
 * ocupa su lugar la pareja desplazada (intercambio), así nadie queda duplicado ni afuera.
 * Una pareja que sale de la zona a cambio de un pase libre pasa al pase libre de otra zona.
 * Devuelve { changes: [{ matchId, updates }] } o { error }.
 */
export function swapZonePairs(catMatches, zoneId, p1, p2) {
  const categoryId = catMatches.find(m => m.id === zoneId)?.category_id;
  const zones = catMatches.filter(m => m.match_type === 'ZONE' && m.category_id === categoryId).map(m => ({ ...m }));
  const target = zones.find(z => z.id === zoneId);
  if (!target) return { error: 'La zona no existe.' };
  if (p1 === p2) return { error: p1 === 'BYE' ? 'La zona necesita al menos una pareja.' : 'Una pareja no puede jugar contra sí misma.' };
  const displaced = [target.p1_name, target.p2_name].filter(n => n !== p1 && n !== p2);
  const incoming = [p1, p2].filter(n => n !== target.p1_name && n !== target.p2_name);
  const changes = new Map();
  const pending = displaced.filter(n => n && n !== 'BYE');
  incoming.forEach(name => {
    if (name === 'BYE') return;
    const source = zones.find(z => z.id !== zoneId && (z.p1_name === name || z.p2_name === name));
    if (!source) return;
    const key = source.p1_name === name ? 'p1_name' : 'p2_name';
    source[key] = pending.shift() ?? 'BYE';
    changes.set(source.id, source);
  });
  for (const name of pending) {
    const free = zones.find(z => z.id !== zoneId && (z.p1_name === 'BYE' || z.p2_name === 'BYE'));
    if (!free) return { error: `No hay otra zona con pase libre para ubicar a ${name}.` };
    free[free.p1_name === 'BYE' ? 'p1_name' : 'p2_name'] = name;
    changes.set(free.id, free);
  }
  Object.assign(target, { p1_name: p1, p2_name: p2 });
  changes.set(target.id, target);
  return { changes: [...changes.values()].map(z => ({
    matchId: z.id,
    updates: { p1_name: z.p1_name, p2_name: z.p2_name, ...EMPTY_RESULT, is_bye: z.p1_name === 'BYE' || z.p2_name === 'BYE' }
  })) };
}

/**
 * Renombra una pareja dentro de una sola categoría (cruces y ganadores). Devuelve [{ matchId, updates }].
 */
export function renamePairInMatches(catMatches, categoryId, oldName, newName) {
  return catMatches
    .filter(m => m.category_id === categoryId && [m.p1_name, m.p2_name, m.winner].some(n => n && samePair(n, oldName)))
    .map(m => {
      const swap = (n) => (n && samePair(n, oldName) ? newName : n);
      return { matchId: m.id, updates: { p1_name: swap(m.p1_name), p2_name: swap(m.p2_name), winner: swap(m.winner) } };
    });
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

  if (next.p1_name && next.p1_name === next.p2_name) {
    errors.push(next.p1_name === 'BYE' ? 'La zona necesita al menos una pareja.' : 'Una pareja no puede jugar contra sí misma.');
  }

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
