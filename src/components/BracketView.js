"use client";

import { useState, useMemo } from "react";
import { updateMatch, addPlayer } from "../lib/supabaseService";
import { determineWinnerFromScores, generateTournamentMatches } from "../lib/tournamentLogic";
import SwapPairsModal from "./SwapPairsModal";
import AddPairToDrawModal from "./AddPairToDrawModal";

export default function BracketView({ 
  category, 
  categories = [], 
  onSelectCategory, 
  allMatches = [], 
  players = [], 
  courts = [], 
  mode, 
  onBack, 
  onMatchUpdate,
  onPlayersUpdate,
  showToast,
  onOpenSchedule,
  onInitDefaultDraw
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
  let dbMatches = allMatches.filter(m => String(m.category_id) === String(category.id));
  const isVirtualDefault = dbMatches.length === 0;

  // Si no hay partidos aún en la BD, generamos la estructura predeterminada de 14 parejas en memoria para visualización inmediata
  const matches = isVirtualDefault
    ? generateTournamentMatches(category.id, 14, Array(14).fill(''), false).generatedMatches.map((m, idx) => ({ ...m, id: `temp-${category.id}-${idx}` }))
    : dbMatches;
  
  // Agrupar zonas (14 parejas = 7 zonas A..G)
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

  // Jugadores registrados en esta categoría
  const categoryPlayers = players.filter(p => String(p.category_id) === String(category.id));

  // Abrir modal unificado al hacer clic en cualquier parte de la tarjeta
  const handleCardClick = async (match) => {
    if (mode !== 'admin') return;

    if (isVirtualDefault || String(match.id).startsWith('temp-')) {
      if (onInitDefaultDraw) {
        await onInitDefaultDraw(category.id);
        showToast?.("Se inicializó el cuadro en la base de datos.");
      }
    }
    setEditingMatch(match);
  };

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

  // Ganador de la final (si existe)
  const finalRound = bracketByRound[bracketByRound.length - 1];
  const finalMatch = finalRound && finalRound.length > 0 ? finalRound[0] : null;
  const championWinner = finalMatch?.winner && finalMatch?.winner !== 'BYE' && finalMatch?.winner !== 'null' ? finalMatch.winner : null;

  const MatchCard = ({ match }) => {
    const isByeMatch = match.is_bye;
    
    const p1Score = match.p1_score || ['','',''];
    const p2Score = match.p2_score || ['','',''];
    
    const isWOP1 = match.is_wo && match.winner === match.p1_name;
    const isWOP2 = match.is_wo && match.winner === match.p2_name;

    const p1IsWinner = match.winner && match.winner === match.p1_name;
    const p2IsWinner = match.winner && match.winner === match.p2_name;
    const hasWinner = Boolean(match.winner && match.winner !== 'null' && match.winner !== 'BYE');

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

    const isEditable = mode === 'admin';

    return (
      <div 
        className={`bg-gray-950 border ${hasWinner ? 'border-gray-700' : 'border-gray-800'} rounded-xl relative z-10 overflow-hidden transition-all duration-200 select-none ${
          isEditable 
            ? 'cursor-pointer hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.99] group' 
            : ''
        } ${isByeMatch ? 'opacity-60 grayscale hover:opacity-85' : ''}`}
        onClick={() => {
          if (isEditable) {
            handleCardClick(match);
          }
        }}
        title={isEditable ? "Toca la tarjeta para inscribir parejas, cargar resultado o asignar horario" : undefined}
      >
        {/* Glow de fondo si tiene ganador */}
        {hasWinner && <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent pointer-events-none" />}
        
        {/* Header de la tarjeta */}
        <div className={`text-[0.68rem] font-bold tracking-wider uppercase px-3 py-1.5 flex justify-between items-center transition-colors ${
          hasWinner ? 'bg-gray-850 text-red-400 border-b border-gray-700' : 'bg-red-700 text-white border-b border-red-800'
        }`}>
          <span className="flex items-center gap-1.5 truncate">
            {hasWinner && (
              <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <span className="truncate">{match.round_name}</span>
          </span>

          {isEditable && (
            <span className="text-[10px] text-white/90 bg-black/40 group-hover:bg-black/60 px-2 py-0.5 rounded-md transition-colors flex items-center gap-1 font-semibold border border-red-400/20 shrink-0">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Gestionar</span>
            </span>
          )}
        </div>

        {/* Pareja 1 */}
        <div className={p1Classes}>
          {p1IsWinner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
          <div className="text-[0.78rem] px-3 truncate flex items-center h-full">
            {match.p1_name ? (
              <span className={`truncate ${p1IsWinner ? 'text-white font-bold' : 'text-gray-200 font-medium'}`}>
                {match.p1_name}
              </span>
            ) : (
              <span className="text-[11px] text-gray-500 italic flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0"></span>
                Cupo Vacante
              </span>
            )}
          </div>
          <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{isWOP1 ? 'W' : p1Score[0]}</div>
          <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{isWOP1 ? 'O' : p1Score[1]}</div>
          <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{p1Score[2]}</div>
        </div>

        <div className="h-[1px] w-full bg-gray-800/60" />

        {/* Pareja 2 */}
        <div className={p2Classes}>
          {p2IsWinner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
          <div className="text-[0.78rem] px-3 truncate flex items-center h-full">
            {match.p2_name ? (
              <span className={`truncate ${p2IsWinner ? 'text-white font-bold' : 'text-gray-200 font-medium'}`}>
                {match.p2_name}
              </span>
            ) : (
              <span className="text-[11px] text-gray-500 italic flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0"></span>
                Cupo Vacante
              </span>
            )}
          </div>
          <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{isWOP2 ? 'W' : p2Score[0]}</div>
          <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{isWOP2 ? 'O' : p2Score[1]}</div>
          <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{p2Score[2]}</div>
        </div>

        {/* Footer: fecha y cancha */}
        <div className="flex justify-between items-center text-[0.68rem] font-medium px-3 py-1.5 bg-gray-900 border-t border-gray-800/80 group-hover:bg-gray-850 transition-colors">
          <span className={`flex items-center gap-1.5 truncate ${match.match_date ? 'text-gray-200 font-semibold' : 'text-gray-500 italic'}`}>
            <svg className={`w-3 h-3 shrink-0 ${match.match_date ? 'text-red-500' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{dateStr}</span>
          </span>
          <span className={`flex items-center gap-1.5 truncate max-w-[48%] ${court ? 'text-red-400 font-bold' : 'text-gray-500 italic'}`}>
            <svg className={`w-3 h-3 shrink-0 ${court ? 'text-red-500' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="truncate">{courtName}</span>
          </span>
        </div>
      </div>
    );
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
          {mode === 'admin' && (
            <div className="flex items-center gap-1.5 ml-auto flex-wrap">
              {onOpenSchedule && (
                <button
                  onClick={onOpenSchedule}
                  className="text-[11px] sm:text-xs bg-red-600 hover:bg-red-500 text-white px-2.5 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"
                  title="Abrir Gestor Global de Horarios y Canchas"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">Gestor Horarios</span>
                  <span className="inline sm:hidden">Horarios</span>
                </button>
              )}

              {zones.length > 0 && (
                <>
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
                </>
              )}
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
              Cuadro Completo
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
                Zonas ({zones.length})
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
                  {rIdx === bracketByRound.length - 1 ? 'Final' : rIdx === bracketByRound.length - 2 ? 'Semifinales' : rName}
                </button>
              );
            })}
          </div>
        )}
      </div>
      
      {/* BANNER INFORMATIVO: CUADRO DE 14 PAREJAS PREDETERMINADO */}
      {isVirtualDefault && (
        <div className="bg-gradient-to-r from-red-950/40 to-gray-900 border border-red-800/80 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-lg animate-fade-up">
          <div className="flex items-center gap-2.5 text-red-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0"></span>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">
                Cuadro de 14 Parejas Predeterminadas (7 Zonas + Eliminatorias)
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Las zonas ya están listas para inscribir jugadores y aplicar horarios directamente en cada tarjeta.
              </p>
            </div>
          </div>
          {mode === 'admin' && onInitDefaultDraw && (
            <button
              onClick={() => onInitDefaultDraw(category.id)}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg uppercase tracking-wider transition-all shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span>Guardar en Base de Datos</span>
            </button>
          )}
        </div>
      )}

      {/* CONTENEDOR DEL BRACKET CON RESPONSIVIDAD Y SCROLL FLUIDO */}
      <div 
        className="bg-gray-900/60 border border-gray-800 rounded-2xl flex-grow relative shadow-2xl overflow-x-auto custom-scrollbar snap-x snap-mandatory scroll-smooth" 
        style={{ minHeight: 'calc(100vh - 200px)' }}
      >
        <div className="flex gap-6 sm:gap-8 md:gap-10 p-3 sm:p-6 md:p-8 items-start min-w-max">
          
          {/* ZONAS */}
          {zones.length > 0 && (selectedStage === 'all' || selectedStage === 'zones') && (
            <div className="flex flex-col gap-3 sm:gap-4 relative w-[86vw] max-w-[320px] sm:w-[300px] md:w-[320px] flex-shrink-0 snap-center sm:snap-start">
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
                      Intercambiar
                    </button>
                    <button
                      onClick={() => setShowAddPairModal(true)}
                      className="text-[9px] bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 px-2 py-0.5 rounded transition-colors font-bold uppercase tracking-wider"
                      title="Inscribir nueva pareja"
                    >
                      + Pareja
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
              <div 
                key={rIndex} 
                className="flex flex-col gap-3 sm:gap-4 relative w-[86vw] max-w-[320px] sm:w-[300px] md:w-[320px] flex-shrink-0 snap-center sm:snap-start"
              >
                <div className="border-b border-gray-800 pb-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    {round[0]?.round_name || `Ronda ${rIndex + 1}`}
                  </span>
                </div>
                {round.map(m => <MatchCard key={m.id} match={m} />)}
              </div>
            );
          })}

          {/* COLUMNA CAMPEÓN (NUNCA SUPERPUESTA) */}
          {championWinner && (selectedStage === 'all' || selectedStage === bracketByRound.length - 1) && (
            <div className="flex flex-col justify-center items-center gap-3 relative w-[220px] sm:w-[260px] flex-shrink-0 snap-center sm:snap-start self-center animate-fade-up">
              <div className="text-center p-6 bg-gradient-to-b from-yellow-950/30 via-gray-950 to-gray-950 border border-yellow-500/50 rounded-2xl shadow-[0_0_25px_rgba(234,179,8,0.15)] w-full">
                <span className="text-3xl mb-2 block">🏆</span>
                <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-1 drop-shadow-md">
                  Campeones del Torneo
                </div>
                <div className="text-white font-black text-sm sm:text-base truncate px-3 py-1.5 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                  {championWinner}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* UNIFIED MATCH EDITOR MODAL */}
      {editingMatch && (
        <MatchEditorModal 
          match={editingMatch} 
          category={category}
          courts={courts} 
          categoryPlayers={categoryPlayers}
          onClose={() => setEditingMatch(null)} 
          onSave={async (updates) => {
            const targetId = String(editingMatch.id).startsWith('temp-')
              ? (matches.find(m => m.round_name === editingMatch.round_name && m.match_index === editingMatch.match_index)?.id || editingMatch.id)
              : editingMatch.id;

            const updatedMatch = await updateMatch(targetId, updates);
            if (updatedMatch) {
              await onMatchUpdate(updatedMatch);
              setEditingMatch(null);
              showToast?.("Partido actualizado con éxito.");
            } else {
              alert("Error al guardar el partido en la base de datos.");
            }
          }} 
          onPlayersUpdate={onPlayersUpdate}
          showToast={showToast}
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

// ==============================================================================
// MODAL UNIFICADO DE GESTIÓN INTEGRAL DEL PARTIDO
// Permite inscribir/editar parejas, cargar resultados y asignar horario/cancha
// ==============================================================================
function MatchEditorModal({ 
  match, 
  category, 
  courts = [], 
  categoryPlayers = [], 
  onClose, 
  onSave, 
  onPlayersUpdate, 
  showToast 
}) {
  const safeArray = (arr) => Array.isArray(arr) ? [...arr] : ['', '', ''];
  
  // Tab inicial: si falta alguna pareja, empezar en 'pairs'; si ambas están, en 'scores'
  const hasEmptySlot = !match.p1_name || !match.p2_name;
  const [activeTab, setActiveTab] = useState(hasEmptySlot ? 'pairs' : 'scores');

  // Estado Parejas
  const [p1Name, setP1Name] = useState(match.p1_name || '');
  const [p2Name, setP2Name] = useState(match.p2_name || '');

  // Selectores desplegables de jugadores registrados
  const [showP1Selector, setShowP1Selector] = useState(false);
  const [showP2Selector, setShowP2Selector] = useState(false);
  const [searchPlayer, setSearchPlayer] = useState('');

  // Registro opcional en tabla 'players'
  const [saveP1AsPlayer, setSaveP1AsPlayer] = useState(false);
  const [p1Paid, setP1Paid] = useState(true);
  const [saveP2AsPlayer, setSaveP2AsPlayer] = useState(false);
  const [p2Paid, setP2Paid] = useState(true);

  // Estado Resultado
  const [p1Score, setP1Score] = useState(safeArray(match.p1_score));
  const [p2Score, setP2Score] = useState(safeArray(match.p2_score));
  const [isWo, setIsWo] = useState(match.is_wo || false);
  const [winner, setWinner] = useState(match.winner || 'null');

  // Estado Horario y Cancha
  const [date, setDate] = useState(match.match_date || '');
  const [time, setTime] = useState(match.match_time ? match.match_time.slice(0, 5) : '');
  const [courtId, setCourtId] = useState(match.court_id ? String(match.court_id) : '');

  const [loading, setLoading] = useState(false);

  const effectiveP1 = (p1Name || '').trim();
  const effectiveP2 = (p2Name || '').trim();

  // Filtrado de jugadores registrados para el selector
  const filteredCategoryPlayers = useMemo(() => {
    if (!categoryPlayers || categoryPlayers.length === 0) return [];
    const q = searchPlayer.trim().toLowerCase();
    if (!q) return categoryPlayers;
    return categoryPlayers.filter(p => {
      const n1 = (p.name || '').toLowerCase();
      const n2 = (p.partner || '').toLowerCase();
      return n1.includes(q) || n2.includes(q);
    });
  }, [categoryPlayers, searchPlayer]);

  // Ganador automático detectado en tiempo real
  const calculatedWinner = !isWo ? determineWinnerFromScores(effectiveP1, effectiveP2, p1Score, p2Score) : null;

  const updateScore = (playerIdx, setIdx, val) => {
    let nextP1Score = [...p1Score];
    let nextP2Score = [...p2Score];

    if (playerIdx === 1) {
      nextP1Score[setIdx] = val;
      setP1Score(nextP1Score);
    } else {
      nextP2Score[setIdx] = val;
      setP2Score(nextP2Score);
    }

    if (!isWo) {
      const autoWinner = determineWinnerFromScores(effectiveP1, effectiveP2, nextP1Score, nextP2Score);
      if (autoWinner) {
        setWinner(autoWinner);
      } else {
        const hasScores = nextP1Score.some(s => s && String(s).trim() !== '') || nextP2Score.some(s => s && String(s).trim() !== '');
        if (!hasScores) {
          setWinner('null');
        }
      }
    }
  };

  const handleP1NameChange = (val) => {
    setP1Name(val);
    if (!isWo) {
      const autoWinner = determineWinnerFromScores(val.trim(), effectiveP2, p1Score, p2Score);
      if (autoWinner) setWinner(autoWinner);
    }
  };

  const handleP2NameChange = (val) => {
    setP2Name(val);
    if (!isWo) {
      const autoWinner = determineWinnerFromScores(effectiveP1, val.trim(), p1Score, p2Score);
      if (autoWinner) setWinner(autoWinner);
    }
  };

  const handleSelectP1Player = (player) => {
    const fullName = `${player.name}${player.partner ? ' & ' + player.partner : ''}`;
    setP1Name(fullName);
    setShowP1Selector(false);
    setSearchPlayer('');
    if (!isWo) {
      const autoWinner = determineWinnerFromScores(fullName, effectiveP2, p1Score, p2Score);
      if (autoWinner) setWinner(autoWinner);
    }
  };

  const handleSelectP2Player = (player) => {
    const fullName = `${player.name}${player.partner ? ' & ' + player.partner : ''}`;
    setP2Name(fullName);
    setShowP2Selector(false);
    setSearchPlayer('');
    if (!isWo) {
      const autoWinner = determineWinnerFromScores(effectiveP1, fullName, p1Score, p2Score);
      if (autoWinner) setWinner(autoWinner);
    }
  };

  const handleToggleWo = (checked) => {
    setIsWo(checked);
    if (!checked) {
      const autoWinner = determineWinnerFromScores(effectiveP1, effectiveP2, p1Score, p2Score);
      setWinner(autoWinner || 'null');
    }
  };

  const handleClearScore = () => {
    setP1Score(['', '', '']);
    setP2Score(['', '', '']);
    setIsWo(false);
    setWinner('null');
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);

    try {
      // 1. Guardar en tabla players si se seleccionó registrar para Pareja 1
      if (saveP1AsPlayer && effectiveP1 && category?.id) {
        const parts = effectiveP1.split('&').map(s => s.trim());
        const created = await addPlayer({
          name: parts[0] || effectiveP1,
          partner: parts[1] || null,
          category_id: category.id,
          has_paid: p1Paid
        });
        if (created && onPlayersUpdate) {
          onPlayersUpdate(created, "add");
        }
      }

      // 2. Guardar en tabla players si se seleccionó registrar para Pareja 2
      if (saveP2AsPlayer && effectiveP2 && category?.id) {
        const parts = effectiveP2.split('&').map(s => s.trim());
        const created = await addPlayer({
          name: parts[0] || effectiveP2,
          partner: parts[1] || null,
          category_id: category.id,
          has_paid: p2Paid
        });
        if (created && onPlayersUpdate) {
          onPlayersUpdate(created, "add");
        }
      }

      // 3. Resolver ganador y BYE
      const isP1Bye = !effectiveP1 || effectiveP1.toUpperCase() === 'BYE';
      const isP2Bye = !effectiveP2 || effectiveP2.toUpperCase() === 'BYE';
      const hasBye = isP1Bye || isP2Bye;

      let finalWinner = winner === 'null' ? null : winner;
      let finalIsWo = isWo;

      if (hasBye) {
        if (isP1Bye && !isP2Bye) {
          finalWinner = effectiveP2;
          finalIsWo = true;
        } else if (isP2Bye && !isP1Bye) {
          finalWinner = effectiveP1;
          finalIsWo = true;
        }
      } else if (!finalIsWo) {
        const autoWinner = determineWinnerFromScores(effectiveP1, effectiveP2, p1Score, p2Score);
        if (autoWinner) {
          finalWinner = autoWinner;
        } else {
          const hasScores = (p1Score || []).some(s => s && String(s).trim() !== '') || (p2Score || []).some(s => s && String(s).trim() !== '');
          if (!hasScores) {
            finalWinner = null;
          }
        }
      }

      // 4. Guardar partido completo
      await onSave({
        match_date: date || null,
        match_time: time || null,
        court_id: courtId || null,
        is_wo: finalIsWo,
        winner: finalWinner,
        p1_score: p1Score,
        p2_score: p2Score,
        p1_name: effectiveP1 || null,
        p2_name: effectiveP2 || null,
        is_bye: hasBye
      });
    } catch (err) {
      console.error("Error al guardar partido:", err);
      alert("Ocurrió un error al guardar los cambios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[110] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-up my-auto flex flex-col max-h-[92vh]">
        
        {/* ENCABEZADO */}
        <div className="p-4 sm:p-5 border-b border-gray-800 bg-gray-950 flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/50 px-2.5 py-0.5 rounded border border-red-900/60">
                {match.round_name}
              </span>
              <span className="text-[11px] text-gray-400 font-semibold truncate max-w-[200px]">
                {category?.name}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-1">
              Gestión Integral del Partido
            </h3>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800" 
            title="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PESTAÑAS (TABS) */}
        <div className="flex border-b border-gray-800 bg-gray-950/80 px-4 pt-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('pairs')}
            className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'pairs'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Parejas</span>
            {hasEmptySlot && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-0.5" title="Cupo vacante" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scores')}
            className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'scores'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span>Resultado</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'schedule'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Horario & Cancha</span>
          </button>
        </div>

        {/* CONTENIDO DEL FORMULARIO */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto custom-scrollbar flex-1 space-y-4">
          
          {/* ============================================================== */}
          {/* TAB 1: PAREJAS (INSCRIBIR, MODIFICAR, ASIGNAR, VACIAR)         */}
          {/* ============================================================== */}
          {activeTab === 'pairs' && (
            <div className="space-y-4 animate-fade-up">
              
              {/* PAREJA 1 */}
              <div className="bg-gray-950 border border-gray-800 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Pareja 1</span>
                    {!effectiveP1 && (
                      <span className="text-[10px] bg-red-950/60 text-red-400 px-2 py-0.5 rounded border border-red-900/60 font-semibold">
                        Cupo Vacante
                      </span>
                    )}
                  </div>
                  {effectiveP1 && (
                    <button
                      type="button"
                      onClick={() => setP1Name('')}
                      className="text-[10px] text-gray-500 hover:text-red-400 transition-colors uppercase font-semibold flex items-center gap-1"
                    >
                      ✕ Vaciar Cupo
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">
                    Nombre de la Pareja o Jugadores
                  </label>
                  <input
                    type="text"
                    value={p1Name}
                    onChange={(e) => handleP1NameChange(e.target.value)}
                    placeholder="Ej: Juan Pérez & Carlos Gómez"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:border-red-600 outline-none transition-colors"
                  />
                </div>

                {/* Botón para abrir el selector de parejas registradas */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowP1Selector(!showP1Selector);
                      setShowP2Selector(false);
                      setSearchPlayer('');
                    }}
                    className="w-full py-1.5 px-3 bg-gray-900 hover:bg-gray-850 border border-gray-800 hover:border-gray-700 rounded-lg text-[11px] text-gray-300 font-semibold flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Elegir de inscriptos ({categoryPlayers.length})
                    </span>
                    <span className="text-[10px] text-gray-500">{showP1Selector ? '▲ Ocultar' : '▼ Ver listado'}</span>
                  </button>

                  {/* Selector desplegable filtrable */}
                  {showP1Selector && (
                    <div className="mt-2 p-2 bg-gray-900 border border-gray-700 rounded-xl space-y-2 max-h-[190px] overflow-y-auto custom-scrollbar shadow-xl animate-fade-up">
                      <input
                        type="text"
                        value={searchPlayer}
                        onChange={(e) => setSearchPlayer(e.target.value)}
                        placeholder="Buscar jugador..."
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-white outline-none focus:border-red-500"
                        autoFocus
                      />
                      <div className="space-y-1">
                        {filteredCategoryPlayers.length === 0 ? (
                          <p className="text-[11px] text-gray-500 p-2 text-center italic">No hay jugadores registrados con ese nombre</p>
                        ) : (
                          filteredCategoryPlayers.map(p => {
                            const fullName = `${p.name}${p.partner ? ' & ' + p.partner : ''}`;
                            return (
                              <div
                                key={p.id}
                                onClick={() => handleSelectP1Player(p)}
                                className="p-2 rounded-lg bg-gray-950 hover:bg-red-950/40 border border-transparent hover:border-red-800/60 cursor-pointer flex justify-between items-center transition-colors"
                              >
                                <span className="text-xs text-white font-semibold truncate">{fullName}</span>
                                <span className="text-[10px] text-red-400 font-bold uppercase shrink-0">Asignar</span>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Opción de registrar nueva pareja en el directorio */}
                <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-[11px] text-gray-300">
                    <input
                      type="checkbox"
                      checked={saveP1AsPlayer}
                      onChange={(e) => setSaveP1AsPlayer(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-600"
                    />
                    <span>Guardar también en lista de jugadores</span>
                  </label>
                  {saveP1AsPlayer && (
                    <button
                      type="button"
                      onClick={() => setP1Paid(!p1Paid)}
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase transition-colors ${
                        p1Paid ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {p1Paid ? 'Pagado' : 'Pendiente'}
                    </button>
                  )}
                </div>
              </div>

              {/* PAREJA 2 */}
              <div className="bg-gray-950 border border-gray-800 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Pareja 2</span>
                    {!effectiveP2 && (
                      <span className="text-[10px] bg-red-950/60 text-red-400 px-2 py-0.5 rounded border border-red-900/60 font-semibold">
                        Cupo Vacante
                      </span>
                    )}
                  </div>
                  {effectiveP2 && (
                    <button
                      type="button"
                      onClick={() => setP2Name('')}
                      className="text-[10px] text-gray-500 hover:text-red-400 transition-colors uppercase font-semibold flex items-center gap-1"
                    >
                      ✕ Vaciar Cupo
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">
                    Nombre de la Pareja o Jugadores
                  </label>
                  <input
                    type="text"
                    value={p2Name}
                    onChange={(e) => handleP2NameChange(e.target.value)}
                    placeholder="Ej: Lucas Ruiz & Martín Díaz"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:border-red-600 outline-none transition-colors"
                  />
                </div>

                {/* Botón para abrir el selector de parejas registradas */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowP2Selector(!showP2Selector);
                      setShowP1Selector(false);
                      setSearchPlayer('');
                    }}
                    className="w-full py-1.5 px-3 bg-gray-900 hover:bg-gray-850 border border-gray-800 hover:border-gray-700 rounded-lg text-[11px] text-gray-300 font-semibold flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Elegir de inscriptos ({categoryPlayers.length})
                    </span>
                    <span className="text-[10px] text-gray-500">{showP2Selector ? '▲ Ocultar' : '▼ Ver listado'}</span>
                  </button>

                  {/* Selector desplegable filtrable */}
                  {showP2Selector && (
                    <div className="mt-2 p-2 bg-gray-900 border border-gray-700 rounded-xl space-y-2 max-h-[190px] overflow-y-auto custom-scrollbar shadow-xl animate-fade-up">
                      <input
                        type="text"
                        value={searchPlayer}
                        onChange={(e) => setSearchPlayer(e.target.value)}
                        placeholder="Buscar jugador..."
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-white outline-none focus:border-red-500"
                        autoFocus
                      />
                      <div className="space-y-1">
                        {filteredCategoryPlayers.length === 0 ? (
                          <p className="text-[11px] text-gray-500 p-2 text-center italic">No hay jugadores registrados con ese nombre</p>
                        ) : (
                          filteredCategoryPlayers.map(p => {
                            const fullName = `${p.name}${p.partner ? ' & ' + p.partner : ''}`;
                            return (
                              <div
                                key={p.id}
                                onClick={() => handleSelectP2Player(p)}
                                className="p-2 rounded-lg bg-gray-950 hover:bg-red-950/40 border border-transparent hover:border-red-800/60 cursor-pointer flex justify-between items-center transition-colors"
                              >
                                <span className="text-xs text-white font-semibold truncate">{fullName}</span>
                                <span className="text-[10px] text-red-400 font-bold uppercase shrink-0">Asignar</span>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Opción de registrar nueva pareja en el directorio */}
                <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-[11px] text-gray-300">
                    <input
                      type="checkbox"
                      checked={saveP2AsPlayer}
                      onChange={(e) => setSaveP2AsPlayer(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-600"
                    />
                    <span>Guardar también en lista de jugadores</span>
                  </label>
                  {saveP2AsPlayer && (
                    <button
                      type="button"
                      onClick={() => setP2Paid(!p2Paid)}
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase transition-colors ${
                        p2Paid ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {p2Paid ? 'Pagado' : 'Pendiente'}
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: RESULTADOS Y GANADOR                                     */}
          {/* ============================================================== */}
          {activeTab === 'scores' && (
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 space-y-4 animate-fade-up">
              
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Puntajes por Sets
                </span>
                {(winner !== 'null' || isWo || p1Score.some(s => s) || p2Score.some(s => s)) && (
                  <button
                    type="button"
                    onClick={handleClearScore}
                    className="text-[10px] text-gray-500 hover:text-red-400 transition-colors uppercase font-semibold"
                  >
                    ✕ Limpiar Resultado
                  </button>
                )}
              </div>

              {/* Aviso en tiempo real de ganador detectado */}
              {effectiveP1 && effectiveP2 && (
                <div>
                  {calculatedWinner && !isWo ? (
                    <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 rounded-lg px-3 py-2 text-xs flex items-center justify-between font-medium animate-fade-up">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Ganador automático:
                      </span>
                      <span className="font-bold text-white truncate max-w-[200px]">{calculatedWinner}</span>
                    </div>
                  ) : isWo && winner && winner !== 'null' ? (
                    <div className="bg-amber-950/60 border border-amber-500/40 text-amber-400 rounded-lg px-3 py-2 text-xs flex items-center justify-between font-medium animate-fade-up">
                      <span className="flex items-center gap-1.5">
                        <span className="font-black text-amber-300">W.O.</span> Ganador por Walkover:
                      </span>
                      <span className="font-bold text-white truncate max-w-[200px]">{winner}</span>
                    </div>
                  ) : null}
                </div>
              )}

              <div className="grid grid-cols-[1fr_40px_40px_40px] gap-2 text-[10px] text-gray-500 uppercase tracking-widest text-center">
                <div className="text-left font-bold truncate">Pareja</div>
                <div>S1</div>
                <div>S2</div>
                <div>S3</div>
              </div>
              
              {/* Fila Pareja 1 */}
              <div className="grid grid-cols-[1fr_40px_40px_40px] gap-2 items-center">
                <div className="truncate text-xs font-semibold text-white px-2 py-2 bg-gray-900 border border-gray-800 rounded-lg">
                  {effectiveP1 || <span className="text-gray-500 italic">Cupo 1 vacante</span>}
                </div>
                <input 
                  type="number" 
                  inputMode="numeric" 
                  min="0" 
                  value={p1Score[0]} 
                  onChange={e => updateScore(1, 0, e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-sm font-bold text-white focus:border-red-600 outline-none" 
                />
                <input 
                  type="number" 
                  inputMode="numeric" 
                  min="0" 
                  value={p1Score[1]} 
                  onChange={e => updateScore(1, 1, e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-sm font-bold text-white focus:border-red-600 outline-none" 
                />
                <input 
                  type="number" 
                  inputMode="numeric" 
                  min="0" 
                  value={p1Score[2]} 
                  onChange={e => updateScore(1, 2, e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-sm font-bold text-white focus:border-red-600 outline-none" 
                />
              </div>
              
              {/* Fila Pareja 2 */}
              <div className="grid grid-cols-[1fr_40px_40px_40px] gap-2 items-center">
                <div className="truncate text-xs font-semibold text-white px-2 py-2 bg-gray-900 border border-gray-800 rounded-lg">
                  {effectiveP2 || <span className="text-gray-500 italic">Cupo 2 vacante</span>}
                </div>
                <input 
                  type="number" 
                  inputMode="numeric" 
                  min="0" 
                  value={p2Score[0]} 
                  onChange={e => updateScore(2, 0, e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-sm font-bold text-white focus:border-red-600 outline-none" 
                />
                <input 
                  type="number" 
                  inputMode="numeric" 
                  min="0" 
                  value={p2Score[1]} 
                  onChange={e => updateScore(2, 1, e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-sm font-bold text-white focus:border-red-600 outline-none" 
                />
                <input 
                  type="number" 
                  inputMode="numeric" 
                  min="0" 
                  value={p2Score[2]} 
                  onChange={e => updateScore(2, 2, e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-center text-sm font-bold text-white focus:border-red-600 outline-none" 
                />
              </div>

              {/* Controles adicionales de Ganador */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-gray-800/80 pt-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isWo} 
                    onChange={e => handleToggleWo(e.target.checked)} 
                    className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-600" 
                  />
                  <span className="text-xs text-gray-300 font-medium">Ganador por W.O.</span>
                </label>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold whitespace-nowrap">Ganador:</label>
                  <select 
                    value={winner} 
                    onChange={e => setWinner(e.target.value)} 
                    className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs text-red-500 font-bold focus:border-red-600 outline-none w-full sm:max-w-[170px] truncate"
                  >
                    <option value="null">Sin definir</option>
                    {effectiveP1 && <option value={effectiveP1}>{effectiveP1}</option>}
                    {effectiveP2 && <option value={effectiveP2}>{effectiveP2}</option>}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: HORARIOS Y CANCHAS                                      */}
          {/* ============================================================== */}
          {activeTab === 'schedule' && (
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 space-y-3.5 animate-fade-up">
              
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Fecha</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs sm:text-sm text-white focus:border-red-600 outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Hora (HH:MM)</label>
                  <input 
                    type="time" 
                    value={time} 
                    onChange={e => setTime(e.target.value)} 
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs sm:text-sm text-white focus:border-red-600 outline-none transition-colors" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Cancha</label>
                <select 
                  value={courtId} 
                  onChange={e => setCourtId(e.target.value)} 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:border-red-600 outline-none transition-colors"
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
              <div className="pt-2 border-t border-gray-800/60 flex flex-wrap items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold mr-1">Turnos rápidos:</span>
                {['17:00', '18:15', '19:30', '20:45', '22:00'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`text-[10px] px-2.5 py-1 rounded-md border transition-colors ${
                      time === t 
                        ? 'bg-red-600 text-white border-red-500 font-bold shadow-sm' 
                        : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PIE DE PÁGINA (STICKY FOOTER CON ACCIONES)                     */}
          {/* ============================================================== */}
          <div className="pt-3 border-t border-gray-800 flex flex-col-reverse sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-1/3 bg-gray-800 hover:bg-gray-750 text-gray-300 font-bold py-3 rounded-xl uppercase tracking-widest text-xs transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full sm:w-2/3 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl uppercase tracking-widest text-xs transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
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
