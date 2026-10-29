"use client";

import { useEffect, useMemo, useState } from "react";
import { PairName } from "./UIComponents";
import { formatTime, scheduleSortKey } from "../lib/format";

const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function dayLabel(date) {
  const [y, m, d] = date.split('-').map(Number);
  return `${WEEKDAYS[new Date(y, m - 1, d).getDay()]} ${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}`;
}

const isPlayable = (m) => !m.is_bye && m.p1_name !== 'BYE' && m.p2_name !== 'BYE';

// Partidos de una cancha agrupados por día; se puede cambiar de cancha sin volver al inicio
export default function CourtSchedule({ court, courts = [], matches, categories, onBack, onSelectCourt }) {
  // Al abrir o cambiar de cancha, la lista empieza desde arriba (el primer día)
  useEffect(() => { window.scrollTo(0, 0); }, [court.id]);

  // Días del torneo con algún partido programado, en cualquier cancha
  const days = useMemo(
    () => [...new Set(matches.filter(m => m.match_date && isPlayable(m)).map(m => m.match_date))].sort(),
    [matches]
  );
  const courtMatches = matches
    .filter(m => m.court_id === court.id && m.match_date && isPlayable(m))
    .sort((a, b) => scheduleSortKey(a).localeCompare(scheduleSortKey(b)));
  const [day, setDay] = useState('all');
  const shownDays = day === 'all' ? days : [day];

  return (
    <div className="animate-fade-up max-w-4xl mx-auto w-full">
      <button onClick={onBack} className="mb-4 text-gray-400 hover:text-white text-xs flex items-center gap-2 transition-colors bg-gray-900 py-2 px-4 rounded border border-gray-800 uppercase tracking-widest font-semibold">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Volver
      </button>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-8 shadow-2xl">
        <h2 className="text-xl font-light text-white mb-4">
          Partidos en <span className="font-bold text-red-500">{court.name}</span>
        </h2>

        {courts.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
            {courts.map(c => (
              <button key={c.id} onClick={() => onSelectCourt?.(c.id)} className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${c.id === court.id ? 'bg-red-600/15 border-red-600/50 text-red-400' : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'}`}>
                {c.name}
              </button>
            ))}
          </div>
        )}
        {days.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 border-b border-gray-800">
            {['all', ...days].map(d => (
              <button key={d} onClick={() => setDay(d)} className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${d === day ? 'bg-white/10 border-gray-600 text-white' : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'}`}>
                {d === 'all' ? 'Todos los días' : dayLabel(d)}
              </button>
            ))}
          </div>
        )}

        {days.length === 0 ? (
          <p className="text-sm text-gray-500 italic p-4 text-center border border-dashed border-gray-800 rounded-lg">Todavía no hay partidos programados.</p>
        ) : (
          <div className="space-y-8">
            {shownDays.map(d => {
              const list = courtMatches.filter(m => m.match_date === d);
              return (
                <section key={d}>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                    {dayLabel(d)}
                    <span className="text-[10px] font-semibold text-gray-500 normal-case tracking-normal">{list.length} {list.length === 1 ? 'partido' : 'partidos'}</span>
                  </h3>
                  {list.length === 0 ? (
                    <p className="text-xs text-gray-500 italic p-3 border border-dashed border-gray-800 rounded-lg">Sin partidos en esta cancha este día.</p>
                  ) : (
                    <div className="space-y-3">
                      {list.map(m => <CourtMatch key={m.id} match={m} categories={categories} />)}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CourtMatch({ match: m, categories }) {
  const catName = categories.find(c => c.id === m.category_id)?.name || 'Sin categoría';
  const p1Score = m.p1_score || ['', '', ''];
  const p2Score = m.p2_score || ['', '', ''];
  const isWOP1 = m.is_wo && m.winner === m.p1_name;
  const isWOP2 = m.is_wo && m.winner === m.p2_name;
  const isP1Winner = m.winner === m.p1_name && m.p1_name;
  const isP2Winner = m.winner === m.p2_name && m.p2_name;
  const scoreCell = "border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900";

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
      <div className="bg-gray-800/50 text-gray-300 text-[10px] font-bold tracking-wider uppercase px-4 py-2 flex justify-between gap-3 border-b border-gray-800">
        <span className="min-w-0 truncate">{m.round_name} · {catName}</span>
        <span className="text-red-500 shrink-0">{formatTime(m.match_time)}</span>
      </div>
      <div className={`grid grid-cols-[1fr_30px_30px_30px] items-stretch min-h-[44px] border-b border-gray-800 ${isP1Winner ? 'bg-white/5 font-bold text-white' : 'text-gray-300'}`}>
        <div className="px-4 py-1.5 text-xs min-w-0"><PairName name={m.p1_name} /></div>
        <div className={scoreCell}>{isWOP1 ? 'W' : p1Score[0]}</div>
        <div className={scoreCell}>{isWOP1 ? 'O' : p1Score[1]}</div>
        <div className={scoreCell}>{p1Score[2]}</div>
      </div>
      <div className={`grid grid-cols-[1fr_30px_30px_30px] items-stretch min-h-[44px] ${isP2Winner ? 'bg-white/5 font-bold text-white' : 'text-gray-300'}`}>
        <div className="px-4 py-1.5 text-xs min-w-0"><PairName name={m.p2_name} /></div>
        <div className={scoreCell}>{isWOP2 ? 'W' : p2Score[0]}</div>
        <div className={scoreCell}>{isWOP2 ? 'O' : p2Score[1]}</div>
        <div className={scoreCell}>{p2Score[2]}</div>
      </div>
    </div>
  );
}
