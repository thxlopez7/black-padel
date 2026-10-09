"use client";

import { useState } from "react";
import { updateMatch } from "../lib/supabaseService";
import SwapPairsModal from "./SwapPairsModal";
import AddPairToDrawModal from "./AddPairToDrawModal";

export default function BracketView({ 
  category, 
  categories = [], 
  onSelectCategory, 
  allMatches, 
  courts, 
  mode, 
  onBack, 
  onMatchUpdate,
  onPlayersUpdate,
  showToast
}) {
  const [editingMatch, setEditingMatch] = useState(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showAddPairModal, setShowAddPairModal] = useState(false);

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <p className="text-gray-400 text-sm">Categoría no encontrada.</p>
        <button onClick={onBack} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded text-xs">
          Volver
        </button>
      </div>
    );
  }

  // Filtrar partidos de esta categoría (estrictamente por category_id)
  const matches = allMatches.filter(m => String(m.category_id) === String(category.id));
  
  // Agrupar
  const zones = matches.filter(m => m.match_type === 'ZONE').sort((a, b) => a.match_index - b.match_index);
  const bracketMatches = matches.filter(m => m.match_type === 'BRACKET');
  
  // Agrupar bracket por rondas
  const bracketByRound = [];
  let maxRound = 0;
  bracketMatches.forEach(m => {
    if (m.round_index > maxRound) maxRound = m.round_index;
  });
  for(let i = 1; i <= maxRound; i++) {
    bracketByRound.push(bracketMatches.filter(m => m.round_index === i).sort((a, b) => a.match_index - b.match_index));
  }

  // Lógica de intercambio de parejas entre zonas
  const handleSwapPairs = async (slotA, slotB) => {
    if (slotA.matchId === slotB.matchId) {
      // Mismo partido de zona: intercambiar slot 1 y slot 2
      const match = slotA.match;
      const p1 = slotA.slotNum === 1 ? slotB.pairName : slotA.pairName;
      const p2 = slotA.slotNum === 2 ? slotB.pairName : slotA.pairName;
      const isP1Bye = !p1 || p1 === 'BYE';
      const isP2Bye = !p2 || p2 === 'BYE';
      const isBye = isP1Bye || isP2Bye;
      let autoWinner = null;
      let isComplete = false;
      if (isP1Bye && !isP2Bye) { autoWinner = p2; isComplete = true; }
      else if (isP2Bye && !isP1Bye) { autoWinner = p1; isComplete = true; }

      const updates = {
        p1_name: p1,
        p2_name: p2,
        is_bye: isBye,
        is_wo: isComplete,
        winner: autoWinner,
        p1_score: null,
        p2_score: null
      };

      const updated = await updateMatch(match.id, updates);
      if (updated && onMatchUpdate) {
        await onMatchUpdate(updated);
        showToast?.("Parejas intercambiadas con éxito.");
      }
    } else {
      // Zonas distintas
      const matchA = slotA.match;
      const matchB = slotB.match;

      const newA_P1 = slotA.slotNum === 1 ? slotB.pairName : matchA.p1_name;
      const newA_P2 = slotA.slotNum === 2 ? slotB.pairName : matchA.p2_name;
      const isP1ByeA = !newA_P1 || newA_P1 === 'BYE';
      const isP2ByeA = !newA_P2 || newA_P2 === 'BYE';
      const isByeA = isP1ByeA || isP2ByeA;
      let autoWinnerA = null;
      let isCompleteA = false;
      if (isP1ByeA && !isP2ByeA) { autoWinnerA = newA_P2; isCompleteA = true; }
      else if (isP2ByeA && !isP1ByeA) { autoWinnerA = newA_P1; isCompleteA = true; }

      const updatesA = {
        p1_name: newA_P1,
        p2_name: newA_P2,
        is_bye: isByeA,
        is_wo: isCompleteA,
        winner: autoWinnerA,
        p1_score: null,
        p2_score: null
      };

      const newB_P1 = slotB.slotNum === 1 ? slotA.pairName : matchB.p1_name;
      const newB_P2 = slotB.slotNum === 2 ? slotA.pairName : matchB.p2_name;
      const isP1ByeB = !newB_P1 || newB_P1 === 'BYE';
      const isP2ByeB = !newB_P2 || newB_P2 === 'BYE';
      const isByeB = isP1ByeB || isP2ByeB;
      let autoWinnerB = null;
      let isCompleteB = false;
      if (isP1ByeB && !isP2ByeB) { autoWinnerB = newB_P2; isCompleteB = true; }
      else if (isP2ByeB && !isP1ByeB) { autoWinnerB = newB_P1; isCompleteB = true; }

      const updatesB = {
        p1_name: newB_P1,
        p2_name: newB_P2,
        is_bye: isByeB,
        is_wo: isCompleteB,
        winner: autoWinnerB,
        p1_score: null,
        p2_score: null
      };

      const [updatedA, updatedB] = await Promise.all([
        updateMatch(matchA.id, updatesA),
        updateMatch(matchB.id, updatesB)
      ]);

      if (updatedA && onMatchUpdate) await onMatchUpdate(updatedA);
      if (updatedB && onMatchUpdate) await onMatchUpdate(updatedB);
      showToast?.("Parejas intercambiadas entre zonas exitosamente.");
    }
  };

  const MatchCard = ({ match }) => {
    const isByeMatch = match.is_bye;
    
    const p1Score = match.p1_score || ['','',''];
    const p2Score = match.p2_score || ['','',''];
    
    const isWOP1 = match.is_wo && match.winner === match.p1_name;
    const isWOP2 = match.is_wo && match.winner === match.p2_name;

    const p1IsWinner = match.winner && match.winner === match.p1_name;
    const p2IsWinner = match.winner && match.winner === match.p2_name;
    const hasWinner = match.winner && match.winner !== 'null';

    const p1Classes = `grid grid-cols-[1fr_28px_28px_28px] items-center h-[42px] transition-all relative ${
      p1IsWinner ? 'bg-red-950/20' : hasWinner ? 'opacity-40' : 'bg-gray-900'
    }`;
    const p2Classes = `grid grid-cols-[1fr_28px_28px_28px] items-center h-[42px] transition-all relative ${
      p2IsWinner ? 'bg-red-950/20' : hasWinner ? 'opacity-40' : 'bg-gray-900'
    }`;

    const scoreBoxClass = (isWinner, hasWinner) => 
      `border-l border-gray-800 text-center text-[0.8rem] flex items-center justify-center h-full transition-colors ${
        isWinner ? 'bg-red-600/20 text-red-500 font-black shadow-[inset_0_0_8px_rgba(0,242,254,0.2)]' : 
        hasWinner ? 'bg-gray-900/50 text-gray-500 font-medium' : 
        'bg-gray-800 text-gray-200 font-semibold'
      }`;

    const court = courts.find(c => String(c.id) === String(match.court_id));
    const courtName = court?.name || 'Sin Asignar';
    const formattedTime = match.match_time ? match.match_time.slice(0, 5) : '';
    const dateStr = match.match_date ? `${match.match_date.split('-').reverse().join('/')} ${formattedTime}` : 'Fecha a definir';

    // En modo admin SIEMPRE se permite editar todos los partidos
    const isEditable = mode === 'admin';

    return (
      <div 
        className={`bg-gray-950 border ${hasWinner ? 'border-gray-700' : 'border-gray-800'} rounded-lg my-4 relative z-10 overflow-hidden transition-all duration-200 ${
          isEditable ? 'cursor-pointer hover:border-red-600 hover:shadow-[0_0_18px_rgba(239,68,68,0.35)] transform hover:-translate-y-1 group' : ''
        } ${isByeMatch ? 'opacity-60 grayscale hover:opacity-85' : ''}`}
        onClick={() => isEditable && setEditingMatch(match)}
        title={isEditable ? "Clic para modificar horario, cancha o resultado del partido" : undefined}
      >
        {/* Glow de fondo si tiene ganador */}
        {hasWinner && <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent pointer-events-none" />}
        
        <div className={`text-[0.65rem] font-black tracking-widest uppercase px-4 py-1.5 flex justify-between items-center transition-colors ${
          hasWinner ? 'bg-gray-800 text-red-500 border-b border-gray-700' : 'bg-red-700 text-white border-b border-red-800'
        }`}>
          <span className="flex items-center gap-1.5">
            {hasWinner && <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
            {match.round_name}
          </span>
          {isEditable && (
            <span className="text-[10px] text-red-200 bg-black/40 hover:bg-black/60 px-2 py-0.5 rounded transition-all flex items-center gap-1 font-semibold border border-red-400/20">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Editar
            </span>
          )}
        </div>

        <div className={p1Classes}>
          {p1IsWinner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
          <div className={`text-[0.75rem] px-4 truncate flex items-center h-full ${p1IsWinner ? 'text-white font-bold' : !match.p1_name ? 'text-gray-500 italic' : 'text-gray-300'}`}>
             {match.p1_name || 'Esperando...'}
          </div>
          <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{isWOP1 ? 'W' : p1Score[0]}</div>
          <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{isWOP1 ? 'O' : p1Score[1]}</div>
          <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{p1Score[2]}</div>
        </div>

        <div className="h-[1px] w-full bg-gray-800/50" />

        <div className={p2Classes}>
          {p2IsWinner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
          <div className={`text-[0.75rem] px-4 truncate flex items-center h-full ${p2IsWinner ? 'text-white font-bold' : !match.p2_name ? 'text-gray-500 italic' : 'text-gray-300'}`}>
             {match.p2_name || 'Esperando...'}
          </div>
          <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{isWOP2 ? 'W' : p2Score[0]}</div>
          <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{isWOP2 ? 'O' : p2Score[1]}</div>
          <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{p2Score[2]}</div>
        </div>

        <div className="flex justify-between items-center text-[0.65rem] font-medium px-4 py-2 bg-gray-900 border-t border-gray-800 group-hover:bg-gray-850 transition-colors">
          <span className={`flex items-center gap-1.5 ${match.match_date ? 'text-gray-200 font-semibold' : 'text-gray-500 italic'}`}>
            <svg className={`w-3.5 h-3.5 ${match.match_date ? 'text-red-500' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {dateStr}
          </span>
          <span className={`flex items-center gap-1.5 truncate max-w-[50%] ${court ? 'text-red-400 font-bold' : 'text-gray-500 italic'}`}>
            <svg className={`w-3.5 h-3.5 ${court ? 'text-red-500' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            {courtName}
          </span>
        </div>
      </div>
    );
  };

  const renderChampion = () => {
    const finalRound = bracketByRound[bracketByRound.length - 1];
    if (finalRound && finalRound.length > 0) {
      const finalMatch = finalRound[0];
      if (finalMatch.winner && finalMatch.winner !== 'BYE') {
        return (
          <div className="absolute right-0 top-1/2 transform translate-x-[105%] -translate-y-1/2 text-center animate-fade-up z-50">
             <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-1 drop-shadow-md">Campeones</div>
             <div className="border border-yellow-500/50 bg-gray-900 text-white font-black py-3 px-6 rounded-lg inline-block text-sm shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                 {finalMatch.winner}
             </div>
          </div>
        );
      }
    }

    return null;
  };

  const [selectedStage, setSelectedStage] = useState('all'); // 'all', 'zones', or round index

  return (
    <div className="flex flex-col h-full relative">
      {/* CABECERA RESPONSIVE (MOBILE-FIRST) */}
      <div className="flex flex-col gap-2.5 mb-3 sm:mb-4 flex-shrink-0 border-b border-gray-800 pb-3">
        {/* Fila 1: Botón volver, nombre de categoría y acciones admin */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <button 
              onClick={onBack} 
              className="text-gray-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors bg-gray-900 hover:bg-gray-800 py-1.5 px-3 rounded-lg border border-gray-700 font-medium flex-shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              <span>Volver</span>
            </button>
            <span className="text-red-500 font-bold uppercase tracking-wider text-xs sm:text-sm bg-red-950/40 px-2.5 py-1 rounded-lg border border-red-900 truncate">
              {category.name}
            </span>
          </div>

          {/* Acciones de administración compactas para móvil y desktop */}
          {mode === 'admin' && zones.length > 0 && (
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                onClick={() => setShowSwapModal(true)}
                className="text-[11px] sm:text-xs bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 px-2.5 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"
                title="Intercambiar parejas entre zonas del cuadro"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="hidden sm:inline">Intercambiar</span>
                <span className="inline sm:hidden">Canjear</span>
              </button>

              <button
                onClick={() => setShowAddPairModal(true)}
                className="text-[11px] sm:text-xs bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-2.5 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"
                title="Inscribir una nueva pareja sin re-sortear el cuadro"
              >
                <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span className="hidden sm:inline">Inscribir en Cuadro</span>
                <span className="inline sm:hidden">+ Pareja</span>
              </button>
            </div>
          )}
        </div>

        {/* Fila 2: Carrusel horizontal de categorías */}
        {categories && categories.length > 1 && onSelectCategory && (
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 pt-0.5 custom-scrollbar">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap mr-1 hidden sm:inline">Categoría:</span>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                  c.id === category.id
                    ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                    : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {/* Fila 3: Filtro rápido de etapas para pantallas táctiles y móviles */}
        {(zones.length > 0 || bracketByRound.length > 0) && (
          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 pt-1 border-t border-gray-800/60 custom-scrollbar text-[11px]">
            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap mr-1">Etapa:</span>
            <button
              onClick={() => setSelectedStage('all')}
              className={`px-2.5 py-1 rounded-md font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedStage === 'all'
                  ? 'bg-red-950/60 text-red-400 border border-red-800/80'
                  : 'bg-gray-950 text-gray-400 border border-gray-800 hover:text-white'
              }`}
            >
              🌐 Todo el Cuadro
            </button>
            {zones.length > 0 && (
              <button
                onClick={() => setSelectedStage('zones')}
                className={`px-2.5 py-1 rounded-md font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  selectedStage === 'zones'
                    ? 'bg-red-950/60 text-red-400 border border-red-800/80'
                    : 'bg-gray-950 text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                🎾 Zonas ({zones.length})
              </button>
            )}
            {bracketByRound.map((round, rIdx) => {
              const rName = round[0]?.round_name || `Ronda ${rIdx + 1}`;
              return (
                <button
                  key={rIdx}
                  onClick={() => setSelectedStage(rIdx)}
                  className={`px-2.5 py-1 rounded-md font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                    selectedStage === rIdx
                      ? 'bg-red-950/60 text-red-400 border border-red-800/80'
                      : 'bg-gray-950 text-gray-400 border border-gray-800 hover:text-white'
                  }`}
                >
                  {rIdx === bracketByRound.length - 1 ? '🥇 Final' : rIdx === bracketByRound.length - 2 ? '🏆 Semis' : rName}
                </button>
              );
            })}
          </div>
        )}
      </div>
      
      {/* CONTENEDOR DEL BRACKET CON RESPONSIVIDAD Y SCROLL FLUIDO */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl flex-grow relative shadow-2xl overflow-x-auto custom-scrollbar" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="flex gap-4 sm:gap-8 md:gap-12 p-3 sm:p-6 md:p-8 items-start min-w-max">
          
          {/* ZONAS */}
          {zones.length > 0 && (selectedStage === 'all' || selectedStage === 'zones') && (
            <div className="flex flex-col justify-center gap-4 sm:gap-6 relative w-[280px] sm:w-[300px] flex-shrink-0">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Fase de Zonas</span>
                </div>
                {mode === 'admin' && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setShowSwapModal(true)}
                      className="text-[9px] bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 px-2 py-0.5 rounded transition-colors font-bold uppercase tracking-wider"
                      title="Intercambiar parejas entre zonas"
                    >
                      🔄 Canjear
                    </button>
                    <button
                      onClick={() => setShowAddPairModal(true)}
                      className="text-[9px] bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 px-2 py-0.5 rounded transition-colors font-bold uppercase tracking-wider"
                      title="Inscribir nueva pareja"
                    >
                      ➕ Nueva
                    </button>
                  </div>
                )}
              </div>
              {zones.map(m => <MatchCard key={m.id} match={m} />)}
            </div>
          )}

          {/* BRACKET ROUNDS */}
          {bracketByRound.map((round, rIndex) => {
            if (selectedStage !== 'all' && selectedStage !== rIndex) return null;
            return (
              <div key={rIndex} className="flex flex-col justify-center gap-4 sm:gap-6 relative w-[280px] sm:w-[300px] flex-shrink-0">
                <div className="border-b border-gray-800 pb-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    {round[0]?.round_name || `Ronda ${rIndex + 1}`}
                  </span>
                </div>
                {round.map(m => <MatchCard key={m.id} match={m} />)}
                {rIndex === bracketByRound.length - 1 && renderChampion()}
              </div>
            );
          })}

        </div>
      </div>

      {/* MATCH EDITOR MODAL */}
      {editingMatch && (
        <MatchEditorModal 
          match={editingMatch} 
          courts={courts} 
          onClose={() => setEditingMatch(null)} 
          onSave={async (updates) => {
            const updatedMatch = await updateMatch(editingMatch.id, updates);
            if (updatedMatch) {
              await onMatchUpdate(updatedMatch);
              setEditingMatch(null);
            } else {
              alert("Error al guardar el partido en la base de datos.");
            }
          }} 
        />
      )}

      {/* MODAL PARA INTERCAMBIAR PAREJAS ENTRE ZONAS */}
      <SwapPairsModal
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
        category={category}
        matches={matches}
        onSwap={handleSwapPairs}
      />

      {/* MODAL PARA INSCRIBIR PAREJA EN CUADRO ACTIVO */}
      <AddPairToDrawModal
        isOpen={showAddPairModal}
        onClose={() => setShowAddPairModal(false)}
        category={category}
        matches={matches}
        onPlayerAdded={onPlayersUpdate}
        onMatchUpdated={onMatchUpdate}
        showToast={showToast}
      />
    </div>
  );
}

function MatchEditorModal({ match, courts, onClose, onSave }) {
  const safeArray = (arr) => Array.isArray(arr) ? arr : ['', '', ''];
  const [date, setDate] = useState(match.match_date || '');
  const [time, setTime] = useState(match.match_time ? match.match_time.slice(0, 5) : '');
  const [courtId, setCourtId] = useState(match.court_id ? String(match.court_id) : '');
  const [p1Score, setP1Score] = useState(safeArray(match.p1_score));
  const [p2Score, setP2Score] = useState(safeArray(match.p2_score));
  const [isWo, setIsWo] = useState(match.is_wo || false);
  const [winner, setWinner] = useState(match.winner || 'null');
  const [loading, setLoading] = useState(false);

  const [p1Name, setP1Name] = useState(match.p1_name || '');
  const [p2Name, setP2Name] = useState(match.p2_name || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isP1Bye = !p1Name || p1Name.trim().toUpperCase() === 'BYE';
    const isP2Bye = !p2Name || p2Name.trim().toUpperCase() === 'BYE';
    const hasBye = isP1Bye || isP2Bye;

    await onSave({
      match_date: date || null,
      match_time: time || null,
      court_id: courtId || null,
      is_wo: isWo,
      winner: winner === 'null' ? null : winner,
      p1_score: p1Score,
      p2_score: p2Score,
      p1_name: p1Name ? p1Name.trim() : null,
      p2_name: p2Name ? p2Name.trim() : null,
      is_bye: hasBye
    });
    setLoading(false);
  };

  const updateScore = (playerIdx, setIdx, val) => {
    if (playerIdx === 1) {
      const newScore = [...p1Score];
      newScore[setIdx] = val;
      setP1Score(newScore);
    } else {
      const newScore = [...p2Score];
      newScore[setIdx] = val;
      setP2Score(newScore);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-up">
        <div className="flex justify-between items-center p-5 border-b border-gray-800 bg-gray-950">
          <div>
            <h3 className="text-base font-bold text-red-500 uppercase tracking-wider">{match.round_name}</h3>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Configuración de Horario y Partido</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1" title="Cerrar">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[82vh] overflow-y-auto custom-scrollbar">
          
          {/* SECCIÓN 1: PROGRAMACIÓN DE HORARIO Y CANCHA (DESTACADA) */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 shadow-inner">
            <div className="flex items-center justify-between mb-3 border-b border-gray-800/80 pb-2">
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Programación del Turno
              </span>
              {(date || time || courtId) && (
                <button
                  type="button"
                  onClick={() => { setDate(''); setTime(''); setCourtId(''); }}
                  className="text-[10px] text-gray-500 hover:text-red-400 transition-colors uppercase font-semibold"
                >
                  ✕ Limpiar Horario
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Fecha</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={e => setDate(e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm text-white focus:border-red-600 outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Hora (HH:MM)</label>
                <input 
                  type="time" 
                  value={time} 
                  onChange={e => setTime(e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm text-white focus:border-red-600 outline-none transition-colors" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Cancha</label>
              <select 
                value={courtId} 
                onChange={e => setCourtId(e.target.value)} 
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm text-white focus:border-red-600 outline-none transition-colors"
              >
                <option value="">Sin Asignar</option>
                {courts.map(c => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Atajos de horarios rápidos comunes en torneos */}
            <div className="mt-3 pt-2.5 border-t border-gray-800/60 flex flex-wrap items-center gap-1.5">
              <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold mr-1">Turnos rápidos:</span>
              {['17:00', '18:15', '19:30', '20:45', '22:00'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                    time === t 
                      ? 'bg-red-600 text-white border-red-500 font-bold' 
                      : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* SECCIÓN 2: PAREJAS Y RESULTADOS */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 shadow-inner">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Parejas y Resultado
            </span>

            <div className="grid grid-cols-[1fr_36px_36px_36px] sm:grid-cols-[1fr_40px_40px_40px] gap-1.5 sm:gap-2 mb-2 text-[10px] text-gray-500 uppercase tracking-widest text-center mt-2">
              <div className="text-left font-bold truncate">Pareja</div>
              <div>S1</div>
              <div>S2</div>
              <div>S3</div>
            </div>
            
            <div className="grid grid-cols-[1fr_36px_36px_36px] sm:grid-cols-[1fr_40px_40px_40px] gap-1.5 sm:gap-2 items-center mb-3">
              <input 
                type="text" 
                value={p1Name} 
                onChange={e => setP1Name(e.target.value)} 
                placeholder={match.p1_name || "Esperando clasificación..."} 
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-base sm:text-xs text-white focus:border-red-600 outline-none transition-colors" 
              />
              <input type="number" inputMode="numeric" min="0" value={p1Score[0]} onChange={e => updateScore(1, 0, e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-base sm:text-sm text-white focus:border-red-600" />
              <input type="number" inputMode="numeric" min="0" value={p1Score[1]} onChange={e => updateScore(1, 1, e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-base sm:text-sm text-white focus:border-red-600" />
              <input type="number" inputMode="numeric" min="0" value={p1Score[2]} onChange={e => updateScore(1, 2, e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-base sm:text-sm text-white focus:border-red-600" />
            </div>
            
            <div className="grid grid-cols-[1fr_36px_36px_36px] sm:grid-cols-[1fr_40px_40px_40px] gap-1.5 sm:gap-2 items-center">
              <input 
                type="text" 
                value={p2Name} 
                onChange={e => setP2Name(e.target.value)} 
                placeholder={match.p2_name || "Esperando clasificación..."} 
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-base sm:text-xs text-white focus:border-red-600 outline-none transition-colors" 
              />
              <input type="number" inputMode="numeric" min="0" value={p2Score[0]} onChange={e => updateScore(2, 0, e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-base sm:text-sm text-white focus:border-red-600" />
              <input type="number" inputMode="numeric" min="0" value={p2Score[1]} onChange={e => updateScore(2, 1, e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-base sm:text-sm text-white focus:border-red-600" />
              <input type="number" inputMode="numeric" min="0" value={p2Score[2]} onChange={e => updateScore(2, 2, e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-base sm:text-sm text-white focus:border-red-600" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-gray-800/80 pt-3 gap-3 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isWo} onChange={e => setIsWo(e.target.checked)} className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-600" />
                <span className="text-xs text-gray-300 font-medium">Ganador por W.O.</span>
              </label>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold whitespace-nowrap">Ganador:</label>
                <select 
                  value={winner} 
                  onChange={e => setWinner(e.target.value)} 
                  className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-base sm:text-xs text-red-500 font-bold focus:border-red-600 outline-none w-full sm:max-w-[160px] truncate"
                >
                  <option value="null">Sin definir</option>
                  {(p1Name || match.p1_name) && <option value={p1Name || match.p1_name}>{p1Name || match.p1_name}</option>}
                  {(p2Name || match.p2_name) && <option value={p2Name || match.p2_name}>{p2Name || match.p2_name}</option>}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-1/3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full sm:w-2/3 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Guardando...</span>
                </>
              ) : (
                "Guardar Partido"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
