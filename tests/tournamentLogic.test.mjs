// Pruebas de la lógica del torneo: cuadros, americano, desempates, horarios y edición manual.
// Ejecutar con: npm test
import * as L from '../src/lib/tournamentLogic.js';
import assert from 'node:assert/strict';
let id=0; const withIds = (arr, cat) => arr.map(m => ({...m, id: `m${id++}`, category_id: cat}));
const apply = (list, changes) => { changes.forEach(c => Object.assign(list.find(m=>m.id===c.matchId), c.updates)); };

// winnerFromScore
assert.equal(L.winnerFromScore('A','B',['6','6',''],['3','4','']).winner,'A');
assert.ok(L.winnerFromScore('A','B',['6','3',''],['3','6','']).error);
assert.ok(L.winnerFromScore('A','B',['6','',''],['6','','']).error);
assert.equal(L.winnerFromScore('A','B',['','',''],['','','']).winner,null);

// Traditional 6 pairs with 1 empty -> BYE zone resolved at generation
const pairs = ['A','B','C','D','E','BYE'];
const { generatedMatches: g } = L.generateTournamentMatches('X', 6, pairs, false, { cross: false });
const zc = g.find(m=>m.round_name==='ZONA C');
assert.equal(zc.winner,'E'); assert.equal(zc.is_wo,false);
const r1 = g.filter(m=>m.match_type==='BRACKET'&&m.round_index===1);
assert.ok(r1.some(m=>m.p1_name==='E'||m.p2_name==='E'), 'E advanced into bracket');

// Two categories: zone result must not leak
const X = withIds(g,'X');
const Y = withIds(L.generateTournamentMatches('Y',6,['P','Q','R','S','T','U'],false, { cross: false }).generatedMatches,'Y');
const za = X.find(m=>m.round_name==='ZONA A'); za.winner='A';
apply(X, L.resolveCategoryMatches(X));
assert.ok(!Y.some(m=>m.p1_name==='A'||m.p2_name==='A'), 'no leak to Y');
assert.ok(X.some(m=>m.match_type==='BRACKET'&&(m.p1_name==='A')), 'A in X bracket');
// correction: change zone winner to B -> bracket updated
za.winner='B'; apply(X, L.resolveCategoryMatches(X));
assert.ok(X.some(m=>m.match_type==='BRACKET'&&m.p1_name==='B'));
assert.ok(!X.some(m=>m.match_type==='BRACKET'&&(m.p1_name==='A'&&m.round_index===1&&m.match_index===0)));

// Americano: semifinales 1º-4º y 2º-3º al terminar las fechas, final entre ganadores
const am = withIds(L.generateAmericanoMatches('Z',5,['A','B','C','D','E'],false).generatedMatches,'Z');
const reg = am.filter(m=>m.match_type==='AMERICANO');
const semisOf = () => am.filter(m=>m.match_type==='AMERICANO_SEMI');
assert.equal(semisOf().length, 2);
reg[0].winner = reg[0].p1_name; apply(am, L.resolveCategoryMatches(am));
assert.equal(semisOf()[0].p1_name,'1º Tabla Americano');
reg.forEach(m=>{ m.winner=m.p1_name; m.p1_score=['6','6','']; m.p2_score=['2','2','']; });
apply(am, L.resolveCategoryMatches(am));
const st = L.calculateAmericanoStandings(['A','B','C','D','E'], reg);
const s1 = am.find(m=>m.round_name==='Semifinal 1'), s2 = am.find(m=>m.round_name==='Semifinal 2');
assert.deepEqual([s1.p1_name,s1.p2_name],[st[0].name,st[3].name]);
assert.deepEqual([s2.p1_name,s2.p2_name],[st[1].name,st[2].name]);
const fin = am.find(m=>m.match_type==='AMERICANO_FINAL');
assert.equal(fin.p1_name,'Ganador Semifinal 1');
Object.assign(s1,{winner:s1.p2_name,p1_score:['3','4',''],p2_score:['6','6','']});
Object.assign(s2,{winner:s2.p1_name,p1_score:['6','6',''],p2_score:['1','1','']});
apply(am, L.resolveCategoryMatches(am));
assert.deepEqual([fin.p1_name,fin.p2_name],[st[3].name,st[1].name]);
assert.ok(fin.round_index > s1.round_index);
// Con 3 parejas no hay semifinales: final directa
const am3 = L.generateAmericanoMatches('Y',3,['A','B','C'],false).generatedMatches;
assert.equal(am3.filter(m=>m.match_type==='AMERICANO_SEMI').length,0);
assert.equal(am3.find(m=>m.match_type==='AMERICANO_FINAL').p1_name,'1º Tabla Americano');

