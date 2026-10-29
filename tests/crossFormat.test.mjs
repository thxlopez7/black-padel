// Formato tradicional con dos partidos de zona: 1º de a dos, 2º ganador contra perdedor de otra zona, y después el cuadro.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as L from '../src/lib/tournamentLogic.js';

let seq = 0;
const withIds = (list) => list.map(m => ({ ...m, id: `x${seq++}` }));
const apply = (all, changes) => {
  changes.forEach(({ matchId, updates }) => Object.assign(all.find(m => m.id === matchId), updates));
  return all;
};
const resolve = (all) => apply(all, L.resolveCategoryMatches(all));
const real = (n) => n && !L.isPlaceholder(n);
const play = (m, winnerSide = 1) => Object.assign(m, {
  winner: winnerSide === 1 ? m.p1_name : m.p2_name,
  p1_score: winnerSide === 1 ? ['6', '6', ''] : ['2', '3', ''],
  p2_score: winnerSide === 1 ? ['2', '3', ''] : ['6', '6', '']
});
const names = (count) => Array.from({ length: count }, (_, i) => `P${i + 1} & Q${i + 1}`);
const build = (count, isRandom = false) => withIds(L.generateTournamentMatches('C', count, names(count), isRandom).generatedMatches);
const playedBy = (list, pair) => list.filter(m => !m.is_bye && m.winner && real(m.p1_name) && real(m.p2_name) && [m.p1_name, m.p2_name].includes(pair));
const of = (all, type) => all.filter(m => m.match_type === type).sort((a, b) => a.round_index - b.round_index || a.match_index - b.match_index);

function playAll(all, pick = (m) => (m.match_index % 2) + 1) {
  const maxRound = Math.max(...all.map(m => m.round_index));
  for (let r = 0; r <= maxRound; r++) {
    resolve(all);
    all.filter(m => m.round_index === r && !m.winner && real(m.p1_name) && real(m.p2_name)).forEach(m => play(m, pick(m)));
    resolve(all);
  }
  return all;
}

test('7ma con 9 parejas: un BYE en la zona, un BYE en el 2º partido y recién después el cuadro', () => {
  const all = build(9);
  const zones = of(all, 'ZONE');
  const crosses = of(all, 'CROSS');
  assert.equal(zones.length, 5);
  assert.equal(zones.filter(z => z.is_bye).length, 1, 'un único BYE en el 1º partido');
  assert.equal(crosses.length, 5);
  // Pasan 5 (un ganador por cada 2º partido): cuadro de cuartos que empieza después del 2º partido
  const bracket = of(all, 'BRACKET');
  assert.equal(bracket.filter(m => m.round_index === 2).length, 4);
  assert.equal(bracket[0].round_name, 'Cuartos A');
  assert.deepEqual(bracket.filter(m => m.round_index === 2).map(m => [m.p1_name, m.p2_name]),
    [['1º Clasificado', 'BYE'], ['4º Clasificado', '5º Clasificado'], ['2º Clasificado', 'BYE'], ['3º Clasificado', 'BYE']]);
  // Los lugares avanzan en cascada hasta la final
  assert.deepEqual([bracket[4].p1_name, bracket[4].p2_name], ['1º Clasificado', 'Ganador Cuartos B']);
  assert.deepEqual([bracket[5].p1_name, bracket[5].p2_name], ['2º Clasificado', '3º Clasificado']);
  assert.deepEqual([bracket[6].p1_name, bracket[6].p2_name], ['Ganador Semis A', 'Ganador Semis B']);
  assert.equal(bracket.at(-1).round_name, 'Final');

  zones.filter(z => !z.is_bye).forEach(z => play(z, 1));
  resolve(all);
  const byePair = zones.find(z => z.is_bye).p1_name;
  // La pareja que tuvo BYE juega el 2º partido contra un perdedor
  const own = crosses.find(c => c.p1_name === byePair);
  assert.ok(own && real(own.p2_name) && !own.is_bye);
  // Exactamente un BYE en el 2º partido, para un ganador de zona
  const crossByes = crosses.filter(c => c.is_bye);
  assert.equal(crossByes.length, 1);
  assert.ok(zones.some(z => !z.is_bye && z.winner === crossByes[0].p1_name));
  // Nadie repite rival de zona
  crosses.filter(c => !c.is_bye).forEach(c => {
    assert.ok(!zones.some(z => [z.p1_name, z.p2_name].includes(c.p1_name) && [z.p1_name, z.p2_name].includes(c.p2_name)));
  });
  // Ganar la zona no lleva al cuadro: primero hay que jugar el 2º partido
  assert.ok(of(all, 'BRACKET').every(m => !real(m.p1_name) && !real(m.p2_name)));
});

