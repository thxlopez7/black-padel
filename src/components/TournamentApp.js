"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { getCategories, getCourts, getPlayers, getMatches, addCategory, deleteCategory, addCourt, deleteCourt, updateCategory, saveGeneratedMatches, deleteMatchesByCategory, deleteMatchesByIds, updateMatch, getSession, logoutAdmin } from "../lib/supabaseService";
import { generateTournamentMatches, generateAmericanoMatches, resolveCategoryMatches, generateGlobalSchedule, addLatePair, swapZonePairs, renamePairInMatches, normalizePairName, samePair } from "../lib/tournamentLogic";
import BracketView from "./BracketView";
import AmericanoView from "./AmericanoView";
import AdminPlayers from "./AdminPlayers";
import CourtSchedule from "./CourtSchedule";
import AdminPayments from "./AdminPayments";
import AdminLogin from "./AdminLogin";
import FixtureView from "./FixtureView";
import { PromptModal, Toast } from "./UIComponents";
import { toLocalDateString, addDays, formatMatchSchedule } from "../lib/format";

const MIN_AMERICANO_PAIRS = 3;
// Tradicional: cantidad exacta de parejas (con impar, un BYE en cada uno de los dos partidos de zona)
const BRACKET_SIZES = Array.from({ length: 29 }, (_, i) => i + 4);

const pairLabel = (p) => normalizePairName(`${p.name}${p.partner ? ' & ' + p.partner : ''}`);
// Menor tamaño de cuadro disponible que admite la cantidad de parejas
const bracketSizeFor = (count) => BRACKET_SIZES.find(n => n >= count) || null;

const toMinutesOf = (time) => { const [h, m] = String(time).split(':').map(Number); return h * 60 + m; };

// Próximo día de la semana indicado (5 = viernes) a partir de hoy
function nextWeekday(weekday) {
  const today = new Date();
  return toLocalDateString(new Date(today.getFullYear(), today.getMonth(), today.getDate() + ((weekday - today.getDay() + 7) % 7)));
}

// Viernes de noche con pocos partidos (el fuerte es el sábado), sábado completo para grupos y
// domingo con semifinales a la mañana y finales a la tarde
const weekendTemplate = (friday) => [
  { date: friday, startTime: '19:00', endTime: '00:00', phase: 'grupos', maxMatches: 6 },
  { date: addDays(friday, 1), startTime: '10:00', endTime: '00:00', phase: 'grupos', maxMatches: '' },
  { date: addDays(friday, 2), startTime: '11:00', endTime: '15:00', phase: 'semis', maxMatches: '' },
  { date: addDays(friday, 2), startTime: '15:00', endTime: '19:00', phase: 'finals', maxMatches: '' }
];

// La última configuración aplicada se recuerda para reprogramar en cascada (parejas de último momento)
const SCHEDULE_CONFIG_KEY = 'rd-schedule-config';
function loadScheduleConfig() {
  try {
    return JSON.parse(localStorage.getItem(SCHEDULE_CONFIG_KEY)) || null;
  } catch {
    return null;
  }
}
function saveScheduleConfig(config) {
  try {
    localStorage.setItem(SCHEDULE_CONFIG_KEY, JSON.stringify({ daysConfig: config.daysConfig, matchDurationMin: config.matchDurationMin, restMin: config.restMin, courtIds: config.courts.map(c => c.id) }));
  } catch {
    // sin almacenamiento local la cascada usa las jornadas ya programadas
  }
}

// Jornadas a usar en la cascada: la última configuración o, si no hay, las fechas ya programadas
function cascadeConfig(matches, courts) {
  const saved = loadScheduleConfig();
  if (saved?.daysConfig?.length) {
    const ids = saved.courtIds?.filter(id => courts.some(c => c.id === id));
    return { ...saved, courts: ids?.length ? courts.filter(c => ids.includes(c.id)) : courts };
  }
  // Horarios de un fin de semana viernes a domingo: se usa la misma plantilla con la que se armaron
  const dates = [...new Set(matches.filter(m => m.match_date).map(m => m.match_date))].sort();
  if (dates.length) {
    const [y, mo, d] = dates[0].split('-').map(Number);
    const friday = addDays(dates[0], -((new Date(y, mo - 1, d).getDay() + 2) % 7));
    const template = weekendTemplate(friday);
    if (dates.every(date => template.some(t => t.date === date))) {
      return { daysConfig: template.map(t => ({ ...t, maxMatches: Number(t.maxMatches) || null })), matchDurationMin: 60, restMin: 0, courts };
    }
  }
  const byDate = {};
  matches.filter(m => m.match_date && m.match_time).forEach(m => {
    const t = String(m.match_time).slice(0, 5);
    const d = (byDate[m.match_date] ??= { date: m.match_date, startTime: t, last: t, phase: 'todas' });
    if (t < d.startTime) d.startTime = t;
    if (t > d.last) d.last = t;
  });
  const daysConfig = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date)).map(({ last, ...d }) => {
    const end = Math.min(toMinutesOf(last) + 120, 1440);
    return { ...d, endTime: end >= 1440 ? '00:00' : `${String(Math.floor(end / 60)).padStart(2, '0')}:${String(end % 60).padStart(2, '0')}` };
  });
  return daysConfig.length ? { daysConfig, matchDurationMin: 60, restMin: 0, courts } : null;
}