// Scheduler: no pair double-booked, rounds ordered
const all = [...am.filter(m=>m.match_type==='AMERICANO').map(m=>({...m,winner:null})), ...X];
const { matches: sch, unscheduled } = L.generateGlobalSchedule(all, [{id:'Z',name:'5ta'},{id:'X',name:'7ma'}], {
  daysConfig:[{date:'2026-11-01',startTime:'09:00',endTime:'23:00',phase:'grupos'}], matchDurationMin:60, courts:[{id:'c1'},{id:'c2'},{id:'c3'}]});
const seen = new Set();
for (const m of sch) for (const n of [m.p1_name,m.p2_name]) { if(!n||!m.match_time) continue; const k=`${m.category_id}${n}${m.match_time}`; assert.ok(!seen.has(k),'double-booked '+k); seen.add(k); }
const slot = new Set(); for (const m of sch) { if(!m.match_time) continue; const k=m.match_time+m.court_id; assert.ok(!slot.has(k)); slot.add(k); }
assert.equal(all[0].match_time, undefined, 'input not mutated');

// --- Scheduler por categoría ---
{
  const amer = withIds(L.generateAmericanoMatches('AM',5,['a','b','c','d','e'],false,{withFinal:true}).generatedMatches,'AM');
  const trad = withIds(L.generateTournamentMatches('TR',8,['1','2','3','4','5','6','7','8'],false, { cross: false }).generatedMatches,'TR');
  const other = [{id:'o1',category_id:'OT',match_type:'AMERICANO',p1_name:'x',p2_name:'y',match_date:'2026-11-01',match_time:'09:00:00',court_id:'c1',round_index:0}];
  const cats=[{id:'AM',name:'Demo'},{id:'TR',name:'5ta'},{id:'OT',name:'Otra'}];
  const cfg={daysConfig:[{date:'2026-11-01',startTime:'09:00',endTime:'23:00',phase:'grupos'}],matchDurationMin:60,courts:[{id:'c1'},{id:'c2'}]};
  for (const catId of ['AM','TR']) {
    const all=[...amer,...trad,...other];
    const { matches: sch, unscheduled } = L.generateGlobalSchedule(all, cats, {...cfg, categoryIds:[catId]});
    assert.equal(unscheduled,0, catId+' unscheduled');
    assert.ok(sch.every(m=>m.category_id===catId), 'only selected category returned');
    assert.ok(!sch.some(m=>m.court_id==='c1'&&m.match_time==='09:00'), 'respects occupied slot');
    const t = m => new Date(`${m.match_date}T${m.match_time}:00`).getTime();
    const bySlot=new Set(); sch.forEach(m=>{const k=m.court_id+m.match_time; assert.ok(!bySlot.has(k)); bySlot.add(k);});
    const pairT={}; sch.forEach(m=>[m.p1_name,m.p2_name].forEach(n=>{ if(!n) return; (pairT[n]??=[]).forEach(x=>assert.ok(Math.abs(x-t(m))>=3600000,'overlap '+n)); pairT[n].push(t(m)); }));
    if (catId==='AM') {
      const fin=sch.find(m=>m.match_type==='AMERICANO_FINAL'); const last=Math.max(...sch.filter(m=>m.match_type==='AMERICANO').map(t));
      assert.ok(t(fin)>last,'final after group stage');
    } else {
      for (let r=1;r<=3;r++){ const prevEnd=Math.max(...sch.filter(m=>m.round_index===r-1).map(t))+3600000; assert.ok(sch.filter(m=>m.round_index===r).every(m=>t(m)>=prevEnd),'round order '+r); }
    }
  }
}

