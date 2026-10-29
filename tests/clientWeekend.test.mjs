// Escenario del cliente: viernes 19-00, sábado 10-00, domingo 10-19 (semis y finales).
// Una categoría americana de 5 parejas y una tradicional de 9, con jugadores compartidos,
// tope de partidos el viernes y una pareja de último momento en cada categoría.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as L from '../src/lib/tournamentLogic.js';

const courts = [{ id: 'c1', name: 'Cancha 1' }, { id: 'c2', name: 'Cancha 2' }, { id: 'c3', name: 'Cancha 3' }];
const categories = [{ id: 'AM', name: 'Suma 9' }, { id: 'TR', name: '7ma' }];
const amPairs = ['A1 & A2', 'A3 & A4', 'A5 & A6', 'A7 & A8', 'Compartido & A9'];
const trPairs = ['T1 & T2', 'T3 & T4', 'T5 & T6', 'T7 & T8', 'T9 & T10', 'T11 & T12', 'T13 & Compartido', 'T14 & T15', 'T16 & T17'];
const FRIDAY_CAP = 6;
const config = {
  categoryIds: ['AM', 'TR'], matchDurationMin: 60, restMin: 0, courts,
  daysConfig: [
    { date: '2026-10-30', startTime: '19:00', endTime: '00:00', phase: 'grupos', maxMatches: FRIDAY_CAP },
    { date: '2026-10-31', startTime: '10:00', endTime: '00:00', phase: 'grupos' },
    { date: '2026-11-01', startTime: '10:00', endTime: '19:00', phase: 'playoffs' }
  ]
};

let seq = 0;
const withIds = (list) => list.map(m => ({ ...m, id: `m${seq++}` }));
const t = (m) => new Date(`${m.match_date}T${m.match_time}:00`).getTime();
const isReal = (m) => !m.is_bye && m.p1_name !== 'BYE' && m.p2_name !== 'BYE';
const merge = (all, changed) => all.map(m => changed.find(c => c.id === m.id) || m);
const apply = (all, changes) => {
  changes.forEach(({ matchId, updates }) => Object.assign(all.find(m => m.id === matchId), updates));
  return all;
};

function build() {
  const am = withIds(L.generateAmericanoMatches('AM', 5, amPairs, false).generatedMatches);
  const padded = [...trPairs, 'BYE'];
  const tr = withIds(L.generateTournamentMatches('TR', 10, padded, false).generatedMatches);
  return [...am, ...tr];
}

function validate(all) {
  const problems = [];
  const sched = all.filter(m => m.match_date && isReal(m));
  const seen = new Set();
  sched.forEach(m => {
    const k = `${m.court_id}|${t(m)}`;
    if (seen.has(k)) problems.push(`cancha doble ${k}`);
    seen.add(k);
  });
  const agenda = {};
  sched.forEach(m => [m.p1_name, m.p2_name].filter(p => p && p.includes('&')).flatMap(p => p.split('&').map(x => x.trim().toLowerCase())).forEach(p => {
    (agenda[p] ??= []).forEach(x => { if (Math.abs(x - t(m)) < 3600000) problems.push(`superposición ${p}`); });
    agenda[p].push(t(m));
  }));
  // Encadenamiento del cuadro y de la Gran Final
  for (const cat of ['AM', 'TR']) {
    const cm = sched.filter(m => m.category_id === cat);
    cm.filter(m => m.match_type === 'BRACKET' || m.match_type === 'AMERICANO_FINAL').forEach(m => {
      const prev = cm.filter(x => (x.round_index || 0) < m.round_index);
      if (prev.some(x => t(x) + 3600000 > t(m))) problems.push(`${m.round_name} antes de terminar la ronda previa`);
    });
  }
  return problems;
}

