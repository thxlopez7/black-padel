"use client";

import { useMemo, useState } from "react";
import { PairName } from "./UIComponents";
import { formatTime, scheduleSortKey } from "../lib/format";

const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function dayLabel(date) {
  if (!date) return 'Sin horario asignado';
  const [y, m, d] = date.split('-').map(Number);
  return `${WEEKDAYS[new Date(y, m - 1, d).getDay()]} ${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}`;
}

const normalize = (text) => (text || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function scoreText(match) {
  if (!match.winner) return null;
  if (match.is_wo) return 'W.O.';
  return (match.p1_score || [])
    .map((g, i) => (g === '' || g == null ? null : `${g}-${match.p2_score?.[i] ?? ''}`))
    .filter(Boolean)
    .join(' ');
}

// Programación completa del torneo: quién juega contra quién, cuándo y dónde
export default function FixtureView({ matches, categories, courts, onBack }) {
  const [categoryId, setCategoryId] = useState("all");
  const [query, setQuery] = useState("");

  const courtOrder = (id) => { const i = courts.findIndex(c => c.id === id); return i === -1 ? 999 : i; };

  const days = useMemo(() => {
    const q = normalize(query.trim());
    const visible = matches
      .filter(m => !m.is_bye && m.p1_name !== 'BYE' && m.p2_name !== 'BYE')
      .filter(m => categoryId === "all" || m.category_id === categoryId)
      // En la vista general solo se listan partidos ya programados
      .filter(m => categoryId !== "all" || m.match_date)
      .filter(m => !q || normalize(`${m.p1_name} ${m.p2_name}`).includes(q))
      .sort((a, b) => scheduleSortKey(a).localeCompare(scheduleSortKey(b)) || courtOrder(a.court_id) - courtOrder(b.court_id));

    const groups = new Map();
    visible.forEach(m => {
      const key = m.match_date || 'none';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(m);
    });
    return [...groups.entries()].map(([date, list]) => ({ date: date === 'none' ? null : date, list }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, categoryId, query, courts]);

  const courtName = (id) => courts.find(c => c.id === id)?.name || 'Sin cancha';
  const categoryName = (id) => categories.find(c => c.id === id)?.name || '';

  return (
    <div className="animate-fade-up max-w-4xl mx-auto w-full">
      {onBack && (
        <button onClick={onBack} className="mb-4 text-gray-400 hover:text-white text-xs bg-gray-900 py-1.5 px-3 rounded border border-gray-800">
          Volver al panel
        </button>
      )}
      <h2 className="text-2xl sm:text-3xl font-title text-white mb-1 uppercase tracking-widest">Fixture</h2>
      <p className="text-xs text-gray-400 mb-5">Todos los partidos del torneo por día y horario.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full bg-gray-950 border border-gray-800 text-white rounded-lg p-3 text-sm outline-none focus:border-red-600">
          <option value="all">Todas las categorías</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar jugador"
          className="w-full bg-gray-950 border border-gray-800 text-white rounded-lg p-3 text-sm outline-none focus:border-red-600"
        />
      </div>

      {days.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-12 border border-dashed border-gray-800 rounded-xl">No hay partidos para mostrar.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {days.map(day => (
            <section key={day.date || 'none'}>
              <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-3 sticky top-16 bg-black/90 backdrop-blur py-2 z-10">
                {dayLabel(day.date)}
              </h3>
              <div className="flex flex-col gap-2">
                {day.list.map(m => {
                  const score = scoreText(m);
                  return (
                    <div key={m.id} className="bg-gray-950 border border-gray-800 rounded-xl p-3 sm:p-4 grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr_auto] gap-3 items-center">
                      <div className="text-center">
                        <div className="text-base sm:text-lg font-bold text-white">{formatTime(m.match_time) || '--:--'}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{m.match_date ? courtName(m.court_id) : ''}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                          {categoryName(m.category_id)} · {m.round_name}
                        </div>
                        <div className="flex flex-col gap-1 text-xs sm:text-sm">
                          <div className={m.winner && m.winner === m.p1_name ? 'text-white font-bold' : 'text-gray-300'}><PairName name={m.p1_name} /></div>
                          <div className="text-[10px] text-gray-600 uppercase">contra</div>
                          <div className={m.winner && m.winner === m.p2_name ? 'text-white font-bold' : 'text-gray-300'}><PairName name={m.p2_name} /></div>
                        </div>
                      </div>
                      {score && (
                        <div className="col-span-2 sm:col-span-1 text-right text-xs">
                          <span className="inline-block bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white font-semibold">{score}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
