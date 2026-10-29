// Aislamiento entre categorías y casos de error: que nada de una categoría aparezca en otra
// y que las cargas incorrectas se rechacen con un mensaje claro.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as L from '../src/lib/tournamentLogic.js';

let seq = 0;
const withIds = (list) => list.map(m => ({ ...m, id: `i${seq++}` }));
const apply = (all, changes) => {
  changes.forEach(({ matchId, updates }) => Object.assign(all.find(m => m.id === matchId), updates));
  return all;
};
const play = (m) => Object.assign(m, { winner: m.p1_name, p1_score: ['6', '6', ''], p2_score: ['1', '1', ''] });
const snapshot = (list) => JSON.stringify(list);

// La misma pareja inscripta en dos categorías (tradicional y americano) y nombres repetidos entre categorías
const shared = 'Juan Perez & Luis Gomez';
const trad = () => withIds(L.generateTournamentMatches('T', 6, [shared, 'A & B', 'C & D', 'E & F', 'G & H', 'BYE'], false).generatedMatches);
const amer = () => withIds(L.generateAmericanoMatches('M', 5, [shared, 'A & B', 'X & Y', 'Z & W', 'K & J'], false).generatedMatches);

test('resolver con partidos mezclados nunca cruza categorías', () => {
  const all = [...trad(), ...amer()];
  all.filter(m => m.category_id === 'T' && m.match_type === 'ZONE' && !m.is_bye).forEach(play);
  all.filter(m => m.category_id === 'M' && m.match_type === 'AMERICANO').forEach(play);
  apply(all, L.resolveCategoryMatches(all));
  const names = (cat) => new Set(all.filter(m => m.category_id === cat).flatMap(m => [m.p1_name, m.p2_name, m.winner]).filter(n => n && n.includes('&')));
  const tNames = names('T');
  const mNames = names('M');
  ['X & Y', 'Z & W', 'K & J'].forEach(n => assert.ok(!tNames.has(n), `${n} no aparece en el tradicional`));
  ['C & D', 'E & F', 'G & H'].forEach(n => assert.ok(!mNames.has(n), `${n} no aparece en el americano`));
});

test('cargar un resultado en una categoría no modifica la otra', () => {
  const t = trad();
  const m = amer();
  const before = snapshot(m);
  play(t.find(x => x.match_type === 'ZONE' && (x.p1_name === shared || x.p2_name === shared)));
  apply([...t, ...m], L.resolveCategoryMatches([...t, ...m]));
  assert.equal(snapshot(m), before);
});

test('pareja de último momento e intercambio de zonas solo tocan su categoría', () => {
  const t = trad();
  const m = amer();
  const all = [...t, ...m];
  const res = L.addLatePair(all.filter(x => x.category_id === 'M'), 'Nueva & Pareja');
  assert.ok(res.inserts.every(x => x.category_id === 'M'));
  assert.ok(res.updates.every(u => m.some(x => x.id === u.matchId)));
  // Aunque se le pasen todos los partidos, solo se usa la categoría del primero
  const mixed = L.addLatePair([...m, ...t], 'Otra & Pareja');
  assert.ok(mixed.inserts.every(x => x.category_id === 'M'));
  assert.ok(mixed.inserts.every(x => ![x.p1_name, x.p2_name].some(n => ['C & D', 'E & F', 'G & H'].includes(n))));

  const zone = t.find(x => x.match_type === 'ZONE');
  const swap = L.swapZonePairs(all, zone.id, 'C & D', zone.p2_name);
  assert.ok(swap.changes.every(c => t.some(x => x.id === c.matchId)));
});

test('renombrar una pareja solo cambia su categoría', () => {
  const all = [...trad(), ...amer()];
  const changes = L.renamePairInMatches(all, 'T', shared, 'Juan Pérez & Luis Gómez');
  assert.ok(changes.length > 0);
  assert.ok(changes.every(c => all.find(m => m.id === c.matchId).category_id === 'T'));
  apply(all, changes);
  assert.ok(all.filter(m => m.category_id === 'M').some(m => m.p1_name === shared || m.p2_name === shared));
});

test('el programador no mezcla rondas de categorías distintas', () => {
  const all = [...trad(), ...amer()];
  const cats = [{ id: 'T', name: '7ma' }, { id: 'M', name: 'Suma 9' }];
  const courts = [{ id: 'c1' }, { id: 'c2' }];
  const { changed, unscheduled } = L.generateGlobalSchedule(all, cats, {
    categoryIds: ['M'], matchDurationMin: 60, restMin: 0, courts,
    daysConfig: [{ date: '2026-10-31', startTime: '10:00', endTime: '00:00', phase: 'todas' }]
  });
  assert.equal(unscheduled, 0);
  assert.ok(changed.every(m => m.category_id === 'M'), 'solo se programa la categoría elegida');
});