for (const count of [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 20, 25, 32]) {
  for (const [label, pick] of [['ganan los p1', () => 1], ['ganan los p2', () => 2], ['alternado', (m) => (m.match_index % 2) + 1]]) {
    test(`${count} parejas (${label}): dos partidos de zona, pasa el ganador del 2º, campeón`, () => {
      const all = playAll(build(count, true), pick);
      const group = [...of(all, 'ZONE'), ...of(all, 'CROSS')];
      // BYEs: uno en cada ronda si la cantidad es impar, ninguno si es par
      const byes = count % 2;
      assert.equal(of(all, 'ZONE').filter(m => m.is_bye).length, byes);
      assert.equal(of(all, 'CROSS').filter(m => m.is_bye).length, byes);
      const inBracket = new Set(of(all, 'BRACKET').flatMap(m => [m.p1_name, m.p2_name]).filter(real));
      let single = 0;
      for (const p of names(count)) {
        const n = playedBy(group, p).length;
        assert.ok(n === 2 || n === 1, `${p} jugó ${n}`);
        if (n === 1) single++;
        const wonCross = of(all, 'CROSS').some(c => c.winner === p);
        assert.equal(inBracket.has(p), wonCross, `${p} ${wonCross ? 'ganó' : 'perdió'} el 2º partido`);
      }
      assert.equal(single, byes * 2, 'con impar, solo las dos parejas con BYE juegan un partido');
      assert.equal(inBracket.size, Math.ceil(count / 2), 'pasa una pareja por cada 2º partido');
      assert.ok(all.every(m => !(real(m.p1_name) && real(m.p2_name)) || m.winner), 'nada trabado');
      assert.ok(all.every(m => !m.winner || m.winner === 'BYE' || m.winner === m.p1_name || m.winner === m.p2_name));
      const final = of(all, 'BRACKET').at(-1);
      assert.ok(real(final.winner), `campeón: ${final.winner}`);
    });
  }
}

test('clasificados: ganó el 1º y perdió el 2º queda afuera; los 2-0 primero y con los pases libres', () => {
  const all = resolve(build(10));
  of(all, 'ZONE').forEach(z => play(z, 1));
  resolve(all);
  const crosses = of(all, 'CROSS');
  play(crosses[0], 1); play(crosses[1], 1); play(crosses[2], 2); play(crosses[3], 2); play(crosses[4], 2);
  resolve(all);
  const q = L.crossQualifiers(of(all, 'ZONE'), crosses);
  assert.equal(q.length, 5, 'una por cada 2º partido');
  assert.ok(!q.some(s => s.name === crosses[2].p1_name), 'ganó el 1º y perdió el 2º: afuera');
  assert.deepEqual(q.slice(0, 2).map(s => s.wins), [2, 2]);
  const first = of(all, 'BRACKET').filter(m => m.round_index === 2);
  const seed1 = first.find(m => m.p1_name === q[0].name);
  assert.equal(seed1.p2_name, 'BYE');
  assert.ok(seed1.is_bye && seed1.winner === q[0].name);
});

test('corregir una zona rehace los cruces y vuelve a dejar el cuadro pendiente', () => {
  const all = playAll(build(9), () => 1);
  const zone = of(all, 'ZONE').find(z => !z.is_bye);
  const old = zone.winner;
  play(zone, 2);
  resolve(all);
  assert.ok(!of(all, 'CROSS').some(c => c.winner === old && ![c.p1_name, c.p2_name].includes(old)));
  assert.ok(of(all, 'BRACKET').some(m => /Clasificado/.test(m.p1_name) || /Clasificado/.test(m.p2_name)), 'el cuadro vuelve a esperar');
});

