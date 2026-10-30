// Simulación de un fin de semana completo: 4 categorías americanas, 3 canchas y jugadores en varias categorías.
import * as L from '../src/lib/tournamentLogic.js';
import assert from 'node:assert/strict';
const cats=[
 {id:'S9',name:'Suma 9',pairs:['J1 & J2','J3 & J4','Compartido A & J5','J6 & Compartido B','J7 & J8']},
 {id:'7M',name:'7ma',pairs:['K1 & K2','K3 & K4','K5 & K6','K7 & K8','K9 & K10','K11 & Compartido C','K12 & K13']},
 {id:'S11',name:'Suma 11',pairs:['compartido a & L1','L2 & L3','L4 & Compartido C','Compartido B & L5']},
 {id:'MX',name:'Mixto',pairs:['M1 & M2','M3 & M4','M5 & M6','M7 & M8','M9 & M10','M11 & M12']}];
const courts=[{id:'c1',name:'Cancha 1'},{id:'c2',name:'Cancha 2'},{id:'c3',name:'Cancha 3'}];
let n=0; let matches=[];
for (const c of cats) matches.push(...L.generateAmericanoMatches(c.id,c.pairs.length,c.pairs,true).generatedMatches.map(m=>({...m,id:'m'+(n++)})));
const REST = 0;
const config={categoryIds:cats.map(c=>c.id),matchDurationMin:60,restMin:REST,courts,daysConfig:[
 {date:'2026-10-31',startTime:'09:00',endTime:'23:00',phase:'grupos'},
 {date:'2026-11-01',startTime:'09:00',endTime:'14:00',phase:'grupos'},
 {date:'2026-11-01',startTime:'14:00',endTime:'21:00',phase:'playoffs'}]};
const {matches:sch,unscheduled,summary}=L.generateGlobalSchedule(matches,cats,config);
const t=m=>new Date(`${m.match_date}T${m.match_time}:00`).getTime();
// --- verificaciones ---
const problems=[];
const slot=new Map(); sch.forEach(m=>{ if(!m.match_date) return; const k=m.court_id+t(m); if(slot.has(k)) problems.push('cancha doble '+k); slot.set(k,m);});
const players=p=>p.includes('Tabla')||p.startsWith('Ganador')?[]:p.split('&').map(x=>x.trim().toLowerCase());
const agenda={}; sch.forEach(m=>{ if(!m.match_date) return; [m.p1_name,m.p2_name].flatMap(players).forEach(p=>{ (agenda[p]??=[]).forEach(x=>{ if(Math.abs(x-t(m))<(60+REST)*60000) problems.push(`superposición ${p} ${m.match_date} ${m.match_time}`);}); agenda[p].push(t(m)); }); });
for (const c of cats){ const cm=sch.filter(m=>m.category_id===c.id); const fin=cm.find(m=>m.match_type==='AMERICANO_FINAL'); const last=Math.max(...cm.filter(m=>m.match_type==='AMERICANO').map(t)); if(!(t(fin)>last)) problems.push('final antes de grupos '+c.name); }



// Jugadores en dos categorías
// --- resultados simulados ---
const rnd=()=>{ const a=6, b=Math.floor(Math.random()*5); return Math.random()<.5?[a,b]:[b,a]; };
let all=sch.map(m=>({...m}));
for (const m of all.filter(m=>m.match_type==='AMERICANO')){ let s1=[],s2=[]; let w1=0,w2=0; while(w1<2&&w2<2){ const [x,y]=rnd(); s1.push(String(x)); s2.push(String(y)); x>y?w1++:w2++; } while(s1.length<3){s1.push('');s2.push('');} m.p1_score=s1; m.p2_score=s2; m.winner=L.winnerFromScore(m.p1_name,m.p2_name,s1,s2).winner; }
for (const c of cats){ const cm=all.filter(m=>m.category_id===c.id); L.resolveCategoryMatches(cm).forEach(u=>Object.assign(all.find(m=>m.id===u.matchId),u.updates));
  const st=L.calculateAmericanoStandings(c.pairs,all.filter(m=>m.category_id===c.id&&m.match_type==='AMERICANO'));
  const fin=all.find(m=>m.category_id===c.id&&m.match_type==='AMERICANO_FINAL');
  const semi=all.find(m=>m.category_id===c.id&&m.round_name==='Semifinal'); assert.equal(semi.p1_name,st[1].name); assert.equal(semi.p2_name,st[2].name); assert.equal(fin.p1_name,st[0].name); assert.equal(fin.p2_name,'Ganador Semifinal'); assert.ok(fin.match_date,'final mantiene horario');

}
assert.equal(problems.length,0); assert.equal(unscheduled,0);

