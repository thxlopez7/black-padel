"use client";

import { PairName } from "./UIComponents";
import { useState, useMemo } from "react";
import { calculateAmericanoStandings, POINTS_PER_WIN } from "../lib/tournamentLogic";
import MatchEditorModal from "./MatchEditorModal";
import { formatMatchSchedule } from "../lib/format";

// Marcador desde el punto de vista del ganador: "6-3 4-6 7-5"
function finalScoreFor(match) {
  const winnerIsP1 = match.winner === match.p1_name;
  const own = winnerIsP1 ? match.p1_score : match.p2_score;
  const rival = winnerIsP1 ? match.p2_score : match.p1_score;
  return (own || []).map((g, i) => (g === '' || g == null ? null : `${g}-${rival?.[i] ?? ''}`)).filter(Boolean).join(' ');
}

export default function AmericanoView({ category, allMatches, courts, mode, onBack, onMatchUpdate }) {
  const [activeTab, setActiveTab] = useState("all"); // "all", "standings", "matches"
  const [editingMatch, setEditingMatch] = useState(null);

  // Filtrar partidos de esta categoría
  const matches = useMemo(() => {
    return allMatches.filter(m => m.category_id === category.id);
  }, [allMatches, category.id]);

  const regularMatches = useMemo(() => {
    return matches.filter(m => m.match_type === 'AMERICANO' && !m.is_bye);
  }, [matches]);

  const finalMatches = useMemo(() => {
    return matches.filter(m => m.match_type === 'AMERICANO_FINAL');
  }, [matches]);

  const semiMatches = useMemo(() => {
    return matches.filter(m => m.match_type === 'AMERICANO_SEMI').sort((a, b) => a.round_name.localeCompare(b.round_name));
  }, [matches]);

  // Obtener lista única de parejas de esta categoría
  const pairNames = useMemo(() => {
    const namesSet = new Set();
    regularMatches.forEach(m => {
      if (m.p1_name && m.p1_name !== 'BYE') namesSet.add(m.p1_name);
      if (m.p2_name && m.p2_name !== 'BYE') namesSet.add(m.p2_name);
    });
    return Array.from(namesSet);
  }, [regularMatches]);

  // Calcular la tabla de posiciones en tiempo real
  const standings = useMemo(() => {
    return calculateAmericanoStandings(pairNames, regularMatches);
  }, [pairNames, regularMatches]);

  // Agrupar partidos por Ronda / Fecha
  const matchesByRound = useMemo(() => {
    const roundsMap = {};
    regularMatches.forEach(m => {
      const rIndex = m.round_index ?? 0;
      if (!roundsMap[rIndex]) {
        roundsMap[rIndex] = {
          name: m.round_name ? m.round_name.split(' - ')[0] : `Fecha ${rIndex + 1}`,
          matches: []
        };
      }
      roundsMap[rIndex].matches.push(m);
    });

    return Object.keys(roundsMap)
      .map(Number)
      .sort((a, b) => a - b)
      .map(k => ({
        index: k,
        name: roundsMap[k].name,
        matches: roundsMap[k].matches.sort((a, b) => a.match_index - b.match_index)
      }));
  }, [regularMatches]);

  // Estadísticas del torneo
  const totalMatches = regularMatches.length;
  const completedMatches = regularMatches.filter(m => m.winner && m.winner !== 'null').length;
  const progressPercent = totalMatches > 0 ? Math.round((completedMatches / totalMatches) * 100) : 0;
  const groupStageCompleted = totalMatches > 0 && completedMatches === totalMatches;
  const finalMatch = finalMatches[0];

  const hasPlayed = completedMatches > 0;
  const currentLeader = hasPlayed && standings.length > 0 ? standings[0] : null;
  // Con final el campeón es su ganador; sin final, el 1º de la tabla al terminar todas las fechas
  const champion = finalMatch
    ? (finalMatch.winner ? standings.find(t => t.name === finalMatch.winner) : null)
    : (groupStageCompleted ? currentLeader : null);
  const highlighted = champion || currentLeader;

  return (
    <div className="flex flex-col h-full relative animate-fade-up">
      {/* HEADER SUPERIOR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-800 gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="text-gray-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors bg-gray-900 hover:bg-gray-800 py-2 px-3.5 rounded-lg border border-gray-700 shadow-md font-semibold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-title text-white uppercase tracking-wider">{category.name}</h2>
              <span className="bg-red-600/20 text-red-500 border border-red-600/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                Americano
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Todos contra todos por puntos, {standings.length} parejas</p>
          </div>
        </div>

        {/* SELECTOR DE VISTAS / TABS */}
        <div className="flex bg-gray-950 p-1 rounded-xl border border-gray-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
              activeTab === "all" ? "bg-red-600 text-white shadow-lg shadow-red-900/40" : "text-gray-400 hover:text-white"
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("standings")}
            className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
              activeTab === "standings" ? "bg-red-600 text-white shadow-lg shadow-red-900/40" : "text-gray-400 hover:text-white"
            }`}
          >
            Tabla
          </button>
          <button
            onClick={() => setActiveTab("matches")}
            className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
              activeTab === "matches" ? "bg-red-600 text-white shadow-lg shadow-red-900/40" : "text-gray-400 hover:text-white"
            }`}
          >
            Partidos ({completedMatches}/{totalMatches})
          </button>
        </div>
      </div>

      {/* BARRA DE ESTADO / PROGRESS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Progreso del torneo</span>
            <span className="text-lg font-bold text-white">{completedMatches} de {totalMatches} partidos</span>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-red-500">{progressPercent}%</span>
            <div className="w-24 bg-gray-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-red-600 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">
              {champion ? "Campeón" : "Puntero"}
            </span>
            <span className="text-sm sm:text-base font-bold text-yellow-400 block">
              {highlighted ? highlighted.name : "Sin disputar"}
            </span>
          </div>
          {highlighted && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded text-xs font-bold">
              {highlighted.pts} pts, {highlighted.pg} PG
            </div>
          )}
        </div>

        <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Fechas</span>
            <span className="text-lg font-bold text-white">{matchesByRound.length} {matchesByRound.length === 1 ? "fecha" : "fechas"}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 font-medium">Todos contra todos</span>
            <span className="text-[10px] text-red-400 block uppercase font-bold mt-0.5">{POINTS_PER_WIN} puntos por victoria</span>
          </div>
        </div>
      </div>

      {/* BANNER DE CAMPEÓN SI FINALIZÓ */}
      {champion && (
        <div className="bg-gradient-to-r from-yellow-500/20 via-red-600/20 to-yellow-500/20 border-2 border-yellow-500/60 rounded-2xl p-6 mb-8 text-center animate-fade-up">
          <div className="inline-block p-2 bg-yellow-500/10 rounded-full border border-yellow-500/30 mb-2">
            <svg className="w-8 h-8 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 011.104 1.664l-1.01 1.01a6.002 6.002 0 01-3.647 5.2V14h1a1 1 0 110 2H6a1 1 0 110-2h1v-2.02a6.002 6.002 0 01-3.647-5.2l-1.01-1.01A1 1 0 013.447 4.1l1.599.8L9 3.323V3a1 1 0 011-1zm-1 9.948V14h2v-2.052a4.002 4.002 0 000-7.896V3.708L8 4.708l-1.5 1.5A4.002 4.002 0 009 11.948z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-1">Campeones</h3>
          <div className="text-2xl sm:text-3xl font-title font-black text-white uppercase tracking-wider mb-2">
            {champion.name}
          </div>
          {finalMatch?.winner ? (
            <p className="text-xs text-gray-300 font-semibold">
              {finalMatch.is_wo
                ? `Ganó la final por W.O. ante ${finalMatch.winner === finalMatch.p1_name ? finalMatch.p2_name : finalMatch.p1_name}`
                : `Ganó la final ${finalScoreFor(finalMatch)} ante ${finalMatch.winner === finalMatch.p1_name ? finalMatch.p2_name : finalMatch.p1_name}`}
            </p>
          ) : (
            <div className="flex justify-center items-center gap-4 text-xs text-gray-300 font-semibold">
              <span>{champion.pg} victorias</span>
              <span className="w-px h-3 bg-gray-700" aria-hidden="true" />
              <span>{champion.pts} puntos</span>
              <span className="w-px h-3 bg-gray-700" aria-hidden="true" />
              <span>Diferencia de games {champion.diff > 0 ? `+${champion.diff}` : champion.diff}</span>
            </div>
          )}
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className={`grid gap-8 ${activeTab === "all" ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
        {/* SECCIÓN TABLA DE POSICIONES */}
        {(activeTab === "all" || activeTab === "standings") && (
          <div className={`${activeTab === "all" ? "lg:col-span-7" : "w-full"} flex flex-col gap-4`}>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-gray-800 bg-gray-950 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Tabla de Posiciones
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Clasificación actualizada con cada resultado</p>
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-gray-900 px-2.5 py-1 rounded border border-gray-800">
                  {standings.length} parejas
                </span>
              </div>

              {/* TABLA RESPONSIVE */}
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-950/70 border-b border-gray-800 text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">
                      <th className="py-3 px-3 text-center w-12">#</th>
                      <th className="py-3 px-4 text-left">Pareja</th>
                      <th className="py-3 px-2 w-10">PJ</th>
                      <th className="py-3 px-2 w-10">PG</th>
                      <th className="py-3 px-2 w-10">PP</th>
                      <th className="py-3 px-2 w-12">GF</th>
                      <th className="py-3 px-2 w-12">GC</th>
                      <th className="py-3 px-2 w-12">DIF</th>
                      <th className="py-3 px-3 w-16 bg-red-950/20 text-red-400 font-black">PTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-medium">
                    {standings.map((team, idx) => {
                      const isFirst = hasPlayed && idx === 0;
                      const isSecond = hasPlayed && idx === 1;
                      const isThird = hasPlayed && idx === 2;

                      let badgeClass = "text-gray-400 bg-gray-900 border-gray-800";
                      let medal = idx + 1;
                      if (isFirst) {
                        badgeClass = "text-yellow-400 bg-yellow-500/10 border-yellow-500/30 font-bold";
                        
                      } else if (isSecond) {
                        badgeClass = "text-slate-300 bg-slate-500/10 border-slate-400/30 font-bold";
                        
                      } else if (isThird) {
                        badgeClass = "text-amber-500 bg-amber-700/10 border-amber-600/30 font-bold";
                        
                      }

                      return (
                        <tr 
                          key={team.name}
                          className={`hover:bg-gray-800/40 transition-colors ${
                            isFirst ? "bg-red-950/10 font-semibold" : ""
                          }`}
                        >
                          <td className="py-3 px-3 text-center">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] border ${badgeClass}`}>
                              {medal}
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:px-4 min-w-[150px] text-white">
                            <div className="font-bold flex items-center gap-2">
                              <PairName name={team.name} />
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center text-gray-300">{team.pj}</td>
                          <td className="py-3 px-2 text-center text-green-400 font-bold">{team.pg}</td>
                          <td className="py-3 px-2 text-center text-red-400/80">{team.pp}</td>
                          <td className="py-3 px-2 text-center text-gray-300">{team.gf}</td>
                          <td className="py-3 px-2 text-center text-gray-400">{team.gc}</td>
                          <td className="py-3 px-2 text-center font-bold">
                            <span className={team.diff > 0 ? "text-green-400" : team.diff < 0 ? "text-red-400" : "text-gray-400"}>
                              {team.diff > 0 ? `+${team.diff}` : team.diff}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center bg-red-950/20 font-black text-sm text-red-500">
                            {team.pts}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-gray-950/60 border-t border-gray-800 text-[10px] text-gray-500 flex flex-wrap justify-between items-center gap-2">
                <span>Desempate: puntos, resultado entre sí (empate entre dos parejas), diferencia de sets, diferencia de games y games a favor.</span>
                <span>PJ: jugados. PG: ganados. PP: perdidos.</span>
              </div>
            </div>

            {/* SEMIFINALES: 1º vs 2º y 3º vs 4º de la tabla */}
            {semiMatches.length > 0 && (
              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-2xl mt-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Semifinales</h4>
                <p className="text-[11px] text-gray-400 mb-3">1º vs 2º · 3º vs 4º</p>
                <div className="space-y-3">
                  {semiMatches.map(m => (
                    <div key={m.id}>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{m.round_name}</p>
                      <MatchCard match={m} courts={courts} mode={mode} onEdit={setEditingMatch} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FINAL */}
            {finalMatches.length > 0 && (
              <div className="bg-gray-900 border border-yellow-500/40 rounded-2xl p-5 shadow-2xl mt-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-500 text-gray-950 text-[9px] font-black uppercase px-3 py-0.5 rounded-bl-lg tracking-widest">
                  Final
                </div>
                <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 011.104 1.664l-1.01 1.01a6.002 6.002 0 01-3.647 5.2V14h1a1 1 0 110 2H6a1 1 0 110-2h1v-2.02a6.002 6.002 0 01-3.647-5.2l-1.01-1.01A1 1 0 013.447 4.1l1.599.8L9 3.323V3a1 1 0 011-1zm-1 9.948V14h2v-2.052a4.002 4.002 0 000-7.896V3.708L8 4.708l-1.5 1.5A4.002 4.002 0 009 11.948z" clipRule="evenodd" />
                  </svg>
                  {semiMatches.length > 0 ? 'Final: ganadores de las semifinales' : 'Final: 1º contra 2º'}
                </h4>
                <div className="space-y-3">
                  {finalMatches.map(m => (
                    <MatchCard key={m.id} match={m} courts={courts} mode={mode} onEdit={setEditingMatch} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECCIÓN FIXTURE Y PARTIDOS POR FECHA */}
        {(activeTab === "all" || activeTab === "matches") && (
          <div className={`${activeTab === "all" ? "lg:col-span-5" : "w-full"} flex flex-col gap-6`}>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Partidos y Resultados
              </h3>
              {mode === "admin" && (
                <span className="text-[10px] text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900 font-bold uppercase tracking-widest">
                  Seleccioná un partido para cargar el resultado
                </span>
              )}
            </div>

            {matchesByRound.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-500">
                No hay partidos generados aún para esta categoría.
              </div>
            ) : (
              matchesByRound.map(round => {
                const roundCompleted = round.matches.filter(m => m.winner).length;
                return (
                  <div key={round.index} className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5 shadow-xl">
                    <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-gray-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{round.name}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-950 px-2 py-1 rounded border border-gray-800">
                        {roundCompleted} de {round.matches.length} jugados
                      </span>
                    </div>

                    <div className="flex flex-col gap-4">
                      {round.matches.map(m => (
                        <MatchCard key={m.id} match={m} courts={courts} mode={mode} onEdit={setEditingMatch} />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* MODAL EDITOR DE PARTIDOS (ADMIN) */}
      {editingMatch && (
        <MatchEditorModal 
          match={editingMatch}
          allMatches={allMatches}
          courts={courts} 
          onClose={() => setEditingMatch(null)} 
          onSave={async (updates) => {
            if (await onMatchUpdate(editingMatch, updates)) setEditingMatch(null);
          }}
        />
      )}
    </div>
  );
}

function MatchCard({ match, courts, mode, onEdit }) {
  const isByeMatch = match.is_bye;
  const p1Score = match.p1_score || ['', '', ''];
  const p2Score = match.p2_score || ['', '', ''];
  const isWOP1 = match.is_wo && match.winner === match.p1_name;
  const isWOP2 = match.is_wo && match.winner === match.p2_name;

  const p1IsWinner = match.winner && match.winner === match.p1_name;
  const p2IsWinner = match.winner && match.winner === match.p2_name;
  const hasWinner = match.winner && match.winner !== 'null' && match.winner !== 'BYE';

  const courtName = courts.find(c => c.id === match.court_id)?.name || 'Sin cancha';
  const dateStr = formatMatchSchedule(match);

  const isPending = [match.p1_name, match.p2_name].some(n => !n || n.includes('Tabla Americano') || n.startsWith('Ganador '));
  const isEditable = mode === 'admin' && !isPending && !isByeMatch;

  const p1Classes = `grid grid-cols-[1fr_28px_28px_28px] items-stretch min-h-[44px] transition-all relative ${
    p1IsWinner ? 'bg-red-950/30' : hasWinner ? 'opacity-40' : 'bg-gray-900'
  }`;
  const p2Classes = `grid grid-cols-[1fr_28px_28px_28px] items-stretch min-h-[44px] transition-all relative ${
    p2IsWinner ? 'bg-red-950/30' : hasWinner ? 'opacity-40' : 'bg-gray-900'
  }`;

  const scoreBoxClass = (isWinner, hasWinnerMatch) => 
    `border-l border-gray-800 text-center text-[0.8rem] flex items-center justify-center h-full transition-colors ${
      isWinner ? 'bg-red-600/20 text-red-500 font-black' : 
      hasWinnerMatch ? 'bg-gray-900/50 text-gray-500 font-medium' : 
      'bg-gray-800 text-gray-200 font-semibold'
    }`;

  return (
    <div 
      data-testid="americano-match-card"
      className={`bg-gray-950 border ${hasWinner ? 'border-gray-700 shadow-md' : 'border-gray-800'} rounded-xl overflow-hidden transition-all duration-300 ${
        isEditable ? 'cursor-pointer hover:border-red-600 group' : ''
      }`}
      onClick={() => isEditable && onEdit(match)}
    >
      <div className={`text-[0.65rem] font-bold tracking-widest uppercase px-3.5 py-1.5 flex justify-between items-center transition-colors ${
        hasWinner ? 'bg-gray-800/80 text-red-500 border-b border-gray-700' : 'bg-red-950/40 text-gray-300 border-b border-red-900/30'
      }`}>
        <span className="flex items-center gap-1.5">
          {hasWinner && (
            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {match.round_name}
        </span>
        {isEditable && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-red-400 font-bold flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Cargar resultado
          </span>
        )}
      </div>

      <div className={p1Classes}>
        {p1IsWinner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />}
        <div className={`text-xs px-3.5 py-1.5 min-w-0 flex items-center ${p1IsWinner ? 'text-white font-bold' : !match.p1_name ? 'text-gray-500 italic' : 'text-gray-300'}`}>
          <PairName name={match.p1_name} />
        </div>
        <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{isWOP1 ? 'W' : p1Score[0]}</div>
        <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{isWOP1 ? 'O' : p1Score[1]}</div>
        <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{p1Score[2]}</div>
      </div>

      <div className="h-[1px] w-full bg-gray-800/60" />

      <div className={p2Classes}>
        {p2IsWinner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />}
        <div className={`text-xs px-3.5 py-1.5 min-w-0 flex items-center ${p2IsWinner ? 'text-white font-bold' : !match.p2_name ? 'text-gray-500 italic' : 'text-gray-300'}`}>
          <PairName name={match.p2_name} />
        </div>
        <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{isWOP2 ? 'W' : p2Score[0]}</div>
        <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{isWOP2 ? 'O' : p2Score[1]}</div>
        <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{p2Score[2]}</div>
      </div>

      <div className="flex justify-between items-center text-[0.65rem] text-gray-400 font-medium px-3.5 py-2 bg-gray-950 border-t border-gray-800">
        <span className="flex items-center gap-1.5">
          <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {dateStr}
        </span>
        <span className="flex items-center gap-1.5 truncate max-w-[50%]">
          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {courtName}
        </span>
      </div>
    </div>
  );
}