// --- Reglas nuevas ---
{
  const t = m => new Date(`${m.match_date}T${String(m.match_time).slice(0,5)}:00`).getTime();
  const day = (phase='grupos', s='09:00', e='23:00', date='2026-11-01') => ({date,startTime:s,endTime:e,phase});
  const courts=[{id:'c1'},{id:'c2'},{id:'c3'}];

  // Americano: final incluida por defecto
  const g = L.generateAmericanoMatches('A',4,['a&b','c&d','e&f','g&h'],false).generatedMatches;
  assert.equal(g.filter(m=>m.match_type==='AMERICANO_FINAL').length,1,'final por defecto');

  // Jugador inscripto en dos categorías: nunca superpuesto, ni contra horarios fijos de otra categoría
  const A = withIds(L.generateAmericanoMatches('CA',4,['Juan & Pedro','Luis & Mario','Ana & Bea','Carla & Dora'],false).generatedMatches,'CA');
  const B = withIds(L.generateAmericanoMatches('CB',4,['Juan & Sofi','Tomi & Nico','Eva & Flor','Gabi & Hana'],false).generatedMatches,'CB');
  const fixedOther = [{id:'f1',category_id:'CX',match_type:'AMERICANO',p1_name:'Juan & Zoe',p2_name:'X & Y',match_date:'2026-11-01',match_time:'09:00:00',court_id:'c3',round_index:0}];
  const cats=[{id:'CA',name:'5ta'},{id:'CB',name:'Mixto'},{id:'CX',name:'Otra'}];
  const r = L.generateGlobalSchedule([...A,...B,...fixedOther], cats, {daysConfig:[day('todas','08:00','02:00')],matchDurationMin:60,courts,categoryIds:['CA','CB'],restMin:30});
  assert.equal(r.unscheduled,0);
  const juan = [...r.matches,...fixedOther].filter(m=>/Juan/.test(m.p1_name+m.p2_name)).map(t).sort((x,y)=>x-y);
  for (let i=1;i<juan.length;i++) assert.ok(juan[i]-juan[i-1] >= 90*60000, 'Juan descanso 30 min entre partidos');
  assert.ok(!r.matches.some(m=>m.court_id==='c3'&&t(m)===t(fixedOther[0])),'turno fijo respetado');
  assert.ok(r.summary.CA.scheduled===9 && r.summary.CB.scheduled===9, 'resumen por categoría');

  // Partidos ya jugados conservan su horario
  const C = withIds(L.generateAmericanoMatches('CC',4,['a & b','c & d','e & f','g & h'],false).generatedMatches,'CC');
  Object.assign(C[0],{winner:C[0].p1_name,match_date:'2026-11-01',match_time:'20:00:00',court_id:'c1'});
  const r2 = L.generateGlobalSchedule(C,[{id:'CC',name:'x'}],{daysConfig:[day()],matchDurationMin:60,courts,categoryIds:['CC']});
  assert.ok(!r2.matches.some(m=>m.id===C[0].id),'jugado no se reprograma');
  assert.ok(!r2.matches.some(m=>m.court_id==='c1'&&m.match_time==='20:00'),'su turno queda ocupado');
  const fin = r2.matches.find(m=>m.match_type==='AMERICANO_FINAL');
  assert.ok(t(fin) >= t(C[0]) + 3600000, 'la final va después incluso de partidos ya jugados');

  // Tradicional con días de semis y finales
  const T = withIds(L.generateTournamentMatches('TT',16,Array.from({length:16},(_,i)=>`P${i} & Q${i}`),false, { cross: false }).generatedMatches,'TT');
  const r3 = L.generateGlobalSchedule(T,[{id:'TT',name:'4ta'}],{daysConfig:[day('grupos','09:00','23:00','2026-11-01'),day('semis','09:00','13:00','2026-11-02'),day('finals','16:00','20:00','2026-11-02')],matchDurationMin:60,courts,categoryIds:['TT']});
  assert.equal(r3.unscheduled,0);
  const semis=r3.matches.filter(m=>m.match_type==='BRACKET'&&m.round_index===3), fn=r3.matches.find(m=>m.round_index===4);
  assert.ok(semis.every(m=>m.match_date==='2026-11-02'&&m.match_time<'13:00'),'semis en su bloque');
  assert.ok(fn.match_date==='2026-11-02'&&fn.match_time>='16:00','final en su bloque');
  for (let rr=1; rr<=4; rr++){ const prevEnd=Math.max(...r3.matches.filter(m=>m.round_index===rr-1).map(t))+3600000; assert.ok(r3.matches.filter(m=>m.round_index===rr).every(m=>t(m)>=prevEnd),'orden ronda '+rr); }

  // Desempate: resultado entre sí con 2 empatadas, diferencia de sets antes que games
  const mk=(p1,p2,s1,s2)=>({match_type:'AMERICANO',p1_name:p1,p2_name:p2,p1_score:s1,p2_score:s2,winner:L.winnerFromScore(p1,p2,s1,s2).winner});
  const ms=[mk('X','Y',['6','6',''],['4','4','']), mk('Y','Z',['6','6',''],['0','0','']), mk('Z','X',['7','0','7'],['6','6','6'])];
  const st=L.calculateAmericanoStandings(['X','Y','Z'],ms);

  assert.equal(st[0].name,'X','X mejor diferencia de sets (+1 vs 0) aunque empata en games');
  const ms2=[mk('X','Y',['6','6',''],['4','4','']), mk('Y','Z',['6','6',''],['0','0','']), mk('X','Z',['0','0',''],['6','6','']), mk('Y','W',['6','6',''],['0','0','']), mk('X','W',['6','6',''],['0','0',''])];
  const st2=L.calculateAmericanoStandings(['X','Y','Z','W'],ms2);
  assert.equal(st2[0].name,'X','X gana entre sí a Y pese a peor diferencia');
}