function AdminGlobalScheduleSetup({ matches, categories, courts, onBack, onGenerateGlobal }) {
  const [saved] = useState(loadScheduleConfig);
  const [daysConfig, setDaysConfig] = useState(() => saved?.daysConfig || weekendTemplate(nextWeekday(5)));
  const [matchDuration, setMatchDuration] = useState(saved?.matchDurationMin || 60);
  const [restMin, setRestMin] = useState(saved?.restMin || 0);
  const schedulableCategories = categories.filter(c => matches.some(m => m.category_id === c.id && !m.is_bye));
  const [selectedCats, setSelectedCats] = useState([]);
  const toggleCat = (id) => setSelectedCats(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  const [selectedCourts, setSelectedCourts] = useState(() => (courts || []).map(c => c.id));
  const [prevCourts, setPrevCourts] = useState(courts);
  if (courts !== prevCourts) {
    setPrevCourts(courts);
    if (courts && courts.length > 0 && selectedCourts.length === 0) {
      setSelectedCourts(courts.map(c => c.id));
    }
  }

  const addDay = () => {
    const lastDay = daysConfig[daysConfig.length - 1];
    const base = lastDay || { date: toLocalDateString(), startTime: '09:00', endTime: '22:00', phase: 'grupos' };
    setDaysConfig([...daysConfig, { ...base, date: lastDay ? addDays(lastDay.date, 1) : base.date }]);
  };

  const removeDay = (index) => {
    setDaysConfig(daysConfig.filter((_, i) => i !== index));
  };

  const updateDay = (index, field, value) => {
    setDaysConfig(daysConfig.map((day, i) => (i === index ? { ...day, [field]: value } : day)));
  };

  const loadWeekendTemplate = () => setDaysConfig(weekendTemplate(daysConfig[0]?.date || nextWeekday(5)));

  // Turnos que ofrece cada jornada con las canchas seleccionadas
  const dayCapacity = (day) => {
    const from = toMinutesOf(day.startTime);
    let to = toMinutesOf(day.endTime);
    if (to <= from) to += 1440;
    return Math.max(0, Math.floor((to - from) / Math.max(Number(matchDuration), 1))) * selectedCourts.length;
  };

  const activeMatches = matches.filter(m => !m.is_bye);
  let gruposCount = 0, semisCount = 0, finalsCount = 0;
  categories.filter(cat => selectedCats.includes(cat.id)).forEach(cat => {
    const catMatches = activeMatches.filter(m => m.category_id === cat.id);
    if(catMatches.length === 0) return;
    const maxR = Math.max(...catMatches.map(m => m.round_index || 0));
    catMatches.forEach(m => {
       if (m.match_type === 'AMERICANO_FINAL') finalsCount++;
       else if (m.match_type === 'AMERICANO_SEMI') semisCount++;
       else if (m.match_type === 'AMERICANO') gruposCount++;
       else if (m.match_type === 'ZONE') gruposCount++;
       else if (m.round_index === maxR && maxR > 0) finalsCount++;
       else if (m.round_index === maxR - 1 && maxR > 1) semisCount++;
       else gruposCount++;
    });
  });

  const durationH = Number(matchDuration) / 60;
  const cCount = Math.max(selectedCourts.length, 1);
  const hGrupos = Math.ceil((gruposCount * durationH) / cCount);
  const hSemis = Math.ceil((semisCount * durationH) / cCount);
  const hFinals = Math.ceil((finalsCount * durationH) / cCount);

  return (
    <div className="animate-fade-up max-w-4xl mx-auto w-full mt-2">
      <button onClick={onBack} className="mb-4 text-gray-400 hover:text-white text-xs bg-gray-900 py-1.5 px-3 rounded border border-gray-800">
        Volver al panel
      </button>
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-light text-white mb-6 border-b border-gray-800 pb-3">Gestor de <span className="font-bold text-red-500">horarios</span></h2>
        
        <div className="mb-6">
           <div className="flex items-center justify-between gap-2 mb-2">
              <label className="block text-gray-500 text-[10px] uppercase tracking-widest">Categorías a programar</label>
              {schedulableCategories.length > 1 && (
                <button type="button" onClick={() => setSelectedCats(selectedCats.length === schedulableCategories.length ? [] : schedulableCategories.map(c => c.id))} className="text-[10px] uppercase font-bold text-red-400 hover:text-red-300">
                  {selectedCats.length === schedulableCategories.length ? 'Quitar todas' : 'Seleccionar todas'}
                </button>
              )}
            </div>
           <p className="text-xs text-gray-500 mb-3">Las demás no se tocan.</p>
           <div className="flex flex-wrap gap-3">
             {schedulableCategories.length === 0 ? (
               <span className="text-xs text-gray-500">No hay categorías con partidos generados.</span>
             ) : schedulableCategories.map(c => (
               <label key={c.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition-colors ${selectedCats.includes(c.id) ? 'bg-red-950/30 border-red-700' : 'bg-gray-950 border-gray-800 hover:border-gray-600'}`}>
                 <input type="checkbox" checked={selectedCats.includes(c.id)} onChange={() => toggleCat(c.id)} className="accent-red-600 w-4 h-4" />
                 <span className="text-sm font-bold text-gray-200">{c.name}</span>
                 {c.current_step === 'americano' && <span className="text-[9px] text-red-400 uppercase font-bold tracking-wider">Americano</span>}
               </label>
             ))}
           </div>
        </div>

        {/* Calculadora / Estimador */}
        <div className="mb-8 bg-gray-950 border border-red-950/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4 border-b border-gray-800 pb-3">
            <div className="w-8 h-8 rounded-full bg-red-950/40 text-red-500 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-widest uppercase">Estimación de horas por fase</h3>
              <p className="text-gray-500 text-[10px] uppercase">Basado en {selectedCats.length} {selectedCats.length === 1 ? 'categoría' : 'categorías'}, {cCount} {cCount === 1 ? 'cancha' : 'canchas'} y {matchDuration} min/partido</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Grupos y rondas previas', matches: gruposCount, hours: hGrupos },
              { label: 'Semifinales', matches: semisCount, hours: hSemis },
              { label: 'Finales', matches: finalsCount, hours: hFinals }
            ].map(phase => (
              <div key={phase.label} className="bg-gray-900 border border-gray-800 rounded-lg p-3">
                <p className="text-gray-500 text-[9px] uppercase tracking-widest font-bold">{phase.label}</p>
                <p className="text-red-500 font-bold text-lg">{phase.hours} <span className="text-xs font-normal">hrs ({phase.matches} partidos)</span></p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
             <label className="block text-gray-500 text-[10px] uppercase tracking-widest">Días de competencia y horarios</label>
             <div className="grid grid-cols-2 sm:flex gap-2">
               <button onClick={loadWeekendTemplate} className="bg-yellow-900/30 hover:bg-yellow-900/60 text-yellow-500 text-[10px] uppercase font-bold py-1 px-3 rounded border border-yellow-800 transition-colors">
                 Plantilla viernes a domingo
               </button>
               <button onClick={addDay} className="bg-red-950/30 hover:bg-red-950/60 text-red-500 text-[10px] uppercase font-bold py-1 px-3 rounded border border-red-900 transition-colors">
                 Agregar día
               </button>
             </div>
           </div>
           
           <div className="flex flex-col gap-3">
             {daysConfig.map((day, idx) => (
               <div key={idx} className="bg-gray-950 p-3 rounded-xl border border-gray-800">
               <div className="flex flex-wrap md:flex-nowrap gap-3 items-end">
                 <div className="flex-1 min-w-[140px]">
                   <label className="block text-gray-600 text-[9px] uppercase tracking-widest mb-1">Fecha</label>
                   <input type="date" value={day.date} onChange={e => updateDay(idx, 'date', e.target.value)} className="w-full bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm" />
                 </div>
                 <div className="flex-1 min-w-[160px]">
                   <label className="block text-gray-600 text-[9px] uppercase tracking-widest mb-1">Instancias</label>
                   <select value={day.phase} onChange={e => updateDay(idx, 'phase', e.target.value)} className="w-full bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm">
                     <option value="todas">Todas las instancias</option>
                     <option value="grupos">Grupos y rondas previas</option>
                     <option value="playoffs">Semifinales y finales</option>
                     <option value="semis">Solo semifinales</option>
                     <option value="finals">Solo finales</option>
                   </select>
                 </div>
                 <div className="w-auto">
                   <label className="block text-gray-600 text-[9px] uppercase tracking-widest mb-1">Inicio (24h)</label>
                   <div className="flex items-center gap-1">
                     <select value={day.startTime.split(':')[0]} onChange={e => {
                       const m = day.startTime.split(':')[1];
                       updateDay(idx, 'startTime', `${e.target.value}:${m}`);
                     }} className="bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm text-center cursor-pointer">
                       {Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
                     </select>
                     <span className="text-gray-500 font-bold">:</span>
                     <select value={day.startTime.split(':')[1]} onChange={e => {
                       const h = day.startTime.split(':')[0];
                       updateDay(idx, 'startTime', `${h}:${e.target.value}`);
                     }} className="bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm text-center cursor-pointer">
                       {['00','15','30','45'].map(m => <option key={m} value={m}>{m}</option>)}
                     </select>
                   </div>
                 </div>
                 <div className="w-auto">
                   <label className="block text-gray-600 text-[9px] uppercase tracking-widest mb-1">Cierre (24h)</label>
                   <div className="flex items-center gap-1">
                     <select value={day.endTime.split(':')[0]} onChange={e => {
                       const m = day.endTime.split(':')[1];
                       updateDay(idx, 'endTime', `${e.target.value}:${m}`);
                     }} className="bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm text-center cursor-pointer">
                       {Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
                     </select>
                     <span className="text-gray-500 font-bold">:</span>
                     <select value={day.endTime.split(':')[1]} onChange={e => {
                       const h = day.endTime.split(':')[0];
                       updateDay(idx, 'endTime', `${h}:${e.target.value}`);
                     }} className="bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm text-center cursor-pointer">
                       {['00','15','30','45'].map(m => <option key={m} value={m}>{m}</option>)}
                     </select>
                   </div>
                 </div>
                 {daysConfig.length > 1 && (
                   <button onClick={() => removeDay(idx)} className="bg-red-900/20 text-red-400 p-2 rounded hover:bg-red-900/40 border border-red-900/30 transition-colors h-[38px] flex items-center justify-center">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                   </button>
                 )}
               </div>
               <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-[11px] text-gray-400">
                 <label className="flex items-center gap-2">
                   <span className="uppercase tracking-widest text-[9px] text-gray-600">Tope de partidos</span>
                   <input type="number" min="0" inputMode="numeric" placeholder="Sin tope" value={day.maxMatches || ''} onChange={e => updateDay(idx, 'maxMatches', e.target.value ? Number(e.target.value) : '')} className="w-24 bg-gray-900 border border-gray-800 text-white rounded p-1.5 text-sm outline-none focus:border-red-600" />
                 </label>
                 <span>{dayCapacity(day)} turnos disponibles{day.endTime <= day.startTime ? ' · cierra al día siguiente' : ''}</span>
               </div>
               </div>
             ))}
           </div>
        </div>

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div>
             <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-2">Duración de cada partido (minutos)</label>
             <input type="number" min="15" step="5" value={matchDuration} onChange={e => setMatchDuration(Number(e.target.value))} className="w-full bg-gray-950 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm" />
           </div>
           <div>
             <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-2">Descanso mínimo entre partidos de una pareja (minutos)</label>
             <input type="number" min="0" step="15" value={restMin} onChange={e => setRestMin(Number(e.target.value))} className="w-full bg-gray-950 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm" />
           </div>
        </div>
        
        <div className="mb-8">
           <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-2">Canchas disponibles</label>
           <div className="flex flex-wrap gap-3">
             {courts && courts.length > 0 ? courts.map(c => (
               <label key={c.id} className="flex items-center gap-2 bg-gray-950 border border-gray-800 px-3 py-2 rounded-lg cursor-pointer hover:border-gray-600 transition-colors">
                 <input 
                   type="checkbox" 
                   checked={selectedCourts.includes(c.id)} 
                   onChange={e => {
                     if (e.target.checked) setSelectedCourts([...selectedCourts, c.id]);
                     else setSelectedCourts(selectedCourts.filter(id => id !== c.id));
                   }} 
                   className="accent-red-600 w-4 h-4"
                 />
                 <span className="text-sm font-bold text-gray-200">{c.name}</span>
               </label>
             )) : <span className="text-xs text-gray-500">No hay canchas registradas.</span>}
           </div>
        </div>
        
        <button 
          disabled={selectedCats.length === 0}
          onClick={() => onGenerateGlobal({
            daysConfig: daysConfig.map(d => ({ ...d, maxMatches: Number(d.maxMatches) || null })),
            matchDurationMin: matchDuration,
            restMin,
            courts: courts.filter(c => selectedCourts.includes(c.id)),
            categoryIds: selectedCats
          })}
          className="w-full disabled:opacity-40 disabled:cursor-not-allowed bg-red-700 hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-950/50 transition-all uppercase tracking-widest text-sm"
        >
          {selectedCats.length === 0 ? 'Selecciona al menos una categoría' : `Programar ${selectedCats.length === 1 ? 'categoría seleccionada' : `${selectedCats.length} categorías`}`}
        </button>
        <p className="text-[11px] text-gray-500 mt-3">
          Lo jugado no se mueve.
        </p>
      </div>
    </div>
  );
}

function AdminSetup({ category, players, categoryMatches = [], onAddLatePair, onBack, onGenerate }) {
  // Parejas inscriptas en la base de datos, en orden de inscripción
  const registeredPairs = players
    .filter(p => p.category_id === category.id)
    .sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0))
    .map(pairLabel)
    .filter(Boolean);
  const registeredKey = registeredPairs.join('|');

  const isExistingAmericano = category.current_step === 'americano';
  const defaultFormat = isExistingAmericano || registeredPairs.length < 6 ? 'americano' : 'traditional';

  const buildPairs = (format) => {
    const num = format === 'americano'
      ? Math.max(MIN_AMERICANO_PAIRS, registeredPairs.length)
      : bracketSizeFor(Math.max(registeredPairs.length, BRACKET_SIZES[0])) || BRACKET_SIZES[BRACKET_SIZES.length - 1];
    const list = Array(num).fill('');
    registeredPairs.forEach((name, idx) => { if (idx < num) list[idx] = name; });
    return { num, list };
  };

  const initial = buildPairs(defaultFormat);
  const [tournamentType, setTournamentType] = useState(defaultFormat);
  const [numPairs, setNumPairs] = useState(initial.num);
  const [pairs, setPairs] = useState(initial.list);
  const [isDirty, setIsDirty] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generate = async (isRandom) => {
    setGenerating(true);
    await onGenerate(numPairs, pairs, isRandom, tournamentType);
    setGenerating(false);
  };

  // Si las parejas inscriptas cambian (carga inicial o tiempo real) y no hubo edición manual, se sincronizan
  const syncKey = `${registeredKey}::${tournamentType}`;
  const [lastSyncKey, setLastSyncKey] = useState(syncKey);
  if (syncKey !== lastSyncKey) {
    setLastSyncKey(syncKey);
    if (!isDirty) {
      const { num, list } = buildPairs(tournamentType);
      setNumPairs(num);
      setPairs(list);
    }
  }

  const loadRegisteredPairs = () => {
    const { num, list } = buildPairs(tournamentType);
    setNumPairs(num);
    setPairs(list);
    setIsDirty(false);
  };

  const handleFormatChange = (newFormat) => {
    setTournamentType(newFormat);
    if (!isDirty) return; // el efecto recalcula desde la base de datos
    const newNum = newFormat === 'traditional'
      ? bracketSizeFor(numPairs) || BRACKET_SIZES[BRACKET_SIZES.length - 1]
      : Math.max(MIN_AMERICANO_PAIRS, numPairs);
    setNumPairs(newNum);
    const newPairs = [...pairs];
    while(newPairs.length < newNum) newPairs.push('');
    setPairs(newPairs.slice(0, newNum));
  };

  const handleNumPairsChange = (e) => {
    const newNum = parseInt(e.target.value);
    setIsDirty(true);
    setNumPairs(newNum);
    const newPairs = [...pairs];
    while(newPairs.length < newNum) newPairs.push('');
    setPairs(newPairs.slice(0, newNum));
  };

  const handlePairChange = (index, val) => {
    const newPairs = [...pairs];
    newPairs[index] = val;
    setIsDirty(true);
    setPairs(newPairs);
  };

  const isGenerated = category.current_step === 'bracket' || category.current_step === 'americano';
  const isAmericanoActive = category.current_step === 'americano';

  // Parejas inscriptas que todavía no forman parte del torneo generado
  const inTournament = new Set(categoryMatches.flatMap(m => [m.p1_name, m.p2_name]).filter(Boolean).map(n => n.toLowerCase()));
  const latePairs = isGenerated && categoryMatches.length > 0 ? registeredPairs.filter(p => !inTournament.has(p.toLowerCase())) : [];
  const [addingPair, setAddingPair] = useState(null);
  const addPair = async (pair) => {
    setAddingPair(pair);
    await onAddLatePair(pair);
    setAddingPair(null);
  };

  // Estimador de partidos para formato americano
  const americanoMatchesCount = Math.floor((numPairs * (numPairs - 1)) / 2) + (numPairs >= 4 ? 3 : 1); // incluye semifinales y final
  const americanoRoundsCount = numPairs % 2 === 0 ? numPairs - 1 : numPairs;

  return (
    <div className="animate-fade-up max-w-4xl mx-auto w-full mt-2">
      <button onClick={onBack} className="mb-4 text-gray-400 hover:text-white text-xs bg-gray-900 py-1.5 px-3 rounded border border-gray-800">
        Volver al panel
      </button>
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-800 pb-5 gap-4">
          <div>
            <h2 className="text-2xl font-light text-white">Inscripción y sorteo <span className="font-bold text-red-500">{category.name}</span></h2>
            <p className="text-xs text-gray-400 mt-1">Configura las parejas y selecciona el formato de juego deseado.</p>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-1.5">
            <label className="block text-gray-500 text-[9px] uppercase tracking-widest font-bold">Modalidad del torneo</label>
            <div className="flex bg-gray-950 p-1 rounded-xl border border-gray-800">
              <button
                type="button"
                onClick={() => handleFormatChange('americano')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
                  tournamentType === 'americano' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                Americano
              </button>
              <button
                type="button"
                onClick={() => handleFormatChange('traditional')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
                  tournamentType === 'traditional' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                Tradicional
              </button>
            </div>
          </div>
        </div>

        {/* INFO CARD SEGÚN FORMATO */}
        {tournamentType === 'americano' ? (
          <div className="bg-red-950/20 border border-red-900/40 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <span className="text-red-500 font-bold text-xs uppercase tracking-wider block">
                  Modalidad americana: todos contra todos por puntos
                </span>
                <p className="text-xs text-gray-300 mt-1">
                  Todos contra todos. 3 puntos por victoria.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-gray-400 font-medium">
                  <span>Partidos totales: <strong className="text-white">{americanoMatchesCount}</strong></span>
                  <span className="w-px h-3 bg-gray-700" aria-hidden="true" />
                  <span>Fechas: <strong className="text-white">{americanoRoundsCount}</strong></span>
                  <span className="w-px h-3 bg-gray-700" aria-hidden="true" />
                  <span className="text-red-400">{numPairs % 2 !== 0 ? '1 pareja descansa por fecha' : 'Todas juegan cada fecha'}</span>
                </div>
              </div>
              <div className="w-full sm:w-36 flex-shrink-0">
                <label className="block text-gray-500 text-[9px] uppercase tracking-widest mb-1 font-bold">Cantidad de parejas</label>
                <select value={numPairs} onChange={handleNumPairsChange} className="w-full bg-gray-950 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none cursor-pointer text-sm font-mono">
                  {Array.from({ length: Math.max(14, numPairs) - 2 }, (_, i) => i + 3).map(n => <option key={n} value={n}>{n} Parejas</option>)}
                </select>
              </div>
            </div>

            <p className="mt-3 pt-3 border-t border-red-900/30 text-xs text-gray-300">
              Después: semis (1º vs 4º, 2º vs 3º) y final.
            </p>
          </div>
        ) : (
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <span className="text-gray-300 font-bold text-xs uppercase tracking-wider block">
                  Modalidad tradicional: zonas y cuadro eliminatorio
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  Dos partidos de zona: primero de a dos y después ganador contra perdedor de otra zona.
                  Con cantidad impar hay un BYE en cada ronda. Pasa al cuadro quien gana el 2º partido.
                </p>
              </div>
              <div className="w-full sm:w-36 flex-shrink-0">
                <label className="block text-gray-500 text-[9px] uppercase tracking-widest mb-1 font-bold">Parejas</label>
                <select value={numPairs} onChange={handleNumPairsChange} className="w-full bg-gray-950 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none cursor-pointer text-sm font-mono">
                  {BRACKET_SIZES.map(n => <option key={n} value={n}>{n} Parejas</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <span className="text-xs text-gray-400">
            {registeredPairs.length} {registeredPairs.length === 1 ? 'pareja inscripta' : 'parejas inscriptas'} en la base de datos para esta categoría.
            {registeredPairs.length > numPairs && (
              <span className="block text-red-400 font-bold mt-1">
                Atención: hay más parejas inscriptas que lugares en el torneo. Las últimas {registeredPairs.length - numPairs} quedarán afuera.
              </span>
            )}
          </span>
          <button type="button" onClick={loadRegisteredPairs} disabled={registeredPairs.length === 0} className="text-xs font-bold uppercase tracking-wider bg-gray-950 hover:bg-gray-800 disabled:opacity-40 text-gray-200 border border-gray-700 py-1.5 px-3 rounded transition-colors">
            Recargar parejas inscriptas
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {pairs.map((p, i) => (
            <div key={i} className="flex flex-col mb-3">
              <label className="text-gray-500 text-[10px] mb-1 uppercase tracking-widest font-medium">
                {tournamentType === 'americano' 
                  ? `Pareja ${i+1}` 
                  : `Pareja ${i+1} ${i%2===0 ? '(ZONA ' + String.fromCharCode(65 + i/2) + ')' : ''}`}
              </label>
              <input 
                type="text" 
                value={p === 'BYE' ? '' : p} 
                onChange={(e) => handlePairChange(i, e.target.value)}
                placeholder={tournamentType === 'americano' ? `Jugador 1 & Jugador 2` : `Vacío: pase libre (BYE)`} 
                className="bg-gray-950 border border-gray-800 text-gray-200 rounded p-2 focus:border-red-600 outline-none text-sm w-full transition-colors"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Estado del torneo</h3>
            {isGenerated ? (
              <div className="bg-red-950/20 border border-red-900 rounded p-3 mb-4 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
                      {isAmericanoActive ? "Torneo americano en curso" : "Cuadro eliminatorio en curso"}
                    </span>
                 </div>
                 <div className="flex gap-2">
                   <button onClick={() => onBack('view_bracket')} className="bg-red-700 hover:bg-red-600 text-white text-xs py-1.5 px-3 rounded font-bold transition-colors">
                     {isAmericanoActive ? "Ver tabla y partidos" : "Ver cuadro"}
                   </button>
                   <button onClick={() => {
                     if(confirm('¿Eliminar el torneo y sus resultados? No se puede deshacer.')) {
                        onBack('delete_bracket');
                     }
                   }} className="bg-red-900/40 hover:bg-red-900/80 text-red-400 border border-red-900/50 text-xs py-1.5 px-3 rounded font-bold transition-colors">
                     Eliminar torneo
                   </button>
                 </div>
              </div>
            ) : (
              <div className="bg-gray-950 border border-gray-800 rounded p-3 mb-4">
                 <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Todavía no se generó el torneo de esta categoría.</span>
              </div>
            )}
            {latePairs.length > 0 && (
              <div className="bg-yellow-500/5 border border-yellow-700/50 rounded-lg p-4 mb-4">
                <p className="text-yellow-200 text-xs font-bold uppercase tracking-widest mb-1">Parejas inscriptas fuera del torneo</p>
                <p className="text-[11px] text-gray-400 mb-3">Cuadro y horarios se ajustan solos.</p>
                <div className="flex flex-col gap-2">
                  {latePairs.map(pair => (
                    <div key={pair} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-950 border border-gray-800 rounded p-2.5">
                      <span className="text-sm text-gray-200 min-w-0 break-words">{pair}</span>
                      <button type="button" disabled={addingPair !== null} onClick={() => addPair(pair)} className="shrink-0 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white text-xs font-bold py-2 px-3 rounded uppercase tracking-wider">
                        {addingPair === pair ? 'Agregando...' : 'Agregar al torneo'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button disabled={generating} onClick={() => generate(false)} className="w-full disabled:opacity-50 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-3 px-6 rounded-lg text-xs uppercase tracking-widest transition-colors">
              {generating ? "Generando..." : tournamentType === 'americano' ? "Generar en orden de inscripción" : "Generar en orden de inscripción"}
            </button>
            <button disabled={generating} onClick={() => generate(true)} className="w-full disabled:opacity-50 border border-red-700 text-red-400 hover:bg-red-700 hover:text-white transition-colors bg-red-600/10 font-bold py-3 px-6 rounded-lg text-xs uppercase tracking-widest flex justify-center items-center gap-2">
              {generating ? "Generando..." : tournamentType === 'americano' ? "Generar con sorteo aleatorio" : "Generar con sorteo aleatorio"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TournamentApp({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories || []);
  const [courts, setCourts] = useState([]);
  const [players, setPlayers] = useState([]);
  // Franjas en las que cada pareja pidió no jugar (gestor de horarios y editor de partidos)
  const unavailable = players.flatMap(p => (p.unavailable || []).map(w => ({ ...w, pair: pairLabel(p) })));
  const [matches, setMatches] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState("public"); 
  const [view, setView] = useState("home");   
  const [activeCatId, setActiveCatId] = useState(null);
  const [activeCourtId, setActiveCourtId] = useState(null);
  // Cada pantalla nueva (cuadro, fixture, cancha, panel) empieza desde arriba
  useEffect(() => { window.scrollTo(0, 0); }, [view, mode, activeCatId]);
  const [session, setSession] = useState(null);
  const [toast, setToast] = useState(null);
  const [promptConfig, setPromptConfig] = useState(null);
  const [expandedPair, setExpandedPair] = useState(null);
  const [publicPlayersCatId, setPublicPlayersCatId] = useState("all");

  const toastTimer = useRef(null);
  const showToast = (message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), type === "error" ? 6000 : 3500);
  };

  const handleAddCategory = () => {
    setPromptConfig({
      title: "Nueva categoría",
      placeholder: "Nombre de la categoría",
      onConfirm: async (name) => {
        setPromptConfig(null);
        if (categories.some(c => c.name.trim().toLowerCase() === name.toLowerCase())) {
          return showToast(`Ya existe una categoría llamada "${name}".`, "error");
        }
        const newCat = await addCategory(name);
        if (!newCat) return showToast("No se pudo crear la categoría.", "error");
        setCategories(prev => [...prev, newCat]);
        showToast("Categoría agregada.");
      }
    });
  };

  const handleAddCourt = () => {
    setPromptConfig({
      title: "Nueva cancha",
      placeholder: "Nombre de la cancha",
      onConfirm: async (name) => {
        setPromptConfig(null);
        if (courts.some(c => c.name.trim().toLowerCase() === name.toLowerCase())) {
          return showToast(`Ya existe una cancha llamada "${name}".`, "error");
        }
        const newCourt = await addCourt(name);
        if (!newCourt) return showToast("No se pudo agregar la cancha.", "error");
        setCourts(prev => [...prev, newCourt]);
        showToast("Cancha agregada.");
      }
    });
  };

  // Valida, genera y persiste el fixture de una categoría. Devuelve un mensaje de error o null.
  const createTournament = async (categoryId, numPairs, pairs, isRandom, tournamentType, options = {}) => {
    const named = pairs.map(normalizePairName).filter(p => p && p.toUpperCase() !== 'BYE');
    const duplicated = named.find((p, i) => named.findIndex(x => samePair(x, p)) !== i);
    if (duplicated) return `La pareja "${duplicated}" está repetida.`;
    if (tournamentType === 'americano' && named.length < MIN_AMERICANO_PAIRS) {
      return `El formato americano requiere al menos ${MIN_AMERICANO_PAIRS} parejas.`;
    }
    if (tournamentType !== 'americano' && named.length < 4) return "El formato tradicional necesita al menos 4 parejas.";

    let generatedMatches;
    try {
      generatedMatches = tournamentType === 'americano'
        ? generateAmericanoMatches(categoryId, numPairs, named, isRandom, options).generatedMatches
        : generateTournamentMatches(categoryId, numPairs, pairs.map(p => normalizePairName(p) || 'BYE'), isRandom).generatedMatches;
    } catch (err) {
      return err.message;
    }

    if (!(await deleteMatchesByCategory(categoryId))) return "No se pudieron borrar los partidos anteriores.";
    if (!(await saveGeneratedMatches(generatedMatches))) return "No se pudieron guardar los partidos generados.";
    const step = tournamentType === 'americano' ? 'americano' : 'bracket';
    const storedPairs = named.length;
    const updatedCat = await updateCategory(categoryId, { num_pairs: storedPairs, current_step: step });
    if (!updatedCat) return "Los partidos se guardaron, pero no se pudo actualizar el estado de la categoría.";
    setCategories(prev => prev.map(c => (c.id === categoryId ? { ...c, ...updatedCat } : c)));
    return null;
  };

  const handleGenerateTournament = async (numPairs, pairs, isRandom, tournamentType = 'traditional', options = {}) => {
    const cat = categories.find(c => c.id === activeCatId);
    const hasTournament = cat && (cat.current_step === 'bracket' || cat.current_step === 'americano');
    if (hasTournament && !confirm("Ya hay un torneo. ¿Reemplazarlo y perder sus resultados?")) return;

    const error = await createTournament(activeCatId, numPairs, pairs, isRandom, tournamentType, options);
    if (error) return showToast(error, "error");

    setMatches(await getMatches());
    showToast(tournamentType === 'americano' ? "Torneo americano generado." : "Sorteo generado.");
    setView("bracket");
  };

  // Suma una pareja inscripta tarde al torneo ya generado y reprograma en cascada
  const handleAddLatePair = async (categoryId, pairName) => {
    const catMatches = matches.filter(m => m.category_id === categoryId);
    const plan = addLatePair(catMatches, pairName);
    if (plan.error) return showToast(plan.error, "error");
    if (!confirm(`¿Agregar ${pairName}?\n\n${plan.notes.join('\n')}`)) return;

    if (!(await deleteMatchesByIds(plan.deleteIds))) return showToast("No se pudo actualizar el cuadro.", "error");
    if (plan.inserts.length > 0 && !(await saveGeneratedMatches(plan.inserts.map(m => ({ winner: null, is_wo: false, is_bye: false, p1_score: ['', '', ''], p2_score: ['', '', ''], ...m }))))) return showToast("No se pudieron guardar los partidos nuevos.", "error");
    const updated = await Promise.all(plan.updates.map(u => updateMatch(u.matchId, u.updates)));
    const updatedCat = await updateCategory(categoryId, { num_pairs: plan.numPairs });
    if (updatedCat) setCategories(prev => prev.map(c => (c.id === categoryId ? { ...c, ...updatedCat } : c)));

    let fresh = await getMatches();
    let scheduleNote = '';
    let missing = 0;
    const config = cascadeConfig(fresh, courts);
    if (config && fresh.some(m => m.category_id === categoryId && m.match_date)) {
      const { changed, unscheduled } = generateGlobalSchedule(fresh, categories, { ...config, categoryIds: [categoryId], keepExisting: true, unavailable });
      await Promise.all(changed.map(m => updateMatch(m.id, { match_date: m.match_date, match_time: m.match_time, court_id: m.court_id })));
      fresh = await getMatches();
      missing = unscheduled;
      scheduleNote = ` Horarios ajustados: ${changed.length} ${changed.length === 1 ? 'partido' : 'partidos'}.${unscheduled ? ` ${unscheduled} sin lugar: agrega horarios en el gestor.` : ''}`;
    }
    setMatches(fresh);
    const failed = updated.some(r => !r);
    showToast(failed ? "La pareja se agregó, pero algunos cruces no se actualizaron." : `${pairName} agregada al torneo.${scheduleNote}`, failed || missing ? "error" : "success");
  };

  const handleGenerateGlobalSchedule = async (config) => {
    if (config.courts.length === 0) return showToast("Selecciona al menos una cancha.", "error");
    if (!(Number(config.matchDurationMin) > 0)) return showToast("La duración del partido debe ser mayor a 0.", "error");
    if (config.daysConfig.length === 0) return showToast("Agrega al menos un día de competencia.", "error");
    const invalidDay = config.daysConfig.find(d => !d.date || d.endTime === d.startTime);
    if (invalidDay) return showToast("Cada día necesita fecha y horarios de inicio y cierre distintos.", "error");
    const { matches: scheduled, changed, unscheduled, summary } = generateGlobalSchedule(matches, categories, { ...config, unavailable });
    if (scheduled.length === 0) return showToast("No hay partidos pendientes de programar en esas categorías.", "error");

    const lines = categories
      .filter(c => summary[c.id])
      .map(c => {
        const info = summary[c.id];
        const range = info.first
          ? `${formatMatchSchedule({ match_date: info.first.date, match_time: info.first.time })} a ${formatMatchSchedule({ match_date: info.last.date, match_time: info.last.time })}`
          : 'sin turnos disponibles';
        return `${c.name}: ${info.scheduled} partidos, ${range}${info.outOfPhase ? `. ${info.outOfPhase} fuera de su jornada por falta de lugar` : ''}${info.unscheduled ? `. Sin horario: ${info.unscheduled}` : ''}`;
      });
    const warning = unscheduled > 0 ? `\n\nAtención: ${unscheduled === 1 ? 'un partido no entra' : `${unscheduled} partidos no entran`} en los días y horarios configurados.` : '';
    if (!confirm(`${lines.join('\n')}${warning}\n\n¿Aplicar horarios?`)) return;

    showToast("Guardando calendario...");
    saveScheduleConfig(config);
    const results = await Promise.all(
      changed.map(m => updateMatch(m.id, { match_date: m.match_date, match_time: m.match_time, court_id: m.court_id }))
    );
    const failed = results.filter(r => !r).length;

    setMatches(await getMatches());
    if (failed > 0) showToast(`No se pudieron guardar ${failed} partidos.`, "error");
    else if (unscheduled > 0) showToast(`Calendario aplicado. ${unscheduled === 1 ? 'Un partido quedó' : `${unscheduled} partidos quedaron`} sin horario: agrega más días u horas.`, "error");
    else showToast("Calendario aplicado.");
    setView("admin_home");
  };

  useEffect(() => {
    const loadData = async () => {
      const currentSession = await getSession();
      setSession(currentSession);
      if (currentSession) {
        setMode("admin");
        setView("admin_home");
      }
      
      const [fetchedCourts, fetchedPlayers, fetchedMatches] = await Promise.all([getCourts(), getPlayers(), getMatches()]);
      setCourts(fetchedCourts);
      setPlayers(fetchedPlayers);
      setMatches(fetchedMatches);
      setLoaded(true);
    };
    loadData();

    // Setup Supabase Realtime Subscriptions
    const channel = supabase.channel('tournament-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => {
        getMatches().then(setMatches);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, () => {
        getPlayers().then(setPlayers);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => {
        getCategories().then(setCategories);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'courts' }, () => {
        getCourts().then(setCourts);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Sortea solo las categorías que todavía no tienen torneo; nunca reemplaza uno existente
  const handleAutoPilot = async () => {
    const pending = categories.filter(c => !matches.some(m => m.category_id === c.id));
    if (pending.length === 0) {
      return showToast("Todas las categorías ya tienen torneo.", "error");
    }
    if (!confirm(`¿Sortear ${pending.map(c => c.name).join(', ')}?`)) return;

    showToast("Generando sorteos...");
    const done = [];
    const skipped = [];

    for (const cat of pending) {
      const catPairs = players
        .filter(p => p.category_id === cat.id)
        .sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0))
        .map(pairLabel);
      const isAmericano = catPairs.length < 6;

      if (catPairs.length < (isAmericano ? MIN_AMERICANO_PAIRS : 2)) {
        skipped.push(`${cat.name} (${catPairs.length} parejas)`);
        continue;
      }
      const numPairs = isAmericano ? catPairs.length : bracketSizeFor(catPairs.length);
      if (!numPairs) {
        skipped.push(`${cat.name} (demasiadas parejas)`);
        continue;
      }
      const pairs = [...catPairs, ...Array(numPairs - catPairs.length).fill('')];
      const error = await createTournament(cat.id, numPairs, pairs, true, isAmericano ? 'americano' : 'traditional');
      if (error) skipped.push(`${cat.name} (${error})`);
      else done.push(cat.name);
    }

    setMatches(await getMatches());
    const summary = [
      done.length > 0 ? `Generados: ${done.join(', ')}.` : '',
      skipped.length > 0 ? `Sin generar: ${skipped.join(', ')}.` : ''
    ].filter(Boolean).join(' ');
    showToast(summary || "No se generó ningún torneo.", skipped.length > 0 ? "error" : "success");
  };

  // Guarda el resultado de un partido y recalcula los cruces que dependen de él
  const handleMatchUpdate = async (match, updates) => {
    let base = matches;
    // Cambio de parejas en una zona: se intercambian con la zona de origen y se borran esos resultados
    const zoneChanged = match.match_type === 'ZONE' && 'p1_name' in updates &&
      (updates.p1_name !== match.p1_name || updates.p2_name !== match.p2_name);
    if (zoneChanged) {
      const swap = swapZonePairs(matches.filter(m => m.category_id === match.category_id), match.id, updates.p1_name, updates.p2_name);
      if (swap.error) {
        showToast(swap.error, "error");
        return false;
      }
      const others = swap.changes.filter(c => c.matchId !== match.id);
      const own = swap.changes.find(c => c.matchId === match.id).updates;
      if ((await Promise.all(others.map(c => updateMatch(c.matchId, c.updates)))).some(r => !r)) {
        showToast("No se pudieron actualizar las zonas.", "error");
        return false;
      }
      const { p1_name: _p1, p2_name: _p2, winner: _w, p1_score: _s1, p2_score: _s2, is_wo: _wo, ...rest } = updates;
      updates = { ...rest, ...own };
      base = matches.map(m => ({ ...m, ...(others.find(c => c.matchId === m.id)?.updates || {}) }));
    }
    const saved = await updateMatch(match.id, updates);
    if (!saved) {
      showToast("No se pudo guardar el partido.", "error");
      return false;
    }

    let current = base.map(m => (m.id === saved.id ? { ...m, ...saved } : m));
    const catMatches = current.filter(m => m.category_id === saved.category_id);
    const changes = resolveCategoryMatches(catMatches);
    const results = await Promise.all(changes.map(c => updateMatch(c.matchId, c.updates)));
    results.forEach(r => {
      if (r) current = current.map(m => (m.id === r.id ? { ...m, ...r } : m));
    });

    setMatches(current);
    if (results.some(r => !r)) showToast("El resultado se guardó, pero algunos cruces no se pudieron actualizar.", "error");
    return true;
  };

  // Una pareja renombrada después del sorteo se actualiza en los cruces de su categoría (solo esa)
  const handlePairRenamed = async (categoryId, oldName, newName) => {
    const changes = renamePairInMatches(matches, categoryId, oldName, newName);
    if (changes.length === 0) return true;
    const results = await Promise.all(changes.map(c => updateMatch(c.matchId, c.updates)));
    setMatches(await getMatches());
    return results.every(Boolean);
  };

  const handlePlayersUpdate = (player, action) => {
    if (action === "add") setPlayers([...players, player]);
    if (action === "delete") setPlayers(players.filter(p => p.id !== player.id));
    if (action === "update") setPlayers(players.map(p => p.id === player.id ? player : p));
  };

  const handleDeleteCategory = async (id, name) => {
    if (confirm(`¿Eliminar "${name}" con sus parejas y partidos? No se puede deshacer.`)) {
      const success = await deleteCategory(id);
      if (success) {
        setCategories(categories.filter(c => c.id !== id));
        showToast(`Categoría ${name} eliminada.`);
      } else {
        showToast("No se pudo eliminar la categoría.", "error", "error");
      }
    }
  };

  const handleDeleteCourt = async (id, name) => {
    if (confirm(`Se eliminará la cancha "${name}". ¿Continuar?`)) {
      const success = await deleteCourt(id);
      if (success) {
        setCourts(courts.filter(c => c.id !== id));
        showToast(`Cancha ${name} eliminada.`);
      } else {
        showToast("No se pudo eliminar la cancha.", "error", "error");
      }
    }
  };

  return (
    <>
      <header className="w-full bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div 
            className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-3"
            onClick={() => { setMode("public"); setView("home"); }}
          >
            <h1 className="text-xl md:text-2xl font-title text-white tracking-widest">
              <img src="/RD.jpeg" alt="R.D Eventos" className="h-9 sm:h-12 w-auto object-contain rounded-md" />
            </h1>
          </div>
          
          {mode === "public" && (
            <nav className="hidden md:flex gap-6">
              <a onClick={() => setView("home")} className={`text-sm font-semibold uppercase tracking-widest cursor-pointer hover:text-red-500 transition-colors ${view === "home" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`}>
                Torneo
              </a>
              <a onClick={() => setView("fixture")} className={`text-sm font-semibold uppercase tracking-widest cursor-pointer hover:text-red-500 transition-colors ${view === "fixture" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`}>
                Fixture
              </a>
              <a onClick={() => setView("players")} className={`text-sm font-semibold uppercase tracking-widest cursor-pointer hover:text-red-500 transition-colors ${view === "players" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`}>
                Jugadores
              </a>
            </nav>
          )}
          
          <div>
            {mode === "public" ? (
              <button 
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-1.5 px-4 rounded text-xs transition-colors border border-gray-700"
                onClick={() => {
                  if (session) {
                    setMode("admin");
                    setView("admin_home");
                  } else {
                    setView("admin_login");
                  }
                }}
              >
                Administración
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-1.5 px-4 rounded text-xs transition-colors border border-gray-700"
                  onClick={() => {
                    setMode("public");
                    setView("home");
                  }}
                >
                  Ver sitio público
                </button>
                <button 
                  className="bg-red-900/40 hover:bg-red-900/80 text-red-400 font-semibold py-1.5 px-4 rounded text-xs transition-colors border border-red-900/50"
                  onClick={async () => {
                    await logoutAdmin();
                    setSession(null);
                    setMode("public");
                    setView("home");
                    showToast("Sesión cerrada.");
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 py-8 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-8">
        
        {view === "admin_login" && (
          <AdminLogin 
            onLoginSuccess={async () => {
              const currentSession = await getSession();
              setSession(currentSession);
              setMode("admin");
              setView("admin_home");
              showToast("Sesión iniciada.");
            }} 
            onCancel={() => setView("home")} 
          />
        )}
        {mode === "public" && view === "home" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-up">
            {/* Columna Izquierda */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-950/80 backdrop-blur-sm flex justify-center">
                <img src="/flyer.jpeg" alt="Flyer Black Padel" className="w-full max-w-2xl h-auto object-contain" onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }} />
              </div>
              <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-title text-white mb-6 border-b border-gray-800 pb-3 uppercase tracking-wider">Categorías <span className="font-bold text-red-500">del torneo</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.length === 0 ? (
                    <p className="text-sm text-gray-500 italic col-span-full">Todavía no hay categorías publicadas.</p>
                  ) : (
                    categories.map(cat => {
                      const catMatches = matches.filter(m => m.category_id === cat.id);
                      const isAmericano = cat.current_step === "americano" || catMatches.some(m => m.match_type === 'AMERICANO');
                      const isGenerated = catMatches.length > 0;

                      return (
                        <button key={cat.id} className="w-full text-left bg-gray-950/80 backdrop-blur-sm border border-gray-800 hover:border-red-600 rounded-xl p-5 transition-all shadow-md group" onClick={() => { setActiveCatId(cat.id); setView("bracket"); }}>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-xl font-title font-bold text-white group-hover:text-red-500 transition-colors uppercase tracking-widest">{cat.name}</h3>
                            {isAmericano && (
                              <span className="text-[9px] bg-red-600/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider whitespace-nowrap">
                                Americano
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-2 font-medium">
                            {!loaded ? "Cargando..." : !isGenerated ? "Pendiente de sorteo" : isAmericano ? "Ver tabla de puntos y fixture" : "Ver cuadro y resultados"}
                          </p>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="lg:col-span-4 bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col h-full">
              <h2 className="text-xl font-light text-white mb-6 border-b border-gray-800 pb-3">Partidos <span className="font-bold text-red-500">por cancha</span></h2>
              <div className="flex flex-col gap-3 flex-grow md:overflow-y-auto md:max-h-[600px] md:overscroll-contain custom-scrollbar pr-2">
                {courts.length === 0 ? (
                  <p className="text-xs text-gray-500 italic text-center py-10">Los horarios por cancha se publicarán próximamente.</p>
                ) : (
                  courts.map(c => (
                    <div key={c.id} className="flex justify-between items-center bg-gray-950 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                      <span className="text-sm font-bold text-gray-200">{c.name}</span>
                      <button 
                        onClick={() => { setActiveCourtId(c.id); setView("court_schedule"); }}
                        className="bg-red-600/10 text-red-500 border border-red-600/20 px-3 py-1.5 rounded text-xs font-bold transition-colors hover:bg-red-600 hover:text-white"
                      >
                         Ver partidos
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {view === "fixture" && (
          <FixtureView matches={matches} categories={categories} courts={courts} onBack={mode === "admin" ? () => setView("admin_home") : null} />
        )}

        {mode === "public" && view === "players" && (
           <div className="animate-fade-up max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
              {/* Sidebar Categorías */}
              <div className="md:w-64 flex-shrink-0">
                 <h2 className="text-3xl font-title text-white mb-6 border-b border-gray-800 pb-4 uppercase tracking-widest">Parejas <span className="font-bold text-red-500">inscriptas</span></h2>
                 
                 <div className="flex overflow-x-auto md:flex-col gap-3 pb-4 md:pb-0 custom-scrollbar">
                    <button
                       onClick={() => setPublicPlayersCatId("all")}
                       className={`whitespace-nowrap px-5 py-4 rounded-xl border text-sm font-bold transition-all shadow-lg text-left ${publicPlayersCatId === "all" ? "bg-red-600/10 border-red-500 text-red-500" : "bg-gray-950/80 backdrop-blur-md border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"}`}
                    >
                       Todas las categorías
                    </button>
                    {categories.map(c => (
                       <button
                          key={c.id}
                          onClick={() => setPublicPlayersCatId(c.id)}
                          className={`whitespace-nowrap px-5 py-4 rounded-xl border text-sm font-bold transition-all shadow-lg text-left ${publicPlayersCatId === c.id ? "bg-red-600/10 border-red-500 text-red-500" : "bg-gray-950/80 backdrop-blur-md border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"}`}
                       >
                          {c.name.toUpperCase()}
                       </button>
                    ))}
                 </div>
              </div>

              {/* Contenido Jugadores */}
              <div className="flex-1">
                {(() => {
                  const filteredPlayers = publicPlayersCatId === "all" ? players : players.filter(p => p.category_id === publicPlayersCatId);
                  
                  if (filteredPlayers.length === 0) {
                    return (
                      <div className="bg-gray-950/80 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-xl text-center mt-4 md:mt-0">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No hay parejas inscriptas en esta categoría.</p>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 md:mt-0">
                      {filteredPlayers.map(p => {
                        const catName = categories.find(c => c.id === p.category_id)?.name || p.categories?.name || 'Sin categoría';
                        const isExpanded = expandedPair === p.id;
                        
                        return (
                          <div key={p.id} className="flex flex-col relative mb-4">
                            {isExpanded ? (
                              <div className="flex flex-col gap-2 animate-fade-up">
                                 <div className="bg-gray-950/80 backdrop-blur-md border border-red-600/50 rounded-xl p-4 flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-red-600 flex items-center justify-center text-red-500 font-bold text-lg">{p.name.charAt(0)}</div>
                                     <div className="font-bold text-white text-base uppercase">{p.name}</div>
                                 </div>
                                 {p.partner && (
                                   <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-lg ml-6 relative">
                                       <div className="absolute -left-6 top-1/2 w-6 h-px bg-gray-700"></div>
                                       <div className="absolute -left-6 bottom-1/2 w-px h-[calc(50%+1rem)] bg-gray-700"></div>
                                       <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-gray-400 font-bold">{p.partner.charAt(0)}</div>
                                       <div className="font-bold text-gray-300 text-sm uppercase">{p.partner}</div>
                                   </div>
                                 )}
                                 <button onClick={() => setExpandedPair(null)} className="text-[10px] text-gray-400 hover:text-red-500 mt-2 uppercase tracking-widest flex items-center gap-1 w-max">
                                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                                   Ocultar pareja
                                 </button>
                              </div>
                            ) : (
                              <div 
                                onClick={() => setExpandedPair(p.id)}
                                className="relative cursor-pointer group h-28 w-full"
                              >
                                 {/* Background Card (Jugador 2) */}
                                 {p.partner && (
                                   <div className="absolute top-2 left-2 right-[-8px] bottom-[-8px] bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl transition-all duration-300 group-hover:top-3 group-hover:left-3 shadow-md opacity-80 flex items-end justify-end p-3">
                                      <span className="text-gray-500 font-title text-sm tracking-widest uppercase truncate max-w-[150px]">{p.partner}</span>
                                   </div>
                                 )}
                                 {/* Foreground Card (Jugador 1 y Detalles) */}
                                 <div className="absolute inset-0 bg-gray-950/90 backdrop-blur-md border border-gray-700 rounded-xl flex flex-col justify-center p-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 shadow-xl">
                                     <h3 className="text-sm font-bold text-white uppercase truncate">{p.name}</h3>
                                     {p.partner && <h3 className="text-sm font-bold text-gray-400 uppercase truncate mt-0.5">& {p.partner}</h3>}
                                     
                                     <div className="mt-auto pt-3">
                                       <div className="inline-block bg-red-600/10 text-red-500 text-[9px] uppercase tracking-widest px-2 py-1 rounded border border-red-600/20 font-bold w-max">
                                         {catName}
                                       </div>
                                     </div>
                                 </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
           </div>
        )}

        {mode === "admin" && view === "admin_home" && (
          <div className="animate-fade-up">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-6 border-b border-gray-800 pb-4 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-white uppercase tracking-widest">Panel de <span className="font-bold text-red-500">administración</span></h2>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Circuito Black Pádel</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full xl:w-auto xl:justify-end">
                <button onClick={() => setView("fixture")} className="flex-shrink-0 whitespace-nowrap bg-gray-900 text-gray-200 border border-gray-700 hover:border-red-600 hover:text-white font-semibold py-2 px-4 rounded-lg text-xs transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  Fixture
                </button>
                <button onClick={() => setView("admin_global_schedule")} className="flex-shrink-0 whitespace-nowrap bg-gray-900 text-gray-200 border border-gray-700 hover:border-red-600 hover:text-white font-semibold py-2 px-4 rounded-lg text-xs transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Gestor de horarios
                </button>
                <button onClick={() => setView("admin_payments")} className="flex-shrink-0 whitespace-nowrap bg-gray-900 text-gray-200 border border-gray-700 hover:border-red-600 hover:text-white font-semibold py-2 px-4 rounded-lg text-xs transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Pagos
                </button>
                <button onClick={handleAutoPilot} className="flex-shrink-0 whitespace-nowrap bg-gray-900 text-gray-200 border border-gray-700 hover:border-red-600 hover:text-white font-semibold py-2 px-4 rounded-lg text-xs transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  Sorteo general
                </button>
                <button onClick={() => setView("admin_players")} className="flex-shrink-0 whitespace-nowrap bg-gray-900 text-gray-200 border border-gray-700 hover:border-red-600 hover:text-white font-semibold py-2 px-4 rounded-lg text-xs transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  Jugadores
                </button>
              </div>
            </div>

            {/* ESTADISTICAS */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-8">
               <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 shadow-xl">
                 <div className="hidden sm:flex w-12 h-12 bg-red-600/20 text-red-500 rounded-full items-center justify-center">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                 </div>
                 <div>
                   <p className="text-gray-500 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">Parejas</p>
                   <p className="text-2xl font-bold text-white">{players.length}</p>
                 </div>
               </div>
               <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 shadow-xl">
                 <div className="hidden sm:flex w-12 h-12 bg-red-500/20 text-red-400 rounded-full items-center justify-center">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                 </div>
                 <div>
                   <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Categorías</p>
                   <p className="text-2xl font-bold text-white">{categories.length}</p>
                 </div>
               </div>
               <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 shadow-xl">
                 <div className="hidden sm:flex w-12 h-12 bg-white/20 text-gray-300 rounded-full items-center justify-center">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 </div>
                 <div>
                   <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Canchas</p>
                   <p className="text-2xl font-bold text-white">{courts.length}</p>
                 </div>
               </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Categorias */}
               <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-3">
                    <h3 className="text-lg font-bold text-white">Categorías del torneo</h3>
                    <button className="bg-red-600 text-white hover:bg-red-500 font-bold py-1.5 px-3 rounded text-[10px] uppercase tracking-widest transition-colors shadow-lg" onClick={handleAddCategory}>
                      Nueva categoría
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 mb-4 md:overflow-y-auto md:max-h-[500px] md:overscroll-contain custom-scrollbar pr-2">
                    {categories.length === 0 && <p className="text-gray-500 text-sm italic">No hay categorías creadas.</p>}
                    {categories.map(cat => (
                       <div key={cat.id} className="flex flex-col bg-gray-950 border border-gray-800 p-4 rounded-xl group hover:border-gray-700 transition-colors">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <span className="text-white font-bold text-lg">{cat.name}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-bold text-red-500 bg-red-950/30 px-2 py-0.5 rounded border border-red-900 uppercase tracking-widest">{players.filter(p => p.category_id === cat.id).length} Inscriptas</span>
                                {cat.current_step === 'americano' ? (
                                  <span className="text-[10px] font-bold text-red-400 bg-red-900/30 px-2 py-0.5 rounded border border-red-700 uppercase tracking-widest">Americano en curso</span>
                                ) : cat.current_step === 'bracket' ? (
                                  <span className="text-[10px] font-bold text-gray-300 bg-gray-800/30 px-2 py-0.5 rounded border border-gray-700 uppercase tracking-widest">Cuadro en curso</span>
                                ) : (
                                  <span className="text-[10px] font-bold text-gray-500 bg-gray-900 px-2 py-0.5 rounded border border-gray-800 uppercase tracking-widest">Pendiente</span>
                                )}
                              </div>
                            </div>
                            <button onClick={() => handleDeleteCategory(cat.id, cat.name)} className="text-gray-600 hover:text-red-400 p-1 transition-colors" title="Eliminar categoría">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => { setActiveCatId(cat.id); setView("admin_setup"); }} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs py-2 rounded-lg border border-gray-700 transition-colors">Configurar torneo</button>
                            <button 
                               onClick={() => { setActiveCatId(cat.id); setView("bracket"); }} 
                               className={`flex-1 font-semibold text-xs py-2 rounded-lg border transition-colors ${(cat.current_step === 'bracket' || cat.current_step === 'americano') ? 'bg-red-600/10 hover:bg-red-600/20 text-red-500 border-red-600/30' : 'bg-gray-900 text-gray-700 border-gray-800 cursor-not-allowed'}`} 
                               disabled={cat.current_step !== 'bracket' && cat.current_step !== 'americano'}
                            >
                               Ver resultados
                            </button>
                          </div>
                       </div>
                    ))}
                  </div>
               </div>

               {/* Canchas */}
               <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col h-fit">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-3">
                    <h3 className="text-lg font-bold text-white">Canchas</h3>
                    <button className="bg-white text-gray-900 hover:bg-gray-300 font-bold py-1.5 px-3 rounded text-[10px] uppercase tracking-widest transition-colors shadow-lg" onClick={handleAddCourt}>
                      Nueva cancha
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 mb-4 md:overflow-y-auto md:max-h-[350px] md:overscroll-contain custom-scrollbar pr-2">
                    {courts.length === 0 && <p className="text-gray-500 text-sm italic">No hay canchas registradas.</p>}
                    {courts.map(c => (
                       <div key={c.id} className="flex justify-between items-center bg-gray-950 border border-gray-800 p-4 rounded-xl group hover:border-gray-700 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 border border-gray-700">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <span className="text-white font-bold">{c.name}</span>
                          </div>
                          <div className="flex gap-2">
                             <button 
                               onClick={() => { setActiveCourtId(c.id); setView("court_schedule"); }}
                               className="bg-white/10 text-gray-300 border border-white/20 px-3 py-1.5 rounded text-xs font-bold transition-colors hover:bg-white hover:text-gray-900"
                             >
                                Turnos
                             </button>
                             <button onClick={() => handleDeleteCourt(c.id, c.name)} className="bg-red-900/10 text-red-400 hover:bg-red-900/40 border border-red-900/20 p-1.5 rounded transition-colors" title="Eliminar cancha">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                             </button>
                          </div>
                       </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {mode === "admin" && view === "admin_players" && (
          <AdminPlayers 
            players={players} 
            categories={categories} 
            onBack={() => setView("admin_home")} 
            onPlayersUpdate={handlePlayersUpdate} 
            showToast={showToast}
            matches={matches}
            onPairRenamed={handlePairRenamed}
          />
        )}

        {mode === "admin" && view === "admin_payments" && (
          <AdminPayments 
            players={players} 
            categories={categories} 
            onBack={() => setView("admin_home")} 
            onPlayersUpdate={handlePlayersUpdate} 
            showToast={showToast}
          />
        )}

        {mode === "admin" && view === "admin_global_schedule" && (
          <AdminGlobalScheduleSetup 
            matches={matches}
            categories={categories}
            courts={courts}
            onBack={() => setView("admin_home")}
            onGenerateGlobal={handleGenerateGlobalSchedule}
          />
        )}

        {mode === "admin" && view === "admin_setup" && (
          <AdminSetup 
            category={categories.find(c => c.id === activeCatId)} 
            players={players}
            categoryMatches={matches.filter(m => m.category_id === activeCatId)}
            onAddLatePair={(pair) => handleAddLatePair(activeCatId, pair)}
            onBack={async (action) => {
              if (action === 'view_bracket') {
                setView('bracket');
              } else if (action === 'delete_bracket') {
                const deleted = await deleteMatchesByCategory(activeCatId);
                const updated = deleted && await updateCategory(activeCatId, { current_step: 'registration' });
                if (!updated) return showToast("No se pudo eliminar el torneo.", "error");
                setCategories(prev => prev.map(c => c.id === activeCatId ? { ...c, current_step: 'registration' } : c));
                setMatches(await getMatches());
                showToast("Torneo eliminado.");
              } else {
                setView("admin_home");
              }
            }} 
            onGenerate={handleGenerateTournament} 
          />
        )}

        {view === "bracket" && activeCatId && (() => {
          const activeCat = categories.find(c => c.id === activeCatId);
          const catMatches = matches.filter(m => m.category_id === activeCatId);
          const isAmericano = activeCat?.current_step === 'americano' || catMatches.some(m => m.match_type === 'AMERICANO');

          if (!activeCat) return null;
          if (!loaded) return <p className="text-center text-sm text-gray-500 py-20">Cargando...</p>;
          if (catMatches.length === 0) {
            return (
              <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center animate-fade-up">
                <h2 className="text-xl font-title text-white uppercase tracking-widest mb-2">{activeCat.name}</h2>
                <p className="text-sm text-gray-400 mb-6">El sorteo de esta categoría todavía no se realizó.</p>
                <button onClick={() => setView(mode === "admin" ? "admin_home" : "home")} className="text-xs font-bold uppercase tracking-widest bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded border border-gray-700">
                  Volver
                </button>
              </div>
            );
          }

          if (isAmericano) {
            return (
              <AmericanoView 
                category={activeCat}
                allMatches={matches}
                unavailable={unavailable}
                courts={courts}
                mode={mode}
                onBack={() => setView(mode === "admin" ? "admin_home" : "home")}
                onMatchUpdate={handleMatchUpdate}
              />
            );
          }

          return (
            <BracketView 
              category={activeCat}
              allMatches={matches}
              unavailable={unavailable}
              courts={courts}
              mode={mode}
              onBack={() => setView(mode === "admin" ? "admin_home" : "home")}
              onMatchUpdate={handleMatchUpdate}
            />
          );
        })()}

        {view === "court_schedule" && activeCourtId && (
          <CourtSchedule 
            court={courts.find(c => c.id === activeCourtId)}
            courts={courts}
            onSelectCourt={setActiveCourtId}
            matches={matches}
            categories={categories}
            onBack={() => setView(mode === "admin" ? "admin_home" : "home")}
          />
        )}

        {mode === "public" && (
          <footer className="mt-16 pt-8 border-t border-gray-800/50 flex flex-col items-center justify-center text-center gap-4">
            <div className="text-gray-500 text-xs font-medium tracking-wide">
              Diseñado y desarrollado para <span className="font-bold text-white">Black Pádel</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/heythia_/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" title="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/thiago-lopez-284507219" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" title="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
              </a>
            </div>
            <div className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">
              Circuito Black Pádel v2.0
            </div>
          </footer>
        )}

      </main>

      {promptConfig && (
        <PromptModal 
          title={promptConfig.title}
          placeholder={promptConfig.placeholder}
          onConfirm={promptConfig.onConfirm}
          onCancel={() => setPromptConfig(null)}
        />
      )}

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      {mode === "public" && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 flex justify-around px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] z-50">
           <button onClick={() => setView("home")} className={`flex flex-col items-center gap-1 transition-colors ${view === "home" ? "text-red-500" : "text-gray-500 hover:text-gray-300"}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">Torneo</span>
           </button>
           <button onClick={() => setView("fixture")} className={`flex flex-col items-center gap-1 transition-colors ${view === "fixture" ? "text-red-500" : "text-gray-500 hover:text-gray-300"}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">Fixture</span>
           </button>
           <button onClick={() => setView("players")} className={`flex flex-col items-center gap-1 transition-colors ${view === "players" ? "text-red-500" : "text-gray-500 hover:text-gray-300"}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">Jugadores</span>
           </button>
        </div>
      )}

    </>
  );
}
