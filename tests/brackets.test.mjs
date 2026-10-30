// Cuadros tradicionales y americano: propagación, pases libres, correcciones e intercambio de zonas.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as L from '../src/lib/tournamentLogic.js';

let seq = 0;
const withIds = (list) => list.map(m => ({ ...m, id: `b${seq++}` }));
const apply = (all, changes) => {
  changes.forEach(({ matchId, updates }) => Object.assign(all.find(m => m.id === matchId), updates));
  return all;
};
const resolve = (all) => apply(all, L.resolveCategoryMatches(all));
const real = (n) => n && n !== 'BYE' && !/^Zona /.test(n);
const play = (m, winnerSide = 1) => Object.assign(m, {
  winner: winnerSide === 1 ? m.p1_name : m.p2_name,
  p1_score: winnerSide === 1 ? ['6', '6', ''] : ['2', '3', ''],
  p2_score: winnerSide === 1 ? ['2', '3', ''] : ['6', '6', '']
});
const build = (count) => {
  const size = count % 2 ? count + 1 : count;
  const pairs = [...Array.from({ length: count }, (_, i) => `P${i + 1} & Q${i + 1}`), ...(count % 2 ? ['BYE'] : [])];
  return withIds(L.generateTournamentMatches('C', size, pairs, false, { cross: false }).generatedMatches);
};

// Juega todo el torneo ronda por ronda y verifica que haya un campeón real
function playAll(all) {
  const maxRound = Math.max(...all.map(m => m.round_index));
  for (let r = 0; r <= maxRound; r++) {
    all.filter(m => m.round_index === r && !m.winner && real(m.p1_name) && real(m.p2_name)).forEach(m => play(m, (m.match_index % 2) + 1));
    resolve(all);
  }
  return all;
}

for (const count of [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16]) {
  test(`tradicional con ${count} parejas: todos llegan al cuadro y hay un campeón`, () => {
    const all = playAll(build(count));
    const final = all.find(m => m.match_type === 'BRACKET' && m.round_index === Math.max(...all.map(x => x.round_index)));
    assert.ok(real(final.winner), `campeón: ${final.winner}`);
    // Ningún partido queda trabado: todo partido con dos parejas reales tiene ganador
    assert.ok(all.every(m => !(real(m.p1_name) && real(m.p2_name)) || m.winner));
    // Cada pareja aparece en el primer cuadro (como 1º o 2º de su zona) exactamente una vez
    const firstRound = all.filter(m => m.match_type === 'BRACKET' && m.round_index === 1).flatMap(m => [m.p1_name, m.p2_name]).filter(real);
    assert.equal(new Set(firstRound).size, firstRound.length);
    assert.equal(firstRound.length, count);
    // Los partidos con pase libre están marcados y sin marcador
    all.filter(m => m.p1_name === 'BYE' || m.p2_name === 'BYE').forEach(m => {
      assert.equal(m.is_bye, true);
      assert.deepEqual(m.p1_score, ['', '', '']);
    });
  });
}

test('corregir una zona propaga el cambio y anula lo que dependía de ella', () => {
  const all = playAll(build(8));
  const zoneA = all.find(m => m.round_name === 'ZONA A');
  const oldWinner = zoneA.winner;
  const newWinner = zoneA.winner === zoneA.p1_name ? zoneA.p2_name : zoneA.p1_name;
  Object.assign(zoneA, { winner: newWinner });
  resolve(all);
  const first = all.find(m => m.round_index === 1 && (m.p1_name === newWinner || m.p2_name === newWinner) && m.match_index === 0);
  assert.ok(first, 'el nuevo 1º ocupa el lugar del 1º de la zona A');
  // Ningún partido conserva un ganador que ya no juega ese partido
  assert.ok(all.every(m => !m.winner || m.winner === 'BYE' || m.winner === m.p1_name || m.winner === m.p2_name));
  // La final queda pendiente si dependía del resultado anterior
  assert.ok(!all.some(m => m.round_index > 1 && m.winner === oldWinner && m.p1_name !== oldWinner && m.p2_name !== oldWinner));
});

test('borrar un resultado deja los cruces siguientes como pendientes', () => {
  const all = playAll(build(6));
  const zoneB = all.find(m => m.round_name === 'ZONA B');
  Object.assign(zoneB, { winner: null, p1_score: ['', '', ''], p2_score: ['', '', ''] });
  resolve(all);
  assert.ok(all.some(m => m.p1_name === 'Zona B 1º' || m.p2_name === 'Zona B 1º'));
  const final = all.find(m => m.round_name === 'Final A');
  assert.ok(!real(final.p1_name) || !real(final.p2_name) || !final.winner || final.winner === final.p1_name || final.winner === final.p2_name);
});

