"use client";

import { PairName } from "./UIComponents";
import { useState } from "react";
import MatchEditorModal from "./MatchEditorModal";
import { formatMatchSchedule } from "../lib/format";

export default function BracketView({ category, allMatches, courts, mode, onBack, onMatchUpdate }) {
  const [editingMatch, setEditingMatch] = useState(null);

  // Filtrar partidos de esta categoría
  const matches = allMatches.filter(m => m.category_id === category.id);
  
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



  const renderChampion = () => {
    const finalRound = bracketByRound[bracketByRound.length - 1];
    if (finalRound && finalRound.length > 0) {
      const finalMatch = finalRound[0];
      if (finalMatch.winner && finalMatch.winner !== 'BYE') {
        return (
          <div className="absolute right-0 top-1/2 transform translate-x-[105%] -translate-y-1/2 text-center animate-fade-up z-50">
             <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-1">Campeones</div>
             <div className="border border-yellow-500/50 bg-gray-900 text-white font-black py-3 px-6 rounded-lg inline-block text-sm">
                 {finalMatch.winner}
             </div>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex justify-between items-center mb-4 flex-shrink-0 border-b border-gray-800 pb-2">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors bg-gray-900 py-1.5 px-3 rounded border border-gray-700">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Volver
        </button>
        <span className="text-red-500 font-bold uppercase tracking-widest text-sm">{category.name}</span>
      </div>
      
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl flex-grow relative shadow-2xl overflow-x-auto custom-scrollbar" style={{ minHeight: 'calc(100vh - 180px)' }}>
        <div className="flex gap-12 p-8 items-center min-w-max">
          
          {/* ZONAS */}
          {zones.length > 0 && (
            <div className="flex flex-col justify-center gap-6 relative min-w-[280px]">
              {zones.map(m => <MatchCard key={m.id} match={m} courts={courts} mode={mode} onEdit={setEditingMatch} />)}
            </div>
          )}

          {/* BRACKET */}
          {bracketByRound.map((round, rIndex) => (
            <div key={rIndex} className="flex flex-col justify-center gap-6 relative min-w-[280px]">
              {round.map(m => <MatchCard key={m.id} match={m} courts={courts} mode={mode} onEdit={setEditingMatch} />)}
              {rIndex === bracketByRound.length - 1 && renderChampion()}
            </div>
          ))}

        </div>
      </div>

      {/* MATCH EDITOR MODAL */}
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
  
  const p1Score = match.p1_score || ['','',''];
  const p2Score = match.p2_score || ['','',''];
  
  const isWOP1 = match.is_wo && match.winner === match.p1_name;
  const isWOP2 = match.is_wo && match.winner === match.p2_name;



  const p1IsWinner = match.winner && match.winner === match.p1_name;
  const p2IsWinner = match.winner && match.winner === match.p2_name;
  const hasWinner = match.winner && match.winner !== 'null';

  const p1Classes = `grid grid-cols-[1fr_28px_28px_28px] items-stretch min-h-[44px] transition-all relative ${
    p1IsWinner ? 'bg-red-950/20' : hasWinner ? 'opacity-40' : 'bg-gray-900'
  }`;
  const p2Classes = `grid grid-cols-[1fr_28px_28px_28px] items-stretch min-h-[44px] transition-all relative ${
    p2IsWinner ? 'bg-red-950/20' : hasWinner ? 'opacity-40' : 'bg-gray-900'
  }`;

  const scoreBoxClass = (isWinner, hasWinner) => 
    `border-l border-gray-800 text-center text-[0.8rem] flex items-center justify-center h-full transition-colors ${
      isWinner ? 'bg-red-600/20 text-red-500 font-black' : 
      hasWinner ? 'bg-gray-900/50 text-gray-500 font-medium' : 
      'bg-gray-800 text-gray-200 font-semibold'
    }`;

  const courtName = courts.find(c => c.id === match.court_id)?.name || 'Sin cancha';
  const dateStr = formatMatchSchedule(match);

  const isEditable = mode === 'admin' && match.p1_name && match.p2_name && !isByeMatch;

  return (
    <div 
      className={`bg-gray-950 border ${hasWinner ? 'border-gray-700' : 'border-gray-800'} rounded-lg my-4 relative z-10 overflow-hidden ${
        isEditable ? 'cursor-pointer hover:border-red-600 transition-all transform hover:-translate-y-1 duration-300 group' : ''
      } ${isByeMatch ? 'opacity-50 grayscale hover:opacity-75 transition-opacity' : ''}`}
      onClick={() => isEditable && onEdit(match)}
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
        {isEditable && <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-red-100">Cargar resultado</span>}
      </div>

      <div className={p1Classes}>
        {p1IsWinner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />}
        <div className={`text-[0.75rem] px-4 py-1.5 min-w-0 flex items-center ${p1IsWinner ? 'text-white font-bold' : !match.p1_name ? 'text-gray-500 italic' : 'text-gray-300'}`}>
           <PairName name={match.p1_name} />
        </div>
        <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{isWOP1 ? 'W' : p1Score[0]}</div>
        <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{isWOP1 ? 'O' : p1Score[1]}</div>
        <div className={scoreBoxClass(p1IsWinner, hasWinner)}>{p1Score[2]}</div>
      </div>

      <div className="h-[1px] w-full bg-gray-800/50" />

      <div className={p2Classes}>
        {p2IsWinner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />}
        <div className={`text-[0.75rem] px-4 py-1.5 min-w-0 flex items-center ${p2IsWinner ? 'text-white font-bold' : !match.p2_name ? 'text-gray-500 italic' : 'text-gray-300'}`}>
           <PairName name={match.p2_name} />
        </div>
        <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{isWOP2 ? 'W' : p2Score[0]}</div>
        <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{isWOP2 ? 'O' : p2Score[1]}</div>
        <div className={scoreBoxClass(p2IsWinner, hasWinner)}>{p2Score[2]}</div>
      </div>

      <div className="flex justify-between items-center text-[0.65rem] text-gray-500 font-medium px-4 py-2 bg-gray-900 border-t border-gray-800">
        <span className="flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {dateStr}
        </span>
        <span className="flex items-center gap-1.5 truncate max-w-[50%]">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {courtName}
        </span>
      </div>
    </div>
  );
}