test('horarios: el 2º partido va después de la zona y el cuadro después del 2º', () => {
  const all = resolve(build(9));
  const day = (date) => ({ date, startTime: '09:00', endTime: '23:59', phase: 'todas' });
  const res = L.generateGlobalSchedule(all, [{ id: 'C', name: '7ma' }], {
    daysConfig: [day('2026-11-06'), day('2026-11-07'), day('2026-11-08')], matchDurationMin: 60,
    courts: [{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }], categoryIds: ['C']
  });
  assert.equal(res.unscheduled, 0);
  const t = (m) => new Date(`${m.match_date}T${m.match_time}:00`).getTime();
  const end = (list) => Math.max(...list.map(t)) + 3600000;
  const zones = res.matches.filter(m => m.match_type === 'ZONE');
  const crosses = res.matches.filter(m => m.match_type === 'CROSS');
  assert.ok(crosses.length > 0 && crosses.every(m => t(m) >= end(zones)));
  const bracket = res.matches.filter(m => m.match_type === 'BRACKET');
  const first = Math.min(...bracket.map(m => m.round_index));
  assert.ok(bracket.filter(m => m.round_index === first).every(m => t(m) >= end(crosses)));
});

test('pareja tardía: con impar ocupa el BYE; con par abre una zona nueva y agranda el cuadro si hace falta', () => {
  let all = resolve(build(9));
  let res = L.addLatePair(all, 'Nueva & Pareja');
  assert.ok(!res.error, res.error);
  apply(all, res.updates);
  resolve(all);
  assert.equal(of(all, 'ZONE').filter(z => z.is_bye).length, 0);
  assert.equal(of(all, 'CROSS').filter(c => c.p1_name === 'BYE' || c.p2_name === 'BYE').length, 0);

  all = resolve(build(8));
  res = L.addLatePair(all, 'Otra & Mas');
  assert.ok(!res.error, res.error);
  all = all.filter(m => !res.deleteIds.includes(m.id));
  res.updates.forEach(({ matchId, updates }) => Object.assign(all.find(m => m.id === matchId), updates));
  all.push(...withIds(res.inserts));
  resolve(all);
  assert.equal(of(all, 'ZONE').length, 5);
  assert.equal(of(all, 'CROSS').length, 5);
  assert.equal(of(all, 'BRACKET').filter(m => m.round_index === 2).length, 4, 'con 5 cruces el cuadro pasa de semis a cuartos');
  playAll(all);
  assert.ok(real(of(all, 'BRACKET').at(-1).winner));
});

test('orden de clasificados: solo partidos ganados y, con empate, un sorteo que siempre da lo mismo', () => {
  const all = resolve(build(9));
  of(all, 'ZONE').filter(z => !z.is_bye).forEach(z => play(z, 1));
  resolve(all);
  // Los ganadores de zona ganan el 2º por poco y los perdedores de zona ganan por mucho: igual van detrás
  of(all, 'CROSS').filter(c => !c.is_bye).forEach((c, i) => {
    if (i % 2) Object.assign(c, { winner: c.p2_name, p1_score: ['0', '0', ''], p2_score: ['6', '6', ''] });
    else Object.assign(c, { winner: c.p1_name, p1_score: ['7', '7', ''], p2_score: ['6', '6', ''] });
  });
  resolve(all);
  const q = L.crossQualifiers(of(all, 'ZONE'), of(all, 'CROSS'));
  const wins = q.map(s => s.wins);
  assert.deepEqual(wins, [...wins].sort((a, b) => b - a), 'nadie con menos ganados queda arriba de uno con más');
  // El sorteo no cambia al recalcular ni con otro orden de partidos
  assert.deepEqual(L.crossQualifiers([...of(all, 'ZONE')].reverse(), [...of(all, 'CROSS')].reverse()).map(s => s.name), q.map(s => s.name));
  // Los 3 primeros pasan directo a semis; 4º y 5º juegan cuartos
  const cuartos = of(all, 'BRACKET').filter(m => m.round_index === 2 && !m.is_bye);
  assert.equal(cuartos.length, 1);
  assert.deepEqual([cuartos[0].p1_name, cuartos[0].p2_name], [q[3].name, q[4].name]);
});