test('pase libre en zona: el 2º de esa zona es BYE y su rival avanza solo cuando se conoce', () => {
  const all = resolve(build(9));
  const byeZone = all.find(m => m.match_type === 'ZONE' && (m.p1_name === 'BYE' || m.p2_name === 'BYE'));
  assert.equal(byeZone.is_bye, true);
  assert.ok(real(byeZone.winner));
  const letter = byeZone.round_name.slice(-1);
  const pending = all.find(m => m.round_index === 1 && [m.p1_name, m.p2_name].includes('BYE') && [m.p1_name, m.p2_name].some(n => /^Zona [A-Z] [12]º$/.test(n)));
  assert.ok(pending, 'hay un cruce con pase libre esperando a una zona');
  assert.ok(!pending.winner);
  assert.ok(!all.some(m => m.p1_name === `Zona ${letter} 2º` || m.p2_name === `Zona ${letter} 2º`), 'el 2º de la zona con BYE no aparece como pendiente');
});

test('intercambio de parejas entre zonas y ubicación en pase libre', () => {
  const all = resolve(build(9));
  const zoneA = all.find(m => m.round_name === 'ZONA A');
  const zoneC = all.find(m => m.round_name === 'ZONA C');
  const incoming = zoneC.p1_name;
  const { changes } = L.swapZonePairs(all, zoneA.id, incoming, zoneA.p2_name);
  const outgoing = zoneA.p1_name;
  apply(all, changes);
  resolve(all);
  assert.equal(zoneA.p1_name, incoming);
  assert.equal(zoneC.p1_name, outgoing);
  const names = all.filter(m => m.match_type === 'ZONE').flatMap(m => [m.p1_name, m.p2_name]).filter(real);
  assert.equal(new Set(names).size, 9);

  // Poner un pase libre en una zona manda a esa pareja al pase libre de otra zona
  const byeZone = all.find(m => m.match_type === 'ZONE' && (m.p1_name === 'BYE' || m.p2_name === 'BYE'));
  const removed = zoneA.p2_name;
  const res = L.swapZonePairs(all, zoneA.id, zoneA.p1_name, 'BYE');
  apply(all, res.changes);
  resolve(all);
  assert.ok([byeZone.p1_name, byeZone.p2_name].includes(removed));
  assert.equal(zoneA.is_bye, true);
  assert.equal(zoneA.winner, zoneA.p1_name);
  assert.equal(byeZone.is_bye, false);
  assert.equal(byeZone.winner, null);
});

test('sin otra zona con pase libre no se puede dejar una pareja afuera', () => {
  const all = resolve(build(8));
  const zoneA = all.find(m => m.round_name === 'ZONA A');
  assert.ok(L.swapZonePairs(all, zoneA.id, zoneA.p1_name, 'BYE').error);
});

test('americano: semifinales, final, correcciones y W.O.', () => {
  const pairs = ['A & 1', 'B & 2', 'C & 3', 'D & 4', 'E & 5'];
  const all = withIds(L.generateAmericanoMatches('M', 5, pairs, false).generatedMatches);
  const regular = all.filter(m => m.match_type === 'AMERICANO');
  assert.equal(regular.length, 10);
  // Todos contra todos, una vez, y nadie juega dos veces la misma fecha
  assert.equal(new Set(regular.map(m => [m.p1_name, m.p2_name].sort().join('|'))).size, 10);
  for (const r of new Set(regular.map(m => m.round_index))) {
    const names = regular.filter(m => m.round_index === r).flatMap(m => [m.p1_name, m.p2_name]);
    assert.equal(new Set(names).size, names.length);
  }
  // Con fechas pendientes las semis no se arman
  regular.slice(0, 9).forEach(m => play(m));
  resolve(all);
  assert.equal(all.find(m => m.round_name === 'Semifinal').p1_name, '2º Tabla Americano');
  // Último partido por W.O.
  Object.assign(regular[9], { winner: regular[9].p2_name, is_wo: true });
  resolve(all);
  const st = L.calculateAmericanoStandings(pairs, regular);
  const s1 = all.find(m => m.round_name === 'Semifinal');
  const final = all.find(m => m.match_type === 'AMERICANO_FINAL');
  assert.deepEqual([s1.p1_name, s1.p2_name], [st[1].name, st[2].name]);
  assert.equal(final.p1_name, st[0].name, 'el 1º va directo a la final');
  assert.ok(![s1, final].some(m => [m.p1_name, m.p2_name].includes(st[3].name)), 'el 4º queda eliminado');
  play(s1, 2);
  resolve(all);
  assert.deepEqual([final.p1_name, final.p2_name], [st[0].name, s1.p2_name]);
  play(final);
  resolve(all);
  // Corregir una fecha que cambia la tabla rehace semis y anula la final
  const before = [final.p1_name, s1.p1_name, s1.p2_name].join('|');
  regular.filter(m => m.p1_name === st[0].name || m.p2_name === st[0].name).forEach(m => Object.assign(m, { winner: m.p1_name === st[0].name ? m.p2_name : m.p1_name, is_wo: true }));
  resolve(all);
  const after = [final.p1_name, s1.p1_name, s1.p2_name].join('|');
  assert.notEqual(after, before);
  assert.equal(final.winner, null);
});