// --- Edición manual ---
{
  const ms = withIds(L.generateAmericanoMatches('E',4,['A & a','B & b','C & c','D & d'],false).generatedMatches,'E');
  const m0 = ms[0]; // A vs D (fecha 1)
  assert.ok(L.checkMatchEdit(m0,{p2_name:m0.p1_name},ms).errors.length===1,'misma pareja');
  const other = ms.find(m=>m.match_type==='AMERICANO'&&m.id!==m0.id);
  assert.ok(L.checkMatchEdit(m0,{p1_name:other.p1_name,p2_name:other.p2_name},ms).errors.some(e=>/ya existe/.test(e)),'cruce repetido');
  Object.assign(ms[1],{match_date:'2026-10-31',match_time:'10:00:00',court_id:'c1'});
  const w = L.checkMatchEdit(m0,{match_date:'2026-10-31',match_time:'10:00',court_id:'c1'},ms).warnings;
  assert.ok(w.some(x=>/cancha/.test(x)),'cancha ocupada');
  const sharesPlayer = L.checkMatchEdit({...m0,p1_name:ms[1].p1_name},{match_date:'2026-10-31',match_time:'10:30',court_id:'c2'},ms).warnings;
  assert.ok(sharesPlayer.some(x=>/jugador/.test(x)),'jugador superpuesto');
  assert.deepEqual(L.checkMatchEdit(m0,{match_date:'2026-10-31',match_time:'12:00',court_id:'c2'},ms),{errors:[],warnings:[]});
}