test('fin de semana viernes-sábado-domingo con tope el viernes', () => {
  const all = build();
  const { changed, unscheduled } = L.generateGlobalSchedule(all, categories, config);
  const sch = merge(all, changed);
  assert.equal(unscheduled, 0);
  assert.deepEqual(validate(sch), []);

  const real = sch.filter(isReal);
  const friday = real.filter(m => m.match_date === '2026-10-30');
  const saturday = real.filter(m => m.match_date === '2026-10-31');
  const sunday = real.filter(m => m.match_date === '2026-11-01');
  assert.ok(friday.length <= FRIDAY_CAP, `viernes ${friday.length}`);
  assert.ok(saturday.length > friday.length, 'el sábado concentra más partidos');
  assert.ok(friday.every(m => m.match_time >= '19:00'));
  assert.ok(sunday.every(m => m.match_time >= '10:00' && m.match_time <= '18:00'));

  // Domingo: solo semifinales y finales (Gran Final del americano incluida)
  const semis = real.filter(m => m.round_name.startsWith('Semis') || m.round_name.startsWith('Final') || m.match_type.startsWith('AMERICANO_'));
  assert.ok(semis.every(m => m.match_date === '2026-11-01'));
  assert.ok(sunday.every(m => semis.includes(m)));
  assert.equal(sunday.length, 6); // semis y final de cada categoría
});

test('cruce de medianoche: cierre 01:00 deja turno a las 00:00 del día siguiente', () => {
  const all = withIds(L.generateAmericanoMatches('AM', 6, [...amPairs, 'X & Y'], false).generatedMatches);
  const { changed } = L.generateGlobalSchedule(all, categories, {
    ...config, categoryIds: ['AM'], courts: [courts[0]],
    daysConfig: [{ date: '2026-10-30', startTime: '19:00', endTime: '01:00', phase: 'todas' }]
  });
  assert.ok(changed.some(m => m.match_date === '2026-10-31' && m.match_time === '00:00'));
});

test('pareja de último momento: americano con descanso y cascada de horarios', () => {
  let all = build();
  all = merge(all, L.generateGlobalSchedule(all, categories, config).changed);
  const amBefore = all.filter(m => m.category_id === 'AM');

  // Se juega la primera fecha antes de que llegue la pareja
  amBefore.filter(m => m.round_index === 0).forEach(m => Object.assign(m, { winner: m.p1_name, p1_score: ['6', '6', ''], p2_score: ['2', '3', ''] }));

  const res = L.addLatePair(amBefore, 'Nueva & Pareja');
  assert.equal(res.error, undefined);
  assert.equal(res.inserts.length, 5);
  assert.equal(res.numPairs, 6);
  // Con 6 parejas alcanzan 5 fechas: la nueva juega contra quien descansaba en cada una
  assert.ok(res.inserts.every(m => m.round_index <= 4));
  // Las 5 fechas alcanzan: semifinales y final siguen detrás (fechas 6 y 7)
  const roundOf = (type) => amBefore.filter(m => m.match_type === type).map(m => res.updates.find(u => u.matchId === m.id)?.updates.round_index ?? m.round_index);
  assert.deepEqual(roundOf('AMERICANO_SEMI'), [5, 5]);
  assert.deepEqual(roundOf('AMERICANO_FINAL'), [6]);

  all = apply(all, res.updates);
  all.push(...withIds(res.inserts));
  const regular = all.filter(m => m.category_id === 'AM' && m.match_type === 'AMERICANO');
  const keys = regular.map(m => [m.p1_name, m.p2_name].sort().join('|'));
  assert.equal(new Set(keys).size, 15); // todos contra todos sin repetir
  for (let r = 0; r <= 4; r++) {
    const names = regular.filter(m => m.round_index === r).flatMap(m => [m.p1_name, m.p2_name]);
    assert.equal(new Set(names).size, names.length, `fecha ${r + 1} sin parejas repetidas`);
  }

  const playedBefore = all.filter(m => m.winner && isReal(m)).map(m => `${m.id}|${m.match_date}|${m.match_time}`);
  const result = L.generateGlobalSchedule(all, categories, { ...config, keepExisting: true });
  all = merge(all, result.changed);
  assert.equal(result.unscheduled, 0);
  assert.deepEqual(validate(all), []);
  // Lo jugado no se mueve y los partidos nuevos tienen horario
  assert.deepEqual(all.filter(m => m.winner && isReal(m)).map(m => `${m.id}|${m.match_date}|${m.match_time}`), playedBefore);
  assert.ok(all.filter(m => m.p2_name === 'Nueva & Pareja').every(m => m.match_date));
  const fin = all.find(m => m.category_id === 'AM' && m.match_type === 'AMERICANO_FINAL');
  assert.equal(fin.match_date, '2026-11-01');
});