test('nombres escritos distinto se consideran la misma pareja', () => {
  assert.equal(L.normalizePairName('  ana&bea  '), 'ana & bea');
  assert.ok(L.samePair('Ana  &  Bea', 'ana & bea'));
  const m = amer();
  assert.ok(L.addLatePair(m, 'juan perez&luis gomez').error, 'no se duplica una pareja escrita distinto');
});

test('marcadores inválidos se rechazan', () => {
  const w = (a, b) => L.winnerFromScore('A', 'B', a, b);
  assert.ok(w(['6', '', ''], ['', '', '']).error, 'set incompleto');
  assert.ok(w(['6', '', ''], ['6', '', '']).error, 'set empatado');
  assert.ok(w(['6', '3', ''], ['3', '6', '']).error, 'empate 1-1 en sets');
  assert.ok(w(['-1', '', ''], ['6', '', '']).error, 'negativo');
  assert.ok(w(['a', '', ''], ['6', '', '']).error, 'no numérico');
  assert.ok(w(['6.5', '', ''], ['3', '', '']).error, 'decimal');
  assert.equal(w(['9', '', ''], ['7', '', '']).winner, 'A', 'pro-set a 9');
  assert.equal(w(['6', '3', '10'], ['3', '6', '8']).winner, 'A', 'super tie-break');
  assert.equal(w(['', '', ''], ['', '', '']).winner, null);
});

test('ediciones inválidas de cruces se bloquean', () => {
  const m = amer();
  const t = trad();
  const match = m.find(x => x.match_type === 'AMERICANO');
  assert.ok(L.checkMatchEdit(match, { p1_name: match.p1_name, p2_name: match.p1_name }, m).errors.length, 'misma pareja');
  const other = m.find(x => x.match_type === 'AMERICANO' && x.id !== match.id && x.p1_name !== match.p1_name);
  assert.ok(L.checkMatchEdit(match, { p1_name: other.p1_name, p2_name: other.p2_name }, m).errors.length, 'cruce repetido');
  const zone = t.find(x => x.match_type === 'ZONE');
  assert.ok(L.checkMatchEdit(zone, { p1_name: 'BYE', p2_name: 'BYE' }, t).errors.length, 'zona sin parejas');
  assert.ok(L.swapZonePairs(t, zone.id, 'BYE', 'BYE').error);
  assert.ok(L.swapZonePairs(t, 'no-existe', 'A & B', 'C & D').error);
});

test('agregar parejas inválidas se rechaza', () => {
  assert.ok(L.addLatePair([], 'A & B').error, 'sin torneo');
  assert.ok(L.addLatePair(amer(), '   ').error, 'sin nombre');
  assert.ok(L.addLatePair(amer(), 'A & B').error, 'ya está');
});

test('choques de horario y cancha se avisan entre categorías', () => {
  const t = trad();
  const m = amer();
  const tm = t.find(x => x.match_type === 'ZONE' && (x.p1_name === shared || x.p2_name === shared));
  Object.assign(tm, { match_date: '2026-10-31', match_time: '18:00', court_id: 'c1' });
  const mm = m.find(x => x.match_type === 'AMERICANO' && (x.p1_name === shared || x.p2_name === shared));
  const { warnings } = L.checkMatchEdit(mm, { match_date: '2026-10-31', match_time: '18:30', court_id: 'c1' }, [...t, ...m]);
  assert.ok(warnings.some(w => w.includes('cancha')));
  assert.ok(warnings.some(w => w.includes('jugador')));
});

test('el cuadro no se traba con resultados borrados, corregidos o W.O.', () => {
  const t = trad();
  const zones = t.filter(x => x.match_type === 'ZONE' && !x.is_bye);
  zones.forEach(play);
  apply(t, L.resolveCategoryMatches(t));
  // W.O. en una zona y luego se borra el resultado
  Object.assign(zones[0], { winner: zones[0].p2_name, is_wo: true });
  apply(t, L.resolveCategoryMatches(t));
  Object.assign(zones[0], { winner: null, is_wo: false, p1_score: ['', '', ''], p2_score: ['', '', ''] });
  apply(t, L.resolveCategoryMatches(t));
  assert.ok(t.every(m => !m.winner || m.winner === 'BYE' || m.winner === m.p1_name || m.winner === m.p2_name));
  assert.ok(t.some(m => m.p1_name === 'Zona A 1º' || m.p2_name === 'Zona A 1º' || m.p1_name === 'Zona A 2º' || m.p2_name === 'Zona A 2º'));
  // Resolver dos veces no cambia nada (estable)
  assert.equal(L.resolveCategoryMatches(t).length, 0);
});