test('edición manual: una pareja fijada a mano en el cuadro no la pisa la cascada y su ganador sigue avanzando', () => {
  const all = playAll(build(9), () => 1);
  const semi = of(all, 'BRACKET').find(m => m.round_name === 'Semis A');
  const lost = of(all, 'CROSS').find(c => !c.is_bye);
  const outsider = lost.winner === lost.p1_name ? lost.p2_name : lost.p1_name; // eliminada en el 2º partido
  Object.assign(semi, { p2_name: outsider, manual_pairs: true, winner: null, p1_score: ['', '', ''], p2_score: ['', '', ''] });
  resolve(all);
  assert.equal(semi.p2_name, outsider, 'se mantiene lo elegido a mano');
  // Un resultado anterior que cambia no lo reemplaza
  const cuartos = of(all, 'BRACKET').find(m => m.round_index === 2 && !m.is_bye);
  play(cuartos, cuartos.winner === cuartos.p1_name ? 2 : 1);
  resolve(all);
  assert.equal(semi.p2_name, outsider);
  play(semi, 2);
  resolve(all);
  const final = of(all, 'BRACKET').at(-1);
  assert.ok([final.p1_name, final.p2_name].includes(outsider), 'el ganador fijado a mano avanza a la final');
  // Volver al automático recalcula el cruce
  semi.manual_pairs = false;
  resolve(all);
  assert.notEqual(semi.p2_name, outsider);
});

test('horarios: un partido ya jugado sin horario no ocupa turno', () => {
  const all = resolve(build(9));
  const zone = of(all, 'ZONE').find(z => !z.is_bye);
  play(zone, 2);
  resolve(all);
  const day = (date) => ({ date, startTime: '09:00', endTime: '23:59', phase: 'todas' });
  const res = L.generateGlobalSchedule(all, [{ id: 'C', name: '7ma' }], {
    daysConfig: [day('2026-11-06'), day('2026-11-07')], matchDurationMin: 60, courts: [{ id: 'c1' }, { id: 'c2' }], categoryIds: ['C']
  });
  assert.ok(!res.matches.some(m => m.id === zone.id));
  assert.equal(res.unscheduled, 0);
});

test('horarios: las semis y finales sin definir de dos categorías con un jugador en común no se superponen', () => {
  const a = withIds(L.generateAmericanoMatches('A', 4, ['Rolo & X1', 'X2 & X3', 'X4 & X5', 'X6 & X7'], false).generatedMatches);
  const b = withIds(L.generateAmericanoMatches('B', 5, ['Rolo & Y1', 'Y2 & Y3', 'Y4 & Y5', 'Y6 & Y7', 'Y8 & Y9'], false).generatedMatches);
  const res = L.generateGlobalSchedule([...a, ...b], [{ id: 'A', name: 'Suma 11' }, { id: 'B', name: 'Suma 9' }], {
    daysConfig: [{ date: '2026-11-01', startTime: '10:00', endTime: '23:00', phase: 'todas' }], matchDurationMin: 60,
    courts: [{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }], categoryIds: ['A', 'B']
  });
  assert.equal(res.unscheduled, 0);
  const t = (m) => new Date(`${m.match_date}T${m.match_time}:00`).getTime();
  const playoffs = res.matches.filter(m => m.match_type !== 'AMERICANO');
  for (const x of playoffs) for (const y of playoffs) {
    if (x.category_id !== y.category_id) assert.ok(Math.abs(t(x) - t(y)) >= 3600000, `${x.round_name} (${x.category_id}) y ${y.round_name} (${y.category_id}) a la misma hora`);
  }
});

