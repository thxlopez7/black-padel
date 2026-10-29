"use client";

import { PairName } from "./UIComponents";
import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { winnerFromScore, checkMatchEdit, isPlaceholder } from "../lib/tournamentLogic";

// Lugares del cuadro que todavía no tienen pareja definida
const isPlaceholderName = isPlaceholder;
import { formatTime } from "../lib/format";

const EMPTY_SCORE = ['', '', ''];
const inputClass = "w-full bg-gray-900 border border-gray-700 rounded p-1.5 text-center text-sm text-white focus:border-red-600 outline-none";

export default function MatchEditorModal({ match, courts, allMatches = [], onClose, onSave }) {
  const [date, setDate] = useState(match.match_date || '');
  const [time, setTime] = useState(formatTime(match.match_time));
  const [courtId, setCourtId] = useState(match.court_id || '');
  const [p1Score, setP1Score] = useState(Array.isArray(match.p1_score) ? match.p1_score : EMPTY_SCORE);
  const [p2Score, setP2Score] = useState(Array.isArray(match.p2_score) ? match.p2_score : EMPTY_SCORE);
  const [isWo, setIsWo] = useState(Boolean(match.is_wo));
  const [woWinner, setWoWinner] = useState(match.is_wo ? match.winner || '' : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [p1Name, setP1Name] = useState(match.p1_name);
  const [p2Name, setP2Name] = useState(match.p2_name);
  const [confirmedWarnings, setConfirmedWarnings] = useState('');

  // Todos los cruces se pueden cambiar a mano. Zonas: intercambio entre zonas. Fechas del americano: sin jugar.
  // 2º partido, cuadro, semis y final: la pareja elegida queda fijada y la cascada automática no la reemplaza.
  const isZone = match.match_type === 'ZONE';
  const isRegularAmericano = match.match_type === 'AMERICANO';
  const isDerived = !isZone && !isRegularAmericano;
  const canEditPairs = (isRegularAmericano && !match.winner) || isZone || isDerived;
  const [manual, setManual] = useState(Boolean(match.manual_pairs));
  const categoryPairs = useMemo(() => {
    const source = isRegularAmericano || match.match_type.startsWith('AMERICANO_') ? 'AMERICANO' : 'ZONE';
    const names = [...new Set(
      allMatches
        .filter(m => m.category_id === match.category_id && m.match_type === source)
        .flatMap(m => [m.p1_name, m.p2_name])
        .filter(n => n && n !== 'BYE')
    )].sort();
    const current = [match.p1_name, match.p2_name].filter(n => n && n !== 'BYE' && !names.includes(n));
    return [...current, ...names, ...(source === 'ZONE' ? ['BYE'] : [])];
  }, [allMatches, match.category_id, match.match_type, match.p1_name, match.p2_name, isRegularAmericano]);
  const pickPair = (setter, value) => {
    setter(value);
    if (isDerived) setManual(true);
    setError('');
  };
  // El resultado solo se carga cuando ambos lados son parejas reales
  const canScore = !isPlaceholderName(p1Name) && !isPlaceholderName(p2Name);

  const edit = {
    p1_name: p1Name,
    p2_name: p2Name,
    ...(isDerived ? { manual_pairs: manual } : {}),
    match_date: date || null,
    match_time: time || null,
    court_id: courtId || null
  };
  const { errors, warnings } = checkMatchEdit(match, edit, allMatches);
  const warningsKey = warnings.join('|');

  const scoreResult = winnerFromScore(p1Name, p2Name, p1Score, p2Score);
  const winner = isWo ? woWinner || null : scoreResult.winner;

  const updateScore = (player, setIdx, val) => {
    const setter = player === 1 ? setP1Score : setP2Score;
    setter(prev => prev.map((v, i) => (i === setIdx ? val : v)));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canScore && isWo && !woWinner) return setError('Selecciona la pareja ganadora por W.O.');
    if (canScore && !isWo && scoreResult.error) return setError(scoreResult.error);
    if (errors.length > 0) return setError(errors[0]);
    if (warnings.length > 0 && confirmedWarnings !== warningsKey) {
      setConfirmedWarnings(warningsKey);
      return;
    }

    setLoading(true);
    if (!canScore) {
      // Pase libre o cruce por definir: solo cambia horario y, en zonas, las parejas
      await onSave(edit);
      setLoading(false);
      return;
    }
    await onSave({
      ...edit,
      is_wo: isWo,
      winner,
      p1_score: isWo ? EMPTY_SCORE : p1Score,
      p2_score: isWo ? EMPTY_SCORE : p2Score
    });
    setLoading(false);
  };

  const scoreRow = (name, score, player) => (
    <div className="grid grid-cols-[1fr_40px_40px_40px] gap-2 items-center">
      <div className={`text-xs min-w-0 ${winner === name ? 'text-white font-bold' : 'text-gray-300'}`}><PairName name={name} /></div>
      {[0, 1, 2].map(i => (
        <input
          key={i}
          type="number"
          inputMode="numeric"
          min="0"
          disabled={isWo}
          value={score[i] ?? ''}
          onChange={e => updateScore(player, i, e.target.value)}
          className={`${inputClass} disabled:opacity-30`}
        />
      ))}
    </div>
  );

  // Portal a <body>: los contenedores animados (transform) rompen el posicionamiento fixed
  return createPortal(
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-up">
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-950">
          <h3 className="text-lg font-bold text-red-500 uppercase tracking-wider">{match.round_name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors" aria-label="Cerrar">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Fecha</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-white focus:border-red-600 outline-none" />
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Hora</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-white focus:border-red-600 outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Cancha</label>
              <select value={courtId} onChange={e => setCourtId(e.target.value)} className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-white focus:border-red-600 outline-none">
                <option value="">Sin asignar</option>
                {courts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {canEditPairs && (
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 space-y-2">
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest">Cruce</label>
              {isZone && <p className="text-[11px] text-gray-400">Elegí otra pareja y se intercambian.</p>}
              {[[p1Name, setP1Name], [p2Name, setP2Name]].map(([value, setter], i) => (
                <select key={i} value={value || ""} onChange={e => pickPair(setter, e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs text-white focus:border-red-600 outline-none">
                  {!value && <option value="">A definir</option>}
                  {categoryPairs.map(p => <option key={p} value={p}>{p === 'BYE' ? 'Pase libre (BYE)' : p}</option>)}
                </select>
              ))}
              {isDerived && (
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input type="checkbox" checked={manual} onChange={e => { setManual(e.target.checked); if (!e.target.checked) { setP1Name(match.p1_name); setP2Name(match.p2_name); } }} className="w-4 h-4 rounded border-gray-700 bg-gray-900 accent-red-600" />
                  <span className="text-[11px] text-gray-300">Cruce fijado a mano (desmarcar para volver al automático)</span>
                </label>
              )}
            </div>
          )}

          {!canScore ? (
            <p className="bg-gray-950 border border-gray-800 rounded-lg p-4 text-xs text-gray-400">
              {[p1Name, p2Name].includes('BYE')
                ? 'Pase libre: avanza sin jugar.'
                : 'Esperando resultados anteriores.'}
            </p>
          ) : (<>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-[1fr_40px_40px_40px] gap-2 text-[10px] text-gray-500 uppercase tracking-widest text-center">
              <div className="text-left">Pareja</div><div>S1</div><div>S2</div><div>S3</div>
            </div>
            {scoreRow(p1Name, p1Score, 1)}
            {scoreRow(p2Name, p2Score, 2)}
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isWo} onChange={e => { setIsWo(e.target.checked); setError(''); }} className="w-4 h-4 rounded border-gray-700 bg-gray-900 accent-red-600" />
              <span className="text-sm text-gray-300 font-medium">Partido ganado por W.O.</span>
            </label>
            {isWo ? (
              <select value={woWinner} onChange={e => { setWoWinner(e.target.value); setError(''); }} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs text-white focus:border-red-600 outline-none">
                <option value="">Seleccionar ganador</option>
                <option value={p1Name}>{p1Name}</option>
                <option value={p2Name}>{p2Name}</option>
              </select>
            ) : (
              <p className="text-xs text-gray-400">
                Ganador: <span className="text-white font-bold">{winner || 'pendiente'}</span>
              </p>
            )}
          </div>
          </>)}

          {(errors.length > 0 || warnings.length > 0) && (
            <div className={`rounded p-3 text-xs space-y-1 border ${errors.length > 0 ? 'bg-red-500/10 border-red-500/50 text-red-300' : 'bg-yellow-500/10 border-yellow-600/50 text-yellow-200'}`}>
              {[...errors, ...warnings].map(w => <p key={w}>{w}</p>)}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded text-sm text-center">{error}</div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg uppercase tracking-widest text-sm transition-colors flex justify-center items-center gap-2">
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : warnings.length > 0 && confirmedWarnings === warningsKey ? "Confirmar y guardar" : "Guardar"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