test('pareja de último momento: tradicional ocupa el pase libre y el cuadro se actualiza', () => {
  let all = build();
  all = merge(all, L.generateGlobalSchedule(all, categories, config).changed);
  const tr = all.filter(m => m.category_id === 'TR');
  const res = L.addLatePair(tr, 'Ultima & Hora');
  assert.equal(res.error, undefined);
  assert.equal(res.inserts.length, 0);
  all = apply(all, res.updates);
  const zone = all.find(m => m.match_type === 'ZONE' && (m.p1_name === 'Ultima & Hora' || m.p2_name === 'Ultima & Hora'));
  assert.equal(zone.winner, null);
  assert.equal(zone.is_bye, false);
  // El cruce del cuadro que antes era pase libre ahora espera al 2º de esa zona
  const letter = zone.round_name.slice(-1);
  assert.ok(all.some(m => m.match_type === 'BRACKET' && (m.p1_name === `Zona ${letter} 2º` || m.p2_name === `Zona ${letter} 2º`)));

  const result = L.generateGlobalSchedule(all, categories, { ...config, keepExisting: true });
  all = merge(all, result.changed);
  assert.equal(result.unscheduled, 0);
  assert.deepEqual(validate(all), []);
  assert.ok(zone.match_date || all.find(m => m.id === zone.id).match_date, 'la nueva zona tiene horario');
});

test('pareja de último momento: tradicional completo crece al cuadro siguiente', () => {
  const ten = [...trPairs, 'T18 & T19'];
  let all = withIds(L.generateTournamentMatches('TR', 10, ten, false).generatedMatches);
  all = merge(all, L.generateGlobalSchedule(all, categories, { ...config, categoryIds: ['TR'] }).changed);
  // Se juegan dos zonas antes
  all.filter(m => m.match_type === 'ZONE').slice(0, 2).forEach(m => Object.assign(m, { winner: m.p1_name, p1_score: ['6', '6', ''], p2_score: ['1', '1', ''] }));
  apply(all, L.resolveCategoryMatches(all));

  const res = L.addLatePair(all, 'Ultima & Hora');
  assert.equal(res.error, undefined);
  assert.equal(res.numPairs, 12);
  const remaining = all.filter(m => !res.deleteIds.includes(m.id));
  apply(remaining, res.updates);
  let next = [...remaining, ...withIds(res.inserts)];
  assert.equal(next.filter(m => m.match_type === 'ZONE').length, 6);
  // Los resultados de zona se conservan y alimentan el nuevo cuadro
  const zoneA = next.find(m => m.round_name === 'ZONA A');
  assert.equal(zoneA.winner, zoneA.p1_name);
  assert.ok(next.some(m => m.match_type === 'BRACKET' && (m.p1_name === zoneA.p1_name || m.p2_name === zoneA.p1_name)));
  // La nueva pareja pasa directo como 1º de su zona
  const zoneF = next.find(m => m.round_name === 'ZONA F');
  assert.equal(zoneF.winner, 'Ultima & Hora');

  const result = L.generateGlobalSchedule(next, categories, { ...config, categoryIds: ['TR'], keepExisting: true });
  next = merge(next, result.changed);
  assert.equal(result.unscheduled, 0);
  assert.deepEqual(validate(next), []);
});

test('un pareja repetida no se puede agregar', () => {
  const all = build();
  assert.ok(L.addLatePair(all.filter(m => m.category_id === 'AM'), 'a1 & a2').error);
});