test('nivel de categorías: Suma 9 > Suma 11 > 7ma > Mix', () => {
  const names = ['Mix Black Padel', '7ma Caballero', 'Suma 11 Caballeros', 'Suma 9 Caballeros'];
  assert.deepEqual([...names].sort((a, b) => L.categoryLevel(a) - L.categoryLevel(b)), ['Suma 9 Caballeros', 'Suma 11 Caballeros', '7ma Caballero', 'Mix Black Padel']);
  assert.ok(L.categoryLevel('5ta Damas') < L.categoryLevel('7ma Caballero'));
});

test('horarios: un partido fijado se respeta y las rondas siguientes de su categoría van después', () => {
  const all = resolve(build(6));
  const zone = of(all, 'ZONE')[2];
  Object.assign(zone, { match_date: '2026-11-07', match_time: '14:00', court_id: 'c1' });
  const day = (date) => ({ date, startTime: '10:00', endTime: '23:00', phase: 'todas' });
  const res = L.generateGlobalSchedule(all, [{ id: 'C', name: 'Mix' }], {
    daysConfig: [day('2026-11-06'), day('2026-11-07')], matchDurationMin: 60, courts: [{ id: 'c1' }, { id: 'c2' }], categoryIds: ['C'], pinnedIds: [zone.id]
  });
  assert.ok(!res.matches.some(m => m.id === zone.id), 'el fijado no se reprograma');
  const t = (m) => new Date(`${m.match_date}T${m.match_time}:00`).getTime();
  const pinnedAt = t(zone);
  res.matches.filter(m => m.match_type !== 'ZONE').forEach(m => assert.ok(t(m) >= pinnedAt + 3600000, `${m.round_name} después del partido fijado`));
  assert.ok(!res.matches.some(m => m.court_id === 'c1' && t(m) === pinnedAt), 'su cancha queda reservada');
});

test('horarios no disponibles: el gestor no programa a la pareja en su franja y el editor avisa', () => {
  const all = resolve(build(8));
  const pair = of(all, 'ZONE')[0].p1_name;
  const unavailable = [{ pair, date: '2026-11-07', from: '00:00', to: '00:00' }, { pair, date: '2026-11-08', from: '10:00', to: '14:00' }];
  const day = (date) => ({ date, startTime: '10:00', endTime: '22:00', phase: 'todas' });
  const res = L.generateGlobalSchedule(all, [{ id: 'C', name: '7ma' }], {
    daysConfig: [day('2026-11-07'), day('2026-11-08')], matchDurationMin: 60, courts: [{ id: 'c1' }, { id: 'c2' }], categoryIds: ['C'], unavailable
  });
  assert.equal(res.unscheduled, 0);
  const own = res.matches.filter(m => [m.p1_name, m.p2_name].includes(pair));
  assert.ok(own.length > 0);
  own.forEach(m => assert.ok(m.match_date === '2026-11-08' && m.match_time >= '14:00', `${m.round_name} ${m.match_date} ${m.match_time}`));
  // Avisos al editar a mano
  const { warnings } = L.checkMatchEdit(own[0], { match_date: '2026-11-08', match_time: '13:30' }, all, 60, unavailable);
  assert.ok(warnings.some(w => w.includes('pidió no jugar')));
  assert.equal(L.checkMatchEdit(own[0], { match_date: '2026-11-08', match_time: '14:00' }, all, 60, unavailable).warnings.filter(w => w.includes('pidió')).length, 0);
});

test('el 2º partido se llama como la ronda previa al cuadro: Octavos en 7ma (9), Cuartos en Mix (6)', () => {
  const septima = resolve(build(9));
  assert.deepEqual(of(septima, 'CROSS').map(c => c.round_name), ['Octavos A', 'Octavos B', 'Octavos C', 'Octavos D', 'Octavos E']);
  assert.equal(of(septima, 'BRACKET')[0].round_name, 'Cuartos A');
  const mix = resolve(build(6));
  assert.deepEqual(of(mix, 'CROSS').map(c => c.round_name), ['Cuartos A', 'Cuartos B', 'Cuartos C']);
  assert.equal(of(mix, 'BRACKET')[0].round_name, 'Semis A');
  assert.equal(of(resolve(build(20)), 'CROSS')[0].round_name, '16avos A');
  assert.equal(of(resolve(build(12)), 'CROSS')[0].round_name, 'Octavos A');
});
